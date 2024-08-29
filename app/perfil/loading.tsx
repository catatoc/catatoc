import { Skeleton } from "@/components/ui/skeleton"

export default function ProfilePageLoader() {
  return (
    <div className="px-4 py-6 lg:px-8">
      {/* Skeleton for Avatar y Nombre */}
      <div className="mb-8 text-center">
        <Skeleton className="mx-auto h-36 w-36 rounded-full" />
        <Skeleton className="mt-4 h-8 w-48 mx-auto" />
      </div>

      {/* Skeleton for "Mis Logros" */}
      <div className="mb-8">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-px w-full mb-4" />
        <div className="relative">
          <div className="flex w-96 gap-4 whitespace-nowrap rounded-md border md:w-full overflow-x-auto">
            <div className="flex space-x-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-36 w-36 shrink-0" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton for "Familia" */}
      <div className="mb-8">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-px w-full mb-4" />
        <div className="flex overflow-x-auto space-x-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-36 w-36 rounded-md" />
          ))}
        </div>
      </div>

      {/* Skeleton for "Venezuela" */}
      <div className="mb-8">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-px w-full mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-2/3 mb-2" />
      </div>

      {/* Skeleton for "Educación" */}
      <div className="mb-8">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-px w-full mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-2/3 mb-2" />
      </div>

      {/* Skeleton for "Amor por lo que hago" */}
      <div className="mb-8">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-px w-full mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-2/3 mb-2" />
      </div>
    </div>
  )
}
