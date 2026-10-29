import React from 'react';
import { Project } from '../types';
import { MapPin, Calendar, Users, Target, CheckCircle2, Heart, ArrowLeft, Droplets, HardHat, GraduationCap } from 'lucide-react';

interface ProjectDetailViewProps {
  project: Project;
  relatedProjects: Project[];
  onNavigate: (view: string, projectId?: string) => void;
  onOpenDonateModal: (projectId?: string) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  relatedProjects,
  onNavigate,
  onOpenDonateModal,
}) => {
  const percentage = Math.min(
    100,
    Math.round((project.raisedAmountGHS / project.goalAmountGHS) * 100)
  );

  const getPillarIcon = () => {
    switch (project.pillar) {
      case 'water':
        return <Droplets className="w-4 h-4 fill-sky-500 text-sky-600" />;
      case 'construction':
        return <HardHat className="w-4 h-4 text-emerald-700" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-teal-700" />;
    }
  };

  return (
    <div className="space-y-12 lg:space-y-16 pb-20">
      {/* Breadcrumb / Back button */}
      <section className="bg-slate-100 border-b border-slate-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </button>
        </div>
      </section>

      {/* Hero Header & Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Image & Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {getPillarIcon()}
                <span>{project.category}</span>
                <span>·</span>
                <span className="text-slate-500 font-normal">{project.location}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2942] font-display leading-tight">
                {project.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{project.region}, {project.country}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Timeline: {project.timeline}</span>
                </span>
                <span>·</span>
                <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Main Featured Photo */}
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-md border border-slate-200">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Overview */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#0F2942] font-display">
                Project Overview
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Problem Statement */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-2">
              <h3 className="text-base font-bold text-slate-900 font-display">
                The Core Problem Addressed
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Objectives */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#0F2942] font-display">
                Project Objectives
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Planned Activities */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#0F2942] font-display">
                Key Execution Activities
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {project.activities.map((act, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Beneficiaries & Impact */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-3">
              <Users className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-emerald-950">
                <strong className="block text-emerald-900 font-bold mb-0.5">Direct Beneficiaries:</strong>
                {project.beneficiaries}
              </div>
            </div>

            {/* Field Updates Log */}
            {project.updates && project.updates.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-lg font-bold text-[#0F2942] font-display">
                  Field Progress Updates
                </h3>
                <div className="space-y-3">
                  {project.updates.map((upd, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-500 text-[11px]">
                        <span className="font-bold text-emerald-700">{upd.title}</span>
                        <span>{upd.date}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{upd.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Funding Progress & Sticky Donation Card */}
          <div className="lg:col-span-4 sticky top-20 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-6">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Fundraising & Budget Progress
                </span>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold text-[#0F2942] font-display tabular-nums">
                      GH₵{project.raisedAmountGHS.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 tabular-nums">
                      of GH₵{project.goalAmountGHS.toLocaleString()} goal
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-emerald-700">{percentage}% Complete</span>
                    <span>Verified Audit</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onOpenDonateModal(project.id)}
                  className="w-full py-3.5 px-4 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate to This Project</span>
                </button>
                <p className="text-[11px] text-slate-500 text-center">
                  Supports drilling hardware, artisan wages, and local supplies.
                </p>
              </div>

              {/* Donor Perks / Assurance */}
              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Instant verified receipt issued</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Quarterly photo impact updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Transparent local cost procurement</span>
                </div>
              </div>
            </div>

            {/* Need More Info */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 space-y-2">
              <h4 className="font-bold text-slate-900">Want to Sponsor This Completely?</h4>
              <p>
                Organizations or families can sponsor the entirety of this project with official naming rights.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="text-emerald-700 hover:text-emerald-800 font-bold block pt-1 cursor-pointer"
              >
                Inquire About Full Sponsorship →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-200">
          <h3 className="text-xl font-bold text-[#0F2942] font-display mb-6">
            Related Field Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.slice(0, 3).map((rp) => (
              <div
                key={rp.id}
                onClick={() => {
                  onNavigate('project-detail', rp.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2"
              >
                <div className="aspect-16/10 rounded-lg overflow-hidden bg-slate-100">
                  <img src={rp.imageUrl} alt={rp.title} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase block">{rp.category}</span>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{rp.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{rp.shortDescription}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
