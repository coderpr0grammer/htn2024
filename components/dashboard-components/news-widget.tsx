import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "../ui/card"
import { useAuth } from "@/app/infrastructure/auth/auth.context"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Interest {
  name: string;
}

interface NewsItem {
  title: string;
  points: string[];
}

export default function NewsWidget() {
  const { user } = useAuth()
  const [interests, setInterests] = useState<(string | Interest)[]>([])
  const [newsItems, setNewsItems] = useState<{ [key: string]: NewsItem }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.data.interests) {
      setInterests(user.data.interests)
      fetchNewsForAllInterests(user.data.interests)
    }
  }, [user])

  const fetchNewsForAllInterests = async (interests: (string | Interest)[]) => {
    setLoading(true)
    const newsPromises = interests.map(interest => 
      fetchNewsForInterest(typeof interest === 'string' ? interest : interest.name)
    )
    await Promise.all(newsPromises)
    setLoading(false)
  }

  const fetchNewsForInterest = async (interest: string | { name: string }) => {
    const interestName = typeof interest === 'string' ? interest : interest.name
    try {
      const response = await fetch(`/api/news?interest=${encodeURIComponent(interestName)}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      if (!response.ok) throw new Error('Failed to fetch news')
      const data = await response.json()
      const { title, points } = parseMarkdownContent(data.markdownContent)
      setNewsItems(prev => ({ ...prev, [interestName]: { title, points } }))
    } catch (error) {
      console.error('Error fetching news:', error)
      setNewsItems(prev => ({ ...prev, [interestName]: { title: 'Error', points: ['Failed to load news'] } }))
    }
  }

  const parseMarkdownContent = (markdownContent: string): NewsItem => {
    const lines = markdownContent.split('\n').filter(line => line.trim())
    const title = lines[0].replace(/^#\s*/, '')
    const points = lines.slice(1).map(line => line.replace(/^\d+\.\s*/, ''))
    return { title, points: points.slice(0, 3) } // Limit to 3 points
  }

  const currentInterest = interests[0] // Always show the first interest
  const currentInterestName = typeof currentInterest === 'string' ? currentInterest : currentInterest?.name || 'Unknown Interest'
  const currentNews = newsItems[currentInterestName] || { title: '', points: [] }

  return (
    <Card className="h-[300px] overflow-hidden col-span-2 flex flex-col">
      <div className="p-4 flex flex-col h-full">
        <h3 className="text-sm font-semibold text-gray-600 mb-2 truncate">{currentInterestName}</h3>
        <div className="flex-grow flex flex-col overflow-hidden">
          {loading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : (
            <>
              <h2 className="text-lg font-bold mb-2 line-clamp-1">{currentNews.title}</h2>
              <ScrollArea className="flex-grow h-[160px]">
                <ol className="list-decimal list-inside text-sm space-y-2">
                  {currentNews.points.map((point, index) => (
                    <li key={index} className="line-clamp-2">{point}</li>
                  ))}
                </ol>
              </ScrollArea>
            </>
          )}
        </div>
        <div className="flex justify-end items-center mt-2">
          <span className="text-xs text-gray-400">Powered by Cohere</span>
        </div>
      </div>
    </Card>
  )
}