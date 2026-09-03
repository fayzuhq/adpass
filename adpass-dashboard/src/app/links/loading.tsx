import { Skeleton } from "@/components/ui/skeleton";

export default function LinksLoading() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6 md:p-8 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="p-6 rounded-xl border border-white/5 bg-[#0D0E15]">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-10 w-full sm:w-72" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
