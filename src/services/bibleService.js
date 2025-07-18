import supabase, { hasRealCredentials } from '../lib/supabase'
import bibleMockData from '../data/bibleMockData'

// Use real data when we have credentials, otherwise use mock data
const useRealData = hasRealCredentials

export const bibleService = {
  // Fetch available Bible versions
  async getVersions() {
    if (!useRealData) {
      return new Promise(resolve => {
        setTimeout(() => resolve(bibleMockData.versions), 100)
      })
    }

    try {
      const { data, error } = await supabase
        .from('bible_versions')
        .select('*')
        .order('name')

      if (error) throw error
      return data || []
    } catch (error) {
      console.warn('Failed to fetch versions from Supabase, using mock data:', error)
      return bibleMockData.versions
    }
  },

  // Fetch all Bible books
  async getBooks() {
    if (!useRealData) {
      return new Promise(resolve => {
        setTimeout(() => resolve(bibleMockData.books), 100)
      })
    }

    try {
      const { data, error } = await supabase
        .from('bible_books')
        .select('*')
        .order('position')

      if (error) throw error
      return data || []
    } catch (error) {
      console.warn('Failed to fetch books from Supabase, using mock data:', error)
      return bibleMockData.books
    }
  },

  // Fetch verses for a specific chapter
  async getChapter(bookId, chapter, versionId) {
    if (!useRealData) {
      // Return mock verses based on book and chapter
      const book = bibleMockData.books.find(b => b.id === bookId)
      if (!book) return []

      const bookName = book.name.toLowerCase()
      const chapterKey = `${bookName.replace(/\s+/g, '')}_${chapter}`

      return new Promise(resolve => {
        setTimeout(() => {
          const verses = bibleMockData.verses[chapterKey]
          if (!verses) {
            // Generate placeholder verses
            const generatedVerses = this.generateVerses(bookId, chapter, book.testament === 'OT' ? 25 : 30)
            resolve(generatedVerses)
          } else {
            resolve(verses)
          }
        }, 200)
      })
    }

    try {
      const { data, error } = await supabase
        .from('bible_verses')
        .select(`
          id,
          chapter,
          verse,
          text,
          bible_books!inner(name, testament)
        `)
        .eq('book_id', bookId)
        .eq('chapter', chapter)
        .eq('version_id', versionId)
        .order('verse')

      if (error) throw error
      
      // If no verses found in database, return mock data
      if (!data || data.length === 0) {
        const book = bibleMockData.books.find(b => b.id === bookId)
        if (book) {
          return this.generateVerses(bookId, chapter, book.testament === 'OT' ? 25 : 30)
        }
      }
      
      return data || []
    } catch (error) {
      console.warn('Failed to fetch chapter from Supabase, using mock data:', error)
      // Return mock data as fallback
      const book = bibleMockData.books.find(b => b.id === bookId)
      if (book) {
        const bookName = book.name.toLowerCase().replace(/\s+/g, '')
        const chapterKey = `${bookName}_${chapter}`
        const verses = bibleMockData.verses[chapterKey]
        if (verses) return verses
        return this.generateVerses(bookId, chapter)
      }
      return []
    }
  },

  // Generate placeholder verses when real data isn't available
  generateVerses(bookId, chapter, count = 30) {
    const book = bibleMockData.books.find(b => b.id === bookId)
    if (!book) return []

    const verses = []
    for (let i = 1; i <= count; i++) {
      verses.push({
        id: `${bookId}_${chapter}_${i}`,
        chapter: chapter,
        verse: i,
        text: `This is ${book.name} chapter ${chapter} verse ${i}. The complete Bible text will be available when connected to a Bible API or database with full scripture content.`
      })
    }
    return verses
  },

  // Search verses
  async searchVerses(query, versionId) {
    if (!useRealData) {
      return new Promise(resolve => {
        setTimeout(() => {
          // Search in popular verses and mock data
          const popularResults = bibleMockData.popularVerses.filter(verse =>
            verse.text.toLowerCase().includes(query.toLowerCase()) ||
            verse.reference.toLowerCase().includes(query.toLowerCase())
          )

          const allVerses = []
          Object.values(bibleMockData.verses).forEach(verseSet => {
            verseSet.forEach(verse => {
              if (verse.text.toLowerCase().includes(query.toLowerCase())) {
                const bookKey = Object.keys(bibleMockData.verses).find(key =>
                  bibleMockData.verses[key].some(v => v.id === verse.id)
                )
                const bookName = bookKey ? bookKey.split('_')[0] : 'Unknown'
                allVerses.push({
                  ...verse,
                  reference: `${bookName.charAt(0).toUpperCase() + bookName.slice(1)} ${verse.chapter}:${verse.verse}`
                })
              }
            })
          })

          const combinedResults = [...popularResults, ...allVerses]
          resolve(combinedResults.slice(0, 20))
        }, 300)
      })
    }

    try {
      const { data, error } = await supabase
        .from('bible_verses')
        .select(`
          id,
          chapter,
          verse,
          text,
          bible_books!inner(name)
        `)
        .eq('version_id', versionId)
        .textSearch('text', query)
        .limit(50)

      if (error) throw error
      
      // Format the results
      const formattedResults = (data || []).map(verse => ({
        ...verse,
        reference: `${verse.bible_books.name} ${verse.chapter}:${verse.verse}`
      }))
      
      return formattedResults
    } catch (error) {
      console.warn('Failed to search verses from Supabase:', error)
      return []
    }
  },

  // Get verse by reference
  async getVerseByReference(reference, versionId) {
    const parsedRef = this.parseReference(reference)
    if (!parsedRef) {
      console.warn('Invalid reference format:', reference)
      return null
    }

    const { book, chapter, verse, endVerse } = parsedRef

    if (!useRealData) {
      return new Promise(resolve => {
        setTimeout(() => {
          const bookObj = bibleMockData.books.find(b =>
            b.name.toLowerCase() === book.toLowerCase() ||
            b.abbreviation.toLowerCase() === book.toLowerCase()
          )

          if (!bookObj) {
            resolve(null)
            return
          }

          const bookName = bookObj.name.toLowerCase().replace(/\s+/g, '')
          const chapterKey = `${bookName}_${chapter}`
          const verses = bibleMockData.verses[chapterKey]

          if (!verses) {
            const generatedVerses = this.generateVerses(bookObj.id, chapter)
            if (!verse) {
              resolve(generatedVerses)
            } else if (endVerse) {
              resolve(generatedVerses.filter(v => v.verse >= verse && v.verse <= endVerse))
            } else {
              resolve(generatedVerses.find(v => v.verse === verse) || null)
            }
          } else {
            if (!verse) {
              resolve(verses)
            } else if (endVerse) {
              resolve(verses.filter(v => v.verse >= verse && v.verse <= endVerse))
            } else {
              resolve(verses.find(v => v.verse === verse) || null)
            }
          }
        }, 200)
      })
    }

    try {
      let query = supabase
        .from('bible_verses')
        .select(`
          id,
          chapter,
          verse,
          text,
          bible_books!inner(name)
        `)
        .eq('bible_books.name', book)
        .eq('chapter', chapter)
        .eq('version_id', versionId)

      if (verse) {
        if (endVerse) {
          query = query.gte('verse', verse).lte('verse', endVerse)
        } else {
          query = query.eq('verse', verse)
        }
      }

      const { data, error } = await query.order('verse')

      if (error) throw error
      return verse && !endVerse ? data[0] || null : data || []
    } catch (error) {
      console.warn('Failed to get verse by reference from Supabase:', error)
      return null
    }
  },

  // Get daily verse
  async getDailyVerse() {
    if (!useRealData) {
      return new Promise(resolve => {
        const today = new Date()
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
        const verseIndex = dayOfYear % bibleMockData.popularVerses.length
        setTimeout(() => {
          resolve(bibleMockData.popularVerses[verseIndex])
        }, 100)
      })
    }

    try {
      // Try to get from daily verses table first
      const today = new Date().toISOString().split('T')[0]
      const { data: dailyVerse, error: dailyError } = await supabase
        .from('daily_verses')
        .select('*')
        .eq('date', today)
        .single()

      if (!dailyError && dailyVerse) {
        return dailyVerse
      }

      // Fallback to a popular verse
      const randomIndex = Math.floor(Math.random() * bibleMockData.popularVerses.length)
      return bibleMockData.popularVerses[randomIndex]
    } catch (error) {
      console.warn('Failed to get daily verse from Supabase:', error)
      const randomIndex = Math.floor(Math.random() * bibleMockData.popularVerses.length)
      return bibleMockData.popularVerses[randomIndex]
    }
  },

  // Parse Bible reference string
  parseReference(reference) {
    try {
      const match = reference.match(/^(\d?\s?[A-Za-z]+)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/)
      if (!match) return null

      return {
        book: match[1].trim(),
        chapter: parseInt(match[2]),
        verse: match[3] ? parseInt(match[3]) : null,
        endVerse: match[4] ? parseInt(match[4]) : null
      }
    } catch (error) {
      console.error('Error parsing reference:', error)
      return null
    }
  }
}