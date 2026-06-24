function parseCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function toNumber(value) {
  if (!value) return 0;
  const n = parseFloat(value.replace(/[^0-9.-]/g, ""));
  return Number.isNaN(n) ? 0 : n;
}

export function parseShopifyCsv(csvText) {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((h) => h.trim());
  const rows = lines.slice(1);
  const orders = [];

  for (const line of rows) {
    const values = parseCsvLine(line);
    const row = {};
    headers.forEach((header, i) => {
      row[header] = values[i] ?? "";
    });

    if (!row["Name"]) continue;

    orders.push({
      order_number: row["Name"],
      email: row["Email"] || null,
      financial_status: row["Financial Status"] || null,
      fulfillment_status: row["Fulfillment Status"] || null,
      currency: row["Currency"] || "USD",
      subtotal: toNumber(row["Subtotal"]),
      shipping: toNumber(row["Shipping"]),
      taxes: toNumber(row["Taxes"]),
      total: toNumber(row["Total"]),
      discount_code: row["Discount Code"] || null,
      created_at: row["Created at"] ? new Date(row["Created at"]) : null,
    });
  }

  const uniqueByOrder = new Map();
  for (const order of orders) {
    if (!uniqueByOrder.has(order.order_number)) {
      uniqueByOrder.set(order.order_number, order);
    }
  }

  return Array.from(uniqueByOrder.values());
}
