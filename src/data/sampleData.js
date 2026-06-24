// Fake sample data — replace with real API / database calls later.

export const salesSummary = {
  totalSalesThisMonth: 0,
  onlineSales: 0,
  kioskSales: 0,
  orders: 0,
  avgOrderValue: 0,
  bestSellingProduct: "Zip up",
  monthOverMonthChange: 0,
};

export const monthlySalesTrend = [
  { month: "Jan", online: 18200, kiosk: 9800 },
  { month: "Feb", online: 19800, kiosk: 10200 },
  { month: "Mar", online: 21400, kiosk: 11000 },
  { month: "Apr", online: 24300, kiosk: 12400 },
  { month: "May", online: 27600, kiosk: 13900 },
  { month: "Jun", online: 31400, kiosk: 16850 },
];

export const salesByChannel = [
  { name: "Online", value: 0 },
  { name: "Kiosk", value: 0 },
];

export const topProducts = [
  { name: "Onyx Cargo Pant", units: 184, revenue: 14352 },
  { name: "Ashfield Hoodie", units: 152, revenue: 12768 },
  { name: "Mono Tee — Bone", units: 211, revenue: 7596 },
  { name: "Field Jacket 02", units: 64, revenue: 9920 },
  { name: "Tag Cap", units: 98, revenue: 2842 },
];

export const socialSummary = {
  instagramViews: 1,
  instagramFollowers: 14,
  tiktokViews: 1,
  websiteVisits: 1,
  engagementRate: 6.8,
  followerGrowthThisWeek: 1.9,
};

export const weeklyGrowth = [
  { week: "W1", instagram: 35200, tiktok: 0, visits: 0 },
  { week: "W2", instagram: 36100, tiktok: 0, visits: 0 },
  { week: "W3", instagram: 37000, tiktok: 0, visits: 0 },
  { week: "W4", instagram: 38200, tiktok: 0, visits: 0 },
];

export const calendarEvents = [
  { id: 1, date: "2026-06-03", title: "Studio Photoshoot — Drop 04", type: "photoshoot" },
  { id: 2, date: "2026-06-08", title: "Content Day — Reels Batch", type: "content" },
  { id: 3, date: "2026-06-12", title: "Pop-up — Boston Warehouse", type: "popup" },
  { id: 4, date: "2026-06-18", title: "Mid-Season Sale Campaign", type: "sale" },
  { id: 5, date: "2026-06-24", title: "Drop 04 Launch", type: "drop" },
  { id: 6, date: "2026-06-27", title: "Content Day — TikTok Series", type: "content" },
];

export const eventTypeStyles = {
  photoshoot: { label: "Photoshoot", dot: "bg-tag" },
  content: { label: "Content Day", dot: "bg-ash" },
  popup: { label: "Pop-up Event", dot: "bg-ink" },
  sale: { label: "Sale Campaign", dot: "bg-fog" },
  drop: { label: "Drop Date", dot: "bg-ink" },
};

export const actionPlans = [
  {
    id: 1,
    category: "Weekly Action Plan",
    title: "Finalize Drop 04 sizing chart",
    owner: "Amara",
    dueDate: "2026-06-24",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 2,
    category: "Sales Plan",
    title: "Kiosk restock — Boston pop-up",
    owner: "Devon",
    dueDate: "2026-06-20",
    status: "Not Started",
    priority: "High",
  },
  {
    id: 3,
    category: "Marketing Plan",
    title: "Q3 influencer seeding list",
    owner: "Priya",
    dueDate: "2026-06-30",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: 4,
    category: "Content Plan",
    title: "Edit Drop 04 teaser reel",
    owner: "Jonas",
    dueDate: "2026-06-22",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 5,
    category: "Future Drop Plan",
    title: "Source fabric for Drop 05 outerwear",
    owner: "Amara",
    dueDate: "2026-07-15",
    status: "Not Started",
    priority: "Medium",
  },
  {
    id: 6,
    category: "Weekly Action Plan",
    title: "Reconcile June kiosk cash drawer",
    owner: "Devon",
    dueDate: "2026-06-21",
    status: "Done",
    priority: "Low",
  },
];

export const futureDrops = [
  {
    id: 1,
    name: "Drop 04 — Onyx Field",
    productType: "Outerwear / Pants",
    plannedDate: "2026-06-24",
    photoshootDate: "2026-06-03",
    inventoryStatus: "Ready",
    marketingStatus: "In Progress",
    launchStatus: "Scheduled",
  },
  {
    id: 2,
    name: "Drop 05 — Bone Archive",
    productType: "Knitwear",
    plannedDate: "2026-07-22",
    photoshootDate: "2026-07-05",
    inventoryStatus: "In Production",
    marketingStatus: "Not Started",
    launchStatus: "Planning",
  },
  {
    id: 3,
    name: "Capsule — Tag Series 02",
    productType: "Accessories",
    plannedDate: "2026-08-10",
    photoshootDate: "2026-07-28",
    inventoryStatus: "Sourcing",
    marketingStatus: "Not Started",
    launchStatus: "Planning",
  },
  {
    id: 4,
    name: "Drop 03 — Ashfield (restock)",
    productType: "Hoodies",
    plannedDate: "2026-06-15",
    photoshootDate: "2026-05-20",
    inventoryStatus: "Ready",
    marketingStatus: "Ready",
    launchStatus: "Live",
  },
];

export const statusStyles = {
  "Not Started": "bg-mist text-ink",
  "In Progress": "bg-ash text-bone",
  Done: "bg-ink text-bone",
  Ready: "bg-ink text-bone",
  "In Production": "bg-ash text-bone",
  Sourcing: "bg-mist text-ink",
  Scheduled: "bg-ink text-bone",
  Planning: "bg-mist text-ink",
  Live: "bg-tag text-bone",
};

export const priorityStyles = {
  Low: "border-mist text-ash",
  Medium: "border-ash text-ash",
  High: "border-tag text-tag",
};
