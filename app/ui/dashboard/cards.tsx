import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";

const iconMap = {
  approved: BanknotesIcon,
  //employees: UserGroupIcon,
  pending: ClockIcon,
  denied: TrashIcon,
  travelRequests: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfTravelRequests,
    //numberOfEmployees,
    totalApprovedTravelRequests,
    totalPendingTravelRequests,
    totalDeniedTravelRequests,
  } = await fetchCardData();

  return (
    <>
      <Card
        title="Approved"
        value={totalApprovedTravelRequests}
        type="approved"
      />
      <Card title="Pending" value={totalPendingTravelRequests} type="pending" />
      <Card title="Denied" value={totalDeniedTravelRequests} type="denied" />
      <Card
        title="Total Travel Requests"
        value={numberOfTravelRequests}
        type="travelRequests"
      />
      {/*}
      <Card
        title="Total Employees"
        value={numberOfEmployees}
        type="employees"
      />
      */}
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "travelRequests" | "pending" | "approved" | "denied";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
