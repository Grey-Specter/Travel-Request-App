import Image from "next/image";
import {
  UpdateTravelRequest,
  DeleteTravelRequest,
} from "@/app/ui/travel-requests/buttons";
import TravelRequestStatus from "@/app/ui/travel-requests/status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredTravelRequests } from "@/app/lib/data";

export default async function TravelRequestsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const travelRequests = await fetchFilteredTravelRequests(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {travelRequests?.map((travelRequest) => (
              <div
                key={travelRequest.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src="/F22_Sunset.jpg"
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${travelRequest.first_name}'s profile picture`}
                      />
                      <p>{travelRequest.first_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {travelRequest.first_name}
                    </p>
                  </div>
                  <TravelRequestStatus status={travelRequest.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(travelRequest.estimated_cost)}
                    </p>
                    <p>{formatDateToLocal(travelRequest.start_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateTravelRequest id={travelRequest.id} />
                    <DeleteTravelRequest id={travelRequest.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Employee
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Last Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Estimated Cost
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Start Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {travelRequests?.map((travelRequest) => (
                <tr
                  key={travelRequest.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/F22_Sunset.jpg"
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${travelRequest.first_name}'s profile picture`}
                      />
                      <p>{travelRequest.first_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {travelRequest.last_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(travelRequest.estimated_cost)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(travelRequest.start_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <TravelRequestStatus status={travelRequest.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTravelRequest id={travelRequest.id} />
                      <DeleteTravelRequest id={travelRequest.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
