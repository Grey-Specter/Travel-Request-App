"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

const revalPath = "/dashboard/invoices";
const redirPath = "/dashboard/invoices";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  purpose: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(["pending", "approved", "denied"]),
});

const CreateTravelRequest = FormSchema.omit({
  id: true,
});

export async function createTravelRequest(formData: FormData) {
  const { employeeId, purpose, startDate, endDate, status } =
    CreateTravelRequest.parse({
      employeeId: formData.get("employeeId"),
      purpose: formData.get("purpose"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      status: formData.get("status"),
    });

  try {
    await sql`
      INSERT INTO travel_requests (employee_id, purpose, start_date, end_date, status)
      VALUES (${employeeId}, ${purpose}, ${startDate}, ${endDate}, ${status})
      `;
  } catch (error) {
    console.error(error);
  }

  revalidatePath(revalPath);
  redirect(redirPath);
}

const UpdateTravelRequest = FormSchema.omit({ id: true });

export async function updateTravelRequest(id: string, formData: FormData) {
  const { employeeId, purpose, startDate, endDate, status } =
    UpdateTravelRequest.parse({
      employeeId: formData.get("employeeId"),
      purpose: formData.get("purpose"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      status: formData.get("status"),
    });

  //const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE travel_requests
      SET employee_id = ${employeeId}, purpose = ${purpose}, start_date = ${startDate}, end_date = ${endDate}, status = ${status}
      WHERE id = ${id}
      `;
  } catch (error) {
    console.error(error);
  }

  revalidatePath(revalPath);
  redirect(redirPath);
}

export async function deleteTravelRequest(id: string) {
  await sql`DELETE FROM travel_requests WHERE id = ${id}`;
  revalidatePath(revalPath);
}
