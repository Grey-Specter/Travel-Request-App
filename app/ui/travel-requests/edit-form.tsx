"use client";

import { EmployeeField, TravelRequestForm } from "@/app/lib/definitions";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateTravelRequest } from "@/app/lib/actions";

export default function EditTravelRequestForm({
  travelRequest,
  employees,
}: {
  travelRequest: TravelRequestForm;
  employees: EmployeeField[];
}) {
  const updateTravelRequestWithId = updateTravelRequest.bind(
    null,
    travelRequest.id
  );

  return (
    <form action={updateTravelRequestWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Employee Name */}
        <div className="mb-4">
          <label htmlFor="employee" className="mb-2 block text-sm font-medium">
            Choose employee
          </label>
          <div className="relative">
            <select
              id="employee"
              name="employeeId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={travelRequest.employee_id}
            >
              <option value="" disabled>
                Select an employee
              </option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.first_name + " " + employee.last_name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Sponsor */}
        <div className="mb-4">
          <label htmlFor="sponsor" className="mb-2 block text-sm font-medium">
            Enter Sponsor
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="sponsor"
                name="sponsor"
                type="text"
                defaultValue={travelRequest.sponsor}
                placeholder="Enter sponsor"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Project SLIN */}
        <div className="mb-4">
          <label
            htmlFor="projectSLIN"
            className="mb-2 block text-sm font-medium"
          >
            Enter Project SLIN
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="projectSLIN"
                name="projectSLIN"
                type="text"
                defaultValue={travelRequest.project_slin}
                placeholder="Enter project SLIN"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Purpose */}
        <div className="mb-4">
          <label htmlFor="purpose" className="mb-2 block text-sm font-medium">
            Enter purpose
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="purpose"
                name="purpose"
                type="text"
                defaultValue={travelRequest.purpose}
                placeholder="Enter purpose"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label htmlFor="startDate" className="mb-2 block text-sm font-medium">
            Enter start date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="startDate"
                name="startDate"
                type="text"
                defaultValue={travelRequest.start_date}
                placeholder="Enter start date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* End Date */}
        {/**/}
        <div className="mb-4">
          <label htmlFor="endDate" className="mb-2 block text-sm font-medium">
            Enter end date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="endDate"
                name="endDate"
                type="text"
                defaultValue={travelRequest.end_date}
                placeholder="Enter end date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/**/}
        {/* Number of Travel Days */}
        <div className="mb-4">
          <label
            htmlFor="numTravelDays"
            className="mb-2 block text-sm font-medium"
          >
            Enter the number of travel days
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="numTravelDays"
                name="numTravelDays"
                type="number"
                defaultValue={travelRequest.num_travel_days}
                placeholder="Enter the number of travel days"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Origin */}
        <div className="mb-4">
          <label htmlFor="origin" className="mb-2 block text-sm font-medium">
            Enter origin city
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="origin"
                name="origin"
                type="text"
                defaultValue={travelRequest.origin}
                placeholder="Enter origin"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Destination */}
        <div className="mb-4">
          <label
            htmlFor="destination"
            className="mb-2 block text-sm font-medium"
          >
            Enter destination city
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="destination"
                name="destination"
                type="text"
                defaultValue={travelRequest.destination}
                placeholder="Enter destination"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Primary Transport Mode */}
        <div className="mb-4">
          <label
            htmlFor="priTransMode"
            className="mb-2 block text-sm font-medium"
          >
            Enter Primary Transportation Method
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="priTransMode"
                name="priTransMode"
                type="text"
                defaultValue={travelRequest.pri_trans_mode}
                placeholder="Enter primary transportation method"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Estimated Cost Amount */}
        <div className="mb-4">
          <label
            htmlFor="estimatedCost"
            className="mb-2 block text-sm font-medium"
          >
            Enter estimated cost
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="estimatedCost"
                name="estimatedCost"
                type="number"
                step="0.01"
                defaultValue={travelRequest.estimated_cost}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Travel Request Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the travel request status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={travelRequest.status === "pending"}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="approved"
                  name="status"
                  type="radio"
                  value="approved"
                  defaultChecked={travelRequest.status === "approved"}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="approved"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Approved <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="denied"
                  name="status"
                  type="radio"
                  value="denied"
                  defaultChecked={travelRequest.status === "denied"}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="denied"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Denied <TrashIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/travel-requests"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Travel Request</Button>
      </div>
    </form>
  );
}
