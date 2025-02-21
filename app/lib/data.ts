import { sql } from "@vercel/postgres";
import {
  EmployeeField,
  EmployeesTableType,
  TravelRequestForm,
  TravelRequestsTable,
  LatestTravelRequestRaw,
  TravelMetrics,
} from "./definitions";
import { formatCurrency } from "./utils";

export async function fetchTravelMetrics() {
  try {
    console.log("Fetching revenue data...");

    const data = await sql<TravelMetrics>`SELECT * FROM travel_metrics`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchLatestTravelRequests() {
  try {
    const data = await sql<LatestTravelRequestRaw>`
      SELECT travel_requests.estimated_cost, employees.first_name, travel_requests.id
      FROM travel_requests
      JOIN employees ON travel_requests.employee_id = employees.id
      ORDER BY travel_requests.start_date DESC
      LIMIT 5`;

    const latestTravelRequest = data.rows.map((travel_request) => ({
      ...travel_request,
      estimated_cost: formatCurrency(travel_request.estimated_cost),
    }));
    return latestTravelRequest;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest travel requests.");
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const travelRequestCountPromise = sql`SELECT COUNT(*) FROM travel_requests`;
    //const employeeCountPromise = sql`SELECT COUNT(*) FROM employees`;
    const travelRequestStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'approved' THEN estimated_cost ELSE 0 END) AS "approved",
         SUM(CASE WHEN status = 'pending' THEN estimated_cost ELSE 0 END) AS "pending",
         SUM(CASE WHEN status = 'denied' THEN estimated_cost ELSE 0 END) AS "denied"
         FROM travel_requests`;

    const data = await Promise.all([
      travelRequestCountPromise,
      //employeeCountPromise,
      travelRequestStatusPromise,
    ]);

    const numberOfTravelRequests = Number(data[0].rows[0].count ?? "0");
    //const numberOfEmployees = Number(data[1].rows[0].count ?? "0");
    const totalApprovedTravelRequests = formatCurrency(
      data[1].rows[0].approved ?? "0"
    );
    const totalPendingTravelRequests = formatCurrency(
      data[1].rows[0].pending ?? "0"
    );
    const totalDeniedTravelRequests = formatCurrency(
      data[1].rows[0].pending ?? "0"
    );

    return {
      //numberOfEmployees,
      numberOfTravelRequests,
      totalApprovedTravelRequests,
      totalPendingTravelRequests,
      totalDeniedTravelRequests,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTravelRequests(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const travelRequests = await sql<TravelRequestsTable>`
      SELECT
        travel_requests.id,
        travel_requests.sponsor,
        travel_requests.project_SLIN,
        travel_requests.purpose,
        travel_requests.start_date,
        travel_requests.end_date,
        travel_requests.num_travel_days,
        travel_requests.origin,
        travel_requests.destination,
        travel_requests.pri_trans_mode,
        travel_requests.estimated_cost,
        travel_requests.status,
        employees.first_name,
        employees.last_name
      FROM travel_requests
      JOIN employees ON travel_requests.employee_id = employees.id
      WHERE
        employees.first_name ILIKE ${`%${query}%`} OR
        employees.last_name ILIKE ${`%${query}%`} OR
        travel_requests.estimated_cost::text ILIKE ${`%${query}%`} OR
        travel_requests.start_date::text ILIKE ${`%${query}%`} OR
        travel_requests.end_date::text ILIKE ${`%${query}%`} OR
        travel_requests.status ILIKE ${`%${query}%`}
      ORDER BY travel_requests.start_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return travelRequests.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch travel requests.");
  }
}

export async function fetchTravelRequestsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM travel_requests
    JOIN employees ON travel_requests.employee_id = employees.id
    WHERE
      employees.first_name ILIKE ${`%${query}%`} OR
      employees.last_name ILIKE ${`%${query}%`} OR
      travel_requests.estimated_cost::text ILIKE ${`%${query}%`} OR
      travel_requests.start_date::text ILIKE ${`%${query}%`} OR
      travel_requests.end_date::text ILIKE ${`%${query}%`} OR
      travel_requests.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of travel requests.");
  }
}

export async function fetchTravelRequestById(id: string) {
  try {
    const data = await sql<TravelRequestForm>`
      SELECT
        travel_requests.id,
        travel_requests.employee_id,
        travel_requests.sponsor,
        travel_requests.project_slin,
        travel_requests.purpose,
        travel_requests.start_date,
        travel_requests.end_date,
        travel_requests.num_travel_days,
        travel_requests.origin,
        travel_requests.destination,
        travel_requests.pri_trans_mode,
        travel_requests.estimated_cost,
        travel_requests.status
      FROM travel_requests
      WHERE travel_requests.id = ${id};
    `;

    const travelRequest = data.rows.map((travelRequest) => ({
      ...travelRequest,
      // Convert amount from cents to dollars
      estimated_cost: travelRequest.estimated_cost / 100,
    }));

    return travelRequest[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch travel request.");
  }
}

export async function fetchEmployees() {
  try {
    const data = await sql<EmployeeField>`
      SELECT
        id,
        first_name,
        last_name
      FROM employees
      ORDER BY first_name ASC
    `;

    const employees = data.rows;
    return employees;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all employees.");
  }
}

export async function fetchFilteredEmployees(query: string) {
  try {
    const data = await sql<EmployeesTableType>`
		SELECT
		  employees.id,
		  employees.first_name,
      employees.last_name,
		  COUNT(travel_requests.id) AS total_travel_requests,
		  SUM(CASE WHEN travel_requests.status = 'pending' THEN travel_requests.estimated_cost ELSE 0 END) AS total_pending,
      SUM(CASE WHEN travel_requests.status = 'approved' THEN travel_requests.estimated_cost ELSE 0 END) AS total_approved,
      SUM(CASE WHEN travel_requests.status = 'denied' THEN travel_requests.estimated_cost ELSE 0 END) AS total_denied
		FROM employees
		LEFT JOIN travel_requests ON employees.id = travel_requests.employee_id
		WHERE
		  employees.first_name ILIKE ${`%${query}%`} OR
      employees.first_name ILIKE ${`%${query}%`} OR
		GROUP BY employees.id, employees.first_name, employees.last_name
		ORDER BY employees.first_name ASC
	  `;

    const employees = data.rows.map((employee) => ({
      ...employee,
      total_pending: employee.total_pending,
      total_paid: employee.total_approved,
    }));

    return employees;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch employee table.");
  }
}
