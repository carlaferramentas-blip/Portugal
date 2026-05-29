import { useState } from "react";
import { HISTORICAL_PERIODS, HISTORICAL_DOCUMENTS } from "./data";
import Timeline from "./components/Timeline";
import MapExplorer from "./components/MapExplorer";
import DocumentViewer from "./components/DocumentViewer";
import StudyNotebook from "./components/StudyNotebook";
import { Compass, BookOpen, Scroll, HelpCircle, ShieldAlert, Award, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activePeriodId, setActivePeriodId] = useState<string>("fundacao");
  const [activeTab, setActiveTab] = useState<"map" | "docs" | "notebook">("map");
  const [notebookDocs, setNotebookDocs] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentPeriod = HISTORICAL_PERIODS.find((p) => p.id === activePeriodId) || HISTORICAL_PERIODS[0];

  // Função para arquivar documentos
  const handleAddDocToNotebook = (docTitle: string) => {
    if (!notebookDocs.includes(docTitle)) {
      setNotebookDocs((prev) => [...prev, docTitle]);
      triggerToast(`📜 "${docTitle}" adicionado ao teu Caderno de Estudo!`);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-brand-paper text-charcoal flex flex-col font-sans selection:bg-brand-gold/30 selection:text-brand-navy" id="main-app-shell">
      
      {/* HEADER PRINCIPAL - Ocultado no Print */}
      <header className="no-print border-b border-brand-gold bg-white sticky top-0 z-40 shadow-sm px-4 md:px-8 py-4" id="app-main-header">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 bg-brand-crusade flex items-center justify-center rounded-sm text-brand-gold text-2xl font-black font-serif shadow-sm">
              P
            </span>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-black text-brand-navy tracking-tighter leading-none uppercase">Crónica de Portugal</h1>
              <p className="text-[10px] md:text-xs text-charcoal/60 font-serif tracking-wide italic">Compêndio e Atlas de Castelos, Tratados Soberanos & Documentos Originais</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-[10px] md:text-xs font-mono" id="header-social-allies">
            <span className="text-[#9B1B30] font-bold uppercase tracking-widest hidden md:inline">REPÚBLICA PORTUGUESA</span>
            <span className="px-4 py-1.5 rounded-full border border-brand-gold bg-brand-paper text-brand-navy font-bold font-serif shadow-xs">
              ESTUDO CRÍTICO
            </span>
          </div>
        </div>
      </header>

      {/* TOAST DE FEEDBACK RAPIDO */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: "-51%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -10, x: "-50%" }}
            id="app-toast-feedback"
            className="no-print fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-md bg-brand-navy text-brand-gold font-serif text-xs font-bold border border-brand-gold shadow-2xl flex items-center gap-3 z-50 pointer-events-none"
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse shrink-0"></span>
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ÁREA PRINCIPAL DO EXPLORADOR */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-6 flex flex-col gap-6" id="app-content-body">
        
        {/* LINHA DO TEMPO CRONOLÓGICA (Ocultado no Print) */}
        <section className="no-print" id="timeline-navigation-section">
          <Timeline 
            selectedPeriodId={activePeriodId} 
            onSelectPeriod={(id) => {
              setActivePeriodId(id);
              // reset active tabs subdetails if necessary
            }} 
          />
        </section>

        {/* SECÇÃO EXTRAPOLAR/DETALHADA DA DE ESTUDO ATIVO - INTRODUÇÃO (Ocultado no Print) */}
        <section className="no-print bg-white border border-brand-gold/30 rounded-lg p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:gap-12 items-start justify-between relative overflow-hidden shadow-sm" id="active-period-showcase">
          <div className="flex-1 space-y-3 relative z-10">
            <div className="flex items-center gap-3">
              <span className="p-1 px-2.5 text-[9px] font-sans tracking-widest uppercase bg-brand-crusade text-brand-gold font-bold rounded-xs">
                Era em Destaque
              </span>
              <span className="text-xs font-serif font-bold text-brand-navy">📍 Principal Capital: {currentPeriod.capital}</span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-black text-brand-navy tracking-tight leading-tight">
              {currentPeriod.title}
            </h2>

            <p className="text-sm md:text-base font-serif italic text-brand-crusade font-semibold leading-relaxed">
              "{currentPeriod.tagline}"
            </p>

            <p className="text-xs md:text-sm text-charcoal/80 leading-relaxed text-justify font-serif">
              {currentPeriod.introduction}
            </p>
          </div>

          <div className="w-full lg:w-1/3 flex flex-col gap-4 bg-[#F5F2ED] rounded-lg p-5 border border-brand-gold/20 relative z-10" id="historical-legacy-card">
            <h4 className="font-serif text-xs font-black text-brand-crusade uppercase tracking-widest flex items-center gap-1.5 border-b border-brand-gold/30 pb-2">
              <Award className="w-4 h-4 text-brand-gold" /> Legado Imperecível
            </h4>
            <ul className="space-y-2.5 text-xs text-charcoal font-serif">
              {currentPeriod.keyLegacy.map((legacy, lIdx) => (
                <li key={lIdx} className="flex gap-2.5 leading-relaxed">
                  <span className="text-brand-crusade shrink-0 font-bold m-1">•</span>
                  <span>{legacy}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* NAVEGADOR DE ATIVIDADES / ABAS PRINCIPAIS - (Ocultado no Print) */}
        <section className="no-print" id="primary-applet-nav">
          <div className="flex gap-2 p-1.5 bg-[#EEEAE1] border border-brand-gold/30 rounded-lg max-w-lg mx-auto sm:mx-0 shadow-xs" id="main-tabs-pills">
            <button
              onClick={() => setActiveTab("map")}
              className={`flex-1 py-3 px-1 text-center text-xs font-serif font-black rounded-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === "map"
                  ? "bg-brand-navy text-white shadow-md"
                  : "text-charcoal/70 hover:text-brand-navy hover:bg-white/40"
              }`}
            >
              <Compass className="w-4 h-4 text-brand-gold" />
              1. Atlas Territorial
            </button>
            <button
              onClick={() => setActiveTab("docs")}
              className={`flex-1 py-3 px-1 text-center text-xs font-serif font-black rounded-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === "docs"
                  ? "bg-brand-navy text-white shadow-md"
                  : "text-charcoal/70 hover:text-brand-navy hover:bg-white/40"
              }`}
            >
              <Scroll className="w-4 h-4 text-brand-gold" />
              2. Arquivo de Manuscritos
            </button>
            <button
              onClick={() => setActiveTab("notebook")}
              className={`flex-1 py-3 px-1 text-center text-xs font-serif font-black rounded-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === "notebook"
                  ? "bg-brand-navy text-white shadow-md"
                  : "text-charcoal/70 hover:text-brand-navy hover:bg-white/40"
              }`}
            >
              <BookOpen className="w-4 h-4 text-brand-gold" />
              3. Caderno e IA
              {notebookDocs.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-brand-crusade text-brand-gold text-[9px] font-mono font-bold flex items-center justify-center shrink-0">
                  {notebookDocs.length}
                </span>
              )}
            </button>
          </div>
        </section>

        {/* VIEW CONTAINER COM TRANSIÇÕES ANIMADAS */}
        <section id="tab-visualizer-container">
          <AnimatePresence mode="wait">
            {activeTab === "map" && (
              <motion.div
                key="map-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                id="main-map-panel-view"
                className="no-print"
              >
                <MapExplorer currentPeriod={currentPeriod} />
              </motion.div>
            )}

            {activeTab === "docs" && (
              <motion.div
                key="docs-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                id="main-docs-panel-view"
                className="no-print"
              >
                <DocumentViewer 
                  documentIds={currentPeriod.documents} 
                  onAddDocumentToNotebook={handleAddDocToNotebook}
                  selectedDocumentsInNotebook={notebookDocs}
                />
              </motion.div>
            )}

            {activeTab === "notebook" && (
              <motion.div
                key="notebook-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                id="main-notebook-panel-view"
              >
                <StudyNotebook 
                  archivedDocuments={notebookDocs} 
                  currentPeriodTitle={currentPeriod.title} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* FOOTER - Ocultado no Print */}
      <footer className="no-print border-t border-brand-gold bg-[#EEEAE1] py-8 text-center text-xs text-charcoal/75 font-serif mt-12" id="app-main-footer">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 História de Portugal Interativa • Para investigação humanística e instrução curricular.</p>
          <div className="flex gap-4 font-black tracking-widest uppercase text-[10px] text-brand-navy">
            <span className="hover:text-brand-crusade cursor-pointer">TRATADO DE ZAMORA</span>
            <span className="hover:text-brand-crusade cursor-pointer">ALIANÇA DE WINDSOR</span>
            <span className="hover:text-brand-crusade cursor-pointer">SÉ GRANDE DE COIMBRA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
