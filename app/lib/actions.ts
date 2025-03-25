"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

const revalPath = "/dashboard/travel-requests";
const redirPath = "/dashboard/travel-requests";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  sponsor: z.string(),
  projectSLIN: z.string(),
  purpose: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  numTravelDays: z.number(),
  origin: z.string(),
  destination: z.string(),
  priTransMode: z.string(),
  estimatedCost: z.number(),
  status: z.enum(["pending", "approved", "denied"]),
});

const CreateTravelRequest = FormSchema.omit({
  id: true,
});

export async function createTravelRequest(formData: FormData) {
  const {
    employeeId,
    sponsor,
    projectSLIN,
    purpose,
    startDate,
    endDate,
    numTravelDays,
    origin,
    destination,
    priTransMode,
    estimatedCost,
    status,
  } = CreateTravelRequest.parse({
    employeeId: formData.get("employeeId"),
    sponsor: formData.get("sponsor"),
    projectSLIN: formData.get("projectSLIN"),
    purpose: formData.get("purpose"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    numTravelDays: formData.get("numTravelDays"),
    origin: formData.get("origin"),
    destination: formData.get("destination"),
    priTransMode: formData.get("priTransMode"),
    estimatedCost: formData.get("estimatedCost"),
    status: formData.get("status"),
  });
  const startDateFormatted = startDate.split("T")[0];
  const endDateFormatted = endDate.split("T")[0];

  try {
    await sql`
      INSERT INTO travel_requests (employee_id, sponsor, project_slin, purpose, start_date, end_date, num_travel_days, origin, destination, pri_trans_mode, estimated_cost, status)
      VALUES (${employeeId}, ${sponsor}, ${projectSLIN}, ${purpose}, ${startDateFormatted}, ${endDateFormatted}, ${numTravelDays}, ${origin}, ${destination}, ${priTransMode}, ${estimatedCost}, ${status})
      `;
  } catch (error) {
    console.error(error);
  }

  revalidatePath(revalPath);
  redirect(redirPath);
}

const UpdateTravelRequest = FormSchema.omit({ id: true });

export async function updateTravelRequest(id: string, formData: FormData) {
  const {
    employeeId,
    sponsor,
    projectSLIN,
    purpose,
    startDate,
    endDate,
    numTravelDays,
    origin,
    destination,
    priTransMode,
    estimatedCost,
    status,
  } = UpdateTravelRequest.parse({
    employeeId: formData.get("employeeId"),
    sponsor: formData.get("sponsor"),
    projectSLIN: formData.get("projectSLIN"),
    purpose: formData.get("purpose"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    numTravelDays: formData.get("numTravelDays"),
    origin: formData.get("origin"),
    destination: formData.get("destination"),
    priTransMode: formData.get("priTransMode"),
    estimatedCost: formData.get("estimatedCost"),
    status: formData.get("status"),
  });
  //const amountInCents = amount * 100;
  const startDateFormatted = startDate.split("T")[0];
  const endDateFormatted = endDate.split("T")[0];

  try {
    await sql`
      UPDATE travel_requests
      SET employee_id = ${employeeId}, sponsor = ${sponsor}, project_slin = ${projectSLIN}, purpose = ${purpose}, start_date = ${startDateFormatted}, end_date = ${endDateFormatted}, num_travel_days = ${numTravelDays}, origin = ${origin}, destination = ${destination}, pri_trans_mode = ${priTransMode}, estimated_cost = ${estimatedCost}, status = ${status}
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
