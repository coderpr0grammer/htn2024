import { ArrowRight } from "lucide-react"

interface NewsWidgetProps {
  title: string;
  description: string;
}

export default function Component({ title, description }: NewsWidgetProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {title}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {description}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Powered by Cohere</span>
            <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
              <ArrowRight size={20} />
              <span className="sr-only">Next article</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}