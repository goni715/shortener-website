import { RefreshCw } from "lucide-react";
import type { IMeta } from "../../types/global.type"

interface TProps {
  meta: IMeta;
  onRefresh?: () => void;
  isFetching?:boolean;
  isLoading?: boolean;
}

const UrlListHeader = ({ meta, onRefresh, isFetching, isLoading }: TProps) => {

  return (
    <div className="p-3 sm:p-4">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex justify-between sm:flex-row sm:items-center sm:space-x-6 lg:space-x-8">
         <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">URL List</h1>
           <div className="flex items-center">
             <span className="text-sm sm:text-base text-gray-600">Total:</span>
              <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full text-sm">
                {meta?.total || 0}
              </span>
            </div>
        </div>
         {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isFetching}
              className={`w-full cursor-pointer sm:w-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2`}
              title="Refresh orders"
            >
              <RefreshCw className={`h-4 w-4 sm:h-6 sm:w-6 ${!isLoading && isFetching && 'animate-spin'}`} />
              <span className="sm:hidden">Refresh</span>
            </button>
          )}
      </div>
    </div>
  )
}

export default UrlListHeader;
