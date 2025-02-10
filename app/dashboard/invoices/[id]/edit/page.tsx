import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
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
          { label: "Travel Requests", href: "/dashboard/invoices" },
          {
            label: "Edit Travel Requests",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form travelRequest={travelRequest} employees={employees} />
    </main>
  );
}
