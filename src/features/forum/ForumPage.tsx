import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { Card } from '../../components/ui/Card'
import { CreatePost } from './CreatePost'
import { PostCard } from './PostCard'
import { rpcFunctions } from '../../core/rpc'
import { Button } from '../../components/ui/Button'

interface ForumPageProps {
  minimal?: boolean
}

export const ForumPage: React.FC<ForumPageProps> = ({ minimal = false }) => {
  const [offset, setOffset] = useState(0)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const limit = minimal ? 5 : 20
  const { data: postsData = [], isLoading, refetch } = useQuery({
    queryKey: ['posts', offset],
    queryFn: async () => {
      try {
        const data = await rpcFunctions.fetchPosts(limit, offset)
        return Array.isArray(data) ? data : []
      } catch (err) {
        console.error('Failed to load posts:', err)
        return []
      }
    },
    staleTime: 2 * 60 * 1000,
  })

  const handleLoadMore = async () => {
    setIsLoadingMore(true)
    const newOffset = offset + limit
    setOffset(newOffset)
    setIsLoadingMore(false)
  }

  const hasMorePosts = postsData && postsData.length === limit

  if (minimal) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-emerald">Forum</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {postsData.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} minimal={true} />
          ))}
          {postsData.length === 0 && (
            <Card>
              <p className="text-white/50 text-center py-4">Nessun post ancora</p>
            </Card>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">FORUM</h1>
          <p className="text-white/50">Condividi riflessioni e intenzioni</p>
        </div>

        {/* Create Post Section */}
        <CreatePost onPostCreated={() => refetch()} />

        {/* Posts Feed */}
        <div className="space-y-4">
          {isLoading && postsData.length === 0 ? (
            <Card>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center"
              >
                <div className="text-emerald text-4xl">◎</div>
              </motion.div>
            </Card>
          ) : postsData.length === 0 ? (
            <Card>
              <p className="text-white/50 text-center py-8">
                Nessun post ancora. Sii il primo a condividere una riflessione!
              </p>
            </Card>
          ) : (
            postsData.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>

        {/* Load More */}
        {hasMorePosts && (
          <Button
            onClick={handleLoadMore}
            variant="secondary"
            size="md"
            loading={isLoadingMore}
            fullWidth
          >
            Carica altri
          </Button>
        )}
      </motion.div>
    </div>
  )
}
