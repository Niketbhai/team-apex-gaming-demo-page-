/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GameCategory = 
  | 'BGMI'
  | 'FREE FIRE MAX'
  | 'APEX LEGENDS'
  | 'VALORANT'
  | 'CS2'
  | 'COD MOBILE';

export interface PlayerStats {
  kdRatio?: number;
  matchesPlayed?: number;
  winRate?: string;
  headshotPct?: string;
  mvpTitles?: number;
  kills?: number;
  damagePerRound?: number;
  winCount?: number;
}

export interface PlayerSocials {
  twitter?: string;
  instagram?: string;
  youtube?: string;
  discord?: string;
}

export interface Player {
  id: string;
  ign: string;
  realName: string;
  role: string;
  game: GameCategory;
  photo: string;
  banner: string;
  country: string;
  joinDate: string;
  statistics: PlayerStats;
  achievements: string[];
  socials: PlayerSocials;
}

export interface StandingTeam {
  rank: number;
  teamName: string;
  points: number;
  played: number;
  wins: number;
  kills?: number;
  isApex?: boolean;
}

export interface TournamentMatchResult {
  roundName: string;
  opponent: string;
  result: 'WIN' | 'LOSS';
  score: string;
  mvp?: string;
}

export interface Tournament {
  id: string;
  name: string;
  logo: string;
  prizePool: string;
  game: GameCategory;
  location: string;
  schedule: string;
  status: 'Upcoming' | 'Ongoing' | 'Past';
  standings: StandingTeam[];
  results: TournamentMatchResult[];
  teamRanking: number;
  description: string;
}

export interface LiveScore {
  mapName?: string;
  apexScore: number;
  opponentScore: number;
  statusText: string;
  roundNumber?: number;
  kills?: number;
  deaths?: number;
}

export interface Match {
  id: string;
  tournamentId: string;
  tournamentName: string;
  opponent: string;
  opponentLogo: string;
  game: GameCategory;
  schedule: string;
  status: 'Live' | 'Upcoming' | 'Past';
  liveScore?: LiveScore;
  mvp?: {
    name: string;
    stats: string;
    photo: string;
  };
  statistics?: {
    kills: number;
    assists: number;
    deaths: number;
    accuracy?: string;
  };
  streamUrl?: string;
}

export type NewsCategory = 
  | 'Team News'
  | 'Tournament News'
  | 'Transfer News'
  | 'Announcement'
  | 'Community Update';

export interface NewsArticle {
  id: string;
  title: string;
  category: NewsCategory;
  content: string;
  summary: string;
  author: string;
  authorRole: string;
  image: string;
  videoEmbed?: string;
  date: string;
  scheduledAt?: string;
  isDraft?: boolean;
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'video' | 'highlight' | 'short';
  title: string;
  url: string;
  thumbnailUrl: string;
  gameCategory?: GameCategory;
  views?: number;
  likes?: number;
  duration?: string;
}

export type ProductCategory = 
  | 'Jerseys'
  | 'Hoodies'
  | 'Caps'
  | 'Mousepads'
  | 'Accessories';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  description: string;
  variants: {
    sizes?: string[];
    colors?: { name: string; hex: string }[];
  };
  stock: number;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  orderStatus: 'Placed' | 'Processing' | 'Shipped' | 'Delivered';
  customerDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
    phone: string;
  };
  trackingNumber?: string;
  couponApplied?: string;
  createdAt: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  category: 'Title Sponsor' | 'Elite Sponsor' | 'Tech Partner' | 'Nutrition Partner';
  description: string;
  website: string;
  partnershipYear: string;
}

export interface RecruitmentApplication {
  id: string;
  name: string;
  email?: string;
  discordId: string;
  age: number;
  game: GameCategory;
  rank?: string;
  achievements?: string;
  resumeUrl?: string;
  gameplayClipUrl?: string;
  status: 'Pending' | 'Under Review' | 'Accepted' | 'Declined' | 'Applied' | 'Screening' | 'Trial' | 'Decision' | 'Trial Scheduled' | 'Final Decision';
  createdAt: string;
  roleApplied?: string;
  submittedAt?: string;
  introduction?: string;
  achievementsLink?: string;
  portfolioLink?: string;
}

export type AdminRole = 
  | 'Super Admin'
  | 'Manager'
  | 'Coach'
  | 'Content Manager';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: AdminRole;
  avatar: string;
}

export interface OrganizationStory {
  foundedDate: string;
  storyContent: string[];
  vision: string;
  mission: string;
  timeline: { year: string; event: string; description: string }[];
  achievements: { title: string; count: string; icon: string }[];
}
