import {
  Project,
  ImpactStat,
  Testimonial,
  Donation,
  VolunteerApplication,
  PartnershipInquiry,
  ContactMessage,
  NewsletterSubscriber,
  SiteSettings,
  FieldVideo,
  BlogPost,
} from '../types';
import {
  initialProjects,
  initialImpactStats,
  initialTestimonials,
  initialDonations,
  initialSiteSettings,
  initialVideos,
  initialBlogPosts,
} from '../data/mockData';

const STORAGE_KEYS = {
  PROJECTS: 'bk_projects_v1',
  DONATIONS: 'bk_donations_v1',
  VOLUNTEERS: 'bk_volunteers_v1',
  PARTNERSHIPS: 'bk_partnerships_v1',
  MESSAGES: 'bk_messages_v1',
  SUBSCRIBERS: 'bk_subscribers_v1',
  SETTINGS: 'bk_settings_v1',
  STATS: 'bk_stats_v1',
  TESTIMONIALS: 'bk_testimonials_v1',
  VIDEOS: 'bk_videos_v1',
  BLOG_POSTS: 'bk_blog_posts_v3',
};

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l());
}

export function subscribeToStore(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Helper to safely read from localStorage with fallback
function getJSON<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notify();
  } catch (e) {
    console.error('Storage write error', e);
  }
}

function sanitizeImagePath(path?: string): string {
  if (!path) return '';
  return path
    .replace(/^\/src\/assets\/images\//, '/images/')
    .replace(/^\/public\/assets\//, '/assets/')
    .replace(/^\/public\/images\//, '/images/');
}

// Projects
export function getProjects(): Project[] {
  const loaded = getJSON<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  return loaded.map((p) => ({
    ...p,
    imageUrl: sanitizeImagePath(p.imageUrl),
    galleryImages: (p.galleryImages || []).map(sanitizeImagePath),
  }));
}

export function getProjectById(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}

export function saveProject(project: Project): void {
  const current = getProjects();
  const index = current.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    current[index] = project;
  } else {
    current.unshift(project);
  }
  setJSON(STORAGE_KEYS.PROJECTS, current);
}

export function deleteProject(id: string): void {
  const current = getProjects().filter((p) => p.id !== id);
  setJSON(STORAGE_KEYS.PROJECTS, current);
}

// Donations
export function getDonations(): Donation[] {
  return getJSON<Donation[]>(STORAGE_KEYS.DONATIONS, initialDonations);
}

export function addDonation(donation: Donation): void {
  const current = getDonations();
  current.unshift(donation);
  setJSON(STORAGE_KEYS.DONATIONS, current);

  // If the donation is verified and points to a project, update the project's raised amount!
  if (donation.status === 'Verified' && donation.projectId && donation.projectId !== 'general') {
    const projects = getProjects();
    const projIndex = projects.findIndex((p) => p.id === donation.projectId);
    if (projIndex >= 0) {
      // Exchange rate conversion for display progress: 1 USD ≈ 15.5 GHS
      const addedGHS = donation.currency === 'USD' ? donation.amount * 15.5 : donation.amount;
      projects[projIndex].raisedAmountGHS += Math.round(addedGHS);
      setJSON(STORAGE_KEYS.PROJECTS, projects);
    }
  }
}

// Volunteer applications
export function getVolunteerApplications(): VolunteerApplication[] {
  return getJSON<VolunteerApplication[]>(STORAGE_KEYS.VOLUNTEERS, [
    {
      id: 'vol-1',
      fullName: 'Emanuel Tetteh',
      email: 'emanuel.t@example.com',
      phone: '+233 20 887 3421',
      country: 'Ghana',
      areaOfInterest: 'Clean water projects',
      skills: 'Plumbing, site logistics, community engagement',
      availability: 'Weekends & Field Expeditions',
      motivation: 'Passionate about ensuring rural children have water access before dawn.',
      status: 'Reviewed',
      adminNotes: 'Candidate has prior experience with local NGO water projects. Good fit for Adaklu phase 2.',
      createdAt: '2026-03-20T11:00:00Z',
    },
    {
      id: 'vol-2',
      fullName: 'Jennifer Miller',
      email: 'jmiller@example.com',
      phone: '+1 (202) 441-9921',
      country: 'United States',
      areaOfInterest: 'Education & Mentorship',
      skills: 'Curriculum development, STEM teaching, fundraising',
      availability: 'Remote Volunteer (5 hrs/week)',
      motivation: 'Wanting to support girls entering engineering fields through remote mentoring.',
      status: 'Pending',
      createdAt: '2026-03-25T15:20:00Z',
    }
  ]);
}

export function addVolunteerApplication(app: Omit<VolunteerApplication, 'id' | 'createdAt' | 'status'>): VolunteerApplication {
  const current = getVolunteerApplications();
  const newApp: VolunteerApplication = {
    ...app,
    id: `vol-${Date.now()}`,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };
  current.unshift(newApp);
  setJSON(STORAGE_KEYS.VOLUNTEERS, current);
  return newApp;
}

export function updateVolunteerStatus(id: string, status: VolunteerApplication['status'], adminNotes?: string): void {
  const current = getVolunteerApplications();
  const index = current.findIndex((v) => v.id === id);
  if (index >= 0) {
    current[index].status = status;
    if (adminNotes !== undefined) {
      current[index].adminNotes = adminNotes;
    }
    setJSON(STORAGE_KEYS.VOLUNTEERS, current);
  }
}

// Partnership inquiries
export function getPartnershipInquiries(): PartnershipInquiry[] {
  return getJSON<PartnershipInquiry[]>(STORAGE_KEYS.PARTNERSHIPS, [
    {
      id: 'part-1',
      organizationName: 'Global Water Foundation USA',
      contactPerson: 'David Vance',
      email: 'd.vance@globalwaterfdn.org',
      phone: '+1 (415) 880-1200',
      partnershipType: 'Institutional Grant & Technical Assistance',
      description: 'Looking to co-fund 5 additional solar boreholes across Volta and Eastern regions.',
      country: 'United States',
      status: 'In Discussion',
      createdAt: '2026-03-18T16:00:00Z',
    }
  ]);
}

export function addPartnershipInquiry(inquiry: Omit<PartnershipInquiry, 'id' | 'createdAt' | 'status'>): PartnershipInquiry {
  const current = getPartnershipInquiries();
  const newInq: PartnershipInquiry = {
    ...inquiry,
    id: `part-${Date.now()}`,
    status: 'New',
    createdAt: new Date().toISOString(),
  };
  current.unshift(newInq);
  setJSON(STORAGE_KEYS.PARTNERSHIPS, current);
  return newInq;
}

// Contact messages
export function getContactMessages(): ContactMessage[] {
  return getJSON<ContactMessage[]>(STORAGE_KEYS.MESSAGES, [
    {
      id: 'msg-1',
      name: 'Chief Nana Kofi',
      email: 'nana.kofi@example.com',
      phone: '+233 24 455 6789',
      subject: 'Request for clean water assessment in Kwahu highlands',
      category: 'Borehole Sponsorship',
      message: 'Greetings from our traditional council. We would like to request an inspection of our village stream to explore drilling a community borehole.',
      officeTarget: 'Ghana',
      status: 'Replied',
      createdAt: '2026-03-22T08:30:00Z',
    }
  ]);
}

export function addContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
  const current = getContactMessages();
  const newMsg: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    status: 'Unread',
    createdAt: new Date().toISOString(),
  };
  current.unshift(newMsg);
  setJSON(STORAGE_KEYS.MESSAGES, current);
  return newMsg;
}

// Newsletter subscribers
export function getNewsletterSubscribers(): NewsletterSubscriber[] {
  return getJSON<NewsletterSubscriber[]>(STORAGE_KEYS.SUBSCRIBERS, [
    { id: 'sub-1', email: 'supporter@gmail.com', createdAt: '2026-03-01T12:00:00Z', active: true },
    { id: 'sub-2', email: 'partner@bkhumanity.org', createdAt: '2026-03-10T14:15:00Z', active: true },
  ]);
}

export function addNewsletterSubscriber(email: string): { success: boolean; message: string } {
  const current = getNewsletterSubscribers();
  const cleanEmail = email.trim().toLowerCase();
  if (current.some((s) => s.email.toLowerCase() === cleanEmail)) {
    return { success: false, message: 'This email is already subscribed to our newsletter.' };
  }
  const newSub: NewsletterSubscriber = {
    id: `sub-${Date.now()}`,
    email: cleanEmail,
    createdAt: new Date().toISOString(),
    active: true,
  };
  current.unshift(newSub);
  setJSON(STORAGE_KEYS.SUBSCRIBERS, current);
  return { success: true, message: 'Thank you for subscribing! You will receive our monthly humanitarian field updates.' };
}

// Site Settings
export function getSiteSettings(): SiteSettings {
  const saved = getJSON<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  return {
    ...initialSiteSettings,
    ...saved,
    ghanaOffice: { ...initialSiteSettings.ghanaOffice, ...(saved.ghanaOffice || {}) },
    usaOffice: { ...initialSiteSettings.usaOffice, ...(saved.usaOffice || {}) },
    socialUrls: { ...initialSiteSettings.socialUrls, ...(saved.socialUrls || {}) },
    isSitePaused: saved.isSitePaused !== undefined ? saved.isSitePaused : initialSiteSettings.isSitePaused,
    maintenancePasscode: (!saved.maintenancePasscode || saved.maintenancePasscode === 'admin123')
      ? 'admin@2024'
      : saved.maintenancePasscode,
  };
}

export function updateSiteSettings(settings: SiteSettings): void {
  setJSON(STORAGE_KEYS.SETTINGS, settings);
}

// Impact Stats
export function getImpactStats(): ImpactStat[] {
  return getJSON<ImpactStat[]>(STORAGE_KEYS.STATS, initialImpactStats);
}

export function updateImpactStats(stats: ImpactStat[]): void {
  setJSON(STORAGE_KEYS.STATS, stats);
}

// Testimonials
export function getTestimonials(): Testimonial[] {
  return getJSON<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
}

export function saveTestimonial(testimonial: Testimonial): void {
  const current = getTestimonials();
  const index = current.findIndex((t) => t.id === testimonial.id);
  if (index >= 0) {
    current[index] = testimonial;
  } else {
    current.unshift(testimonial);
  }
  setJSON(STORAGE_KEYS.TESTIMONIALS, current);
}

export function deleteTestimonial(id: string): void {
  const current = getTestimonials().filter((t) => t.id !== id);
  setJSON(STORAGE_KEYS.TESTIMONIALS, current);
}

// Videos
export function getVideos(): FieldVideo[] {
  return getJSON<FieldVideo[]>(STORAGE_KEYS.VIDEOS, initialVideos);
}

export function saveVideo(video: FieldVideo): void {
  const current = getVideos();
  const index = current.findIndex((v) => v.id === video.id);
  if (index >= 0) {
    current[index] = video;
  } else {
    current.unshift(video);
  }
  setJSON(STORAGE_KEYS.VIDEOS, current);
}

export function deleteVideo(id: string): void {
  const current = getVideos().filter((v) => v.id !== id);
  setJSON(STORAGE_KEYS.VIDEOS, current);
}

// Blog Posts
const LEGACY_AUTHOR_MAP: Record<string, { name: string; role: string; location: string }> = {
  'Ing. Michael Addo': {
    name: 'BK Humanity Water & Sanitation Desk',
    role: 'Official Field Engineering Publication',
    location: 'Tamale & Accra, Ghana',
  },
  'Grace Serwaa Boateng': {
    name: 'BK Humanity Education & Gender Desk',
    role: 'Official Foundation Publication',
    location: 'Accra & Kumasi, Ghana',
  },
  'Kwabena Osei-Tutu': {
    name: 'BK Construction Technical Training Desk',
    role: 'Vocational Academy Publication',
    location: 'Amasaman, Greater Accra',
  },
  'Ebenezer Quaye': {
    name: 'BK Humanity Finance & Audit Committee',
    role: 'Official Governance & Audit Publication',
    location: 'Accra, Ghana',
  },
  'Patricia Mensah': {
    name: 'BK Humanity Community Liaison Desk',
    role: 'Official Field Reporting Publication',
    location: 'Volta & Eastern Regions, Ghana',
  },
};

export function getBlogPosts(): BlogPost[] {
  const loaded = getJSON<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, initialBlogPosts);
  return loaded.map((post) => {
    let author = post.author;
    if (author && LEGACY_AUTHOR_MAP[author.name]) {
      author = {
        ...author,
        ...LEGACY_AUTHOR_MAP[author.name],
      };
    }
    return {
      ...post,
      author,
      imageUrl: sanitizeImagePath(post.imageUrl),
    };
  });
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find((p) => p.slug === slug || p.id === slug);
}

export function saveBlogPost(post: BlogPost): void {
  const current = getBlogPosts();
  const index = current.findIndex((p) => p.id === post.id);
  if (index >= 0) {
    current[index] = post;
  } else {
    current.unshift(post);
  }
  setJSON(STORAGE_KEYS.BLOG_POSTS, current);
}

export function deleteBlogPost(id: string): void {
  const current = getBlogPosts().filter((p) => p.id !== id);
  setJSON(STORAGE_KEYS.BLOG_POSTS, current);
}

// Reset all store data to defaults (for testing in Admin)
export function resetStoreToDefaults(): void {
  localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  localStorage.removeItem(STORAGE_KEYS.DONATIONS);
  localStorage.removeItem(STORAGE_KEYS.VOLUNTEERS);
  localStorage.removeItem(STORAGE_KEYS.PARTNERSHIPS);
  localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  localStorage.removeItem(STORAGE_KEYS.SUBSCRIBERS);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  localStorage.removeItem(STORAGE_KEYS.STATS);
  localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
  localStorage.removeItem(STORAGE_KEYS.VIDEOS);
  localStorage.removeItem(STORAGE_KEYS.BLOG_POSTS);
  notify();
}
