import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import {
  EmployeesTableType,
  FormattedEmployeesTable,
} from "@/app/lib/definitions";

export default async function EmployeesTable({
  employees,
}: {
  employees: FormattedEmployeesTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Employees
      </h1>
      <Search placeholder="Search employees..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {employees?.map((employee) => (
                  <div
                    key={employee.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src="F22_Sunset.jpg"
                              className="rounded-full"
                              alt={`${employee.first_name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{employee.first_name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {employee.last_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Pending</p>
                        <p className="font-medium">{employee.total_pending}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Approved</p>
                        <p className="font-medium">{employee.total_approved}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Denied</p>
                        <p className="font-medium">{employee.total_denied}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{employee.total_requests} travel requests</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      First Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Last Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Travel Requests
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Pending
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Total Approved
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Total Denied
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {employees.map((employee) => (
                    <tr key={employee.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src="F22_Sunset.jpg"
                            className="rounded-full"
                            alt={`${employee.first_name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{employee.first_name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {employee.last_name}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {employee.total_requests}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {employee.total_pending}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {employee.total_approved}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {employee.total_denied}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
