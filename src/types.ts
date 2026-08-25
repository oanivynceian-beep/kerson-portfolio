export type NavSection = 'home' | 'work' | 'studio' | 'contact';

export type ProjectCategory = 'ALL' | 'PHOTOGRAPHY' | 'FILM';

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Portrait' | 'Architecture' | 'Editorial' | 'Film' | 'Commercial' | 'Wedding' | 'Event';
  mainCategory: 'PHOTOGRAPHY' | 'FILM';
  image?: string;
  videoSrc?: string;
  externalVideoUrl?: string;
  aspectRatio: '4/5' | '16/9' | 'square' | '3/4' | '3/2';
  year: string;
  client?: string;
  director?: string;
  cinematographer?: string;
  description: string;
  technicalSpecs?: {
    camera: string;
    lens: string;
    format: string;
    location: string;
  };
  gallery?: string[];
}

export interface HonorItem {
  id: string;
  organization: string;
  award: string;
  year: string;
  project: string;
  location?: string;
}

export interface SoftwareSkill {
  name: string;
  shortName: string;
  category: 'Video Editing' | 'Photo Grading' | 'Color & Post-Production' | 'Short-Form & Social';
  description: string;
  level: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
}
