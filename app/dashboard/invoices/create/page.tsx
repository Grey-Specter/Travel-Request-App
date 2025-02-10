import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchEmployees } from "@/app/lib/data";

export default async function Page() {
  const employees = await fetchEmployees();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Travel Requests", href: "/dashboard/invoices" },
          {
            label: "Create Travel Request",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      <Form employees={employees} />
    </main>
  );
}
