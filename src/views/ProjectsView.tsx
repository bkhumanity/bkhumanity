import React, { useState } from 'react';
import { Project } from '../types';
import { Search, Heart, ArrowRight, MapPin, Filter } from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  onNavigate: (view: string, projectId?: string) => void;
  onOpenDonateModal: (projectId?: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onNavigate,
  onOpenDonateModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-12 lg:space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0F2942] text-white py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-display">
              Field Operations & Programs
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Our Humanitarian Projects
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore our ongoing and completed clean water boreholes, youth vocational training cohorts, and girls&apos; scholarship programs across rural Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by project name, district, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
              {['All', 'Clean Water', 'Construction Training', 'Girl Child Education'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-[#0F2942] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat === 'All' ? 'All Pillars' : cat}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">All Statuses</option>
                <option value="In Progress">In Progress</option>
                <option value="Fundraising">Fundraising</option>
                <option value="Completed">Completed</option>
                <option value="Proposed">Proposed</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <h3 className="text-lg font-bold text-slate-800">No projects found matching criteria</h3>
            <p className="text-xs text-slate-500">Try adjusting your keyword search or category filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedStatus('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => {
              const percentage = Math.min(
                100,
                Math.round((project.raisedAmountGHS / project.goalAmountGHS) * 100)
              );

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-800 shadow-xs">
                        {project.status}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-emerald-700">{project.category}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{project.location}</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#0F2942] font-display leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {project.shortDescription}
                      </p>

                      {/* Funding Progress Bar */}
                      <div className="pt-2 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800 tabular-nums">
                            GH₵{project.raisedAmountGHS.toLocaleString()}{' '}
                            <span className="text-slate-400 font-normal">verified</span>
                          </span>
                          <span className="font-semibold text-slate-500 tabular-nums">
                            Goal: GH₵{project.goalAmountGHS.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="text-[11px] text-right font-bold text-emerald-700">
                          {percentage}% Funded
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 pt-0 flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('project-detail', project.id)}
                      className="flex-1 py-2 px-3 border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-lg transition-colors cursor-pointer text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onOpenDonateModal(project.id)}
                      className="flex-1 py-2 px-3 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white/20" />
                      <span>Donate</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
