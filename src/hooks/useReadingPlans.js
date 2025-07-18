import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import supabase, { hasRealCredentials } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function useReadingPlans() {
  const [plans, setPlans] = useState([])
  const [userPlans, setUserPlans] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchPlans()
    }
  }, [user])

  const fetchPlans = async () => {
    if (!hasRealCredentials) {
      // Use mock data
      setIsLoading(false)
      const mockPlans = [
        {
          id: '1',
          title: 'One Year Bible',
          description: 'Complete the Bible in 365 days with daily readings from Old and New Testament',
          duration: 365,
          category: 'chronological',
          difficulty: 'Beginner'
        },
        {
          id: '2',
          title: 'Psalms & Proverbs',
          description: 'Dive deep into wisdom literature with daily reflections',
          duration: 60,
          category: 'topical',
          difficulty: 'Intermediate'
        },
        {
          id: '3',
          title: 'Life of Jesus',
          description: 'Follow Jesus through the four Gospels chronologically',
          duration: 90,
          category: 'thematic',
          difficulty: 'Beginner'
        }
      ]
      setPlans(mockPlans)
      setUserPlans([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Fetch available reading plans
      const { data: plansData, error: plansError } = await supabase
        .from('reading_plans')
        .select('*')
        .order('title')

      if (plansError) throw plansError

      // Fetch user's reading plans
      const { data: userPlansData, error: userPlansError } = await supabase
        .from('user_reading_plans')
        .select(`
          *,
          reading_plans (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (userPlansError) throw userPlansError

      setPlans(plansData || [])
      setUserPlans(userPlansData || [])
    } catch (err) {
      console.error('Error fetching reading plans:', err)
      setError('Failed to load reading plans')
      toast.error('Failed to load reading plans')
    } finally {
      setIsLoading(false)
    }
  }

  const startPlan = async (planId) => {
    if (!hasRealCredentials) {
      // Mock success
      const plan = plans.find(p => p.id === planId)
      if (!plan) {
        toast.error('Plan not found')
        return { success: false }
      }

      const newUserPlan = {
        id: `user-plan-${Date.now()}`,
        user_id: user.id,
        reading_plan_id: planId,
        progress: 0,
        current_day: 1,
        streak: 0,
        status: 'active',
        started_at: new Date().toISOString(),
        reading_plans: plan
      }

      setUserPlans(prev => [...prev, newUserPlan])
      toast.success('Reading plan started successfully (mock mode)')
      return { success: true, data: newUserPlan }
    }

    try {
      const plan = plans.find(p => p.id === planId)
      if (!plan) {
        throw new Error('Plan not found')
      }

      const newUserPlan = {
        user_id: user.id,
        reading_plan_id: planId,
        progress: 0,
        current_day: 1,
        streak: 0,
        status: 'active',
        started_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('user_reading_plans')
        .insert(newUserPlan)
        .select(`
          *,
          reading_plans (*)
        `)
        .single()

      if (error) throw error

      setUserPlans(prev => [...prev, data])
      toast.success('Reading plan started successfully')
      return { success: true, data }
    } catch (err) {
      console.error('Error starting reading plan:', err)
      toast.error('Failed to start reading plan')
      return { success: false, error: err }
    }
  }

  const updateProgress = async (userPlanId, progress, currentDay) => {
    if (!hasRealCredentials) {
      // Mock success
      setUserPlans(prev => prev.map(plan =>
        plan.id === userPlanId
          ? {
              ...plan,
              progress,
              current_day: currentDay,
              last_read_at: new Date().toISOString()
            }
          : plan
      ))
      toast.success('Progress updated successfully (mock mode)')
      return { success: true }
    }

    try {
      const { data, error } = await supabase
        .from('user_reading_plans')
        .update({
          progress,
          current_day: currentDay,
          last_read_at: new Date().toISOString()
        })
        .eq('id', userPlanId)
        .select(`
          *,
          reading_plans (*)
        `)
        .single()

      if (error) throw error

      setUserPlans(prev => prev.map(plan =>
        plan.id === userPlanId ? data : plan
      ))
      toast.success('Progress updated successfully')
      return { success: true, data }
    } catch (err) {
      console.error('Error updating reading plan progress:', err)
      toast.error('Failed to update progress')
      return { success: false, error: err }
    }
  }

  const updateStreak = async (userPlanId) => {
    if (!hasRealCredentials) {
      // Mock success
      setUserPlans(prev => prev.map(plan =>
        plan.id === userPlanId
          ? {
              ...plan,
              streak: (plan.streak || 0) + 1,
              last_read_at: new Date().toISOString()
            }
          : plan
      ))
      return { success: true }
    }

    try {
      const plan = userPlans.find(p => p.id === userPlanId)
      if (!plan) {
        throw new Error('Reading plan not found')
      }

      const { data, error } = await supabase
        .from('user_reading_plans')
        .update({
          streak: (plan.streak || 0) + 1,
          last_read_at: new Date().toISOString()
        })
        .eq('id', userPlanId)
        .select(`
          *,
          reading_plans (*)
        `)
        .single()

      if (error) throw error

      setUserPlans(prev => prev.map(p =>
        p.id === userPlanId ? data : p
      ))
      return { success: true, data }
    } catch (err) {
      console.error('Error updating streak:', err)
      return { success: false, error: err }
    }
  }

  const pausePlan = async (userPlanId) => {
    if (!hasRealCredentials) {
      // Mock success
      setUserPlans(prev => prev.map(plan =>
        plan.id === userPlanId
          ? { ...plan, status: 'paused' }
          : plan
      ))
      toast.success('Reading plan paused (mock mode)')
      return { success: true }
    }

    try {
      const { data, error } = await supabase
        .from('user_reading_plans')
        .update({ status: 'paused' })
        .eq('id', userPlanId)
        .select(`
          *,
          reading_plans (*)
        `)
        .single()

      if (error) throw error

      setUserPlans(prev => prev.map(plan =>
        plan.id === userPlanId ? data : plan
      ))
      toast.success('Reading plan paused')
      return { success: true, data }
    } catch (err) {
      console.error('Error pausing reading plan:', err)
      toast.error('Failed to pause reading plan')
      return { success: false, error: err }
    }
  }

  const resumePlan = async (userPlanId) => {
    if (!hasRealCredentials) {
      // Mock success
      setUserPlans(prev => prev.map(plan =>
        plan.id === userPlanId
          ? { ...plan, status: 'active' }
          : plan
      ))
      toast.success('Reading plan resumed (mock mode)')
      return { success: true }
    }

    try {
      const { data, error } = await supabase
        .from('user_reading_plans')
        .update({ status: 'active' })
        .eq('id', userPlanId)
        .select(`
          *,
          reading_plans (*)
        `)
        .single()

      if (error) throw error

      setUserPlans(prev => prev.map(plan =>
        plan.id === userPlanId ? data : plan
      ))
      toast.success('Reading plan resumed')
      return { success: true, data }
    } catch (err) {
      console.error('Error resuming reading plan:', err)
      toast.error('Failed to resume reading plan')
      return { success: false, error: err }
    }
  }

  return {
    plans,
    userPlans,
    isLoading,
    error,
    fetchPlans,
    startPlan,
    updateProgress,
    updateStreak,
    pausePlan,
    resumePlan
  }
}