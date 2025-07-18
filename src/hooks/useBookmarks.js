import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import supabase, { hasRealCredentials } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchBookmarks()
    } else {
      setBookmarks([])
      setIsLoading(false)
    }
  }, [user])

  const fetchBookmarks = async () => {
    if (!hasRealCredentials) {
      // Use mock data
      setBookmarks([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setBookmarks(data || [])
    } catch (err) {
      console.error('Error fetching bookmarks:', err)
      setError('Failed to load bookmarks')
    } finally {
      setIsLoading(false)
    }
  }

  const addBookmark = async (bookmark) => {
    if (!hasRealCredentials) {
      // Mock success
      const mockBookmark = {
        id: Date.now().toString(),
        ...bookmark,
        user_id: user.id,
        created_at: new Date().toISOString()
      }
      setBookmarks(prev => [mockBookmark, ...prev])
      toast.success('Bookmark added successfully (mock mode)')
      return { success: true, data: mockBookmark }
    }

    try {
      const newBookmark = {
        ...bookmark,
        user_id: user.id,
        created_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('bookmarks')
        .insert(newBookmark)
        .select()
        .single()

      if (error) throw error

      setBookmarks(prev => [data, ...prev])
      toast.success('Bookmark added successfully')
      return { success: true, data }
    } catch (err) {
      console.error('Error adding bookmark:', err)
      toast.error('Failed to add bookmark')
      return { success: false, error: err }
    }
  }

  const removeBookmark = async (id) => {
    if (!hasRealCredentials) {
      // Mock success
      setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id))
      toast.success('Bookmark removed successfully (mock mode)')
      return { success: true }
    }

    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', id)

      if (error) throw error

      setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id))
      toast.success('Bookmark removed successfully')
      return { success: true }
    } catch (err) {
      console.error('Error removing bookmark:', err)
      toast.error('Failed to remove bookmark')
      return { success: false, error: err }
    }
  }

  const isBookmarked = (reference) => {
    return bookmarks.some(bookmark => bookmark.reference === reference)
  }

  return {
    bookmarks,
    isLoading,
    error,
    fetchBookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked
  }
}