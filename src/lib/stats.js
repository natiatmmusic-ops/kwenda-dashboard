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

  return {
    totalOrders,
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    averageOrderValue: Math.round(averageOrderValue * 100) / 100,
    fulfilled,
    unfulfilled,
    ordersWithDiscount,
    revenueTrend,
  };
}
