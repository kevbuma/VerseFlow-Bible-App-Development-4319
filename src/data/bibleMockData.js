// Complete mock Bible data for offline use
// This file provides a comprehensive dataset of Bible content

const bibleMockData = {
  // Bible versions available in the app
  versions: [
    { id: '1', name: 'KJV', full_name: 'King James Version', language: 'English' },
    { id: '2', name: 'ESV', full_name: 'English Standard Version', language: 'English' },
    { id: '3', name: 'NIV', full_name: 'New International Version', language: 'English' },
    { id: '4', name: 'NASB', full_name: 'New American Standard Bible', language: 'English' },
    { id: '5', name: 'NLT', full_name: 'New Living Translation', language: 'English' }
  ],
  
  // Complete list of Bible books with chapter counts
  books: [
    // Old Testament
    { id: '1', name: 'Genesis', testament: 'OT', position: 1, chapters: 50, abbreviation: 'Gen' },
    { id: '2', name: 'Exodus', testament: 'OT', position: 2, chapters: 40, abbreviation: 'Exo' },
    { id: '3', name: 'Leviticus', testament: 'OT', position: 3, chapters: 27, abbreviation: 'Lev' },
    { id: '4', name: 'Numbers', testament: 'OT', position: 4, chapters: 36, abbreviation: 'Num' },
    { id: '5', name: 'Deuteronomy', testament: 'OT', position: 5, chapters: 34, abbreviation: 'Deu' },
    { id: '6', name: 'Joshua', testament: 'OT', position: 6, chapters: 24, abbreviation: 'Jos' },
    { id: '7', name: 'Judges', testament: 'OT', position: 7, chapters: 21, abbreviation: 'Jdg' },
    { id: '8', name: 'Ruth', testament: 'OT', position: 8, chapters: 4, abbreviation: 'Rut' },
    { id: '9', name: '1 Samuel', testament: 'OT', position: 9, chapters: 31, abbreviation: '1Sa' },
    { id: '10', name: '2 Samuel', testament: 'OT', position: 10, chapters: 24, abbreviation: '2Sa' },
    { id: '11', name: '1 Kings', testament: 'OT', position: 11, chapters: 22, abbreviation: '1Ki' },
    { id: '12', name: '2 Kings', testament: 'OT', position: 12, chapters: 25, abbreviation: '2Ki' },
    { id: '13', name: '1 Chronicles', testament: 'OT', position: 13, chapters: 29, abbreviation: '1Ch' },
    { id: '14', name: '2 Chronicles', testament: 'OT', position: 14, chapters: 36, abbreviation: '2Ch' },
    { id: '15', name: 'Ezra', testament: 'OT', position: 15, chapters: 10, abbreviation: 'Ezr' },
    { id: '16', name: 'Nehemiah', testament: 'OT', position: 16, chapters: 13, abbreviation: 'Neh' },
    { id: '17', name: 'Esther', testament: 'OT', position: 17, chapters: 10, abbreviation: 'Est' },
    { id: '18', name: 'Job', testament: 'OT', position: 18, chapters: 42, abbreviation: 'Job' },
    { id: '19', name: 'Psalms', testament: 'OT', position: 19, chapters: 150, abbreviation: 'Psa' },
    { id: '20', name: 'Proverbs', testament: 'OT', position: 20, chapters: 31, abbreviation: 'Pro' },
    { id: '21', name: 'Ecclesiastes', testament: 'OT', position: 21, chapters: 12, abbreviation: 'Ecc' },
    { id: '22', name: 'Song of Solomon', testament: 'OT', position: 22, chapters: 8, abbreviation: 'Sng' },
    { id: '23', name: 'Isaiah', testament: 'OT', position: 23, chapters: 66, abbreviation: 'Isa' },
    { id: '24', name: 'Jeremiah', testament: 'OT', position: 24, chapters: 52, abbreviation: 'Jer' },
    { id: '25', name: 'Lamentations', testament: 'OT', position: 25, chapters: 5, abbreviation: 'Lam' },
    { id: '26', name: 'Ezekiel', testament: 'OT', position: 26, chapters: 48, abbreviation: 'Ezk' },
    { id: '27', name: 'Daniel', testament: 'OT', position: 27, chapters: 12, abbreviation: 'Dan' },
    { id: '28', name: 'Hosea', testament: 'OT', position: 28, chapters: 14, abbreviation: 'Hos' },
    { id: '29', name: 'Joel', testament: 'OT', position: 29, chapters: 3, abbreviation: 'Jol' },
    { id: '30', name: 'Amos', testament: 'OT', position: 30, chapters: 9, abbreviation: 'Amo' },
    { id: '31', name: 'Obadiah', testament: 'OT', position: 31, chapters: 1, abbreviation: 'Oba' },
    { id: '32', name: 'Jonah', testament: 'OT', position: 32, chapters: 4, abbreviation: 'Jon' },
    { id: '33', name: 'Micah', testament: 'OT', position: 33, chapters: 7, abbreviation: 'Mic' },
    { id: '34', name: 'Nahum', testament: 'OT', position: 34, chapters: 3, abbreviation: 'Nah' },
    { id: '35', name: 'Habakkuk', testament: 'OT', position: 35, chapters: 3, abbreviation: 'Hab' },
    { id: '36', name: 'Zephaniah', testament: 'OT', position: 36, chapters: 3, abbreviation: 'Zep' },
    { id: '37', name: 'Haggai', testament: 'OT', position: 37, chapters: 2, abbreviation: 'Hag' },
    { id: '38', name: 'Zechariah', testament: 'OT', position: 38, chapters: 14, abbreviation: 'Zec' },
    { id: '39', name: 'Malachi', testament: 'OT', position: 39, chapters: 4, abbreviation: 'Mal' },
    
    // New Testament
    { id: '40', name: 'Matthew', testament: 'NT', position: 40, chapters: 28, abbreviation: 'Mat' },
    { id: '41', name: 'Mark', testament: 'NT', position: 41, chapters: 16, abbreviation: 'Mrk' },
    { id: '42', name: 'Luke', testament: 'NT', position: 42, chapters: 24, abbreviation: 'Luk' },
    { id: '43', name: 'John', testament: 'NT', position: 43, chapters: 21, abbreviation: 'Jhn' },
    { id: '44', name: 'Acts', testament: 'NT', position: 44, chapters: 28, abbreviation: 'Act' },
    { id: '45', name: 'Romans', testament: 'NT', position: 45, chapters: 16, abbreviation: 'Rom' },
    { id: '46', name: '1 Corinthians', testament: 'NT', position: 46, chapters: 16, abbreviation: '1Co' },
    { id: '47', name: '2 Corinthians', testament: 'NT', position: 47, chapters: 13, abbreviation: '2Co' },
    { id: '48', name: 'Galatians', testament: 'NT', position: 48, chapters: 6, abbreviation: 'Gal' },
    { id: '49', name: 'Ephesians', testament: 'NT', position: 49, chapters: 6, abbreviation: 'Eph' },
    { id: '50', name: 'Philippians', testament: 'NT', position: 50, chapters: 4, abbreviation: 'Php' },
    { id: '51', name: 'Colossians', testament: 'NT', position: 51, chapters: 4, abbreviation: 'Col' },
    { id: '52', name: '1 Thessalonians', testament: 'NT', position: 52, chapters: 5, abbreviation: '1Th' },
    { id: '53', name: '2 Thessalonians', testament: 'NT', position: 53, chapters: 3, abbreviation: '2Th' },
    { id: '54', name: '1 Timothy', testament: 'NT', position: 54, chapters: 6, abbreviation: '1Ti' },
    { id: '55', name: '2 Timothy', testament: 'NT', position: 55, chapters: 4, abbreviation: '2Ti' },
    { id: '56', name: 'Titus', testament: 'NT', position: 56, chapters: 3, abbreviation: 'Tit' },
    { id: '57', name: 'Philemon', testament: 'NT', position: 57, chapters: 1, abbreviation: 'Phm' },
    { id: '58', name: 'Hebrews', testament: 'NT', position: 58, chapters: 13, abbreviation: 'Heb' },
    { id: '59', name: 'James', testament: 'NT', position: 59, chapters: 5, abbreviation: 'Jas' },
    { id: '60', name: '1 Peter', testament: 'NT', position: 60, chapters: 5, abbreviation: '1Pe' },
    { id: '61', name: '2 Peter', testament: 'NT', position: 61, chapters: 3, abbreviation: '2Pe' },
    { id: '62', name: '1 John', testament: 'NT', position: 62, chapters: 5, abbreviation: '1Jn' },
    { id: '63', name: '2 John', testament: 'NT', position: 63, chapters: 1, abbreviation: '2Jn' },
    { id: '64', name: '3 John', testament: 'NT', position: 64, chapters: 1, abbreviation: '3Jn' },
    { id: '65', name: 'Jude', testament: 'NT', position: 65, chapters: 1, abbreviation: 'Jud' },
    { id: '66', name: 'Revelation', testament: 'NT', position: 66, chapters: 22, abbreviation: 'Rev' }
  ],
  
  // Map to store verse data - expanded with more complete content for commonly accessed passages
  verses: {
    // Genesis 1 - Creation
    'genesis_1': [
      { id: 1, chapter: 1, verse: 1, text: 'In the beginning God created the heaven and the earth.' },
      { id: 2, chapter: 1, verse: 2, text: 'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.' },
      { id: 3, chapter: 1, verse: 3, text: 'And God said, Let there be light: and there was light.' },
      { id: 4, chapter: 1, verse: 4, text: 'And God saw the light, that it was good: and God divided the light from the darkness.' },
      { id: 5, chapter: 1, verse: 5, text: 'And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.' },
      { id: 6, chapter: 1, verse: 6, text: 'And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.' },
      { id: 7, chapter: 1, verse: 7, text: 'And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.' },
      { id: 8, chapter: 1, verse: 8, text: 'And God called the firmament Heaven. And the evening and the morning were the second day.' },
      { id: 9, chapter: 1, verse: 9, text: 'And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.' },
      { id: 10, chapter: 1, verse: 10, text: 'And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.' },
      // Remaining verses would continue...
    ],
    
    // John 3 - God's Love
    'john_3': [
      { id: 1, chapter: 3, verse: 1, text: 'There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:' },
      { id: 2, chapter: 3, verse: 2, text: 'The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him.' },
      { id: 3, chapter: 3, verse: 3, text: 'Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God.' },
      { id: 4, chapter: 3, verse: 4, text: 'Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother\'s womb, and be born?' },
      { id: 5, chapter: 3, verse: 5, text: 'Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.' },
      // More verses...
      { id: 14, chapter: 3, verse: 14, text: 'And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up:' },
      { id: 15, chapter: 3, verse: 15, text: 'That whosoever believeth in him should not perish, but have eternal life.' },
      { id: 16, chapter: 3, verse: 16, text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
      { id: 17, chapter: 3, verse: 17, text: 'For God sent not his Son into the world to condemn the world; but that the world through him might be saved.' },
      { id: 18, chapter: 3, verse: 18, text: 'He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God.' },
      { id: 19, chapter: 3, verse: 19, text: 'And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil.' },
      { id: 20, chapter: 3, verse: 20, text: 'For every one that doeth evil hateth the light, neither cometh to the light, lest his deeds should be reproved.' },
      { id: 21, chapter: 3, verse: 21, text: 'But he that doeth truth cometh to the light, that his deeds may be made manifest, that they are wrought in God.' }
    ],
    
    // Psalm 23 - The Shepherd Psalm
    'psalms_23': [
      { id: 1, chapter: 23, verse: 1, text: 'The LORD is my shepherd; I shall not want.' },
      { id: 2, chapter: 23, verse: 2, text: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.' },
      { id: 3, chapter: 23, verse: 3, text: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name\'s sake.' },
      { id: 4, chapter: 23, verse: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.' },
      { id: 5, chapter: 23, verse: 5, text: 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.' },
      { id: 6, chapter: 23, verse: 6, text: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.' }
    ],
    
    // Matthew 5 - The Sermon on the Mount (Beatitudes)
    'matthew_5': [
      { id: 1, chapter: 5, verse: 1, text: 'And seeing the multitudes, he went up into a mountain: and when he was set, his disciples came unto him:' },
      { id: 2, chapter: 5, verse: 2, text: 'And he opened his mouth, and taught them, saying,' },
      { id: 3, chapter: 5, verse: 3, text: 'Blessed are the poor in spirit: for theirs is the kingdom of heaven.' },
      { id: 4, chapter: 5, verse: 4, text: 'Blessed are they that mourn: for they shall be comforted.' },
      { id: 5, chapter: 5, verse: 5, text: 'Blessed are the meek: for they shall inherit the earth.' },
      { id: 6, chapter: 5, verse: 6, text: 'Blessed are they which do hunger and thirst after righteousness: for they shall be filled.' },
      { id: 7, chapter: 5, verse: 7, text: 'Blessed are the merciful: for they shall obtain mercy.' },
      { id: 8, chapter: 5, verse: 8, text: 'Blessed are the pure in heart: for they shall see God.' },
      { id: 9, chapter: 5, verse: 9, text: 'Blessed are the peacemakers: for they shall be called the children of God.' },
      { id: 10, chapter: 5, verse: 10, text: 'Blessed are they which are persecuted for righteousness\' sake: for theirs is the kingdom of heaven.' },
      { id: 11, chapter: 5, verse: 11, text: 'Blessed are ye, when men shall revile you, and persecute you, and shall say all manner of evil against you falsely, for my sake.' },
      { id: 12, chapter: 5, verse: 12, text: 'Rejoice, and be exceeding glad: for great is your reward in heaven: for so persecuted they the prophets which were before you.' },
      // Additional verses would continue...
    ],
    
    // Romans 8 - Life in the Spirit
    'romans_8': [
      { id: 1, chapter: 8, verse: 1, text: 'There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.' },
      // More verses...
      { id: 28, chapter: 8, verse: 28, text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.' },
      { id: 29, chapter: 8, verse: 29, text: 'For whom he did foreknow, he also did predestinate to be conformed to the image of his Son, that he might be the firstborn among many brethren.' },
      { id: 30, chapter: 8, verse: 30, text: 'Moreover whom he did predestinate, them he also called: and whom he called, them he also justified: and whom he justified, them he also glorified.' },
      { id: 31, chapter: 8, verse: 31, text: 'What shall we then say to these things? If God be for us, who can be against us?' },
      { id: 32, chapter: 8, verse: 32, text: 'He that spared not his own Son, but delivered him up for us all, how shall he not with him also freely give us all things?' },
      { id: 33, chapter: 8, verse: 33, text: 'Who shall lay any thing to the charge of God\'s elect? It is God that justifieth.' },
      { id: 34, chapter: 8, verse: 34, text: 'Who is he that condemneth? It is Christ that died, yea rather, that is risen again, who is even at the right hand of God, who also maketh intercession for us.' },
      { id: 35, chapter: 8, verse: 35, text: 'Who shall separate us from the love of Christ? shall tribulation, or distress, or persecution, or famine, or nakedness, or peril, or sword?' },
      { id: 36, chapter: 8, verse: 36, text: 'As it is written, For thy sake we are killed all the day long; we are accounted as sheep for the slaughter.' },
      { id: 37, chapter: 8, verse: 37, text: 'Nay, in all these things we are more than conquerors through him that loved us.' },
      { id: 38, chapter: 8, verse: 38, text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,' },
      { id: 39, chapter: 8, verse: 39, text: 'Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.' }
    ],
    
    // Philippians 4 - Rejoice in the Lord
    'philippians_4': [
      { id: 1, chapter: 4, verse: 1, text: 'Therefore, my brethren dearly beloved and longed for, my joy and crown, so stand fast in the Lord, my dearly beloved.' },
      // More verses...
      { id: 4, chapter: 4, verse: 4, text: 'Rejoice in the Lord always: and again I say, Rejoice.' },
      { id: 5, chapter: 4, verse: 5, text: 'Let your moderation be known unto all men. The Lord is at hand.' },
      { id: 6, chapter: 4, verse: 6, text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.' },
      { id: 7, chapter: 4, verse: 7, text: 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.' },
      { id: 8, chapter: 4, verse: 8, text: 'Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things.' },
      // More verses...
      { id: 13, chapter: 4, verse: 13, text: 'I can do all things through Christ which strengtheneth me.' }
    ],
    
    // Popular passages for Memory Verses
    'isaiah_40': [
      // Isaiah 40:28-31
      { id: 28, chapter: 40, verse: 28, text: 'Hast thou not known? hast thou not heard, that the everlasting God, the LORD, the Creator of the ends of the earth, fainteth not, neither is weary? there is no searching of his understanding.' },
      { id: 29, chapter: 40, verse: 29, text: 'He giveth power to the faint; and to them that have no might he increaseth strength.' },
      { id: 30, chapter: 40, verse: 30, text: 'Even the youths shall faint and be weary, and the young men shall utterly fall:' },
      { id: 31, chapter: 40, verse: 31, text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.' }
    ],
    
    'jeremiah_29': [
      // Jeremiah 29:11-13
      { id: 11, chapter: 29, verse: 11, text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.' },
      { id: 12, chapter: 29, verse: 12, text: 'Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you.' },
      { id: 13, chapter: 29, verse: 13, text: 'And ye shall seek me, and find me, when ye shall search for me with all your heart.' }
    ]
  },
  
  // Add popular verses for verse of the day and quick access
  popularVerses: [
    { reference: 'John 3:16', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
    { reference: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.' },
    { reference: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.' },
    { reference: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.' },
    { reference: 'Psalm 23:1', text: 'The LORD is my shepherd; I shall not want.' },
    { reference: 'Proverbs 3:5-6', text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.' },
    { reference: 'Isaiah 40:31', text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.' },
    { reference: '1 Corinthians 13:4', text: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up.' },
    { reference: 'Galatians 5:22-23', text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance: against such there is no law.' },
    { reference: 'Matthew 28:19-20', text: 'Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you always, even unto the end of the world. Amen.' }
  ],
  
  // Reading plans data
  readingPlans: {
    // Plan templates
    plans: [
      {
        id: '1',
        title: 'One Year Bible',
        description: 'Complete the Bible in 365 days with daily readings from Old and New Testament',
        duration: 365,
        category: 'chronological',
        difficulty: 'Beginner',
        readings: [
          { day: 1, passages: ['Genesis 1-2', 'Matthew 1'] },
          { day: 2, passages: ['Genesis 3-4', 'Matthew 2'] },
          { day: 3, passages: ['Genesis 5-6', 'Matthew 3'] },
          // And so on for 365 days...
        ]
      },
      {
        id: '2',
        title: 'Psalms & Proverbs',
        description: 'Dive deep into wisdom literature with daily reflections',
        duration: 60,
        category: 'topical',
        difficulty: 'Intermediate',
        readings: [
          { day: 1, passages: ['Psalm 1', 'Proverbs 1:1-7'] },
          { day: 2, passages: ['Psalm 2', 'Proverbs 1:8-19'] },
          // And so on...
        ]
      },
      {
        id: '3',
        title: 'Life of Jesus',
        description: 'Follow Jesus through the four Gospels chronologically',
        duration: 90,
        category: 'thematic',
        difficulty: 'Beginner',
        readings: [
          { day: 1, passages: ['Luke 1:1-25', 'John 1:1-18'] },
          { day: 2, passages: ['Luke 1:26-56', 'Matthew 1:18-25'] },
          // And so on...
        ]
      },
      {
        id: '4',
        title: 'Paul\'s Letters',
        description: 'Study the apostle Paul\'s epistles with historical context',
        duration: 45,
        category: 'topical',
        difficulty: 'Advanced',
        readings: [
          { day: 1, passages: ['Acts 9:1-31', 'Galatians 1:1-10'] },
          { day: 2, passages: ['Galatians 1:11-24', 'Acts 11:19-30'] },
          // And so on...
        ]
      },
      {
        id: '5',
        title: '30 Days with Jesus',
        description: 'Focus on the teachings and life of Jesus for a month',
        duration: 30,
        category: 'thematic',
        difficulty: 'Beginner',
        readings: [
          { day: 1, passages: ['Luke 1:1-25', 'John 1:1-18'] },
          { day: 2, passages: ['Matthew 1:18-25', 'Luke 2:1-20'] },
          // And so on...
        ]
      }
    ]
  },
  
  // Devotionals data
  devotionals: [
    {
      date: 'January 15, 2024',
      title: 'Walking in His Light',
      verse: '1 John 1:7',
      verseText: 'But if we walk in the light, as he is in the light, we have fellowship with one another, and the blood of Jesus his Son cleanses us from all sin.',
      content: `Light has always been a powerful symbol in Scripture. From the very beginning, when God said "Let there be light," to Jesus declaring "I am the light of the world," light represents truth, purity, and divine presence.

John reminds us that walking in God's light isn't just about moral behavior—it's about authentic relationship. When we live transparently before God, acknowledging our need for His grace, we experience true fellowship both with Him and with other believers.

This light exposes our sin, but it also provides the remedy. The blood of Jesus cleanses us from all unrighteousness. We don't have to hide in the shadows of shame or pretend to be perfect. Instead, we can walk confidently in His light, knowing that His love covers our failures.

Today, ask yourself: Are there areas of your life where you're hiding from God's light? Remember, He doesn't shine His light to condemn, but to heal and restore. Step into His light today and experience the freedom that comes from walking in truth.`,
      reflectionQuestion: 'What does it mean to "walk in the light" in your daily life? How can you be more transparent with God and others today?',
      prayer: 'Heavenly Father, thank You for being the light that guides my path. Help me to walk in Your light today, not hiding from You but drawing near in honesty and faith. Cleanse me from all sin and help me to live in authentic fellowship with You and others. In Jesus\' name, Amen.',
      audioUrl: '/audio/devotional-jan-15.mp3'
    },
    {
      date: 'January 14, 2024',
      title: 'Trusting in His Timing',
      verse: 'Ecclesiastes 3:1',
      verseText: 'To every thing there is a season, and a time to every purpose under the heaven.',
      content: `God's timing is perfect, even when we can't see the bigger picture. In a world that values instant results, waiting can be one of the hardest spiritual disciplines. Yet throughout Scripture, we see that God often works in seasons and appointed times.

Abraham waited 25 years for the promised son. Joseph spent years in prison before his elevation. Moses spent 40 years in the wilderness before his calling. David was anointed king long before he took the throne.

What seems like delay to us is often God's purposeful preparation. He is working behind the scenes, aligning circumstances, preparing hearts (including our own), and establishing the perfect conditions for His purposes to unfold.

When we struggle with God's timing, we can remember that He exists outside of time. He sees the end from the beginning and works all things according to His perfect wisdom. Our impatience often stems from our limited perspective.

Today, consider what you're waiting for. Can you trust that God's timing is perfect? Can you embrace this current season, knowing it has purpose?`,
      reflectionQuestion: 'What are you currently waiting for in your life? How might God be using this season of waiting to prepare you?',
      prayer: 'Lord, help me to trust Your perfect timing. When I grow impatient, remind me that You are working all things together for good. Give me grace to embrace this current season and to see Your hand at work even in the waiting. In Jesus\' name, Amen.',
      audioUrl: '/audio/devotional-jan-14.mp3'
    }
  ]
};

export default bibleMockData;