import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "../ui/card"
import { useAuth } from "@/app/infrastructure/auth/auth.context"

interface Interest {
  name: string;
}

export default function NewsWidget() {
  const { user } = useAuth()
  const [interests, setInterests] = useState<(string | Interest)[]>([])
  const [currentInterestIndex, setCurrentInterestIndex] = useState(0)
  const [newsItems, setNewsItems] = useState<{ [key: string]: { title: string, description: string } }>({})
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
      setNewsItems(prev => ({ ...prev, [interestName]: data }))
    } catch (error) {
      console.error('Error fetching news:', error)
      setNewsItems(prev => ({ ...prev, [interestName]: { title: 'Error', description: 'Failed to load news' } }))
    }
  }

  const handleReload = () => {
    fetchNewsForAllInterests(interests)
  }

  const handleNext = () => {
    setCurrentInterestIndex((prev) => (prev + 1) % interests.length)
  }

  const handlePrevious = () => {
    setCurrentInterestIndex((prev) => (prev - 1 + interests.length) % interests.length)
  }

  const currentInterest = interests[currentInterestIndex]
  const currentInterestName = typeof currentInterest === 'string' ? currentInterest : currentInterest?.name || 'Unknown Interest'
  const currentNews = newsItems[currentInterestName] || { title: '', description: '' }

  return (
    <Card
      className="max-h-full overflow-auto col-span-2"
    >
      
      <div className="relative p-6">
        <div className="absolute inset-0 opacity-10">
          {/* <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="20" fill="#FFA07A" />
            <circle cx="160" cy="40" r="20" fill="#98FB98" />
            <circle cx="40" cy="160" r="20" fill="#87CEFA" />
            <circle cx="160" cy="160" r="20" fill="#DDA0DD" />
            <circle cx="100" cy="100" r="30" fill="#F0E68C" />
          </svg> */}
        </div>

        <div className="relative z-10">
          {loading ? (
            <Skeleton className="h-8 w-3/4 mb-2" />
          ) : (
            <>
              <h3 className="text-sm font-semibold text-gray-600 mb-1">{currentInterestName}</h3>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {currentNews.title}
              </h2>
            </>
          )}
          
          {loading ? (
            <>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/6 mb-4" />
            </>
          ) : (
            <p className="text-sm text-gray-600 mb-4">
              {currentNews.description}
            </p>
          )}

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Powered by Cohere</span>
            <div className="flex space-x-2">
              <button 
                onClick={handlePrevious}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                disabled={loading || interests.length <= 1}
              >
                <ArrowLeft size={20} />
                <span className="sr-only">Previous topic</span>
              </button>
              <button 
                onClick={handleReload}
                className="bg-primary cursor-pointer text-white p-2 rounded-full hover:bg-primary transition-colors"
                disabled={loading}
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                <span className="sr-only">Reload news</span>
              </button>
              <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                <ArrowRight size={20} />
                <span className="sr-only">Next topic</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}