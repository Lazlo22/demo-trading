import { memo } from 'react';

const HomeLoading = memo(() => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <div className="text-sm text-gray-600">
          Loading markets...
        </div>
      </div>
    </div>
  );
});

HomeLoading.displayName = "HomeLoading";

export default HomeLoading;