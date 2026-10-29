import { Project, ImpactStat, Testimonial, GalleryItem, SiteSettings, Donation, FieldVideo } from '../types';

export const initialSiteSettings: SiteSettings = {
  orgName: 'BK CONSTRUCTION',
  tagline: 'HUMANITY FOR HABITAT NGO',
  ghanaOffice: {
    city: 'Accra, Ghana',
    address: 'Plot 14, Independence Avenue, Airport Residential Area, Accra',
    phone: '+233 24 123 4567',
    email: 'ghana@bkhumanity.org',
    whatsapp: '233241234567',
  },
  usaOffice: {
    city: 'Washington, D.C., USA',
    address: '1629 K Street NW, Suite 300, Washington, D.C. 20006',
    phone: '+1 (202) 555-0189',
    email: 'usa@bkhumanity.org',
  },
  socialUrls: {
    facebook: 'https://facebook.com/bkhumanity',
    twitter: 'https://twitter.com/bkhumanity',
    instagram: 'https://instagram.com/bkhumanity',
    linkedin: 'https://linkedin.com/company/bkhumanity',
  },
  announcementNotice: 'Development Demonstration Mode: Financial figures & impact metrics are initial illustrative benchmarks editable via the Admin Dashboard.',
  isSitePaused: true,
  maintenanceHeadline: 'Official Portal Staging & Private Preparation',
  maintenanceMessage: 'Access to this public portal is temporarily paused while final domain linkage, security audits, and system configuration are being completed. Please check back soon or contact our offices below.',
  maintenancePasscode: 'admin@2024',
};

export const initialImpactStats: ImpactStat[] = [
  {
    id: 'stat-1',
    label: 'Communities Reached',
    value: 48,
    suffix: '+',
    description: 'Rural villages and peri-urban districts across Ghana benefiting from sustained interventions.',
  },
  {
    id: 'stat-2',
    label: 'Clean Water Boreholes',
    value: 32,
    suffix: ' Built',
    description: 'Fully mechanized and solar-powered boreholes delivering safe, pathogen-free water.',
  },
  {
    id: 'stat-3',
    label: 'Youth Trained',
    value: 850,
    suffix: '+',
    description: 'Young men and women certified in masonry, plumbing, electrical, and carpentry trades.',
  },
  {
    id: 'stat-4',
    label: 'Girls Supported',
    value: 1240,
    suffix: ' Scholars',
    description: 'Girls provided full tuition, uniforms, books, sanitary supplies, and mentorship.',
  },
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Adaklu Community Clean Water & Borehole System',
    category: 'Clean Water',
    pillar: 'water',
    location: 'Adaklu District, Volta Region',
    region: 'Volta Region',
    country: 'Ghana',
    shortDescription: 'Constructing a solar-powered deep aquifer borehole to serve over 2,800 residents and eliminate waterborne diseases.',
    fullDescription: 'In the rural communities of Adaklu, children and mothers previously walked up to 5 kilometers twice a day to fetch untreated turbid water from seasonal streams. This project establishes a 100-meter deep drilled borehole equipped with heavy-duty submersible solar pumping, overhead storage tanks of 10,000-liter capacity, and 4 community tap distribution points.',
    problem: 'Chronic scarcity of potable water leading to frequent cholera, typhoid, and bilharzia outbreaks, while school-age children miss instructional hours fetching water.',
    objectives: [
      'Drill an 85–100m deep hydrogeological borehole with verified yield',
      'Install solar photovoltaic arrays and a hybrid water pumping station',
      'Erect a food-grade overhead water reservoir with multi-tap distribution heads',
      'Train a local 7-member Water & Sanitation Committee (WATSAN) for lifelong maintenance'
    ],
    activities: [
      'Geophysical survey & hydrological siting',
      'Drilling, casing, and gravel packing',
      'Water chemical and biological laboratory testing',
      'Solar installation and plumbing integration',
      'Community commissioning and hygiene sensitization workshops'
    ],
    beneficiaries: '2,800 direct village residents including 850 primary school pupils.',
    timeline: 'January 2026 – June 2026',
    status: 'In Progress',
    goalAmountGHS: 120000,
    raisedAmountGHS: 86500,
    imageUrl: '/images/project_clean_water_borehole_1793198751331.jpg',
    galleryImages: [
      '/images/project_clean_water_borehole_1793198751331.jpg',
      '/images/hero_african_water_well_1793198749440.jpg',
      '/images/community_borehole_celebration_1793198752184.jpg'
    ],
    updates: [
      { date: 'March 14, 2026', title: 'Hydrological Drilling Completed', content: 'Drilling reached 92 meters with a robust yield of 115 liters per minute of crystal clear fresh water.' },
      { date: 'February 2, 2026', title: 'Community Inception Meeting', content: 'Local chiefs, elders, and women leaders gathered to formally demarcate the central borehole station.' }
    ],
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Youth Vocational Construction & Masonry Academy',
    category: 'Construction Training',
    pillar: 'construction',
    location: 'Amasaman & Tema Industrial Zone',
    region: 'Greater Accra',
    country: 'Ghana',
    shortDescription: 'Free intensive 9-month apprenticeship in modern bricklaying, steel bending, eco-friendly carpentry, and site safety.',
    fullDescription: 'Unemployment among Ghanaian youth remains a major socio-economic hurdle. BK Construction’s Vocational Academy pairs hands-on building site apprenticeships with technical certification. Trainees master foundation engineering, interlocking compressed earth brick production, roofing, and blueprint interpretation.',
    problem: 'High youth underemployment paired with a severe shortage of formally skilled, safety-certified artisans in the booming housing and infrastructure sector.',
    objectives: [
      'Enroll 150 underprivileged youth per cohort with free toolkits and protective gear',
      'Deliver COTVET-accredited modular curriculum in structural trades',
      'Facilitate paid 3-month internships with verified commercial building contractors',
      'Provide entrepreneurship coaching for artisan cooperatives'
    ],
    activities: [
      'Classroom blueprints & materials science instruction',
      'Live practical building on charitable community shelter sites',
      'Occupational health and first aid certification',
      'Graduate tool kit distribution and job placement pairing'
    ],
    beneficiaries: '150 young men and women per cohort (35% female enrollment target).',
    timeline: 'Ongoing Annual Cohorts',
    status: 'In Progress',
    goalAmountGHS: 185000,
    raisedAmountGHS: 132000,
    imageUrl: '/images/project_construction_training_1793198750855.jpg',
    galleryImages: [
      '/images/project_construction_training_1793198750855.jpg',
      '/images/hero_african_water_well_1793198749440.jpg'
    ],
    updates: [
      { date: 'April 10, 2026', title: 'Cohort 4 Practical Field Assessments', content: '48 trainees successfully cast reinforced concrete columns for a community clinic wing.' }
    ],
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Brighter Futures: Girl Child STEM & Education Grants',
    category: 'Girl Child Education',
    pillar: 'education',
    location: 'Tamale & Savelugu Municipalities',
    region: 'Northern Region',
    country: 'Ghana',
    shortDescription: 'Removing financial barriers through full secondary scholarships, solar study lamps, menstrual hygiene kits, and female role models.',
    fullDescription: 'In northern rural communities, adolescent girls face elevated dropout rates due to extreme poverty, lack of sanitary wear, and household burdens. The Brighter Futures Scholarship provides all-inclusive boarding/day school fees, complete textbook sets, solar lamps for evening homework, hygiene dignity kits, and weekly Saturday tutoring.',
    problem: 'Socioeconomic pressures causing 40%+ of rural adolescent girls to terminate schooling before completing Senior High School.',
    objectives: [
      'Provide comprehensive scholarships to 300 vulnerable adolescent girls',
      'Supply reusable sanitary packs and hygiene education to 1,200 schoolgirls',
      'Establish school STEM clubs with tablet-based digital learning',
      'Host quarterly mentorship forums with Ghanaian women in engineering, medicine, and law'
    ],
    activities: [
      'Community vulnerability verification and family engagement',
      'Tuition disbursement directly to accredited partner schools',
      'Quarterly academic performance and wellbeing reviews',
      'Leadership and career guidance summer bootcamps'
    ],
    beneficiaries: '300 scholarship recipients + 1,200 menstrual hygiene kit beneficiaries.',
    timeline: 'Academic Year 2025/2026 & 2026/2027',
    status: 'Fundraising',
    goalAmountGHS: 150000,
    raisedAmountGHS: 98000,
    imageUrl: '/images/project_girl_child_education_1793198758731.jpg',
    galleryImages: [
      '/images/project_girl_child_education_1793198758731.jpg',
      '/images/community_borehole_celebration_1793198752184.jpg'
    ],
    updates: [
      { date: 'March 28, 2026', title: 'Distribution of 600 Dignity Kits', content: 'Our outreach team delivered hygiene kits and science revision textbooks across 4 junior high schools.' }
    ],
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'Kwahu Ridge Solar-Powered Community Deep Well',
    category: 'Clean Water',
    pillar: 'water',
    location: 'Kwahu South District',
    region: 'Eastern Region',
    country: 'Ghana',
    shortDescription: 'Equipping hilltop agrarian hamlets with high-pressure solar pumped clean water and hygiene education.',
    fullDescription: 'Hilltop agrarian settlements on the Kwahu Ridge face rocky terrain that makes manual well-digging impossible. This project deploys diamond-core mechanical drilling rigs to reach deep subterranean granite fissures, installing solar panels and gravity-fed distribution pipes.',
    problem: 'Perennial water drought on highland farming settlements during dry harmattan seasons.',
    objectives: [
      'Drill through hard rock strata to tap perennial artesian water',
      'Construct a 15,000-liter overhead header tank on steel stanchions',
      'Connect piping to health post and primary school'
    ],
    activities: ['Geological acoustic sounding', 'Diamond bit drilling', 'Pipe trenching', 'Water chemistry certification'],
    beneficiaries: '3,400 rural farmers and families.',
    timeline: 'November 2025 – April 2026',
    status: 'Completed',
    goalAmountGHS: 140000,
    raisedAmountGHS: 140000,
    imageUrl: '/images/community_borehole_celebration_1793198752184.jpg',
    galleryImages: ['/images/community_borehole_celebration_1793198752184.jpg'],
    updates: [
      { date: 'April 15, 2026', title: 'Commissioning & Handover Ceremony', content: 'The deep well facility was officially handed over to the community Water Board with pure flowing water.' }
    ],
    featured: false,
  },
  {
    id: 'proj-5',
    title: 'Artisan Women in Construction Fellowship',
    category: 'Construction Training',
    pillar: 'construction',
    location: 'Kumasi Metropolitan Area',
    region: 'Ashanti Region',
    country: 'Ghana',
    shortDescription: 'Breaking gender barriers by training 60 young women in professional plumbing, electrical installation, and tile laying.',
    fullDescription: 'Women in Ghana represent less than 3% of skilled building trades. This targeted fellowship provides specialized training, personal toolkits, site mentorship, and contracts with commercial property partners, empowering young women to earn 3 to 4 times the minimum wage.',
    problem: 'Extreme gender segregation in vocational trades and lack of formal technical pathways for young women.',
    objectives: [
      'Train 60 young women in professional plumbing and domestic electrical systems',
      'Provide certified safety uniforms and professional Makita/Bosch toolboxes',
      'Secure direct apprenticeship placement on certified building projects'
    ],
    activities: ['Hands-on piping and conduit runs', 'Testing electrical safety boards', 'Job placement seminars'],
    beneficiaries: '60 young women and their dependent families.',
    timeline: 'March 2026 – November 2026',
    status: 'Fundraising',
    goalAmountGHS: 95000,
    raisedAmountGHS: 42000,
    imageUrl: '/images/project_construction_training_1793198750855.jpg',
    galleryImages: ['/images/project_construction_training_1793198750855.jpg'],
    updates: [
      { date: 'March 1, 2026', title: 'Fellowship Admissions Launched', content: 'Over 200 young women submitted applications for the inaugural Kumasi cohort.' }
    ],
    featured: false,
  },
  {
    id: 'proj-6',
    title: 'Rural Schools Library & Digital Literacy Labs',
    category: 'Girl Child Education',
    pillar: 'education',
    location: 'Akim Oda District',
    region: 'Eastern Region',
    country: 'Ghana',
    shortDescription: 'Refurbishing neglected school rooms into safe, solar-powered reading libraries and computer learning hubs.',
    fullDescription: 'Providing rural children—especially girls—with access to reading books, offline digital educational resources (Khan Academy in a Box), and comfortable desks to foster academic excellence.',
    problem: 'Complete absence of reading materials and computers in rural elementary schools.',
    objectives: [
      'Refurbish 3 school rooms with tiled floors, sturdy desks, and solar power',
      'Stock 2,500 African literature books and STEM encyclopedias',
      'Provide 15 refurbished tablets with offline curriculum software'
    ],
    activities: ['Room renovation and painting', 'Bookshelf fabrication', 'Teacher digital pedagogy training'],
    beneficiaries: '920 students across 3 community schools.',
    timeline: 'February 2026 – August 2026',
    status: 'In Progress',
    goalAmountGHS: 75000,
    raisedAmountGHS: 51200,
    imageUrl: '/images/project_girl_child_education_1793198758731.jpg',
    galleryImages: ['/images/project_girl_child_education_1793198758731.jpg'],
    updates: [
      { date: 'March 18, 2026', title: 'Solar Inverters Installed', content: 'Solar power system activated; computer charging station is fully operational.' }
    ],
    featured: false,
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Mama Akosua Dzifa',
    role: 'Market Queenmother & Mother of 4',
    community: 'Adaklu Kpetoe, Volta Region',
    story: 'For more than twenty years, our children suffered from dysentery and bilharzia because we only had the stagnant stream. Today, BK Construction gave us pure water flowing right in our center. My daughters now arrive at school on time and healthy.',
    projectTitle: 'Adaklu Community Clean Water & Borehole System',
    isDemonstration: true,
  },
  {
    id: 'test-2',
    name: 'Kwame Mensah',
    role: 'Certified Graduate Mason',
    community: 'Amasaman, Greater Accra',
    story: 'I was sitting idle at home without hope after high school. Through BK Construction’s vocational training, I learned block laying and blueprint interpretation. Now I earn regular wages on commercial building sites and can support my younger siblings.',
    projectTitle: 'Youth Vocational Construction & Masonry Academy',
    isDemonstration: true,
  },
  {
    id: 'test-3',
    name: 'Grace Osei-Bonsu',
    role: 'Senior High School Scholar',
    community: 'Savelugu, Northern Region',
    story: 'My parents could not afford boarding fees, and I was about to drop out. The Brighter Futures Scholarship covered my books, uniform, and tuition. My dream of becoming a civil engineer is alive because people cared.',
    projectTitle: 'Brighter Futures: Girl Child STEM & Education Grants',
    isDemonstration: true,
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Adaklu Village Borehole Commissioning',
    subtitle: 'Children celebrating instant access to clean, crystal-clear water',
    category: 'Clean Water',
    imageUrl: '/images/hero_african_water_well_1793198749440.jpg',
    beforeImageUrl: '/assets/aistudio/image_312ace31.png',
    comparisonNote: 'Before: Stagnant muddy stream water · After: Deep mechanized borehole water'
  },
  {
    id: 'gal-2',
    title: 'Modern Community Water Tap Station',
    subtitle: 'Overhead storage tanks and hygienic multi-tap distribution heads',
    category: 'Clean Water',
    imageUrl: '/images/project_clean_water_borehole_1793198751331.jpg',
  },
  {
    id: 'gal-3',
    title: 'Vocational Masonry Apprentices in Action',
    subtitle: 'Youth mastering level alignment, mortar mixing, and brickwork',
    category: 'Construction Training',
    imageUrl: '/images/project_construction_training_1793198750855.jpg',
  },
  {
    id: 'gal-4',
    title: 'Girl Child Collaborative STEM Learning',
    subtitle: 'Scholarship recipients studying science and mathematics textbooks',
    category: 'Girl Child Education',
    imageUrl: '/images/project_girl_child_education_1793198758731.jpg',
  },
  {
    id: 'gal-5',
    title: 'Solar Borehole Handover Celebration',
    subtitle: 'Elders and mothers welcoming sustainable water infrastructure',
    category: 'Clean Water',
    imageUrl: '/images/community_borehole_celebration_1793198752184.jpg',
  }
];

export const initialDonations: Donation[] = [
  {
    id: 'don-1',
    referenceNumber: 'BK-DON-2026-94812',
    donorName: 'Kwabena Boateng',
    donorEmail: 'k.boateng@example.com',
    donorCountry: 'Ghana',
    donorPhone: '+233 24 998 1234',
    isAnonymous: false,
    receiveUpdates: true,
    message: 'For the children of Adaklu. May this water bring health and blessings.',
    amount: 1000,
    currency: 'GHS',
    frequency: 'one-time',
    projectId: 'proj-1',
    projectName: 'Adaklu Community Clean Water & Borehole System',
    paymentMethod: 'Mobile Money',
    status: 'Verified',
    createdAt: '2026-03-24T10:14:00Z',
  },
  {
    id: 'don-2',
    referenceNumber: 'BK-DON-2026-88231',
    donorName: 'Sarah Jenkins',
    donorEmail: 'sarah.j@example.org',
    donorCountry: 'United States',
    isAnonymous: false,
    receiveUpdates: true,
    message: 'Proud to support girls in education!',
    amount: 250,
    currency: 'USD',
    frequency: 'monthly',
    projectId: 'proj-3',
    projectName: 'Brighter Futures: Girl Child STEM & Education Grants',
    paymentMethod: 'Card',
    status: 'Verified',
    createdAt: '2026-03-26T14:32:00Z',
  },
  {
    id: 'don-3',
    referenceNumber: 'BK-DON-2026-77340',
    donorName: 'Anonymous Supporter',
    donorEmail: 'donor@example.com',
    donorCountry: 'United States',
    isAnonymous: true,
    receiveUpdates: false,
    amount: 500,
    currency: 'USD',
    frequency: 'one-time',
    projectId: 'general',
    projectName: 'General Humanitarian Fund',
    paymentMethod: 'Card',
    status: 'Verified',
    createdAt: '2026-03-28T09:05:00Z',
  }
];

export const initialVideos: FieldVideo[] = [
  {
    id: 'vid-1',
    title: 'Drilling Clean Water Boreholes in Adaklu Community',
    description: 'Watch the heavy geological rotary rig drill through subterranean aquifer layers to deliver clean, potable drinking water for 2,800 villagers.',
    category: 'Clean Water',
    pillar: 'water',
    videoUrl: 'https://www.youtube.com/watch?v=kXx3t5wA4_M',
    thumbnailUrl: '/images/hero_african_water_well_1793198749440.jpg',
    duration: '3:45',
    location: 'Adaklu Kpetoe, Volta Region',
    date: 'March 2026',
    featured: true,
  },
  {
    id: 'vid-2',
    title: 'Youth Vocational Construction & Masonry Academy in Action',
    description: 'A behind-the-scenes look at our hands-on vocational workshops in Amasaman, where young apprentices learn masonry, bricklaying, and site safety.',
    category: 'Construction Training',
    pillar: 'construction',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    thumbnailUrl: '/images/project_construction_training_1793198750855.jpg',
    duration: '4:12',
    location: 'Amasaman, Greater Accra',
    date: 'February 2026',
    featured: true,
  },
  {
    id: 'vid-3',
    title: 'Brighter Futures: Girl-Child Education Scholarships',
    description: 'Interviews with scholarship recipients in Savelugu as they receive textbooks, learning supplies, and STEM mentorship to continue their education.',
    category: 'Girl Child Education',
    pillar: 'education',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '/images/project_girl_child_education_1793198758731.jpg',
    duration: '2:50',
    location: 'Savelugu, Northern Region',
    date: 'March 2026',
    featured: true,
  },
  {
    id: 'vid-4',
    title: 'Solar-Powered High-Pressure Water Station Commissioning',
    description: 'Celebrations and testimonies from community elders as solar panels power an overhead 15,000L header tank serving five distribution stands.',
    category: 'Clean Water',
    pillar: 'water',
    videoUrl: 'https://www.youtube.com/watch?v=kXx3t5wA4_M',
    thumbnailUrl: '/images/community_borehole_celebration_1793198752184.jpg',
    duration: '5:10',
    location: 'Kwahu South District, Eastern Region',
    date: 'April 2026',
    featured: false,
  }
];
