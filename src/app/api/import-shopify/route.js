import { ensureSchema, query } from "@/lib/db";
import { parseShopifyCsv } from "@/lib/shopifyParser";

export async function POST(request) {
  try {
    await ensureSchema();

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const csvText = await file.text();
    const orders = parseShopifyCsv(csvText);

    let inserted = 0;
    let skipped = 0;

    for (const order of orders) {
      const result = await query(
        `INSERT INTO orders
          (order_number, email, financial_status, fulfillment_status,
           currency, subtotal, shipping, taxes, total, discount_code, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         ON CONFLICT (order_number) DO NOTHING
         RETURNING id`,
        [
          order.order_number,
          order.email,
          order.financial_status,
          order.fulfillment_status,
          order.currency,
          order.subtotal,
          order.shipping,
          order.taxes,
          order.total,
          order.discount_code,
          order.created_at,
        ]
      );

      if (result.rowCount > 0) {
        inserted++;
      } else {
        skipped++;
      }
    }

    return Response.json({ success: true, totalRows: orders.length, inserted, skipped });
  } catch (error) {
    console.error("Import error:", error);
    return Response.json({ error: error.message || "Import failed" }, { status: 500 });
  }
}
