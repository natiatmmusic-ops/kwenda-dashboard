export function calculateStats(orders) {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const fulfilled = orders.filter(
    (o) => (o.fulfillment_status || "").toLowerCase() === "fulfilled"
  ).length;

  const unfulfilled = totalOrders - fulfilled;
  const ordersWithDiscount = orders.filter((o) => o.discount_code).length;

  const revenueByDay = {};
  for (const order of orders) {
    if (!order.created_at) continue;
    const day = new Date(order.created_at).toISOString().slice(0, 10);
    revenueByDay[day] = (revenueByDay[day] || 0) + Number(order.total || 0);
  }

  const revenueTrend = Object.entries(revenueByDay)
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .map(([date, revenue]) => ({ date, revenue: Math.round(revenue * 100) / 100 }));

  // This month vs last month
  const now = new Date();
  const thisMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthKey = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, "0")}`;

  let thisMonthRevenue = 0;
  let thisMonthOrders = 0;
  let lastMonthRevenue = 0;

  for (const order of orders) {
    if (!order.created_at) continue;
    const monthKey = new Date(order.created_at).toISOString().slice(0, 7);
    if (monthKey === thisMonthKey) {
      thisMonthRevenue += Number(order.total || 0);
      thisMonthOrders += 1;
    } else if (monthKey === lastMonthKey) {
      lastMonthRevenue += Number(order.total || 0);
    }
  }

  const monthOverMonthChange =
    lastMonthRevenue > 0
      ? Math.round(((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 1000) / 10
      : 0;

  return {
    totalOrders,
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    averageOrderValue: Math.round(averageOrderValue * 100) / 100,
    fulfilled,
    unfulfilled,
    ordersWithDiscount,
    revenueTrend,
    thisMonthRevenue: Math.round(thisMonthRevenue * 100) / 100,
    thisMonthOrders,
    lastMonthRevenue: Math.round(lastMonthRevenue * 100) / 100,
    monthOverMonthChange,
  };
}
export function calculateMonthlyTrend(orders, monthsBack = 6) {
  const now = new Date();
  const buckets = [];

  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleString("en-US", { month: "short" });
    buckets.push({ key, month: label, revenue: 0 });
  }

  const map = new Map(buckets.map((b) => [b.key, b]));

  for (const order of orders) {
    if (!order.created_at) continue;
    const key = new Date(order.created_at).toISOString().slice(0, 7);
    if (map.has(key)) {
      map.get(key).revenue += Number(order.total || 0);
    }
  }

  return buckets.map((b) => ({
    month: b.month,
    revenue: Math.round(b.revenue * 100) / 100,
  }));
}
