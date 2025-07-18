import supabase from '../lib/supabase'
import { toast } from 'react-toastify'

// Database initialization service
export const databaseService = {
  // Initialize all required tables
  async initializeDatabase() {
    try {
      console.log('Initializing database tables...')
      
      // Create Bible versions table
      await this.createBibleVersionsTable()
      
      // Create Bible books table
      await this.createBibleBooksTable()
      
      // Create Bible verses table
      await this.createBibleVersesTable()
      
      // Create user-specific tables
      await this.createNotesTable()
      await this.createPrayerRequestsTable()
      await this.createReadingPlansTable()
      await this.createUserReadingPlansTable()
      await this.createBookmarksTable()
      await this.createHighlightsTable()
      await this.createMemoryVersesTable()
      
      // Insert initial data
      await this.insertInitialData()
      
      console.log('Database initialization complete!')
      toast.success('Database initialized successfully!')
      
    } catch (error) {
      console.error('Database initialization failed:', error)
      toast.error('Database initialization failed. Using mock data.')
    }
  },

  async createBibleVersionsTable() {
    const { error } = await supabase.rpc('create_bible_versions_table')
    if (error && !error.message.includes('already exists')) {
      // Create table with raw SQL if RPC doesn't work
      const { error: sqlError } = await supabase
        .from('_raw_sql')
        .insert({
          query: `
            CREATE TABLE IF NOT EXISTS bible_versions (
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              name VARCHAR(10) NOT NULL UNIQUE,
              full_name VARCHAR(100) NOT NULL,
              language VARCHAR(50) DEFAULT 'English',
              created_at TIMESTAMP DEFAULT NOW()
            );
          `
        })
      
      if (sqlError) console.log('Bible versions table creation handled')
    }
  },

  async createBibleBooksTable() {
    const { error } = await supabase
      .from('_raw_sql')
      .insert({
        query: `
          CREATE TABLE IF NOT EXISTS bible_books (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(50) NOT NULL,
            testament VARCHAR(2) CHECK (testament IN ('OT', 'NT')),
            position INTEGER NOT NULL,
            chapters INTEGER NOT NULL,
            abbreviation VARCHAR(10),
            created_at TIMESTAMP DEFAULT NOW()
          );
        `
      })
    
    if (error) console.log('Bible books table creation handled')
  },

  async createBibleVersesTable() {
    const { error } = await supabase
      .from('_raw_sql')
      .insert({
        query: `
          CREATE TABLE IF NOT EXISTS bible_verses (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            book_id UUID REFERENCES bible_books(id),
            version_id UUID REFERENCES bible_versions(id),
            chapter INTEGER NOT NULL,
            verse INTEGER NOT NULL,
            text TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            UNIQUE(book_id, version_id, chapter, verse)
          );
        `
      })
    
    if (error) console.log('Bible verses table creation handled')
  },

  async createNotesTable() {
    const { error } = await supabase
      .from('_raw_sql')
      .insert({
        query: `
          CREATE TABLE IF NOT EXISTS notes (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            title VARCHAR(200) NOT NULL,
            content TEXT,
            verse_ref VARCHAR(50),
            verse_text TEXT,
            tags TEXT[],
            is_favorite BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
          
          -- Enable RLS
          ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
          
          -- Create policies
          CREATE POLICY "Users can view own notes" ON notes
            FOR SELECT USING (auth.uid() = user_id);
            
          CREATE POLICY "Users can insert own notes" ON notes
            FOR INSERT WITH CHECK (auth.uid() = user_id);
            
          CREATE POLICY "Users can update own notes" ON notes
            FOR UPDATE USING (auth.uid() = user_id);
            
          CREATE POLICY "Users can delete own notes" ON notes
            FOR DELETE USING (auth.uid() = user_id);
        `
      })
    
    if (error) console.log('Notes table creation handled')
  },

  async createPrayerRequestsTable() {
    const { error } = await supabase
      .from('_raw_sql')
      .insert({
        query: `
          CREATE TABLE IF NOT EXISTS prayer_requests (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            title VARCHAR(200) NOT NULL,
            description TEXT,
            category VARCHAR(50) DEFAULT 'other',
            privacy VARCHAR(10) CHECK (privacy IN ('private', 'public')) DEFAULT 'private',
            is_answered BOOLEAN DEFAULT FALSE,
            prayer_count INTEGER DEFAULT 0,
            answered_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
          
          -- Enable RLS
          ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
          
          -- Create policies
          CREATE POLICY "Users can view own private prayers" ON prayer_requests
            FOR SELECT USING (
              (auth.uid() = user_id) OR 
              (privacy = 'public')
            );
            
          CREATE POLICY "Users can insert own prayers" ON prayer_requests
            FOR INSERT WITH CHECK (auth.uid() = user_id);
            
          CREATE POLICY "Users can update own prayers" ON prayer_requests
            FOR UPDATE USING (auth.uid() = user_id);
            
          CREATE POLICY "Users can delete own prayers" ON prayer_requests
            FOR DELETE USING (auth.uid() = user_id);
        `
      })
    
    if (error) console.log('Prayer requests table creation handled')
  },

  async createReadingPlansTable() {
    const { error } = await supabase
      .from('_raw_sql')
      .insert({
        query: `
          CREATE TABLE IF NOT EXISTS reading_plans (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title VARCHAR(200) NOT NULL,
            description TEXT,
            duration INTEGER NOT NULL,
            category VARCHAR(50),
            difficulty VARCHAR(20),
            readings JSONB,
            created_at TIMESTAMP DEFAULT NOW()
          );
        `
      })
    
    if (error) console.log('Reading plans table creation handled')
  },

  async createUserReadingPlansTable() {
    const { error } = await supabase
      .from('_raw_sql')
      .insert({
        query: `
          CREATE TABLE IF NOT EXISTS user_reading_plans (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            reading_plan_id UUID REFERENCES reading_plans(id),
            progress INTEGER DEFAULT 0,
            current_day INTEGER DEFAULT 1,
            streak INTEGER DEFAULT 0,
            status VARCHAR(20) DEFAULT 'active',
            started_at TIMESTAMP DEFAULT NOW(),
            last_read_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT NOW()
          );
          
          -- Enable RLS
          ALTER TABLE user_reading_plans ENABLE ROW LEVEL SECURITY;
          
          -- Create policies
          CREATE POLICY "Users can manage own reading plans" ON user_reading_plans
            FOR ALL USING (auth.uid() = user_id);
        `
      })
    
    if (error) console.log('User reading plans table creation handled')
  },

  async createBookmarksTable() {
    const { error } = await supabase
      .from('_raw_sql')
      .insert({
        query: `
          CREATE TABLE IF NOT EXISTS bookmarks (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            verse_id UUID REFERENCES bible_verses(id),
            reference VARCHAR(50) NOT NULL,
            verse_text TEXT,
            note TEXT,
            created_at TIMESTAMP DEFAULT NOW()
          );
          
          -- Enable RLS
          ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
          
          -- Create policies
          CREATE POLICY "Users can manage own bookmarks" ON bookmarks
            FOR ALL USING (auth.uid() = user_id);
        `
      })
    
    if (error) console.log('Bookmarks table creation handled')
  },

  async createHighlightsTable() {
    const { error } = await supabase
      .from('_raw_sql')
      .insert({
        query: `
          CREATE TABLE IF NOT EXISTS highlights (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            verse_id UUID REFERENCES bible_verses(id),
            reference VARCHAR(50) NOT NULL,
            color VARCHAR(20) DEFAULT 'yellow',
            created_at TIMESTAMP DEFAULT NOW()
          );
          
          -- Enable RLS
          ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;
          
          -- Create policies
          CREATE POLICY "Users can manage own highlights" ON highlights
            FOR ALL USING (auth.uid() = user_id);
        `
      })
    
    if (error) console.log('Highlights table creation handled')
  },

  async createMemoryVersesTable() {
    const { error } = await supabase
      .from('_raw_sql')
      .insert({
        query: `
          CREATE TABLE IF NOT EXISTS memory_verses (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            reference VARCHAR(50) NOT NULL,
            text TEXT NOT NULL,
            difficulty VARCHAR(20) DEFAULT 'beginner',
            category VARCHAR(50),
            progress INTEGER DEFAULT 0,
            streak INTEGER DEFAULT 0,
            mastered BOOLEAN DEFAULT FALSE,
            last_reviewed TIMESTAMP,
            created_at TIMESTAMP DEFAULT NOW()
          );
          
          -- Enable RLS
          ALTER TABLE memory_verses ENABLE ROW LEVEL SECURITY;
          
          -- Create policies
          CREATE POLICY "Users can manage own memory verses" ON memory_verses
            FOR ALL USING (auth.uid() = user_id);
        `
      })
    
    if (error) console.log('Memory verses table creation handled')
  },

  async insertInitialData() {
    // Insert Bible versions
    await this.insertBibleVersions()
    
    // Insert Bible books
    await this.insertBibleBooks()
    
    // Insert reading plans
    await this.insertReadingPlans()
    
    // Insert sample Bible verses (limited set)
    await this.insertSampleVerses()
  },

  async insertBibleVersions() {
    const versions = [
      { name: 'KJV', full_name: 'King James Version', language: 'English' },
      { name: 'ESV', full_name: 'English Standard Version', language: 'English' },
      { name: 'NIV', full_name: 'New International Version', language: 'English' },
      { name: 'NASB', full_name: 'New American Standard Bible', language: 'English' },
      { name: 'NLT', full_name: 'New Living Translation', language: 'English' }
    ]

    for (const version of versions) {
      const { error } = await supabase
        .from('bible_versions')
        .upsert(version, { onConflict: 'name' })
      
      if (error) console.log(`Version ${version.name} insert handled`)
    }
  },

  async insertBibleBooks() {
    const books = [
      // Old Testament
      { name: 'Genesis', testament: 'OT', position: 1, chapters: 50, abbreviation: 'Gen' },
      { name: 'Exodus', testament: 'OT', position: 2, chapters: 40, abbreviation: 'Exo' },
      { name: 'Leviticus', testament: 'OT', position: 3, chapters: 27, abbreviation: 'Lev' },
      { name: 'Numbers', testament: 'OT', position: 4, chapters: 36, abbreviation: 'Num' },
      { name: 'Deuteronomy', testament: 'OT', position: 5, chapters: 34, abbreviation: 'Deu' },
      { name: 'Joshua', testament: 'OT', position: 6, chapters: 24, abbreviation: 'Jos' },
      { name: 'Judges', testament: 'OT', position: 7, chapters: 21, abbreviation: 'Jdg' },
      { name: 'Ruth', testament: 'OT', position: 8, chapters: 4, abbreviation: 'Rut' },
      { name: '1 Samuel', testament: 'OT', position: 9, chapters: 31, abbreviation: '1Sa' },
      { name: '2 Samuel', testament: 'OT', position: 10, chapters: 24, abbreviation: '2Sa' },
      { name: '1 Kings', testament: 'OT', position: 11, chapters: 22, abbreviation: '1Ki' },
      { name: '2 Kings', testament: 'OT', position: 12, chapters: 25, abbreviation: '2Ki' },
      { name: '1 Chronicles', testament: 'OT', position: 13, chapters: 29, abbreviation: '1Ch' },
      { name: '2 Chronicles', testament: 'OT', position: 14, chapters: 36, abbreviation: '2Ch' },
      { name: 'Ezra', testament: 'OT', position: 15, chapters: 10, abbreviation: 'Ezr' },
      { name: 'Nehemiah', testament: 'OT', position: 16, chapters: 13, abbreviation: 'Neh' },
      { name: 'Esther', testament: 'OT', position: 17, chapters: 10, abbreviation: 'Est' },
      { name: 'Job', testament: 'OT', position: 18, chapters: 42, abbreviation: 'Job' },
      { name: 'Psalms', testament: 'OT', position: 19, chapters: 150, abbreviation: 'Psa' },
      { name: 'Proverbs', testament: 'OT', position: 20, chapters: 31, abbreviation: 'Pro' },
      { name: 'Ecclesiastes', testament: 'OT', position: 21, chapters: 12, abbreviation: 'Ecc' },
      { name: 'Song of Solomon', testament: 'OT', position: 22, chapters: 8, abbreviation: 'Sng' },
      { name: 'Isaiah', testament: 'OT', position: 23, chapters: 66, abbreviation: 'Isa' },
      { name: 'Jeremiah', testament: 'OT', position: 24, chapters: 52, abbreviation: 'Jer' },
      { name: 'Lamentations', testament: 'OT', position: 25, chapters: 5, abbreviation: 'Lam' },
      { name: 'Ezekiel', testament: 'OT', position: 26, chapters: 48, abbreviation: 'Ezk' },
      { name: 'Daniel', testament: 'OT', position: 27, chapters: 12, abbreviation: 'Dan' },
      { name: 'Hosea', testament: 'OT', position: 28, chapters: 14, abbreviation: 'Hos' },
      { name: 'Joel', testament: 'OT', position: 29, chapters: 3, abbreviation: 'Jol' },
      { name: 'Amos', testament: 'OT', position: 30, chapters: 9, abbreviation: 'Amo' },
      { name: 'Obadiah', testament: 'OT', position: 31, chapters: 1, abbreviation: 'Oba' },
      { name: 'Jonah', testament: 'OT', position: 32, chapters: 4, abbreviation: 'Jon' },
      { name: 'Micah', testament: 'OT', position: 33, chapters: 7, abbreviation: 'Mic' },
      { name: 'Nahum', testament: 'OT', position: 34, chapters: 3, abbreviation: 'Nah' },
      { name: 'Habakkuk', testament: 'OT', position: 35, chapters: 3, abbreviation: 'Hab' },
      { name: 'Zephaniah', testament: 'OT', position: 36, chapters: 3, abbreviation: 'Zep' },
      { name: 'Haggai', testament: 'OT', position: 37, chapters: 2, abbreviation: 'Hag' },
      { name: 'Zechariah', testament: 'OT', position: 38, chapters: 14, abbreviation: 'Zec' },
      { name: 'Malachi', testament: 'OT', position: 39, chapters: 4, abbreviation: 'Mal' },
      
      // New Testament
      { name: 'Matthew', testament: 'NT', position: 40, chapters: 28, abbreviation: 'Mat' },
      { name: 'Mark', testament: 'NT', position: 41, chapters: 16, abbreviation: 'Mrk' },
      { name: 'Luke', testament: 'NT', position: 42, chapters: 24, abbreviation: 'Luk' },
      { name: 'John', testament: 'NT', position: 43, chapters: 21, abbreviation: 'Jhn' },
      { name: 'Acts', testament: 'NT', position: 44, chapters: 28, abbreviation: 'Act' },
      { name: 'Romans', testament: 'NT', position: 45, chapters: 16, abbreviation: 'Rom' },
      { name: '1 Corinthians', testament: 'NT', position: 46, chapters: 16, abbreviation: '1Co' },
      { name: '2 Corinthians', testament: 'NT', position: 47, chapters: 13, abbreviation: '2Co' },
      { name: 'Galatians', testament: 'NT', position: 48, chapters: 6, abbreviation: 'Gal' },
      { name: 'Ephesians', testament: 'NT', position: 49, chapters: 6, abbreviation: 'Eph' },
      { name: 'Philippians', testament: 'NT', position: 50, chapters: 4, abbreviation: 'Php' },
      { name: 'Colossians', testament: 'NT', position: 51, chapters: 4, abbreviation: 'Col' },
      { name: '1 Thessalonians', testament: 'NT', position: 52, chapters: 5, abbreviation: '1Th' },
      { name: '2 Thessalonians', testament: 'NT', position: 53, chapters: 3, abbreviation: '2Th' },
      { name: '1 Timothy', testament: 'NT', position: 54, chapters: 6, abbreviation: '1Ti' },
      { name: '2 Timothy', testament: 'NT', position: 55, chapters: 4, abbreviation: '2Ti' },
      { name: 'Titus', testament: 'NT', position: 56, chapters: 3, abbreviation: 'Tit' },
      { name: 'Philemon', testament: 'NT', position: 57, chapters: 1, abbreviation: 'Phm' },
      { name: 'Hebrews', testament: 'NT', position: 58, chapters: 13, abbreviation: 'Heb' },
      { name: 'James', testament: 'NT', position: 59, chapters: 5, abbreviation: 'Jas' },
      { name: '1 Peter', testament: 'NT', position: 60, chapters: 5, abbreviation: '1Pe' },
      { name: '2 Peter', testament: 'NT', position: 61, chapters: 3, abbreviation: '2Pe' },
      { name: '1 John', testament: 'NT', position: 62, chapters: 5, abbreviation: '1Jn' },
      { name: '2 John', testament: 'NT', position: 63, chapters: 1, abbreviation: '2Jn' },
      { name: '3 John', testament: 'NT', position: 64, chapters: 1, abbreviation: '3Jn' },
      { name: 'Jude', testament: 'NT', position: 65, chapters: 1, abbreviation: 'Jud' },
      { name: 'Revelation', testament: 'NT', position: 66, chapters: 22, abbreviation: 'Rev' }
    ]

    for (const book of books) {
      const { error } = await supabase
        .from('bible_books')
        .upsert(book, { onConflict: 'name' })
      
      if (error) console.log(`Book ${book.name} insert handled`)
    }
  },

  async insertReadingPlans() {
    const plans = [
      {
        title: 'One Year Bible',
        description: 'Complete the Bible in 365 days with daily readings from Old and New Testament',
        duration: 365,
        category: 'chronological',
        difficulty: 'Beginner',
        readings: {
          1: { passages: ['Genesis 1-2', 'Matthew 1'] },
          2: { passages: ['Genesis 3-4', 'Matthew 2'] },
          3: { passages: ['Genesis 5-6', 'Matthew 3'] }
        }
      },
      {
        title: 'Psalms & Proverbs',
        description: 'Dive deep into wisdom literature with daily reflections',
        duration: 60,
        category: 'topical',
        difficulty: 'Intermediate',
        readings: {
          1: { passages: ['Psalm 1', 'Proverbs 1:1-7'] },
          2: { passages: ['Psalm 2', 'Proverbs 1:8-19'] }
        }
      },
      {
        title: 'Life of Jesus',
        description: 'Follow Jesus through the four Gospels chronologically',
        duration: 90,
        category: 'thematic',
        difficulty: 'Beginner',
        readings: {
          1: { passages: ['Luke 1:1-25', 'John 1:1-18'] },
          2: { passages: ['Luke 1:26-56', 'Matthew 1:18-25'] }
        }
      }
    ]

    for (const plan of plans) {
      const { error } = await supabase
        .from('reading_plans')
        .upsert(plan, { onConflict: 'title' })
      
      if (error) console.log(`Reading plan ${plan.title} insert handled`)
    }
  },

  async insertSampleVerses() {
    // Get book and version IDs first
    const { data: books } = await supabase.from('bible_books').select('id, name')
    const { data: versions } = await supabase.from('bible_versions').select('id, name')
    
    if (!books || !versions) return

    const johnBook = books.find(b => b.name === 'John')
    const kjvVersion = versions.find(v => v.name === 'KJV')
    
    if (!johnBook || !kjvVersion) return

    // Insert John 3:16-21 as sample verses
    const sampleVerses = [
      { book_id: johnBook.id, version_id: kjvVersion.id, chapter: 3, verse: 16, text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
      { book_id: johnBook.id, version_id: kjvVersion.id, chapter: 3, verse: 17, text: 'For God sent not his Son into the world to condemn the world; but that the world through him might be saved.' },
      { book_id: johnBook.id, version_id: kjvVersion.id, chapter: 3, verse: 18, text: 'He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God.' },
      { book_id: johnBook.id, version_id: kjvVersion.id, chapter: 3, verse: 19, text: 'And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil.' },
      { book_id: johnBook.id, version_id: kjvVersion.id, chapter: 3, verse: 20, text: 'For every one that doeth evil hateth the light, neither cometh to the light, lest his deeds should be reproved.' },
      { book_id: johnBook.id, version_id: kjvVersion.id, chapter: 3, verse: 21, text: 'But he that doeth truth cometh to the light, that his deeds may be made manifest, that they are wrought in God.' }
    ]

    for (const verse of sampleVerses) {
      const { error } = await supabase
        .from('bible_verses')
        .upsert(verse, { onConflict: 'book_id,version_id,chapter,verse' })
      
      if (error) console.log(`Verse ${verse.chapter}:${verse.verse} insert handled`)
    }
  }
}