import React, { useState, useMemo, useEffect } from 'react';
import { BlogPost, Project } from '../types';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import {
  BookOpen,
  Clock,
  Calendar,
  User,
  MapPin,
  Share2,
  Check,
  Copy,
  ArrowLeft,
  ArrowRight,
  Search,
  Tag,
  Heart,
  Sparkles,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface BlogViewProps {
  posts: BlogPost[];
  selectedSlug?: string;
  projects?: Project[];
  onNavigate: (view: string, idOrSlug?: string) => void;
  onOpenDonateModal: (projectId?: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  posts,
  selectedSlug,
  projects = [],
  onNavigate,
  onOpenDonateModal,
}) => {
  // If a slug is specified in props, show that article directly
  const [activeSlug, setActiveSlug] = useState<string | null>(selectedSlug || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedLink, setCopiedLink] = useState(false);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState('');

  // Keep activeSlug in sync if prop changes
  useEffect(() => {
    if (selectedSlug) {
      setActiveSlug(selectedSlug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedSlug]);

  const categories = [
    'All',
    'Clean Water',
    'Construction Training',
    'Building & Construction',
    'Real Estate & Housing',
    'Girl Child Education',
    'Careers & NGO',
    'Transparency',
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.author.name.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, selectedCategory, searchQuery]);

  const activePost = useMemo(() => {
    if (!activeSlug) return null;
    return posts.find((p) => p.slug === activeSlug || p.id === activeSlug) || null;
  }, [posts, activeSlug]);

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  const relatedPosts = useMemo(() => {
    if (!activePost) return [];
    return posts
      .filter((p) => p.id !== activePost.id)
      .slice(0, 3);
  }, [posts, activePost]);

  const handleSelectPost = (slug: string) => {
    setActiveSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setActiveSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subEmail && subEmail.includes('@')) {
      setEmailSubscribed(true);
      setSubEmail('');
    }
  };

  // Find related project if article references one
  const linkedProject = activePost?.relatedProjectId
    ? projects.find((p) => p.id === activePost.relatedProjectId)
    : undefined;

  // -------------------------------------------------------------
  // DETAIL MODE: ARTICLE READER
  // -------------------------------------------------------------
  if (activePost) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen py-10 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs & Navigation */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0F2942] hover:text-emerald-700 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to All Articles</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="hidden sm:inline">Share this story:</span>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                title="Copy link to clipboard"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${activePost.title} - Read more on BK Construction Humanity For Habitat NGO: ${window.location.href}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
                title="Share on WhatsApp"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Article Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden mb-10">
            <div className="p-6 sm:p-10 lg:p-12">
              {/* Category & Reading Time */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-extrabold uppercase tracking-wider rounded-md border border-emerald-100">
                  {activePost.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{activePost.readTimeMinutes} min read</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{activePost.publishedAt}</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2942] tracking-tight leading-tight mb-4">
                {activePost.title}
              </h1>

              {/* Excerpt Lead */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8 pb-8 border-b border-slate-100">
                {activePost.excerpt}
              </p>

              {/* Author Row */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 text-[#0F2942] font-bold flex items-center justify-center text-sm">
                    {activePost.author.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      {activePost.author.name}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <span>{activePost.author.role}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-0.5 text-slate-400">
                        <MapPin className="w-3 h-3" />
                        {activePost.author.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags preview */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {activePost.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="w-full h-72 sm:h-96 md:h-[420px] relative overflow-hidden bg-slate-100 border-t border-slate-100">
              <img
                src={activePost.imageUrl}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-white/90 drop-shadow-sm font-medium flex items-center justify-between">
                <span>Field Documentation: {activePost.category} Initiative</span>
                <span>BK Construction NGO Official Archives</span>
              </div>
            </div>

            {/* Markdown Article Body */}
            <div className="p-6 sm:p-10 lg:p-12">
              <MarkdownRenderer content={activePost.content} />

              {/* Tag Cloud */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Topic Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activePost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio Box */}
              <div className="mt-10 p-6 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold flex items-center justify-center text-lg shrink-0">
                  {activePost.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-sm font-bold text-slate-900">
                    Written by {activePost.author.name}
                  </h4>
                  <p className="text-xs text-emerald-700 font-medium mb-1.5">
                    {activePost.author.role} &bull; {activePost.author.location}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Working directly in Ghanaian communities to implement sustainable clean water infrastructure, youth vocational trades, and girl-child educational mentorship.
                  </p>
                </div>
              </div>

              {/* Action Callout Box: Donate or View Project */}
              <div className="mt-10 p-6 sm:p-8 bg-gradient-to-br from-[#0F2942] to-[#1E3A5F] rounded-2xl text-white shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      Make a Real Difference Today
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      Support Our Community Interventions in Ghana
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                      {linkedProject
                        ? `Help us complete "${linkedProject.title}" to provide long-lasting benefits to over ${linkedProject.beneficiaries}.`
                        : 'Your donation directly buys borehole drilling equipment, solar pumps, school supplies, and artisan toolkits.'}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                    {linkedProject && (
                      <button
                        onClick={() => onNavigate('project-detail', linkedProject.id)}
                        className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/20 transition-colors cursor-pointer text-center"
                      >
                        View Project Details
                      </button>
                    )}
                    <button
                      onClick={() => onOpenDonateModal(activePost.relatedProjectId || 'general')}
                      className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Heart className="w-4 h-4 fill-white/20" />
                      <span>Donate to This Cause</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold text-[#0F2942]">
                  More Educational Stories & Field Dispatches
                </h3>
                <button
                  onClick={handleBackToList}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handleSelectPost(post.slug)}
                    className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
                  >
                    <div className="h-44 overflow-hidden relative bg-slate-100">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-2 py-0.5 bg-slate-950/70 text-white text-[10px] font-bold rounded">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{post.publishedAt}</span>
                        <span>&bull;</span>
                        <span>{post.readTimeMinutes}m read</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 pt-2 border-t border-slate-100">
                        <span>Read Story</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LIST MODE: ALL ARTICLES DIRECTORY
  // -------------------------------------------------------------
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0B1E32] to-[#0F2942] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Research, Industry Insights & Educational Guides</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              BK Construction & Humanitarian Insights
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              In-depth engineering analyses, real estate investment guides, TVET trade career roadmaps, and verified NGO scholarship resources for Ghana.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="mt-8 pt-8 border-t border-slate-700/60 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles by topic, keyword, or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Stats Pill */}
            <div className="text-xs text-slate-300 flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                Showing <strong>{filteredPosts.length}</strong> of{' '}
                <strong>{posts.length}</strong> published reports
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-800/90 hover:bg-slate-700/90 text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Featured Story Hero (when no search or filtering is active) */}
        {!searchQuery && selectedCategory === 'All' && featuredPost && (
          <div className="mb-14">
            <div className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Trending Field Report</span>
            </div>

            <div
              onClick={() => handleSelectPost(featuredPost.slug)}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
            >
              {/* Left Column: Image */}
              <div className="lg:col-span-7 h-72 sm:h-96 lg:h-auto relative overflow-hidden bg-slate-100">
                <img
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-wider rounded-md shadow-sm">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              {/* Right Column: Editorial Summary */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {featuredPost.publishedAt}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {featuredPost.readTimeMinutes} min read
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2942] group-hover:text-emerald-700 transition-colors leading-snug mb-3">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-4 mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-[#0F2942] text-xs font-bold flex items-center justify-center">
                        {featuredPost.author.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {featuredPost.author.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {featuredPost.author.location}
                        </div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                      <span>Read Story</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F2942] tracking-tight">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory === 'All'
                ? 'All Articles & Field Stories'
                : `${selectedCategory} Articles`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore in-depth analysis, community interviews, and development progress.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/90 max-w-xl mx-auto my-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              No matching articles found
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Try adjusting your search terms or selecting a different category from above.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => handleSelectPost(post.slug)}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Cover Image */}
                <div className="h-52 overflow-hidden relative bg-slate-100">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-[#0F2942]/90 backdrop-blur-xs text-white text-[11px] font-bold rounded-md uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {post.publishedAt}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {post.readTimeMinutes} min read
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#0F2942] group-hover:text-emerald-700 transition-colors leading-snug mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded text-[10px]">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Bottom Author Row & CTA */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                          {post.author.name
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                        <span className="text-xs font-semibold text-slate-700 truncate max-w-[120px]">
                          {post.author.name}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Email Newsletter Dispatch Signup Card */}
        <div className="mt-16 bg-gradient-to-r from-emerald-900 to-[#0F2942] rounded-3xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Community Dispatches & Quarterly Audits
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              Receive Field Reports & Project Milestones Direct to Your Inbox
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Subscribe to our monthly digest of clean water borehole drillings, apprentice graduations, and transparent financial audits. No spam, ever.
            </p>

            {emailSubscribed ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-400/40 rounded-xl flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold text-emerald-200">
                  Thank you! You are now subscribed to BK Construction Field Updates.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-sm"
                >
                  Subscribe to Stories
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
