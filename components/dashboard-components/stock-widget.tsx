import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "../ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NewsItem {
  title: string;
  points: string[];
}

export default function StockWidget() {
  const [newsItem, setNewsItem] = useState<NewsItem>({ title: '', points: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStockNews()
  }, [])

  const fetchStockNews = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/stocks', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      if (!response.ok) throw new Error('Failed to fetch stocks')
      const data = await response.json()
      const { title, points } = parseMarkdownContent(data.markdownContent)
      setNewsItem({ title, points })
    } catch (error) {
      console.error('Error fetching stocks:', error)
      setNewsItem({ title: 'Error', points: ['Failed to load stock news'] })
    }
    setLoading(false)
  }

  const parseMarkdownContent = (markdownContent: string): NewsItem => {
    const lines = markdownContent.split('\n').filter(line => line.trim())
    const title = lines[0].replace(/^#\s*/, '')
    const points = lines.slice(1).map(line => line.replace(/^\d+\.\s*/, ''))
    return { title, points: points.slice(0, 5) } // Ensure only 5 points are kept
  }

  return (
    <Card className="h-[300px] overflow-hidden col-span-2 flex flex-col">
      <div className="p-4 flex flex-col h-full">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Stock Market News</h3>
        <div className="flex-grow flex flex-col overflow-hidden">
          {loading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : (
            <>
              <h2 className="text-lg font-bold mb-2 line-clamp-1">{newsItem.title}</h2>
              <ScrollArea className="flex-grow h-[160px]">
                <ol className="list-decimal list-inside text-sm">
                  {newsItem.points.map((point, index) => (
                    <li key={index} className="mb-2 line-clamp-2">{point}</li>
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