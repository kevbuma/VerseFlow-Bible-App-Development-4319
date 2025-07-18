import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import supabase, { hasRealCredentials } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function useMemoryVerses() {
  const [memoryVerses, setMemoryVerses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchMemoryVerses()
    } else {
      setMemoryVerses([])
      setIsLoading(false)
    }
  }, [user])

  const fetchMemoryVerses = async () => {
    if (!hasRealCredentials) {
      // Use mock data
      const mockVerses = [
        {
          id: 1,
          reference: 'John 3:16',
          text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
          difficulty: 'beginner',
          category: 'salvation',
          progress: 100,
          last_reviewed: '2024-01-15',
          streak: 5,
          mastered: true
        },
        {
          id: 2,
          reference: 'Philippians 4:13',
          text: 'I can do all things through Christ which strengtheneth me.',
          difficulty: 'beginner',
          category: 'strength',
          progress: 85,
          last_reviewed: '2024-01-14',
          streak: 3,
          mastered: false
        }
      ]
      setMemoryVerses(mockVerses)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('memory_verses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setMemoryVerses(data || [])
    } catch (err) {
      console.error('Error fetching memory verses:', err)
      setError('Failed to load memory verses')
      toast.error('Failed to load memory verses')
    } finally {
      setIsLoading(false)
    }
  }

  const addMemoryVerse = async (verse) => {
    if (!hasRealCredentials) {
      // Mock success
      const mockVerse = {
        id: Date.now(),
        ...verse,
        user_id: user.id,
        progress: 0,
        streak: 0,
        mastered: false,
        created_at: new Date().toISOString()
      }
      setMemoryVerses(prev => [mockVerse, ...prev])
      toast.success('Memory verse added successfully (mock mode)')
      return { success: true, data: mockVerse }
    }

    try {
      const newVerse = {
        ...verse,
        user_id: user.id,
        created_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('memory_verses')
        .insert(newVerse)
        .select()
        .single()

      if (error) throw error

      setMemoryVerses(prev => [data, ...prev])
      toast.success('Memory verse added successfully')
      return { success: true, data }
    } catch (err) {
      console.error('Error adding memory verse:', err)
      toast.error('Failed to add memory verse')
      return { success: false, error: err }
    }
  }

  const updateProgress = async (id, progress) => {
    if (!hasRealCredentials) {
      // Mock success
      setMemoryVerses(prev => prev.map(verse =>
        verse.id === id
          ? {
              ...verse,
              progress,
              last_reviewed: new Date().toISOString(),
              mastered: progress >= 100
            }
          : verse
      ))
      toast.success('Progress updated successfully (mock mode)')
      return { success: true }
    }

    try {
      const { data, error } = await supabase
        .from('memory_verses')
        .update({
          progress,
          last_reviewed: new Date().toISOString(),
          mastered: progress >= 100
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setMemoryVerses(prev => prev.map(verse =>
        verse.id === id ? data : verse
      ))
      toast.success('Progress updated successfully')
      return { success: true, data }
    } catch (err) {
      console.error('Error updating progress:', err)
      toast.error('Failed to update progress')
      return { success: false, error: err }
    }
  }

  const updateStreak = async (id) => {
    if (!hasRealCredentials) {
      // Mock success
      setMemoryVerses(prev => prev.map(verse =>
        verse.id === id
          ? {
              ...verse,
              streak: (verse.streak || 0) + 1,
              last_reviewed: new Date().toISOString()
            }
          : verse
      ))
      return { success: true }
    }

    try {
      const verse = memoryVerses.find(v => v.id === id)
      if (!verse) throw new Error('Memory verse not found')

      const { data, error } = await supabase
        .from('memory_verses')
        .update({
          streak: (verse.streak || 0) + 1,
          last_reviewed: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setMemoryVerses(prev => prev.map(v =>
        v.id === id ? data : v
      ))
      return { success: true, data }
    } catch (err) {
      console.error('Error updating streak:', err)
      return { success: false, error: err }
    }
  }

  const deleteMemoryVerse = async (id) => {
    if (!hasRealCredentials) {
      // Mock success
      setMemoryVerses(prev => prev.filter(verse => verse.id !== id))
      toast.success('Memory verse deleted successfully (mock mode)')
      return { success: true }
    }

    try {
      const { error } = await supabase
        .from('memory_verses')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMemoryVerses(prev => prev.filter(verse => verse.id !== id))
      toast.success('Memory verse deleted successfully')
      return { success: true }
    } catch (err) {
      console.error('Error deleting memory verse:', err)
      toast.error('Failed to delete memory verse')
      return { success: false, error: err }
    }
  }

  return {
    memoryVerses,
    isLoading,
    error,
    fetchMemoryVerses,
    addMemoryVerse,
    updateProgress,
    updateStreak,
    deleteMemoryVerse
  }
}