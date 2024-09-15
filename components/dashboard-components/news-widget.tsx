import { ArrowRight, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "../ui/card";

export default function NewsWidget() {
  const [news, setNews] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/news', { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews({ title: 'Error', description: 'Failed to load news' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleReload = () => {
    fetchNews();
  };

  return (
    <Card
      className="lg:max-w-md"
    >
      <div className="relative p-6">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="20" fill="#FFA07A" />
            <circle cx="160" cy="40" r="20" fill="#98FB98" />
            <circle cx="40" cy="160" r="20" fill="#87CEFA" />
            <circle cx="160" cy="160" r="20" fill="#DDA0DD" />
            <circle cx="100" cy="100" r="30" fill="#F0E68C" />
          </svg>
        </div>

        <div className="relative z-10">
          {loading ? (
            <Skeleton className="h-8 w-3/4 mb-2" />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {news.title}
            </h2>
          )}
          
          {loading ? (
            <>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/6 mb-4" />
            </>
          ) : (
            <p className="text-sm text-gray-600 mb-4">
              {news.description}
            </p>
          )}

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Powered by Cohere</span>
            <div className="flex space-x-2">
              <button 
                onClick={handleReload}
                className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                disabled={loading}
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                <span className="sr-only">Reload news</span>
              </button>
              <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                <ArrowRight size={20} />
                <span className="sr-only">Next article</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}