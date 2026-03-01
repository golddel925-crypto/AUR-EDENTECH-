import { useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useSessionStore } from '../stores/sessionStore'
import { useProfileStore } from '../stores/profileStore'
import * as rpcFunctions from '../core/rpc'

export const useUser = () => {
  const { userId } = useSessionStore()
  const { profile, setProfile, isLoading, setLoading, error, setError } =
    useProfileStore()

  // Fetch profile data
  const { data: profileData, isLoading: queryIsLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null
      try {
        const data = await rpcFunctions.fetchProfile(userId)
        setProfile(data)
        setError(null)
        return data
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load profile'
        setError(errorMsg)
        console.error('Profile fetch error:', err)
        return null
      }
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  })

  // Update public name mutation
  const updateNameMutation = useMutation({
    mutationFn: async (publicName: string) => {
      try {
        const result = await rpcFunctions.updatePublicName(publicName)
        if (result && profileData) {
          setProfile({ ...profileData, public_name: publicName })
        }
        return result
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to update name'
        setError(errorMsg)
        throw err
      }
    },
  })

  // Sync profile to store
  useEffect(() => {
    if (profileData && !profile?.id) {
      setProfile(profileData)
    }
  }, [profileData, profile?.id, setProfile])

  return {
    profile: profile || profileData,
    isLoading: isLoading || queryIsLoading,
    error,
    updateName: (name: string) => updateNameMutation.mutate(name),
    isUpdatingName: updateNameMutation.isPending,
  }
}
