import React from 'react'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'
import { useBookmarks } from '../hooks/useBookmarks'
import { toast } from 'react-toastify'

const { FiCopy, FiShare2, FiHeart, FiBookmark } = FiIcons

const BibleVerseActions = ({ verse, reference, className = "" }) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()
  const bookmarked = isBookmarked(reference)

  const handleCopy = () => {
    const textToCopy = `${reference}\n${verse.text || verse}`
    navigator.clipboard.writeText(textToCopy)
    toast.success('Verse copied to clipboard!')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: reference,
        text: verse.text || verse,
        url: window.location.href
      })
    } else {
      handleCopy()
    }
  }

  const handleBookmark = async () => {
    if (bookmarked) {
      const bookmark = bookmarks.find(b => b.reference === reference)
      if (bookmark) {
        await removeBookmark(bookmark.id)
      }
    } else {
      await addBookmark({
        reference,
        verse_text: verse.text || verse,
        note: ''
      })
    }
  }

  const handleFavorite = () => {
    toast.info('Favorites feature coming soon!')
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={handleCopy}
        className="p-2 text-spiritual-500 hover:text-spiritual-700 hover:bg-spiritual-100 rounded-lg transition-colors"
        title="Copy verse"
      >
        <SafeIcon icon={FiCopy} className="w-4 h-4" />
      </button>

      <button
        onClick={handleShare}
        className="p-2 text-spiritual-500 hover:text-spiritual-700 hover:bg-spiritual-100 rounded-lg transition-colors"
        title="Share verse"
      >
        <SafeIcon icon={FiShare2} className="w-4 h-4" />
      </button>

      <button
        onClick={handleBookmark}
        className={`p-2 hover:bg-spiritual-100 rounded-lg transition-colors ${
          bookmarked ? 'text-blue-600' : 'text-spiritual-500 hover:text-spiritual-700'
        }`}
        title={bookmarked ? 'Remove bookmark' : 'Bookmark verse'}
      >
        <SafeIcon 
          icon={FiBookmark} 
          className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} 
        />
      </button>

      <button
        onClick={handleFavorite}
        className="p-2 text-spiritual-500 hover:text-spiritual-700 hover:bg-spiritual-100 rounded-lg transition-colors"
        title="Add to favorites"
      >
        <SafeIcon icon={FiHeart} className="w-4 h-4" />
      </button>
    </div>
  )
}

export default BibleVerseActions