import type { FC } from "react"
import { AlertTriangle } from "lucide-react"

const NotFound: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
        <AlertTriangle className="w-5 h-5" />
        <span>Please check the URL or navigate back to the home page.</span>
      </div>
    </div>
  )
}

NotFound.displayName = "NotFound"

export default NotFound
