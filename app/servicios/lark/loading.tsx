import { Skeleton } from "@/components/ui/skeleton"

export default function MusicPageLoader() {
  return (
    <div className="relative min-h-screen p-8">
      {/* Skeleton for MusicSection */}
      <Skeleton className="h-32 w-full md:h-48 mb-12" />

      <div className="mt-12">
        <Skeleton className="w-2/3 h-10 md:w-1/3 md:h-12 mb-4" />
        <Skeleton className="w-full h-6 md:w-2/3 mb-6" />
        <Skeleton className="w-full h-6 md:w-2/3 mb-6" />

        {/* Leaderboard Skeleton */}
        <Skeleton className="w-full h-20 mb-8" />

        {/* Alert Skeleton */}
        <div className="my-6 flex items-center space-x-2">
          <Skeleton className="h-6 w-6" />
          <div>
            <Skeleton className="h-6 w-32 mb-1" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* Blockquote Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-6 w-full md:w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>

        <div className="mt-12">
          <Skeleton className="w-2/3 h-8 md:w-1/3 md:h-10 mb-4" />
          <Skeleton className="w-full h-6 md:w-2/3 mb-4" />
          <Skeleton className="w-full h-6 md:w-2/3 mb-4" />

          {/* Carousel Skeleton */}
          <Skeleton className="w-2/3 h-8 md:w-1/3 md:h-10 mb-4" />
          <div className="mx-auto w-full max-w-3xl">
            <div className="-ml-4 flex overflow-x-auto">
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="shrink-0 basis-full pl-4 sm:basis-1/3 aspect-square rounded-md shadow-md h-48 md:h-64"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
