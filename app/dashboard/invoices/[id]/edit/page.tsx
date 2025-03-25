import Form from "@/app/ui/travel-requests/edit-form";
import Breadcrumbs from "@/app/ui/travel-requests/breadcrumbs";
import { fetchTravelRequestById, fetchEmployees } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [travelRequest, employees] = await Promise.all([
    fetchTravelRequestById(id),
    fetchEmployees(),
  ]);

  if (!travelRequest) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Travel Requests", href: "/dashboard/travelRequests" },
          {
            label: "Edit Travel Requests",
            href: `/dashboard/travelRequests/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form travelRequest={travelRequest} employees={employees} />
    </main>
  );
}
