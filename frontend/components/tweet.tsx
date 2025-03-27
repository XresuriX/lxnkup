/* eslint-disable @next/next/no-img-element */
"use client"
import { Avatar } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"
import { MessageCircle, Repeat2, Heart, Share, MoreHorizontal, Bookmark } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useTweetStore, type TweetWithAuthor } from "@/lib/store/use-tweet-store"
import { motion } from "framer-motion"
import HtmlText from "./ex1"

interface TweetProps {
  tweet: TweetWithAuthor
  onReply?: () => void
  onShare?: () => void
}

export function Tweet({ tweet, onReply, onShare }: TweetProps) {
  const { likedTweetIds, retweetedTweetIds, bookmarkedTweetIds, toggleLike, toggleRetweet, toggleBookmark } =
    useTweetStore()

  const isLiked = likedTweetIds.includes(tweet.id)
  const isRetweeted = retweetedTweetIds.includes(tweet.id)
  const isBookmarked = bookmarkedTweetIds.includes(tweet.id)

  const handleLike = () => {
    toggleLike(tweet.id)
  }

  const handleRetweet = () => {
    toggleRetweet(tweet.id)
  }

  const handleBookmark = () => {
    toggleBookmark(tweet.id)
  }

  return (
    <article className="border-b border-twitter-gray p-4 tweet-hover transition-colors">
      <HtmlText/>
      <div className="flex gap-3">
        <Link href={`/profile/${tweet.author.username}`} className="flex-shrink-0">
          <Avatar src={tweet.author.avatar} name={tweet.author.name} size="md" />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1 text-sm">
              <Link href={`/profile/${tweet.author.username}`} className="font-bold hover:underline">
                {tweet.author.name}
              </Link>
              {tweet.author.verified && (
                <span className="text-caribbean">
                  <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-5 h-5 fill-current">
                    <g>
                      <path
                        d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1
.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                      ></path>
                    </g>
                  </svg>
                </span>
              )}
              <span className="text-muted-foreground">@{tweet.author.username}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground hover:underline">{formatDate(tweet.createdAt)}</span>
            </div>

            <button className="text-muted-foreground p-2 rounded-full hover:bg-twitter-lightGray hover:text-foreground">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="mt-1 mb-3 whitespace-pre-wrap">{tweet.content}</div>

          {tweet.images && tweet.images.length > 0 && (
            <div
              className={cn(
                "mt-3 mb-3 grid gap-2 rounded-2xl overflow-hidden",
                tweet.images.length === 1 ? "grid-cols-1" : "grid-cols-2",
              )}
            >
              {tweet.images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`Tweet image ${index + 1}`}
                  className={cn(
                    "w-full h-auto object-cover",
                    tweet.images.length === 1 ? "max-h-[510px]" : "max-h-[255px]",
                  )}
                />
              ))}
            </div>
          )}

          <div className="flex justify-between mt-3 max-w-md">
            <button onClick={onReply} className="flex items-center gap-1 text-muted-foreground group">
              <div className="p-2 rounded-full group-hover:bg-caribbean/10 group-hover:text-caribbean transition-colors tweet-action-reply">
                <MessageCircle size={18} />
              </div>
              <span className="text-sm group-hover:text-caribbean">{tweet.metrics.replies}</span>
            </button>

            <button onClick={handleRetweet} className="flex items-center gap-1 text-muted-foreground group">
              <div
                className={cn(
                  "p-2 rounded-full group-hover:bg-caribbean/10 group-hover:text-caribbean transition-colors tweet-action-retweet",
                  isRetweeted && "text-caribbean",
                )}
              >
                <Repeat2 size={18} />
              </div>
              <span className={cn("text-sm group-hover:text-caribbean", isRetweeted && "text-caribbean")}>
                {tweet.metrics.retweets + (isRetweeted ? 1 : 0)}
              </span>
            </button>

            <button onClick={handleLike} className="flex items-center gap-1 text-muted-foreground group">
              <motion.div
                whileTap={{ scale: 0.8 }}
                className={cn(
                  "p-2 rounded-full group-hover:bg-red-500/10 group-hover:text-red-500 transition-colors tweet-action-like",
                  isLiked && "text-red-500",
                )}
              >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              </motion.div>
              <span className={cn("text-sm group-hover:text-red-500", isLiked && "text-red-500")}>
                {tweet.metrics.likes + (isLiked ? 1 : 0)}
              </span>
            </button>

            <button onClick={handleBookmark} className="flex items-center gap-1 text-muted-foreground group">
              <div
                className={cn(
                  "p-2 rounded-full group-hover:bg-gold/10 group-hover:text-gold transition-colors tweet-action-bookmark",
                  isBookmarked && "text-gold",
                )}
              >
                <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
              </div>
            </button>

            <button onClick={onShare} className="flex items-center gap-1 text-muted-foreground group">
              <div className="p-2 rounded-full group-hover:bg-caribbean/10 group-hover:text-caribbean transition-colors tweet-action-share">
                <Share size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
