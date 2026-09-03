export const mockDashboardMetrics = {
  balance: 1428.5,
  balanceWeeklyChange: 12.4,
  todayEarnings: 84.0,
  totalClicks: 14890,
  conversionRate: 3.8,
  commissionTier: "Pro",
  commissionRate: 55, // Updated from the previous value to match Pro logic.
  tierProgress: 182,
  tierGoal: 200,
  nextTierRate: 65
};

export const mockQuickLinks = {
  chill: {
    url: "chillvault.co/v/raph-commu",
    type: "chill",
    badge: "Whop Intégré"
  },
  nsfw: {
    url: "passlocker.net/v/vip-access",
    type: "nsfw",
    badge: "Content Locker"
  }
};

export const mockChartData = [
  { day: "Lundi", value: 45, earnings: 45.50 },
  { day: "Mardi", value: 62, earnings: 82.00 },
  { day: "Mercredi", value: 55, earnings: 60.00 },
  { day: "Jeudi", value: 92, earnings: 142.00 },
  { day: "Vendredi", value: 78, earnings: 95.00 },
  { day: "Samedi", value: 110, earnings: 180.00 },
  { day: "Dimanche", value: 84, earnings: 110.00 },
];

export const mockRecentActivities = [
  { id: 1, time: "Il y a 5 min", type: "NSFW", commission: 12.50, status: "completed" },
  { id: 2, time: "Il y a 12 min", type: "Chill", commission: 8.00, status: "completed" },
  { id: 3, time: "Il y a 45 min", type: "Chill", commission: 8.00, status: "completed" },
  { id: 4, time: "Il y a 1 heure", type: "NSFW", commission: 15.00, status: "completed" },
  { id: 5, time: "Il y a 2 heures", type: "Chill", commission: 0.00, status: "pending" },
];

export const mockLinks = [
  { id: "1", name: "Discord VIP Access", url: "chillvault.co/v/discord-vip", type: "chill", clicks: 5430, sales: 124, earnings: 992.00, active: true, moderationStatus: 'active' },
  { id: "2", name: "Premium Content Pack", url: "passlocker.net/v/premium-pack", type: "nsfw", clicks: 3200, sales: 85, earnings: 1275.00, active: true, moderationStatus: 'active' },
  { id: "3", name: "Formation Crypto", url: "chillvault.co/v/crypto-course", type: "chill", clicks: 1250, sales: 12, earnings: 96.00, active: true, moderationStatus: 'active' },
  { id: "4", name: "Exclusive Gallery", url: "passlocker.net/v/exclusive-gallery", type: "nsfw", clicks: 4890, sales: 210, earnings: 3150.00, active: false, moderationStatus: 'active' },
  { id: "5", name: "Telegram Signals", url: "chillvault.co/v/tg-signals", type: "chill", clicks: 890, sales: 5, earnings: 40.00, active: true, moderationStatus: 'pending' },
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
    { id: "wd-1", date: "2026-05-12", amount: 850.00, crypto: "USDT", address: "TXYZ...9AB2", status: "completed" },
    { id: "wd-2", date: "2026-05-25", amount: 420.00, crypto: "LTC", address: "Lp8X...R4k1", status: "completed" },
    { id: "wd-3", date: "2026-06-05", amount: 1500.00, crypto: "USDT", address: "TXYZ...9AB2", status: "rejected" },
    { id: "wd-4", date: "2026-06-15", amount: 600.00, crypto: "USDT", address: "TXYZ...9AB2", status: "pending" },
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

export const mockUsers = [
  {
    email: "raph@adpass-partner.com",
    password: "password123",
    role: "affiliate",
    targetUrl: "/dashboard",
  },
  {
    email: "admin@adpass.co",
    password: "adminpassword123",
    role: "admin",
    targetUrl: "/admin",
  },
];

export const mockAdminStats = {
  totalVolume: 84290.00,
  volumeChange: 18,
  netMargin: 33716.00,
  totalClicks: 420180,
  avgConversion: 4.2,
  activeAffiliates: 148,
  chillVolume: 35000.00,
  nsfwVolume: 49290.00,
};

export const mockAdminEvents = [
  { id: 1, type: "signup", message: "Nouvel affilié : crypto_king", time: "Il y a 5 min" },
  { id: 2, type: "payout", message: "Paiement validé (150 USDT) pour raph_affiliate", time: "Il y a 12 min" },
  { id: 3, type: "link", message: "Nouveau lien soumis par raph_affiliate", time: "Il y a 23 min" },
];

export const mockAdminLinks = [
  { id: "l1", date: "2026-03-12", affiliate: "raph_affiliate", campaign: "Campagne TikTok", type: "chill", url: "chillvault.co/v/abc12", destination: "https://whop.com/test", status: "pending" },
  { id: "l2", date: "2026-03-12", affiliate: "crypto_king", campaign: "NSFW Twitter", type: "nsfw", url: "passlocker.net/v/xyz98", destination: "https://example.com/nsfw", status: "pending" },
  { id: "l3", date: "2026-03-11", affiliate: "raph_affiliate", campaign: "Ancien Lien", type: "chill", url: "chillvault.co/v/old", destination: "https://whop.com/test2", status: "active" },
];

export const mockAffiliates = [
  { id: "a1", name: "Raph_Affiliate", email: "raph@adpass-partner.com", date: "2026-01-15", links: 12, balance: 428.50, totalGenerated: 12500, tier: "Pro", status: "active" },
  { id: "a2", name: "Crypto_King", email: "king@crypto.com", date: "2026-02-02", links: 3, balance: 50.00, totalGenerated: 800, tier: "Standard", status: "active" },
  { id: "a3", name: "Spammer_123", email: "spam@fake.com", date: "2026-03-10", links: 1, balance: 0, totalGenerated: 0, tier: "Standard", status: "suspended" },
];

export const mockAdminPayouts = [
  { id: "p1", date: "2026-03-12", affiliate: "raph_affiliate", amount: 428.50, crypto: "USDT TRC-20", wallet: "TWvVqR3...", status: "pending" },
  { id: "p2", date: "2026-03-11", affiliate: "Crypto_King", amount: 150.00, crypto: "LTC", wallet: "ltc1q...", status: "completed" },
];
