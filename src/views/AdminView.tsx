import React, { useState } from 'react';
import {
  Project,
  Donation,
  VolunteerApplication,
  PartnershipInquiry,
  ContactMessage,
  SiteSettings,
  ImpactStat,
  FieldVideo,
} from '../types';
import {
  saveProject,
  deleteProject,
  updateVolunteerStatus,
  updateSiteSettings,
  updateImpactStats,
  resetStoreToDefaults,
  saveVideo,
  deleteVideo,
} from '../services/storage';
import {
  ShieldCheck,
  Lock,
  LogOut,
  FolderKanban,
  Heart,
  Users,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Download,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  Search,
  Film,
  Play,
} from 'lucide-react';

interface AdminViewProps {
  projects: Project[];
  donations: Donation[];
  volunteers: VolunteerApplication[];
  partnerships: PartnershipInquiry[];
  messages: ContactMessage[];
  settings: SiteSettings;
  stats: ImpactStat[];
  videos: FieldVideo[];
  onNavigate: (view: string) => void;
  onPlayVideo?: (video: FieldVideo) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  projects,
  donations,
  volunteers,
  partnerships,
  messages,
  settings,
  stats,
  videos,
  onNavigate,
  onPlayVideo,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active admin tab
  const [adminTab, setAdminTab] = useState<'overview' | 'projects' | 'donations' | 'volunteers' | 'inquiries' | 'settings' | 'videos'>('overview');

  // Project modal state
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Video modal state
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Partial<FieldVideo> | null>(null);

  // Settings form state
  const [editSettings, setEditSettings] = useState<SiteSettings>(settings);
  const [editStats, setEditStats] = useState<ImpactStat[]>(stats);
  const [settingsSavedMsg, setSettingsSavedMsg] = useState(false);

  // Donation search
  const [donationSearch, setDonationSearch] = useState('');

  // Authentication check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    // Development demo credentials provided for immediate testing
    if (
      (emailInput === 'admin@bkhumanity.org' || emailInput === 'admin') &&
      passwordInput === 'admin123'
    ) {
      setIsAuthenticated(true);
    } else {
      setLoginError('Invalid credentials. Use demo: admin@bkhumanity.org / admin123');
    }
  };

  const handleQuickDemoLogin = () => {
    setEmailInput('admin@bkhumanity.org');
    setPasswordInput('admin123');
    setIsAuthenticated(true);
  };

  // CSV Exporters
  const exportDonationsCSV = () => {
    const headers = ['Reference', 'Donor Name', 'Email', 'Amount', 'Currency', 'Project', 'Status', 'Date'];
    const rows = donations.map((d) => [
      d.referenceNumber,
      `"${d.donorName}"`,
      d.donorEmail,
      d.amount,
      d.currency,
      `"${d.projectName}"`,
      d.status,
      d.createdAt,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bk_donations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportVolunteersCSV = () => {
    const headers = ['Full Name', 'Email', 'Phone', 'Country', 'Area of Interest', 'Availability', 'Status', 'Date'];
    const rows = volunteers.map((v) => [
      `"${v.fullName}"`,
      v.email,
      v.phone,
      v.country,
      `"${v.areaOfInterest}"`,
      `"${v.availability}"`,
      v.status,
      v.createdAt,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bk_volunteers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Project handlers
  const handleOpenAddProject = () => {
    setEditingProject({
      id: `proj-${Date.now()}`,
      title: '',
      category: 'Clean Water',
      pillar: 'water',
      location: '',
      region: 'Volta Region',
      country: 'Ghana',
      shortDescription: '',
      fullDescription: '',
      problem: '',
      objectives: ['Complete hydrological survey', 'Equip solar pump'],
      activities: ['Site clearing', 'Aquifer drilling'],
      beneficiaries: '',
      timeline: '6 Months',
      status: 'Proposed',
      goalAmountGHS: 100000,
      raisedAmountGHS: 0,
      imageUrl: '/images/project_clean_water_borehole_1793198751331.jpg',
      galleryImages: [],
      updates: [],
    });
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (proj: Project) => {
    setEditingProject({ ...proj });
    setIsProjectModalOpen(true);
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject.shortDescription) return;
    saveProject(editingProject as Project);
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to permanently delete project: "${title}"? This action cannot be undone.`)) {
      deleteProject(id);
    }
  };

  // Video management handlers
  const handleOpenAddVideo = () => {
    setEditingVideo({
      id: '',
      title: '',
      description: '',
      category: 'Clean Water',
      pillar: 'water',
      videoUrl: '',
      thumbnailUrl: '/images/hero_african_water_well_1793198749440.jpg',
      duration: '3:30',
      location: 'Adaklu, Volta Region',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    });
    setIsAddVideoModalOpen(true);
  };

  const handleEditVideo = (v: FieldVideo) => {
    setEditingVideo({ ...v });
    setIsAddVideoModalOpen(true);
  };

  const handleSaveVideoForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo || !editingVideo.title || !editingVideo.videoUrl) return;
    const cat = editingVideo.category || 'Clean Water';
    const pillar = cat === 'Clean Water' ? 'water' : cat === 'Construction Training' ? 'construction' : 'education';
    const videoToSave: FieldVideo = {
      id: editingVideo.id || `vid-${Date.now()}`,
      title: editingVideo.title,
      description: editingVideo.description || '',
      category: cat,
      pillar,
      videoUrl: editingVideo.videoUrl,
      thumbnailUrl: editingVideo.thumbnailUrl || '/images/hero_african_water_well_1793198749440.jpg',
      duration: editingVideo.duration || '3:30',
      location: editingVideo.location || 'Ghana',
      date: editingVideo.date || 'April 2026',
      featured: editingVideo.featured || false,
    };
    saveVideo(videoToSave);
    setIsAddVideoModalOpen(false);
    setEditingVideo(null);
  };

  const handleDeleteVideo = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete video: "${title}"?`)) {
      deleteVideo(id);
    }
  };

  // Settings save handler
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(editSettings);
    updateImpactStats(editStats);
    setSettingsSavedMsg(true);
    setTimeout(() => setSettingsSavedMsg(false), 3000);
  };

  // Calculations for Overview
  const totalDonationsGHS = donations
    .filter((d) => d.status === 'Verified' && d.currency === 'GHS')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalDonationsUSD = donations
    .filter((d) => d.status === 'Verified' && d.currency === 'USD')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // If not logged in, show secure login box
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F2942] font-display">
              NGO Staff & Admin Portal
            </h2>
            <p className="text-xs text-slate-500">
              Authorized access to manage donations, project verification, and field applications.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Work Email
              </label>
              <input
                type="text"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@bkhumanity.org"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0F2942] hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Log In to Admin Dashboard</span>
            </button>
          </form>

          {/* Quick Demo Login Shortcut */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2">
            <span className="text-[11px] text-slate-500 block">Instant Evaluation Access:</span>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              ⚡ Quick 1-Click Demo Login
            </button>
            <p className="text-[10px] text-slate-400">
              Demo credentials: <span className="font-mono">admin@bkhumanity.org</span> / <span className="font-mono">admin123</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24">
      {/* Top Admin Header */}
      <section className="bg-[#0F2942] text-white py-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display leading-tight">
                BK Construction — Executive Management Portal
              </h1>
              <p className="text-xs text-slate-300">
                Ghana & USA Unified Operations Center · Logged in as <span className="font-semibold text-emerald-400">admin@bkhumanity.org</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              View Public Site
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3.5 py-1.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Admin Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: FolderKanban },
            { id: 'projects', label: `Projects (${projects.length})`, icon: FolderKanban },
            { id: 'donations', label: `Donations (${donations.length})`, icon: Heart },
            { id: 'volunteers', label: `Volunteers (${volunteers.length})`, icon: Users },
            { id: 'inquiries', label: `Messages (${messages.length})`, icon: MessageSquare },
            { id: 'videos', label: `Field Videos (${videos.length})`, icon: Film },
            { id: 'settings', label: 'Site Settings & Stats', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-[#0F2942] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TAB 1: OVERVIEW
        ========================================================================= */}
        {adminTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Verified Raised (GHS)</span>
                <div className="text-2xl font-extrabold text-[#0F2942] font-display tabular-nums">
                  GH₵{totalDonationsGHS.toLocaleString()}
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold block">From verified Paystack & MoMo</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Verified Raised (USD)</span>
                <div className="text-2xl font-extrabold text-[#0F2942] font-display tabular-nums">
                  ${totalDonationsUSD.toLocaleString()}
                </div>
                <span className="text-[11px] text-sky-700 font-semibold block">From international diaspora</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Active Field Projects</span>
                <div className="text-2xl font-extrabold text-[#0F2942] font-display tabular-nums">
                  {projects.filter((p) => p.status === 'In Progress' || p.status === 'Fundraising').length}
                </div>
                <span className="text-[11px] text-slate-500 block">Across 5 regions of Ghana</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Pending Volunteers</span>
                <div className="text-2xl font-extrabold text-[#0F2942] font-display tabular-nums">
                  {volunteers.filter((v) => v.status === 'Pending').length}
                </div>
                <span className="text-[11px] text-amber-700 font-semibold block">Awaiting screening</span>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#0F2942] font-display">
                Recent Contributions & Applications
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Reference / Name</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Details</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {donations.slice(0, 4).map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50/60">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{d.donorName}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold text-[10px]">
                            Donation
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold">
                          {d.currency === 'GHS' ? 'GH₵' : '$'}{d.amount.toLocaleString()} · {d.projectName}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500">{new Date(d.createdAt).toLocaleDateString()}</td>
                        <td className="py-2.5 px-3 font-semibold text-emerald-700">{d.status}</td>
                      </tr>
                    ))}
                    {volunteers.slice(0, 3).map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50/60">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{v.fullName}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 font-semibold text-[10px]">
                            Volunteer
                          </span>
                        </td>
                        <td className="py-2.5 px-3">{v.areaOfInterest} ({v.country})</td>
                        <td className="py-2.5 px-3 text-slate-500">{new Date(v.createdAt).toLocaleDateString()}</td>
                        <td className="py-2.5 px-3">
                          <span className="text-amber-700 font-semibold">{v.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: PROJECT MANAGEMENT
        ========================================================================= */}
        {adminTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#0F2942] font-display">
                  Project Portfolio Management
                </h3>
                <p className="text-xs text-slate-500">
                  Add, update, or remove borehole, training, and scholarship projects.
                </p>
              </div>

              <button
                onClick={handleOpenAddProject}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Project</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Project Title</th>
                      <th className="py-3 px-3">Pillar / Category</th>
                      <th className="py-3 px-3">Location</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Raised / Goal (GHS)</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {projects.map((proj) => {
                      const pct = Math.min(100, Math.round((proj.raisedAmountGHS / proj.goalAmountGHS) * 100));
                      return (
                        <tr key={proj.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4 font-bold text-slate-900 max-w-xs">{proj.title}</td>
                          <td className="py-3 px-3">{proj.category}</td>
                          <td className="py-3 px-3">{proj.location}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                              {proj.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 tabular-nums">
                            GH₵{proj.raisedAmountGHS.toLocaleString()} / GH₵{proj.goalAmountGHS.toLocaleString()}
                            <span className="text-emerald-700 font-bold ml-1">({pct}%)</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEditProject(proj)}
                                className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-md transition-colors"
                                title="Edit Project"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id, proj.title)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                                title="Delete Project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: DONATIONS MANAGEMENT
        ========================================================================= */}
        {adminTab === 'donations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#0F2942] font-display">
                  Donations & Transaction Audit
                </h3>
                <p className="text-xs text-slate-500">
                  Search, verify, and export all donor contributions.
                </p>
              </div>

              <button
                onClick={exportDonationsCSV}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by donor name, email, or ref..."
                value={donationSearch}
                onChange={(e) => setDonationSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Reference</th>
                      <th className="py-3 px-3">Donor</th>
                      <th className="py-3 px-3">Amount</th>
                      <th className="py-3 px-3">Project</th>
                      <th className="py-3 px-3">Method</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {donations
                      .filter(
                        (d) =>
                          d.donorName.toLowerCase().includes(donationSearch.toLowerCase()) ||
                          d.donorEmail.toLowerCase().includes(donationSearch.toLowerCase()) ||
                          d.referenceNumber.toLowerCase().includes(donationSearch.toLowerCase())
                      )
                      .map((d) => (
                        <tr key={d.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">{d.referenceNumber}</td>
                          <td className="py-3 px-3">
                            <span className="font-semibold block">{d.donorName}</span>
                            <span className="text-[10px] text-slate-400">{d.donorEmail}</span>
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-emerald-800">
                            {d.currency === 'GHS' ? 'GH₵' : '$'}{d.amount.toLocaleString()}
                            <span className="text-[10px] text-slate-400 font-normal block capitalize">{d.frequency}</span>
                          </td>
                          <td className="py-3 px-3 max-w-xs truncate">{d.projectName}</td>
                          <td className="py-3 px-3">{d.paymentMethod}</td>
                          <td className="py-3 px-3 text-slate-500">{new Date(d.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800">
                              {d.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: VOLUNTEER APPLICATIONS
        ========================================================================= */}
        {adminTab === 'volunteers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#0F2942] font-display">
                  Volunteer Candidate Applications
                </h3>
                <p className="text-xs text-slate-500">
                  Review applicant profiles, change screening status, and save internal coordination notes.
                </p>
              </div>

              <button
                onClick={exportVolunteersCSV}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="space-y-4">
              {volunteers.map((vol) => (
                <div key={vol.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{vol.fullName}</h4>
                      <p className="text-xs text-slate-500">
                        {vol.email} · {vol.phone} · {vol.country}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={vol.status}
                        onChange={(e) => updateVolunteerStatus(vol.id, e.target.value as any)}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Pending">Pending Review</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Approved">Approved</option>
                        <option value="Declined">Declined</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Interest:</span>
                      <span className="font-semibold">{vol.areaOfInterest}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Availability:</span>
                      <span>{vol.availability}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Skills:</span>
                      <span>{vol.skills || 'None listed'}</span>
                    </div>
                  </div>

                  {vol.motivation && (
                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 italic">
                      &ldquo;{vol.motivation}&rdquo;
                    </div>
                  )}

                  {vol.adminNotes && (
                    <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg font-mono">
                      Internal Admin Note: {vol.adminNotes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: INQUIRIES & PARTNERSHIPS
        ========================================================================= */}
        {adminTab === 'inquiries' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#0F2942] font-display">
              Incoming Inquiries & Partnership Proposals
            </h3>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                Contact Messages ({messages.length})
              </h4>
              {messages.map((m) => (
                <div key={m.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div>
                      <span className="font-bold text-slate-900">{m.name}</span> ({m.email} · {m.phone || 'No phone'})
                    </div>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-700">
                      Target: {m.officeTarget} Desk
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">{m.subject}</div>
                  <p className="text-slate-600">{m.message}</p>
                </div>
              ))}

              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider pt-4">
                Corporate & Institutional Partnerships ({partnerships.length})
              </h4>
              {partnerships.map((p) => (
                <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900">{p.organizationName}</span>
                    <span className="text-[10px] bg-sky-50 text-sky-800 px-2 py-0.5 rounded font-bold">
                      {p.partnershipType}
                    </span>
                  </div>
                  <p className="text-slate-500">Contact: {p.contactPerson} · {p.email} · {p.phone}</p>
                  <p className="text-slate-700">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: SITE SETTINGS & IMPACT STATS
        ========================================================================= */}
        {adminTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-8 max-w-4xl">
            {settingsSavedMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Site configuration and impact statistics updated successfully!</span>
              </div>
            )}

            {/* Impact Stats Editor */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#0F2942] font-display">
                Impact Statistics (Front Page Counter)
              </h3>
              <p className="text-xs text-slate-500">
                Update the public demonstration figures shown on the homepage.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {editStats.map((st, i) => (
                  <div key={st.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <label className="block text-xs font-bold text-slate-700">{st.label}</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={st.value}
                        onChange={(e) => {
                          const copy = [...editStats];
                          copy[i].value = parseInt(e.target.value) || 0;
                          setEditStats(copy);
                        }}
                        className="w-24 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold"
                      />
                      <input
                        type="text"
                        value={st.suffix}
                        onChange={(e) => {
                          const copy = [...editStats];
                          copy[i].suffix = e.target.value;
                          setEditStats(copy);
                        }}
                        className="w-20 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details Editor */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#0F2942] font-display">
                Ghana & USA Official Contact Configuration
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-emerald-800">Ghana Office</h4>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={editSettings.ghanaOffice.phone}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          ghanaOffice: { ...editSettings.ghanaOffice, phone: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">Email</label>
                    <input
                      type="email"
                      value={editSettings.ghanaOffice.email}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          ghanaOffice: { ...editSettings.ghanaOffice, email: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">WhatsApp Number (Digits only)</label>
                    <input
                      type="text"
                      value={editSettings.ghanaOffice.whatsapp}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          ghanaOffice: { ...editSettings.ghanaOffice, whatsapp: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-sky-800">USA Office</h4>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={editSettings.usaOffice.phone}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          usaOffice: { ...editSettings.usaOffice, phone: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">Email</label>
                    <input
                      type="email"
                      value={editSettings.usaOffice.email}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          usaOffice: { ...editSettings.usaOffice, email: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="py-3 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Save Site Settings
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all demo data (projects, donations, applications) back to fresh initial demo baseline?')) {
                    resetStoreToDefaults();
                    window.location.reload();
                  }
                }}
                className="py-2.5 px-4 text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo Store to Baseline</span>
              </button>
            </div>
          </form>
        )}

        {/* =========================================================================
            TAB 7: FIELD VIDEOS MANAGEMENT
        ========================================================================= */}
        {adminTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div>
                <h3 className="text-base font-bold text-[#0F2942] font-display">
                  Field Impact Videos ({videos.length})
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Manage documentary videos from YouTube, Vimeo, or direct MP4 links shown across the homepage and impact page.
                </p>
              </div>

              <button
                onClick={handleOpenAddVideo}
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Video</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video bg-slate-900 overflow-hidden">
                      <img
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/hero-community.png';
                        }}
                      />
                      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                        <button
                          onClick={() => onPlayVideo ? onPlayVideo(vid) : window.open(vid.videoUrl, '_blank')}
                          className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center hover:bg-emerald-500 hover:scale-110 transition-all cursor-pointer shadow-lg"
                          title="Preview video"
                        >
                          <Play className="w-5 h-5 fill-white translate-x-0.5" />
                        </button>
                      </div>
                      {vid.duration && (
                        <span className="absolute bottom-2 right-2 bg-slate-900/90 text-white text-[11px] font-mono px-2 py-0.5 rounded">
                          {vid.duration}
                        </span>
                      )}
                      <span className="absolute top-2 left-2 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {vid.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="text-sm font-bold text-[#0F2942] line-clamp-1">
                        {vid.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {vid.description}
                      </p>
                      <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                        <span>📍 {vid.location}</span>
                        <span>🗓 {vid.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleEditVideo(vid)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-200/60 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(vid.id, vid.title)}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Edit/Create Video Modal */}
      {isAddVideoModalOpen && editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4 my-8">
            <h3 className="text-xl font-bold text-[#0F2942] font-display">
              {editingVideo.id ? 'Edit Field Video' : 'Add New Field Video'}
            </h3>
            <p className="text-xs text-slate-500">
              Add YouTube, Vimeo, or direct MP4 links from field missions, borehole drills, and student ceremonies.
            </p>

            <form onSubmit={handleSaveVideoForm} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Video Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Borehole Commissioning & Clean Water Flow in Adaklu"
                  value={editingVideo.title || ''}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Video URL (YouTube, Vimeo, or MP4)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                  value={editingVideo.videoUrl || ''}
                  onChange={(e) => setEditingVideo({ ...editingVideo, videoUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Supports standard YouTube watch links, short links (youtu.be), Vimeo, or direct .mp4 files.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category / Pillar</label>
                  <select
                    value={editingVideo.category || 'Clean Water'}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      const pillar = cat === 'Clean Water' ? 'water' : cat === 'Construction Training' ? 'construction' : 'education';
                      setEditingVideo({ ...editingVideo, category: cat, pillar });
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Clean Water">Clean Water</option>
                    <option value="Construction Training">Construction Training</option>
                    <option value="Girl Child Education">Girl Child Education</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="3:45"
                    value={editingVideo.duration || ''}
                    onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Volta Region, Ghana"
                    value={editingVideo.location || ''}
                    onChange={(e) => setEditingVideo({ ...editingVideo, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="text"
                    placeholder="April 2026"
                    value={editingVideo.date || ''}
                    onChange={(e) => setEditingVideo({ ...editingVideo, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Thumbnail Image URL</label>
                <input
                  type="text"
                  placeholder="/images/hero_african_water_well_1793198749440.jpg"
                  value={editingVideo.thumbnailUrl || ''}
                  onChange={(e) => setEditingVideo({ ...editingVideo, thumbnailUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description / Summary</label>
                <textarea
                  rows={2}
                  placeholder="Short description of the event or community transformation captured in this footage..."
                  value={editingVideo.description || ''}
                  onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddVideoModalOpen(false);
                    setEditingVideo(null);
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-bold"
                >
                  Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit/Create Project Modal */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4 my-8">
            <h3 className="text-xl font-bold text-[#0F2942] font-display">
              {editingProject.title ? 'Edit Project' : 'Create New Project'}
            </h3>

            <form onSubmit={handleSaveProjectForm} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pillar Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      const pillar = cat === 'Clean Water' ? 'water' : cat === 'Construction Training' ? 'construction' : 'education';
                      setEditingProject({ ...editingProject, category: cat, pillar });
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Clean Water">Clean Water</option>
                    <option value="Construction Training">Construction Training</option>
                    <option value="Girl Child Education">Girl Child Education</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Proposed">Proposed</option>
                    <option value="Fundraising">Fundraising</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location / District</label>
                  <input
                    type="text"
                    required
                    value={editingProject.location || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Region</label>
                  <input
                    type="text"
                    required
                    value={editingProject.region || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, region: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Goal Budget (GHS)</label>
                  <input
                    type="number"
                    required
                    value={editingProject.goalAmountGHS || 0}
                    onChange={(e) => setEditingProject({ ...editingProject, goalAmountGHS: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Verified Raised (GHS)</label>
                  <input
                    type="number"
                    required
                    value={editingProject.raisedAmountGHS || 0}
                    onChange={(e) => setEditingProject({ ...editingProject, raisedAmountGHS: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.shortDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={editingProject.fullDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-bold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
