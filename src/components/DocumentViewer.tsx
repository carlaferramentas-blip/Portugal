import { useState } from "react";
import { HistoricalDocument } from "../types";
import { HISTORICAL_DOCUMENTS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Award, Calendar, ToggleLeft, ToggleRight, CheckCircle, Info, Archive, Plus, Copy } from "lucide-react";

interface DocumentViewerProps {
  documentIds: string[];
  onAddDocumentToNotebook: (docTitle: string) => void;
  selectedDocumentsInNotebook: string[];
}

export default function DocumentViewer({ 
  documentIds, 
  onAddDocumentToNotebook,
  selectedDocumentsInNotebook 
}: DocumentViewerProps) {
  const docs = HISTORICAL_DOCUMENTS.filter(d => documentIds.includes(d.id));
  const [activeDocId, setActiveDocId] = useState<string>(docs[0]?.id || HISTORICAL_DOCUMENTS[0].id);
  const [transMode, setTransMode] = useState<"paleo" | "modern">("modern");
  const [activeAnnotationIndex, setActiveAnnotationIndex] = useState<number | null>(null);

  const selectedDoc = HISTORICAL_DOCUMENTS.find(d => d.id === activeDocId) || HISTORICAL_DOCUMENTS[0];
  const isAdded = selectedDocumentsInNotebook.includes(selectedDoc.title);

  return (
    <div className="flex flex-col gap-6" id="documents-archive-vault">
      {/* Cabeçalho do Arquivo */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-lg border-2 border-brand-gold shadow-sm" id="documents-archive-header">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-sm bg-brand-navy text-brand-gold">
            <Archive className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-serif text-lg font-black text-brand-navy">Chancelaria de Manuscritos Originais</h3>
            <p className="text-xs text-charcoal/70 font-serif">Examine documentos históricos fundamentais sob transcrição paleográfica clássica ou versão civil adaptada.</p>
          </div>
        </div>

        {/* Seletor de documentos da época */}
        <div className="flex gap-2 overflow-x-auto max-w-full pb-1" id="subdoc-selection-pills">
          {HISTORICAL_DOCUMENTS.map((doc) => {
            const isRelated = documentIds.includes(doc.id);
            const isActive = doc.id === activeDocId;
            return (
              <button
                key={doc.id}
                onClick={() => {
                  setActiveDocId(doc.id);
                  setActiveAnnotationIndex(null);
                }}
                className={`px-3 py-1.5 rounded-sm text-xs font-serif font-black border whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-brand-navy text-white border-brand-gold shadow-sm"
                    : isRelated
                    ? "bg-[#F5F2ED] text-brand-crusade border-brand-gold/30"
                    : "bg-brand-paper/50 text-charcoal/50 border-brand-gold/15 hover:text-charcoal"
                }`}
              >
                📜 {doc.title} {isRelated && "★"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Principal do Documento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="document-grid">
        {/* LADO ESQUERDO: Visualização do Pergaminho / Manuscrito */}
        <div className="lg:col-span-5 flex flex-col gap-4" id="document-parchment-frame">
          <div className="bg-amber-50 rounded-lg p-6 shadow-md relative min-h-[420px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/90 to-amber-100/60 text-slate-900 border-2 border-brand-gold/50 overflow-hidden flex flex-col justify-between select-none">
            {/* Efeitos de papel envelhecido */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200')] bg-cover mix-blend-multiply"></div>
            
            {/* Selo de lacre ou carimbo decorativo */}
            <div className="absolute top-5 right-5 w-14 h-14 bg-red-900/25 border-4 border-red-900/30 rounded-full flex items-center justify-center pointer-events-none opacity-40 uppercase text-[8px] font-bold text-red-900 transform rotate-12">
              Selo Real
            </div>

            {/* Cabeçalho do Pergaminho */}
            <div className="relative z-10 w-full">
              <span className="text-[10px] font-serif font-bold tracking-wider text-amber-800 uppercase block mb-1">
                Manuscrito Clássico de {selectedDoc.year}
              </span>
              <h4 className="font-serif text-2xl font-black text-amber-950 leading-tight tracking-tight border-b-2 border-amber-800/20 pb-2">
                {selectedDoc.title}
              </h4>

              <div className="flex flex-col gap-1.5 mt-3 text-[11px] font-serif text-amber-900">
                <span className="flex items-center gap-1">✍️ <strong>Autor:</strong> {selectedDoc.author}</span>
                <span className="flex items-center gap-1">📍 <strong>Exposto em:</strong> {selectedDoc.locationCreated}</span>
              </div>
            </div>

            {/* Área Central: Simulação de Pinos de Anotação Interativos */}
            <div className="my-8 relative h-[160px] bg-amber-50/40 border-2 border-dashed border-amber-800/20 rounded-lg p-4 flex flex-col items-center justify-center z-10" id="parchment-visual-simulation">
              <span className="text-[10px] font-serif font-bold text-amber-800/80 tracking-wider absolute top-2 uppercase">Pontos Chave do Tratado</span>
              
              <div className="flex gap-4 items-center justify-center mt-4">
                {selectedDoc.annotations.map((ann, idx) => {
                  const isActive = activeAnnotationIndex === idx;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.15 }}
                      onClick={() => setActiveAnnotationIndex(idx)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-serif shadow-md transition-all ${
                        isActive 
                        ? "bg-brand-navy text-brand-gold border-2 border-brand-gold ring-4 ring-brand-navy/10 scale-110" 
                        : "bg-brand-crusade text-brand-gold hover:bg-brand-navy"
                      }`}
                    >
                      §{idx + 1}
                    </motion.button>
                  );
                })}
              </div>

              <span className="text-[11px] text-amber-950/80 font-serif italic text-center px-4 mt-6 font-bold">
                Clique nas chaves heráldicas § do pergaminho para ler os resumos políticos.
              </span>
            </div>

            {/* Caixa Dinâmica de Anotações */}
            <div className="relative z-10 w-full" id="parchment-annotation-display">
              <AnimatePresence mode="wait">
                {activeAnnotationIndex !== null ? (
                  <motion.div
                    key={activeAnnotationIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-brand-navy text-brand-gold rounded-lg text-[11px] leading-relaxed border border-brand-gold relative shadow-lg"
                  >
                    <button 
                      onClick={() => setActiveAnnotationIndex(null)}
                      className="absolute top-1 right-2 text-brand-gold hover:text-white font-serif text-xs font-extrabold"
                    >
                      ×
                    </button>
                    <p className="font-bold mb-1 font-serif text-brand-gold">Cláusula de Destaque §{activeAnnotationIndex + 1}:</p>
                    <p className="font-serif italic leading-relaxed text-white/90">{selectedDoc.annotations[activeAnnotationIndex]}</p>
                  </motion.div>
                ) : (
                  <div className="p-3 bg-amber-950/5 text-amber-900/60 rounded-lg text-[11px] text-center font-serif italic border border-amber-900/10">
                    Nenhuma cláusula em foco ativo. Selecione uma § acima para ver o segredo do documento.
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Adicionar ao Caderno */}
          <button
            id="btn-add-to-notebook"
            onClick={() => onAddDocumentToNotebook(selectedDoc.title)}
            className={`w-full py-3 px-4 rounded-lg text-xs font-bold font-serif transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
              isAdded 
              ? "bg-[#F5F2ED] text-brand-navy/60 border border-brand-gold/30 rounded-xs cursor-default" 
              : "bg-brand-crusade hover:bg-brand-navy text-white"
            }`}
          >
            {isAdded ? (
              <>
                <CheckCircle className="w-4 h-4 text-brand-crusade" />
                Guardado no Teu Caderno de Estudo
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-brand-gold" />
                Arquivar no Meu Caderno de Estudo
              </>
            )}
          </button>
        </div>

        {/* LADO DIREITO: Transcrição, Tradução e Significância */}
        <div className="lg:col-span-7 flex flex-col gap-6" id="document-reading-pane">
          {/* Alternador de Leitura (Paleográfica vs Adaptada) */}
          <div className="bg-white border-2 border-brand-gold rounded-lg p-6 flex flex-col gap-5 shadow-sm" id="reading-card">
            <div className="flex items-center justify-between border-b border-brand-gold/20 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-crusade" />
                <span className="font-serif text-sm font-black text-brand-navy uppercase tracking-wider">Transcrição Integral</span>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center gap-2 bg-[#F5F2ED] p-1 rounded-sm border border-brand-gold/35">
                <button
                  id="btn-trans-paleo"
                  onClick={() => setTransMode("paleo")}
                  className={`px-3 py-1.5 rounded-sm text-xs font-serif font-bold transition-all ${
                    transMode === "paleo"
                      ? "bg-brand-navy text-brand-gold shadow-sm font-black"
                      : "text-charcoal/60 hover:text-brand-navy"
                  }`}
                >
                  📜 Paleográfica (Arco/Original)
                </button>
                <button
                  id="btn-trans-modern"
                  onClick={() => setTransMode("modern")}
                  className={`px-3 py-1.5 rounded-sm text-xs font-serif font-bold transition-all ${
                    transMode === "modern"
                      ? "bg-brand-navy text-brand-gold shadow-sm font-black"
                      : "text-charcoal/60 hover:text-brand-navy"
                  }`}
                >
                  ✍️ Versão Civil (Adaptada)
                </button>
              </div>
            </div>

            {/* Caixa de Texto de Transcrição */}
            <div className="bg-brand-paper/75 p-5 rounded-md border border-brand-gold/25 min-h-[160px] max-h-[220px] overflow-y-auto" id="transcript-scroll-content">
              <AnimatePresence mode="wait">
                <motion.p
                  key={transMode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-serif text-charcoal/85 text-xs md:text-sm leading-relaxed whitespace-pre-line italic"
                >
                  {transMode === "paleo" ? selectedDoc.transcription : selectedDoc.modernTranslation}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Cartão de Enquadramento e Significado */}
          <div className="bg-[#F5F2ED] border border-brand-gold/30 rounded-lg p-6 flex flex-col gap-4 shadow-xs" id="significance-card">
            <div className="flex items-center gap-2 text-brand-crusade font-black">
              <Award className="w-4 h-4 text-brand-gold" />
              <h5 className="font-serif text-xs font-black uppercase tracking-wider">Significado e Alcance Histórico</h5>
            </div>
            <p className="text-xs text-charcoal leading-relaxed font-serif">
              {selectedDoc.significance}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="p-3 rounded-sm bg-white border border-brand-gold/25 flex items-start gap-2.5 shadow-xs">
                <span className="p-1 rounded bg-[#F5F2ED] text-brand-crusade mt-0.5"><Calendar className="w-3.5 h-3.5" /></span>
                <div>
                  <h6 className="text-[10px] uppercase font-serif text-charcoal/60 font-bold">Data de Outorga</h6>
                  <p className="text-xs font-serif font-black text-brand-navy mt-0.5">{selectedDoc.year}</p>
                </div>
              </div>
              <div className="p-3 rounded-sm bg-white border border-brand-gold/25 flex items-start gap-2.5 shadow-xs">
                <span className="p-1 rounded bg-[#F5F2ED] text-brand-navy mt-0.5"><Info className="w-3.5 h-3.5" /></span>
                <div>
                  <h6 className="text-[10px] uppercase font-serif text-[#9B1B30] font-bold">Tipologia Oficial</h6>
                  <p className="text-xs font-serif font-black text-brand-navy mt-0.5">Tratado Bilateral / Carta Reguengue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
