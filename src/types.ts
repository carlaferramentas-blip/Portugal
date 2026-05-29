export interface HistoricalEvent {
  id: string;
  year: number;
  dateStr: string;
  title: string;
  description: string;
  type: "military" | "political" | "scientific" | "cultural";
  location: string;
  keyFigures: string[];
}

export interface HistoricalDocument {
  id: string;
  title: string;
  year: number;
  author: string;
  locationCreated: string;
  description: string;
  significance: string;
  highDefImageUrl: string;
  transcription: string; // original language (old Portuguese/Latin)
  modernTranslation: string; // modern Portuguese version
  annotations: string[]; // key details pointed out on the doc
}

export interface MapRegion {
  id: string;
  name: string;
  status: "controlled" | "contested" | "allied" | "none";
  path: string; // SVG path d attribute
  colorHex: string;
  description: string;
}

export interface MaritimeRoute {
  name: string;
  year: number;
  captain: string;
  pathD: string; // SVG path
  points: { x: number; y: number; label?: string }[];
  color: string;
}

export interface PeriodMapData {
  mainlandRegions: MapRegion[];
  worldDocks: { name: string; x: number; y: number; type: "colony" | "trading-post"; description: string }[];
  maritimeRoutes?: MaritimeRoute[];
  viewBox: string;
}

export interface HistoricalPeriod {
  id: string;
  slug: string;
  title: string;
  yearsRange: string;
  monarchOrLeader: string;
  capital: string;
  tagline: string;
  introduction: string;
  fullStory: string;
  keyLegacy: string[];
  events: HistoricalEvent[];
  documents: string[]; // Document IDs
  mapData: PeriodMapData;
}

export interface StudyGuideFigure {
  name: string;
  role: string;
  description: string;
}

export interface StudyGuideDate {
  year: string;
  event: string;
  historicalContext: string;
}

export interface StudyGuideVocab {
  term: string;
  meaning: string;
}

export interface StudyGuideQuizItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StudyGuide {
  title: string;
  historicalPeriod: string;
  summaryText: string;
  keyFigures: StudyGuideFigure[];
  importantDates: StudyGuideDate[];
  vocabulary: StudyGuideVocab[];
  quiz: StudyGuideQuizItem[];
  pedagogicalSuggestion: {
    activityTitle: string;
    instructions: string;
  };
}
