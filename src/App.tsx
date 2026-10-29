import React, { useState, useEffect } from 'react';
import {
  getProjects,
  getDonations,
  getVolunteerApplications,
  getPartnershipInquiries,
  getContactMessages,
  getSiteSettings,
  getImpactStats,
  getTestimonials,
  subscribeToStore,
} from './services/storage';
import { initialGallery } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';
import { ImageLightbox } from './components/ImageLightbox';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProjectsView } from './views/ProjectsView';
import { ProjectDetailView } from './views/ProjectDetailView';
import { ImpactView } from './views/ImpactView';
import { VolunteerView } from './views/VolunteerView';
import { ContactView } from './views/ContactView';
import { LegalView } from './views/LegalView';
import { AdminView } from './views/AdminView';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>('proj-1');
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [donateProjectId, setDonateProjectId] = useState<string | undefined>('general');

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Store data
  const [projects, setProjects] = useState(getProjects());
  const [donations, setDonations] = useState(getDonations());
  const [volunteers, setVolunteers] = useState(getVolunteerApplications());
  const [partnerships, setPartnerships] = useState(getPartnershipInquiries());
  const [messages, setMessages] = useState(getContactMessages());
  const [settings, setSettings] = useState(getSiteSettings());
  const [stats, setStats] = useState(getImpactStats());
  const [testimonials, setTestimonials] = useState(getTestimonials());
  const [gallery] = useState(initialGallery);

  useEffect(() => {
    const unsubscribe = subscribeToStore(() => {
      setProjects(getProjects());
      setDonations(getDonations());
      setVolunteers(getVolunteerApplications());
      setPartnerships(getPartnershipInquiries());
      setMessages(getContactMessages());
      setSettings(getSiteSettings());
      setStats(getImpactStats());
      setTestimonials(getTestimonials());
    });
    return unsubscribe;
  }, []);

  const handleNavigate = (view: string, projId?: string) => {
    setCurrentView(view);
    if (projId) {
      setSelectedProjectId(projId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDonate = (projId?: string) => {
    setDonateProjectId(projId || 'general');
    setIsDonateOpen(true);
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const relatedProjects = projects.filter((p) => p.id !== selectedProjectId);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 antialiased">
      {/* Sticky Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenDonateModal={handleOpenDonate}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            projects={projects}
            stats={stats}
            testimonials={testimonials}
            gallery={gallery}
            onNavigate={handleNavigate}
            onOpenDonateModal={handleOpenDonate}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenDonateModal={handleOpenDonate}
          />
        )}

        {currentView === 'projects' && (
          <ProjectsView
            projects={projects}
            onNavigate={handleNavigate}
            onOpenDonateModal={handleOpenDonate}
          />
        )}

        {currentView === 'project-detail' && currentProject && (
          <ProjectDetailView
            project={currentProject}
            relatedProjects={relatedProjects}
            onNavigate={handleNavigate}
            onOpenDonateModal={handleOpenDonate}
          />
        )}

        {currentView === 'impact' && (
          <ImpactView
            stats={stats}
            gallery={gallery}
            onNavigate={handleNavigate}
            onOpenDonateModal={handleOpenDonate}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {currentView === 'volunteer' && (
          <VolunteerView onOpenDonateModal={handleOpenDonate} />
        )}

        {currentView === 'contact' && <ContactView settings={settings} />}

        {currentView.startsWith('legal-') && (
          <LegalView initialTab={currentView.replace('legal-', '') as any} />
        )}

        {currentView === 'admin' && (
          <AdminView
            projects={projects}
            donations={donations}
            volunteers={volunteers}
            partnerships={partnerships}
            messages={messages}
            settings={settings}
            stats={stats}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* 4-Column Navy Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
        onOpenDonateModal={handleOpenDonate}
      />

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        projects={projects}
        preselectedProjectId={donateProjectId}
      />

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={gallery}
        currentIndex={lightboxIndex}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % gallery.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length)}
      />

      {/* Floating WhatsApp Contact Button */}
      <FloatingWhatsApp whatsappNumber={settings.ghanaOffice.whatsapp} />
    </div>
  );
}
