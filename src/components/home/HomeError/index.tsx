import { memo, type FC } from "react";

const HomeError: FC = memo(() => {
    return (
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Markets
          </h1>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">
              Error loading market meta data
            </p>
          </div>
        </div>
      );
});

HomeError.displayName = "HomeError";

export default HomeError;