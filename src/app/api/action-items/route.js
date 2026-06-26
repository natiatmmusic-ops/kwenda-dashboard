import { ensureSchema, query } from "@/lib/db";

function mapRow(row) {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    owner: row.owner,
    dueDate: row.due_date
      ? new Date(row.due_date).toISOString().slice(0, 10)
      : "",
    status: row.status,
    priority: row.priority,
    notes: row.notes || "",
  };
}

export async function GET() {
  try {
    await ensureSchema();
    const result = await query(
      `SELECT * FROM action_items ORDER BY due_date ASC NULLS LAST, id ASC`
    );
    return Response.json({ success: true, items: result.rows.map(mapRow) });
  } catch (error) {
    console.error("Fetch action items error:", error);
    return Response.json(
      { error: error.message || "Failed to load action items" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await ensureSchema();
    const body = await request.json();
    const { category, title, owner, dueDate, status, priority, notes } = body;

    if (!title || !owner || !dueDate) {
      return Response.json(
        { error: "Title, owner, and due date are required" },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO action_items (category, title, owner, due_date, status, priority, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [
        category || "Weekly Action Plan",
        title,
        owner,
        dueDate,
        status || "Not Started",
        priority || "Medium",
        notes || null,
      ]
    );

    return Response.json({ success: true, item: mapRow(result.rows[0]) });
  } catch (error) {
    console.error("Create action item error:", error);
    return Response.json(
      { error: error.message || "Failed to create action item" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    await ensureSchema();
    const body = await request.json();
    const { id, ...fields } = body;

    if (!id) {
      return Response.json({ error: "Missing id" }, { status: 400 });
    }

    const columnMap = {
      category: "category",
      title: "title",
      owner: "owner",
      dueDate: "due_date",
      status: "status",
      priority: "priority",
      notes: "notes",
    };

    const updates = [];
    const values = [];
    let i = 1;

    for (const [key, column] of Object.entries(columnMap)) {
      if (fields[key] !== undefined) {
        updates.push(`${column} = $${i}`);
        values.push(fields[key]);
        i++;
      }
    }

    if (updates.length === 0) {
      return Response.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    values.push(id);

    const result = await query(
      `UPDATE action_items SET ${updates.join(", ")} WHERE id = $${i} RETURNING *`,
      values
    );

    return Response.json({ success: true, item: mapRow(result.rows[0]) });
  } catch (error) {
    console.error("Update action item error:", error);
    return Response.json(
      { error: error.message || "Failed to update action item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await ensureSchema();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Missing id" }, { status: 400 });
    }

    await query(`DELETE FROM action_items WHERE id = $1`, [id]);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete action item error:", error);
    return Response.json(
      { error: error.message || "Failed to delete action item" },
      { status: 500 }
    );
  }
}
