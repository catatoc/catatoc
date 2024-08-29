import { Skeleton } from "@/components/ui/skeleton"

export default function MusicPageLoader() {
  return (
    <>
      <div className="hidden md:block">
        <Skeleton className="w-full h-[30vh] block dark:hidden" />
        <Skeleton className="w-full h-[30vh] hidden dark:block" />
      </div>
      <div className="md:block">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Skeleton className="hidden lg:block h-[100vh]" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Skeleton className="w-8 h-8 md:w-10 md:h-10" />
                      <Skeleton className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                  </div>

                  {/* Vista Galería Skeleton */}
                  <div className="border-none p-0 outline-none">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Skeleton className="w-48 h-6 md:w-72 md:h-8" />
                        <Skeleton className="w-32 h-4 md:w-64 md:h-5" />
                      </div>
                    </div>
                    <Skeleton className="my-4 h-[1px] w-full" />
                    <div className="relative">
                      <div className="whitespace-nowrap md:w-full">
                        <div className="flex space-x-4 pb-4 overflow-x-auto">
                          {[...Array(4)].map((_, i) => (
                            <Skeleton
                              key={i}
                              className="w-[150px] h-[220px] md:w-[250px] md:h-[330px] shrink-0"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Skeleton className="w-full h-[150px] md:h-[200px]" />
                  </div>

                  {/* Vista Diagrama Skeleton */}
                  <div className="h-full flex-col border-none p-0">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Skeleton className="w-32 h-6 md:w-48 md:h-8" />
                        <Skeleton className="w-48 h-4 md:w-64 md:h-5" />
                      </div>
                    </div>
                    <Skeleton className="my-4 h-[1px] w-full" />
                    <Skeleton className="w-full h-[250px] md:h-[400px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
