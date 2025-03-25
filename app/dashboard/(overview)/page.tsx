import CardWrapper from "@/app/ui/dashboard/cards";
import TravelMetricChart from "@/app/ui/dashboard/travel-metric-chart";
import LatestTravelRequests from "@/app/ui/dashboard/latest-travel-request";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import {
  CardSkeleton,
  LatestTravelRequestsSkeleton,
  TravelMetricChartSkeleton,
} from "@/app/ui/skeletons";

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<TravelMetricChartSkeleton />}>
          <TravelMetricChart />
        </Suspense>

        <Suspense fallback={<LatestTravelRequestsSkeleton />}>
          <LatestTravelRequests />
        </Suspense>
      </div>
    </main>
  );
}
