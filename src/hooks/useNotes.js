import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import supabase, { hasRealCredentials } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function useNotes() {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchNotes()
    } else {
      setNotes([])
      setIsLoading(false)
    }
  }, [user])

  const fetchNotes = async () => {
    if (!hasRealCredentials) {
      // Use mock data
      setIsLoading(false)
      setNotes([])
      return
    }

    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setNotes(data || [])
    } catch (err) {
      console.error('Error fetching notes:', err)
      setError('Failed to load notes')
      toast.error('Failed to load notes')
    } finally {
      setIsLoading(false)
    }
  }

  const addNote = async (note) => {
    if (!hasRealCredentials) {
      // Mock success
      const mockNote = {
        id: Date.now().toString(),
        ...note,
        user_id: user.id,
        created_at: new Date().toISOString(),
        is_favorite: false
      }
      setNotes(prev => [mockNote, ...prev])
      toast.success('Note added successfully (mock mode)')
      return { success: true, data: mockNote }
    }

    try {
      const newNote = {
        ...note,
        user_id: user.id,
        created_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('notes')
        .insert(newNote)
        .select()
        .single()

      if (error) throw error

      setNotes(prev => [data, ...prev])
      toast.success('Note added successfully')
      return { success: true, data }
    } catch (err) {
      console.error('Error adding note:', err)
      toast.error('Failed to add note')
      return { success: false, error: err }
    }
  }

  const updateNote = async (id, updates) => {
    if (!hasRealCredentials) {
      // Mock success
      setNotes(prev => prev.map(note => 
        note.id === id ? { ...note, ...updates, updated_at: new Date().toISOString() } : note
      ))
      toast.success('Note updated successfully (mock mode)')
      return { success: true }
    }

    try {
      const { data, error } = await supabase
        .from('notes')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setNotes(prev => prev.map(note => note.id === id ? data : note))
      toast.success('Note updated successfully')
      return { success: true, data }
    } catch (err) {
      console.error('Error updating note:', err)
      toast.error('Failed to update note')
      return { success: false, error: err }
    }
  }

  const deleteNote = async (id) => {
    if (!hasRealCredentials) {
      // Mock success
      setNotes(prev => prev.filter(note => note.id !== id))
      toast.success('Note deleted successfully (mock mode)')
      return { success: true }
    }

    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)

      if (error) throw error

      setNotes(prev => prev.filter(note => note.id !== id))
      toast.success('Note deleted successfully')
      return { success: true }
    } catch (err) {
      console.error('Error deleting note:', err)
      toast.error('Failed to delete note')
      return { success: false, error: err }
    }
  }

  const toggleFavorite = async (id) => {
    if (!hasRealCredentials) {
      // Mock success
      setNotes(prev => prev.map(note => 
        note.id === id ? { ...note, is_favorite: !note.is_favorite } : note
      ))
      const note = notes.find(n => n.id === id)
      toast.success(note?.is_favorite ? 'Removed from favorites (mock mode)' : 'Added to favorites (mock mode)')
      return { success: true }
    }

    try {
      const note = notes.find(n => n.id === id)
      if (!note) throw new Error('Note not found')

      const { data, error } = await supabase
        .from('notes')
        .update({ is_favorite: !note.is_favorite })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setNotes(prev => prev.map(n => n.id === id ? data : n))
      toast.success(note.is_favorite ? 'Removed from favorites' : 'Added to favorites')
      return { success: true, data }
    } catch (err) {
      console.error('Error updating note:', err)
      toast.error('Failed to update note')
      return { success: false, error: err }
    }
  }

  return {
    notes,
    isLoading,
    error,
    fetchNotes,
    addNote,
    updateNote,
    deleteNote,
    toggleFavorite
  }
}