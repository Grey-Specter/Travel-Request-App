import Form from "@/app/ui/travel-requests/create-form";
import Breadcrumbs from "@/app/ui/travel-requests/breadcrumbs";
import { fetchEmployees } from "@/app/lib/data";

export default async function Page() {
  const employees = await fetchEmployees();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Travel Requests", href: "/dashboard/travel-requests" },
          {
            label: "Create Travel Request",
            href: "/dashboard/travel-requests/create",
            active: true,
          },
        ]}
      />
      <Form employees={employees} />
    </main>
  );
}
