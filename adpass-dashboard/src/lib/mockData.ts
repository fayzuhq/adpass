export const mockDashboardMetrics = {
  balance: 1428.5,
  balanceWeeklyChange: 12.4,
  todayEarnings: 84.0,
  totalClicks: 14890,
  conversionRate: 3.8,
  commissionTier: "Pro",
  commissionRate: 60,
  tierProgress: 182,
  tierGoal: 200,
  nextTierRate: 70
};

export const mockQuickLinks = {
  chill: {
    url: "adpass.co/c/raph-commu",
    type: "chill",
    badge: "Whop Intégré"
  },
  nsfw: {
    url: "adpass.co/x/vip-access",
    type: "nsfw",
    badge: "Content Locker"
  }
};

export const mockChartData = [
  { day: "Lun", value: 45 },
  { day: "Mar", value: 62 },
  { day: "Mer", value: 55 },
  { day: "Jeu", value: 92 },
  { day: "Ven", value: 78 },
  { day: "Sam", value: 110 },
  { day: "Dim", value: 84 },
];

export const mockRecentActivities = [
  { id: 1, time: "Il y a 5 min", type: "NSFW", commission: 12.50, status: "completed" },
  { id: 2, time: "Il y a 12 min", type: "Chill", commission: 8.00, status: "completed" },
  { id: 3, time: "Il y a 45 min", type: "Chill", commission: 8.00, status: "completed" },
  { id: 4, time: "Il y a 1 heure", type: "NSFW", commission: 15.00, status: "completed" },
  { id: 5, time: "Il y a 2 heures", type: "Chill", commission: 0.00, status: "pending" },
];

export const mockLinks = [
  { id: "1", name: "Discord VIP Access", url: "adpass.co/c/discord-vip", type: "chill", clicks: 5430, sales: 124, earnings: 992.00, active: true },
  { id: "2", name: "Premium Content Pack", url: "adpass.co/x/premium-pack", type: "nsfw", clicks: 3200, sales: 85, earnings: 1275.00, active: true },
  { id: "3", name: "Formation Crypto", url: "adpass.co/c/crypto-course", type: "chill", clicks: 1250, sales: 12, earnings: 96.00, active: true },
  { id: "4", name: "Exclusive Gallery", url: "adpass.co/x/exclusive-gallery", type: "nsfw", clicks: 4890, sales: 210, earnings: 3150.00, active: false },
  { id: "5", name: "Telegram Signals", url: "adpass.co/c/tg-signals", type: "chill", clicks: 890, sales: 5, earnings: 40.00, active: true },
];

export const mockStats = {
  epc: 0.09,
  topRegions: [
    { name: "France", value: 45 },
    { name: "États-Unis", value: 22 },
    { name: "Canada", value: 15 },
    { name: "Suisse", value: 8 },
    { name: "Belgique", value: 10 },
  ],
  topSources: [
    { name: "Discord", value: 50 },
    { name: "X (Twitter)", value: 25 },
    { name: "Telegram", value: 15 },
    { name: "Direct", value: 10 },
  ],
  topLinks: [
    { name: "Exclusive Gallery", earnings: 3150.00 },
    { name: "Premium Content Pack", earnings: 1275.00 },
    { name: "Discord VIP Access", earnings: 992.00 }
  ]
};

export const mockPayouts = {
  available: 1428.50,
  pending: 210.00,
  history: [
    { id: "wd-1", date: "2024-05-12", amount: 850.00, crypto: "USDT", address: "TXYZ...9AB2", status: "completed" },
    { id: "wd-2", date: "2024-05-25", amount: 420.00, crypto: "LTC", address: "Lp8X...R4k1", status: "completed" },
    { id: "wd-3", date: "2024-06-05", amount: 1500.00, crypto: "USDT", address: "TXYZ...9AB2", status: "rejected" },
    { id: "wd-4", date: "2024-06-15", amount: 600.00, crypto: "USDT", address: "TXYZ...9AB2", status: "pending" },
  ]
};

export const mockSettings = {
  profile: {
    username: "Raph_Affiliate",
    email: "raph@adpass-partner.com"
  },
  webhook: "https://discord.com/api/webhooks/123456789/abcdef...",
  twoFactorEnabled: true
};
