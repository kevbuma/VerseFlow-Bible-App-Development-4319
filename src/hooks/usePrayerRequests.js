import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import supabase, { hasRealCredentials } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function usePrayerRequests() {
  const [prayers, setPrayers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchPrayers()
    } else {
      setPrayers([])
      setIsLoading(false)
    }
  }, [user])

  const fetchPrayers = async () => {
    if (!hasRealCredentials) {
      // Use mock data
      setIsLoading(false)
      setPrayers([])
      return
    }

    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('prayer_requests')
        .select('*')
        .or(`user_id.eq.${user.id},privacy.eq.public`)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPrayers(data || [])
    } catch (err) {
      console.error('Error fetching prayers:', err)
      setError('Failed to load prayers')
      toast.error('Failed to load prayer requests')
    } finally {
      setIsLoading(false)
    }
  }

  const addPrayer = async (prayer) => {
    if (!hasRealCredentials) {
      // Mock success
      const mockPrayer = {
        id: Date.now().toString(),
        ...prayer,
        user_id: user.id,
        created_at: new Date().toISOString(),
        is_answered: false,
        prayer_count: 0
      }
      setPrayers(prev => [mockPrayer, ...prev])
      toast.success('Prayer request added successfully (mock mode)')
      return { success: true, data: mockPrayer }
    }

    try {
      const newPrayer = {
        ...prayer,
        user_id: user.id,
        created_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('prayer_requests')
        .insert(newPrayer)
        .select()
        .single()

      if (error) throw error

      setPrayers(prev => [data, ...prev])
      toast.success('Prayer request added successfully')
      return { success: true, data }
    } catch (err) {
      console.error('Error adding prayer:', err)
      toast.error('Failed to add prayer request')
      return { success: false, error: err }
    }
  }

  const updatePrayer = async (id, updates) => {
    if (!hasRealCredentials) {
      // Mock success
      setPrayers(prev => prev.map(prayer => 
        prayer.id === id ? { ...prayer, ...updates, updated_at: new Date().toISOString() } : prayer
      ))
      toast.success('Prayer request updated successfully (mock mode)')
      return { success: true }
    }

    try {
      const { data, error } = await supabase
        .from('prayer_requests')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setPrayers(prev => prev.map(prayer => prayer.id === id ? data : prayer))
      toast.success('Prayer request updated successfully')
      return { success: true, data }
    } catch (err) {
      console.error('Error updating prayer:', err)
      toast.error('Failed to update prayer request')
      return { success: false, error: err }
    }
  }

  const markAnswered = async (id) => {
    if (!hasRealCredentials) {
      // Mock success
      setPrayers(prev => prev.map(prayer => 
        prayer.id === id ? { 
          ...prayer, 
          is_answered: true, 
          answered_at: new Date().toISOString(),
          updated_at: new Date().toISOString() 
        } : prayer
      ))
      toast.success('Prayer marked as answered (mock mode)')
      return { success: true }
    }

    try {
      const { data, error } = await supabase
        .from('prayer_requests')
        .update({ 
          is_answered: true, 
          answered_at: new Date().toISOString(),
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setPrayers(prev => prev.map(prayer => prayer.id === id ? data : prayer))
      toast.success('Prayer marked as answered')
      return { success: true, data }
    } catch (err) {
      console.error('Error marking prayer as answered:', err)
      toast.error('Failed to update prayer request')
      return { success: false, error: err }
    }
  }

  const deletePrayer = async (id) => {
    if (!hasRealCredentials) {
      // Mock success
      setPrayers(prev => prev.filter(prayer => prayer.id !== id))
      toast.success('Prayer request deleted successfully (mock mode)')
      return { success: true }
    }

    try {
      const { error } = await supabase
        .from('prayer_requests')
        .delete()
        .eq('id', id)

      if (error) throw error

      setPrayers(prev => prev.filter(prayer => prayer.id !== id))
      toast.success('Prayer request deleted successfully')
      return { success: true }
    } catch (err) {
      console.error('Error deleting prayer:', err)
      toast.error('Failed to delete prayer request')
      return { success: false, error: err }
    }
  }

  const prayFor = async (id) => {
    if (!hasRealCredentials) {
      // Mock success
      setPrayers(prev => prev.map(prayer => 
        prayer.id === id ? { 
          ...prayer, 
          prayer_count: (prayer.prayer_count || 0) + 1,
          updated_at: new Date().toISOString() 
        } : prayer
      ))
      toast.success('Prayer count updated (mock mode)')
      return { success: true }
    }

    try {
      const prayer = prayers.find(p => p.id === id)
      if (!prayer) throw new Error('Prayer request not found')

      const { data, error } = await supabase
        .from('prayer_requests')
        .update({ 
          prayer_count: (prayer.prayer_count || 0) + 1,
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setPrayers(prev => prev.map(p => p.id === id ? data : p))
      toast.success('Thank you for praying!')
      return { success: true, data }
    } catch (err) {
      console.error('Error updating prayer count:', err)
      toast.error('Failed to update prayer count')
      return { success: false, error: err }
    }
  }

  return {
    prayers,
    isLoading,
    error,
    fetchPrayers,
    addPrayer,
    updatePrayer,
    markAnswered,
    deletePrayer,
    prayFor
  }
}