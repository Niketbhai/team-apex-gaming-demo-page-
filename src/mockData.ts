/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Player, 
  Tournament, 
  Match, 
  NewsArticle, 
  MediaItem, 
  Product, 
  Sponsor, 
  RecruitmentApplication,
  OrganizationStory
} from './types';

export const INITIAL_SPONSORS: Sponsor[] = [
  {
    id: 's1',
    name: 'Intel Gaming',
    logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'Title Sponsor',
    description: 'Empowering Team Apex Gaming with the ultimate next-gen processing power for competitive esports tournaments globally.',
    website: 'https://intel.com',
    partnershipYear: '2023'
  },
  {
    id: 's2',
    name: 'Monster Energy',
    logo: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'Elite Sponsor',
    description: 'Official Energy Drink partner of Team Apex, fueling our players through rigorous bootcamp hours and grand finals stages.',
    website: 'https://monsterenergy.com',
    partnershipYear: '2022'
  },
  {
    id: 's3',
    name: 'Logitech G',
    logo: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'Tech Partner',
    description: 'Supplying industry-standard Lightspeed wireless mice, mechanical keyboards, and precision gaming headsets to our gaming rosters.',
    website: 'https://logitechg.com',
    partnershipYear: '2024'
  },
  {
    id: 's4',
    name: 'Red Bull India',
    logo: 'https://images.unsplash.com/photo-1622543953490-0b70039a4ac1?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'Nutrition Partner',
    description: 'Giving wings to Team Apex Gaming with high-energy hydration, exclusive training camps, and performance tracking programs.',
    website: 'https://redbull.com',
    partnershipYear: '2023'
  }
];

export const INITIAL_PLAYERS: Player[] = [
  // BGMI Roster
  {
    id: 'p1',
    ign: 'ApexMortal',
    realName: 'Naman Sandeep Mathur',
    role: 'IGL / Captain',
    game: 'BGMI',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=80',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    country: 'India',
    joinDate: '2021-01-15',
    statistics: {
      kdRatio: 4.85,
      matchesPlayed: 1420,
      winRate: '38%',
      mvpTitles: 42,
      kills: 6887
    },
    achievements: [
      'BGIS 2024 Grand Finals - MVP',
      'Skyesports Championship 5.0 - 1st Place',
      'BMPS Season 2 - Best Assaulter Award'
    ],
    socials: {
      twitter: 'https://twitter.com/apexmortal',
      instagram: 'https://instagram.com/apexmortal',
      youtube: 'https://youtube.com/apexmortal',
      discord: 'https://discord.gg/teamapex'
    }
  },
  {
    id: 'p2',
    ign: 'SlayerX',
    realName: 'Arjun Singh',
    role: 'Filter / Main Assaulter',
    game: 'BGMI',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    country: 'India',
    joinDate: '2022-04-10',
    statistics: {
      kdRatio: 5.12,
      matchesPlayed: 980,
      winRate: '35%',
      mvpTitles: 28,
      kills: 5017
    },
    achievements: [
      'Nodwin BGMI Masters Series - Top Fragger',
      'BMOC 2023 Champion',
      'BGIS 2024 Champion'
    ],
    socials: {
      instagram: 'https://instagram.com/slayerx_bgmi',
      youtube: 'https://youtube.com/slayerx'
    }
  },
  {
    id: 'p3',
    ign: 'ViperOp',
    realName: 'Yash Soni',
    role: 'Support / Healer',
    game: 'BGMI',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=500&q=80',
    banner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    country: 'India',
    joinDate: '2021-01-15',
    statistics: {
      kdRatio: 3.24,
      matchesPlayed: 1560,
      winRate: '39%',
      mvpTitles: 14,
      kills: 5054
    },
    achievements: [
      'PMCO South Asia 2021 - Best Support Player',
      'BGIS 2024 Champion'
    ],
    socials: {
      instagram: 'https://instagram.com/viperop_apex',
      twitter: 'https://twitter.com/viperop'
    }
  },

  // Valorant Roster
  {
    id: 'p4',
    ign: 'NeonViper',
    realName: 'Rohan Sharma',
    role: 'Duelist (Jett / Neon)',
    game: 'VALORANT',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=500&q=80',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    country: 'India',
    joinDate: '2023-02-28',
    statistics: {
      kdRatio: 1.34,
      matchesPlayed: 450,
      winRate: '62%',
      kills: 8910,
      damagePerRound: 158.4
    },
    achievements: [
      'VCSA Stage 1 2024 - MVP',
      'TEC Challenger Cup Series 9 - Winner',
      'Skyesports Souvenir 2023 - Best Duelist'
    ],
    socials: {
      twitter: 'https://twitter.com/neonviper_val',
      instagram: 'https://instagram.com/neonviper',
      youtube: 'https://youtube.com/neonviperval'
    }
  },
  {
    id: 'p5',
    ign: 'Reaper',
    realName: 'Aniket Gupta',
    role: 'Initiator (Sova / Fade)',
    game: 'VALORANT',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=500&q=80',
    banner: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&w=800&q=80',
    country: 'India',
    joinDate: '2023-02-28',
    statistics: {
      kdRatio: 1.08,
      matchesPlayed: 450,
      winRate: '62%',
      kills: 6730,
      damagePerRound: 132.8
    },
    achievements: [
      'VCSA Stage 1 2024 - Champion',
      'Convergence India 2023 - Runner Up'
    ],
    socials: {
      instagram: 'https://instagram.com/reaper_val',
      twitter: 'https://twitter.com/reaper_val'
    }
  },

  // Free Fire Max Roster
  {
    id: 'p6',
    ign: 'NinjaBoss',
    realName: 'Devendra Kumar',
    role: 'Rusher',
    game: 'FREE FIRE MAX',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&h=500&q=80',
    banner: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80',
    country: 'India',
    joinDate: '2022-09-01',
    statistics: {
      kdRatio: 6.24,
      matchesPlayed: 1150,
      winRate: '45%',
      mvpTitles: 34,
      kills: 7176
    },
    achievements: [
      'Free Fire India Invitational 2024 - Champion',
      'Asia Championship 2023 - Top 5 Fragger'
    ],
    socials: {
      instagram: 'https://instagram.com/ninjaboss_ff',
      youtube: 'https://youtube.com/ninjabossgaming'
    }
  },

  // Apex Legends Roster
  {
    id: 'p7',
    ign: 'WraithGod',
    realName: 'Kabir Mehta',
    role: 'Main Wraith / Entry',
    game: 'APEX LEGENDS',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=500&q=80',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    country: 'India',
    joinDate: '2023-01-20',
    statistics: {
      kdRatio: 4.15,
      matchesPlayed: 670,
      winRate: '28%',
      kills: 2780,
      damagePerRound: 880
    },
    achievements: [
      'ALGS South Asia Challenger Circuit - 1st Place',
      'Apex India Showdown - Grand Finals MVP'
    ],
    socials: {
      twitter: 'https://twitter.com/wraithgod_apex',
      instagram: 'https://instagram.com/wraithgod_mehta'
    }
  }
];

export const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    name: 'Battlegrounds Mobile India Series (BGIS) 2026',
    logo: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=120&h=120&q=80',
    prizePool: '₹2,00,00,000 INR',
    game: 'BGMI',
    location: 'Mumbai, India (LAN)',
    schedule: '2026-07-15 to 2026-08-01',
    status: 'Upcoming',
    description: 'The pinnacle event of Battlegrounds Mobile India, gathering the top 16 squads across India to battle for glory and a massive prize pool.',
    teamRanking: 1,
    standings: [
      { rank: 1, teamName: 'Team Apex Gaming', points: 0, played: 0, wins: 0, kills: 0, isApex: true },
      { rank: 2, teamName: 'S8UL Esports', points: 0, played: 0, wins: 0, kills: 0 },
      { rank: 3, teamName: 'GodLike Esports', points: 0, played: 0, wins: 0, kills: 0 },
      { rank: 4, teamName: 'Entity Gaming', points: 0, played: 0, wins: 0, kills: 0 },
      { rank: 5, teamName: 'Revenant Esports', points: 0, played: 0, wins: 0, kills: 0 }
    ],
    results: []
  },
  {
    id: 't2',
    name: 'Valorant Challengers South Asia (VCSA) 2026: Split 1',
    logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=120&h=120&q=80',
    prizePool: '$100,000 USD',
    game: 'VALORANT',
    location: 'Noida, India (LAN / Studio)',
    schedule: '2026-06-20 to 2026-07-05',
    status: 'Ongoing',
    description: 'VCSA is the primary pathway for South Asian teams to qualify for the VCT Ascension Pacific, featuring round-robin league play and double elimination playoffs.',
    teamRanking: 2,
    standings: [
      { rank: 1, teamName: 'Velocity Gaming', points: 18, played: 7, wins: 6 },
      { rank: 2, teamName: 'Team Apex Gaming', points: 15, played: 6, wins: 5, isApex: true },
      { rank: 3, teamName: 'Revenant Esports', points: 12, played: 6, wins: 4 },
      { rank: 4, teamName: 'True Rippers', points: 9, played: 7, wins: 3 },
      { rank: 5, teamName: 'Orangutan Esports', points: 6, played: 6, wins: 2 }
    ],
    results: [
      { roundName: 'League Week 1', opponent: 'True Rippers', result: 'WIN', score: '2 - 0', mvp: 'NeonViper' },
      { roundName: 'League Week 2', opponent: 'Velocity Gaming', result: 'LOSS', score: '1 - 2', mvp: 'Tenzing (VLT)' },
      { roundName: 'League Week 3', opponent: 'Orangutan', result: 'WIN', score: '2 - 1', mvp: 'Reaper' },
      { roundName: 'League Week 4', opponent: 'Revenant', result: 'WIN', score: '2 - 0', mvp: 'NeonViper' }
    ]
  },
  {
    id: 't3',
    name: 'Skyesports Grand Slam 2025',
    logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=120&h=120&q=80',
    prizePool: '₹50,00,000 INR',
    game: 'BGMI',
    location: 'Bangalore, India (LAN)',
    schedule: '2025-11-10 to 2025-11-15',
    status: 'Past',
    description: 'Skyesports Grand Slam is a premier third-party tournament gathering 16 elite rosters. Team Apex displayed dominating firepower to secure the gold.',
    teamRanking: 1,
    standings: [
      { rank: 1, teamName: 'Team Apex Gaming', points: 248, played: 18, wins: 5, kills: 112, isApex: true },
      { rank: 2, teamName: 'S8UL Esports', points: 215, played: 18, wins: 3, kills: 96 },
      { rank: 3, teamName: 'GodLike Esports', points: 182, played: 18, wins: 2, kills: 80 },
      { rank: 4, teamName: 'Revenant Esports', points: 160, played: 18, wins: 2, kills: 72 }
    ],
    results: [
      { roundName: 'Match 1 - Erangel', opponent: 'S8UL', result: 'WIN', score: 'Chicken Dinner (12 Kills)', mvp: 'ApexMortal' },
      { roundName: 'Match 6 - Miramar', opponent: 'GodLike', result: 'WIN', score: 'Chicken Dinner (15 Kills)', mvp: 'SlayerX' },
      { roundName: 'Match 12 - Sanhok', opponent: 'Entity', result: 'LOSS', score: '3rd Place (5 Kills)', mvp: 'Admin (ENT)' }
    ]
  }
];

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'm1',
    tournamentId: 't2',
    tournamentName: 'Valorant Challengers South Asia',
    opponent: 'Velocity Gaming',
    opponentLogo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=60&h=60&q=80',
    game: 'VALORANT',
    schedule: 'Live Now',
    status: 'Live',
    liveScore: {
      mapName: 'Bind (Map 2)',
      apexScore: 11,
      opponentScore: 9,
      statusText: 'Round 21: Spike Defused by Team Apex!',
      roundNumber: 21,
      kills: 18,
      deaths: 12
    },
    mvp: {
      name: 'NeonViper',
      stats: '24 Kills / 14 Deaths / 4 Assists',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=500&q=80'
    },
    statistics: {
      kills: 78,
      assists: 24,
      deaths: 68,
      accuracy: '64%'
    },
    streamUrl: 'https://youtube.com/live/placeholder'
  },
  {
    id: 'm2',
    tournamentId: 't2',
    tournamentName: 'Valorant Challengers South Asia',
    opponent: 'Orangutan Esports',
    opponentLogo: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=60&h=60&q=80',
    game: 'VALORANT',
    schedule: '2026-06-30T17:00:00Z',
    status: 'Upcoming'
  },
  {
    id: 'm3',
    tournamentId: 't1',
    tournamentName: 'BGIS 2026 - League Week 1',
    opponent: 'S8UL Esports',
    opponentLogo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=60&h=60&q=80',
    game: 'BGMI',
    schedule: '2026-07-16T15:30:00Z',
    status: 'Upcoming'
  },
  {
    id: 'm4',
    tournamentId: 't3',
    tournamentName: 'Skyesports Grand Slam 2025',
    opponent: 'GodLike Esports',
    opponentLogo: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=60&h=60&q=80',
    game: 'BGMI',
    schedule: '2025-11-15T18:00:00Z',
    status: 'Past',
    statistics: {
      kills: 18,
      assists: 10,
      deaths: 8
    },
    mvp: {
      name: 'SlayerX',
      stats: '6 Kills / 2 Assists (Double Headshot)',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80'
    }
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'n1',
    title: 'Team Apex Gaming Crowned Champions of Skyesports Grand Slam 2025',
    category: 'Tournament News',
    summary: 'A thrilling 5-day LAN finals in Bangalore culminated in Team Apex lifting the trophy with a massive 248 points, solidifying their status as India\'s top BGMI roster.',
    content: `Bangalore became the center of the Indian BGMI universe this week, and Team Apex Gaming walked away with the ultimate crown. Facing 15 of the toughest squads in the nation, including arch-rivals S8UL and GodLike Esports, the boys displayed an unmatched masterclass of passive-aggressive tactical gameplay.

Led by IGL Naman 'ApexMortal' Mathur, the team started off strong with a Chicken Dinner on Erangel in the very first match. While they had a rocky Day 3, falling early to an ambush by Entity Gaming, they secured vital placement points that kept them ahead.

On the final day, SlayerX went on a historic rampage in Miramar, logging 8 individual kills in a single circle contraction, sealing their 5th Chicken Dinner of the tournament. 

With a total of 248 points—including 112 finish points and 5 Chicken Dinners—Team Apex Gaming lifted the grand trophy and pocketed the winning prize of ₹25,00,000 INR. Naman 'ApexMortal' Mathur was awarded the Grand Finals MVP title for his brilliant clutch calls in key zone shifts.`,
    author: 'Karan Sen',
    authorRole: 'Esports Analyst',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&h=630&q=80',
    date: '2025-11-16'
  },
  {
    id: 'n2',
    title: 'Announcing our Elite Sponsorship with Intel Gaming for 2026',
    category: 'Announcement',
    summary: 'Team Apex Gaming is proud to announce a multi-year partnership extension with Intel Gaming as our Title Sponsor, bringing state-of-the-art power to our training boots.',
    content: `We are absolutely thrilled to share a massive milestone for Team Apex Gaming. We are officially extending our title partnership with Intel Gaming for the 2026 season. Intel has been a bedrock supporter of our organization, and this renewed partnership guarantees that all our professional rosters—across BGMI, Valorant, Free Fire Max, and Apex Legends—will train on high-end gaming rigs equipped with Intel Core processors.

"At Apex, performance is everything," said Founder and CEO Raj 'ApexKing' Vardhan. "Having Intel support our bootcamps and live stages gives our players the microsecond advantage they need to compete at a world-class level."

Fans can expect joint community giveaways, gaming bootcamps, and behind-the-scenes content highlighting how our athletes use Intel tech to analyze match replays and optimize frame rates.`,
    author: 'Riya Das',
    authorRole: 'Head of PR & Media',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&h=630&q=80',
    date: '2026-06-25'
  },
  {
    id: 'n3',
    title: 'NeonViper Dominates VCSA Split 1 MVP Race with Spectacular Jett Play',
    category: 'Team News',
    summary: 'Rohan "NeonViper" Sharma secures the top MVP spot in the ongoing Valorant Challengers South Asia Split 1 with an average combat score (ACS) of 284.',
    content: `Team Apex's Valorant division is turning heads at the Valorant Challengers South Asia Split 1, and leading the charge is none other than Rohan 'NeonViper' Sharma. His mechanical prowess on Jett and neon-like entries have left regional opponents struggling to defend sites.

In the match against True Rippers earlier this week, NeonViper secured an astonishing 24 kills on Bind, including a beautiful 1v4 clutch on A-site with a Blade Storm. His performance has propelled Team Apex Gaming into the second spot of the regional table, closely tailing Velocity Gaming.

With VCSA playoffs looming on the horizon, Coach Kabir 'Kratos' Verma remarked, "NeonViper's work ethic is second to none. He is currently sporting a 284 ACS, and we are working hard to secure that crucial top spot to represent South Asia at the Ascension tournament."`,
    author: 'Karan Sen',
    authorRole: 'Esports Analyst',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&h=630&q=80',
    date: '2026-06-27'
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'm_v1',
    type: 'video',
    title: 'Apex Mortal 1v4 Clutch Against GodLike - Skyesports LAN',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder embed
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=640&h=360&q=80',
    gameCategory: 'BGMI',
    views: 145000,
    likes: 24500,
    duration: '10:45'
  },
  {
    id: 'm_v2',
    type: 'highlight',
    title: 'Team Apex Valorant VCSA Week 4 Highlights',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=640&h=360&q=80',
    gameCategory: 'VALORANT',
    views: 89000,
    likes: 12400,
    duration: '06:12'
  },
  {
    id: 'm_p1',
    type: 'photo',
    title: 'Lifting the Skyesports Trophy 2025 Bangalore',
    url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&h=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&h=260&q=80',
    gameCategory: 'BGMI'
  },
  {
    id: 'm_p2',
    type: 'photo',
    title: 'Official Team Apex Gaming Jersey Shoot 2026',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&h=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=260&q=80'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'pr1',
    name: 'Team Apex Official Pro Jersey 2026',
    category: 'Jerseys',
    price: 1499,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=400&h=500&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=400&h=500&q=80',
    description: 'Designed for esports athletes. Moisture-wicking ultra-breathable micro-mesh fabric featuring sublimated Team Apex logos, dynamic cyberpunk side stripes, and title sponsors.',
    variants: {
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [
        { name: 'Cyber Orange', hex: '#FF6B00' },
        { name: 'Core Black', hex: '#000000' }
      ]
    },
    stock: 250,
    isFeatured: true
  },
  {
    id: 'pr2',
    name: 'Apex King Cyberpunk Hoodie',
    category: 'Hoodies',
    price: 2999,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&h=500&q=80',
    description: 'Ultra-heavyweight 420 GSM fleece fabric. Dual-tone glowing orange drawstrings, cybernetic neon sleeve prints, and an oversized aesthetic fit optimized for long gaming sessions.',
    variants: {
      sizes: ['M', 'L', 'XL'],
      colors: [
        { name: 'Matte Charcoal', hex: '#1C1C24' }
      ]
    },
    stock: 120,
    isFeatured: true
  },
  {
    id: 'pr3',
    name: 'Team Apex Mech Cap',
    category: 'Caps',
    price: 799,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&h=500&q=80',
    description: 'Esports-inspired flat-brim snapback cap. Precision-embroidered structural Team Apex Gaming initial patch in signature 3D orange embroidery with a tactical under-brim grid print.',
    variants: {
      sizes: ['Adjustable']
    },
    stock: 80,
    isFeatured: false
  },
  {
    id: 'pr4',
    name: 'Apex Speed Precision Mousepad (900x400mm)',
    category: 'Mousepads',
    price: 1199,
    originalPrice: 1499,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&h=500&q=80',
    description: 'Extended desk-mat engineered with water-resistant speed-weave textile. Heat-treated micro-textured surface and heavy-duty orange anti-fray stitched borders for optimal sensor tracking.',
    variants: {
      sizes: ['XXL']
    },
    stock: 150,
    isFeatured: true
  },
  {
    id: 'pr5',
    name: 'Apex Pro Tactical Arm Sleeves',
    category: 'Accessories',
    price: 499,
    originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&h=500&q=80',
    description: 'Seamless elastic compression sleeve designed to reduce skin friction on desk surfaces and improve arm muscle stabilization for high-accuracy aiming.',
    variants: {
      sizes: ['M', 'L']
    },
    stock: 300,
    isFeatured: false
  }
];

export const INITIAL_STORY: OrganizationStory = {
  foundedDate: '2021-01-15',
  storyContent: [
    'Founded in 2021 by gaming visionary Raj Vardhan and esports champion Yashwardhan, Team Apex Gaming emerged with a singular vision: to catapult Indian esports onto the global map with unmatched firepower, structural athleticism, and a distinct futuristic culture.',
    'Starting from a humble 4-room bootcamp in Mumbai with just a BGMI squad, the organization quickly gained a massive following thanks to its double-aggressive playing style, charismatic rosters, and world-class digital production.',
    'By 2024, Team Apex expanded into Valorant, Apex Legends, and Free Fire Max, securing premier LAN trophies, partnering with global tech leaders, and building an active fan membership network of over 10 million "Apex Predators". Today, we stand as India\'s leading esports juggernaut.'
  ],
  vision: 'To build a self-sustaining futuristic esports ecosystem in India that empowers premier gaming talent to secure world championships while bridging the gap between professional esports and physical lifestyles.',
  mission: 'To recruit, train, and nurture top-tier gaming athletes, supply them with elite physical and mental bootcamps, and produce world-class entertainment, custom apparel, and immersive media for the global gaming community.',
  timeline: [
    {
      year: '2021',
      event: 'The Awakening',
      description: 'Raj Vardhan launches Team Apex Gaming in Mumbai, signing India\'s premier BGMI stars ApexMortal and Viper.'
    },
    {
      year: '2022',
      event: 'Bootcamp Evolution',
      description: 'Established the Apex Fortress—a 12,000 sq ft hyper-bootcamp in Pune housing professional gyms, physiotherapists, and production studios.'
    },
    {
      year: '2023',
      event: 'Valorant Expansion',
      description: 'Signed the high-profile Valorant roster and entered the South Asian Challenger circuit, instantly grabbing a top 3 finish.'
    },
    {
      year: '2024',
      event: 'BGIS & LAN Domination',
      description: 'Claimed 1st place in the prestigious BGIS 2024 Grand Finals, generating a record-breaking 400k peak concurrent viewership.'
    },
    {
      year: '2025',
      event: 'Global Partners & Apparel',
      description: 'Extended partnerships with Intel and Logitech G, and launched the modular Cyber-Pro merchandise store globally.'
    }
  ],
  achievements: [
    { title: 'LAN Trophies Won', count: '14', icon: 'Trophy' },
    { title: 'Professional Athletes', count: '28', icon: 'Users' },
    { title: 'Global Fanbase', count: '12M+', icon: 'TrendingUp' },
    { title: 'Total Prize Earnings', count: '₹4.2Cr+', icon: 'DollarSign' }
  ]
};

// Initial Recruitment Applications
export const INITIAL_APPLICATIONS: RecruitmentApplication[] = [
  {
    id: 'app1',
    name: 'Suresh Kumar',
    email: 'sureshgamer@gmail.com',
    discordId: 'suresh_bgmi#9999',
    age: 19,
    game: 'BGMI',
    rank: 'Conqueror (10,000+ points)',
    achievements: 'Ranked Top 5 in BGIS 2025 open qualifiers, Semi-finalist at Skyesports rookie cup.',
    resumeUrl: 'https://example.com/suresh_resume.pdf',
    gameplayClipUrl: 'https://youtube.com/watch?v=suresh_highlights',
    status: 'Under Review',
    createdAt: '2026-06-26T12:00:00Z'
  },
  {
    id: 'app2',
    name: 'Meera Sen',
    email: 'meera_val@gmail.com',
    discordId: 'meera#1212',
    age: 21,
    game: 'VALORANT',
    rank: 'Radiant (Top 150)',
    achievements: 'Represented regional state team in local LAN events, average ACS of 260 on Sentinel/Duelist.',
    resumeUrl: 'https://example.com/meera_resume.pdf',
    gameplayClipUrl: 'https://youtube.com/watch?v=meera_aims',
    status: 'Pending',
    createdAt: '2026-06-27T08:30:00Z'
  }
];

// Helper functions for LocalStorage persistence
export function getLocalStorageData<T>(key: string, initialData: T): T {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  } catch (e) {
    return initialData;
  }
}

export function setLocalStorageData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving to LocalStorage', e);
  }
}
