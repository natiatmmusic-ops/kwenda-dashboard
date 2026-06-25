import { ensureSchema, query } from "@/lib/db";
import { calculateStats } from "@/lib/stats";

export async function GET() {
  try {
    await ensureSchema();

    const result = await query(
      `SELECT * FROM orders ORDER BY created_at DESC`
    );

    const stats = calculateStats(result.rows);

    return Response.json({ success: true, stats });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return Response.json(
      { error: error.message || "Failed to load stats" },
      { status: 500 }
    );
  }
}
