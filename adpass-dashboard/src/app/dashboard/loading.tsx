import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6 md:p-8 lg:p-10">
      <div>
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-xl border border-white/5 bg-[#0D0E15]">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-3 w-40" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-xl border border-white/5 bg-[#0D0E15]">
            <Skeleton className="h-6 w-48 mb-8" />
            <Skeleton className="h-[250px] w-full" />
          </div>
          <div className="p-6 rounded-xl border border-white/5 bg-[#0D0E15]">
            <Skeleton className="h-6 w-48 mb-6" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-32 mb-2" />
          {[1, 2].map((i) => (
            <div key={i} className="p-6 rounded-xl border border-white/5 bg-[#0D0E15]">
              <Skeleton className="h-5 w-24 mb-4" />
              <Skeleton className="h-10 w-full mb-3" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
