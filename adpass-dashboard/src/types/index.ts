export type UserRole = 'affiliate' | 'admin';
export type UserTier = 'Standard' | 'Pro' | 'Élite';
export type LinkType = 'chill' | 'nsfw';
export type ModerationStatus = 'pending' | 'active' | 'rejected';
export type PayoutStatus = 'pending' | 'completed' | 'rejected';
export type CryptoNetwork = 'USDT' | 'LTC';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tier: UserTier;
  balance: number;
  totalGenerated: number;
  status: 'active' | 'suspended';
  createdAt: string;
  password?: string;
  targetUrl?: string;
  links?: number;
}

export interface AffiliateLink {
  id: string;
  affiliateId?: string;
  affiliateName?: string;
  name: string;
  slug?: string;
  url: string;
  destination: string;
  type: LinkType;
  clicks: number;
  sales: number;
  earnings: number;
  conversionRate: number;
  moderationStatus: ModerationStatus;
  active: boolean;
  createdAt: string;
  // For backwards compatibility with existing mock fields
  campaign?: string;
  status?: string;
  date?: string;
  affiliate?: string;
}

export interface PayoutRequest {
  id: string;
  affiliateId?: string;
  affiliateName?: string;
  date: string;
  amount: number;
  crypto: CryptoNetwork | string;
  wallet: string;
  status: PayoutStatus | string;
  txid?: string;
  // For backwards compatibility with mock data
  address?: string;
  affiliate?: string;
}

export interface MetricSummary {
  balance: number;
  balanceWeeklyChange: number;
  todayEarnings: number;
  totalClicks: number;
  conversionRate: number;
  commissionTier: string;
  tierProgress: number;
  tierGoal: number;
}

export interface AdminStats {
  totalVolume: number;
  volumeChange: number;
  netMargin: number;
  totalClicks: number;
  avgConversion: number;
  activeAffiliates: number;
  chillVolume: number;
  nsfwVolume: number;
}

export interface DashboardChartData {
  day: string;
  earnings: number;
  value: number;
}

export interface RecentActivity {
  id: string;
  time: string;
  type: string;
  commission: number;
  status: string;
}

export interface AdminEvent {
  id: number | string;
  type: string;
  message: string;
  time: string;
}

export interface AdminSettingsConfig {
  domainChill: string;
  domainNsfw: string;
  tierStandard: number;
  tierPro: number;
  tierElite: number;
  minPayout: number;
}
