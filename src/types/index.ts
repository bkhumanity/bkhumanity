export type PillarType = 'water' | 'construction' | 'education';

export type ProjectStatus = 'Proposed' | 'Fundraising' | 'In Progress' | 'Completed' | 'On Hold';

export interface Project {
  id: string;
  title: string;
  category: 'Clean Water' | 'Construction Training' | 'Girl Child Education';
  pillar: PillarType;
  location: string;
  region: string;
  country: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  objectives: string[];
  activities: string[];
  beneficiaries: string;
  timeline: string;
  status: ProjectStatus;
  goalAmountGHS: number;
  raisedAmountGHS: number;
  imageUrl: string;
  galleryImages: string[];
  updates: { date: string; title: string; content: string }[];
  featured?: boolean;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  community: string;
  story: string;
  projectTitle: string;
  imageUrl?: string;
  isDemonstration?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Clean Water' | 'Construction Training' | 'Girl Child Education';
  imageUrl: string;
  beforeImageUrl?: string;
  comparisonNote?: string;
}

export interface FieldVideo {
  id: string;
  title: string;
  description: string;
  category: 'Clean Water' | 'Construction Training' | 'Girl Child Education';
  pillar: PillarType;
  videoUrl: string;
  thumbnailUrl: string;
  duration?: string;
  location: string;
  date: string;
  featured?: boolean;
}

export interface Donation {
  id: string;
  referenceNumber: string;
  donorName: string;
  donorEmail: string;
  donorCountry: string;
  donorPhone?: string;
  isAnonymous: boolean;
  receiveUpdates: boolean;
  message?: string;
  amount: number;
  currency: 'GHS' | 'USD';
  frequency: 'one-time' | 'monthly' | 'annually';
  projectId: string; // or 'general'
  projectName: string;
  paymentMethod: 'Paystack' | 'Mobile Money' | 'Card';
  status: 'Verified' | 'Pending' | 'Failed';
  createdAt: string;
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  areaOfInterest: string;
  skills: string;
  availability: string;
  motivation: string;
  experience?: string;
  status: 'Pending' | 'Reviewed' | 'Approved' | 'Declined';
  adminNotes?: string;
  createdAt: string;
}

export interface PartnershipInquiry {
  id: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  partnershipType: string;
  description: string;
  country: string;
  status: 'New' | 'In Discussion' | 'Partnered' | 'Closed';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  category: string;
  message: string;
  officeTarget: 'Ghana' | 'USA' | 'General';
  status: 'Unread' | 'Replied';
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  createdAt: string;
  active: boolean;
}

export interface SiteSettings {
  orgName: string;
  tagline: string;
  ghanaOffice: {
    city: string;
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
  usaOffice: {
    city: string;
    address: string;
    phone: string;
    email: string;
  };
  socialUrls: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  announcementNotice: string;
  isSitePaused: boolean;
  maintenanceHeadline: string;
  maintenanceMessage: string;
  maintenancePasscode: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string; // Markdown formatted article body
  category:
    | 'Clean Water'
    | 'Construction Training'
    | 'Girl Child Education'
    | 'Transparency'
    | 'Community Stories'
    | 'Building & Construction'
    | 'Real Estate & Housing'
    | 'Careers & NGO';
  pillar?: PillarType;
  author: {
    name: string;
    role: string;
    location: string;
    avatarUrl?: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  imageUrl: string;
  tags: string[];
  focusKeyword?: string;
  featured?: boolean;
  relatedProjectId?: string;
}
