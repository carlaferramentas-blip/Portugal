import { HistoricalPeriod } from "../types";
import { HISTORICAL_PERIODS } from "../data";
import { motion } from "motion/react";
import { Calendar } from "lucide-react";

interface TimelineProps {
  selectedPeriodId: string;
  onSelectPeriod: (id: string) => void;
}

export default function Timeline({ selectedPeriodId, onSelectPeriod }: TimelineProps) {
  return (
    <div className="w-full flex flex-col gap-4 mb-8" id="chronological-timeline-nav">
      <div className="flex items-center justify-between" id="timeline-controls-header">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-brand-crusade" />
          <h2 className="font-serif text-xl font-bold text-brand-navy tracking-tight">Linha do Tempo de Portugal</h2>
        </div>
        <span className="text-[10px] font-serif italic text-charcoal/60 border border-brand-gold/40 rounded-full px-3 py-1 bg-white/60 shadow-xs">
          Navegue cronologicamente selecionando cada Era
        </span>
      </div>

      {/* Caixa do Scroll Horizontal */}
      <div 
        className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 snap-x scrollbar-thin scrollbar-thumb-brand-gold scrollbar-track-brand-canvas" 
        id="timeline-scroll-track"
      >
        {HISTORICAL_PERIODS.map((period, index) => {
          const isActive = period.id === selectedPeriodId;
          const bgClassName = isActive 
            ? "bg-white border-brand-gold shadow-md shadow-brand-gold/15" 
            : "bg-[#F5F2ED] hover:bg-white border-brand-gold/20";

          return (
            <div
              key={period.id}
              onClick={() => onSelectPeriod(period.id)}
              id={`timeline-card-${period.id}`}
              className={`snap-center shrink-0 w-[240px] md:w-[280px] p-5 rounded-lg border-2 cursor-pointer transition-all duration-300 relative ${bgClassName}`}
            >
              {/* Linha cronológica decorativa integrada */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-canvas rounded-t-lg overflow-hidden">
                {isActive && (
                  <motion.div 
                    layoutId="timeline-active-bar" 
                    className="h-full bg-brand-crusade w-full" 
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  />
                )}
              </div>

              {/* Ano e Número de Sequência */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-serif font-bold tracking-wider px-2 py-0.5 rounded border ${
                  isActive 
                    ? "bg-brand-navy text-white border-brand-gold"
                    : "bg-white text-charcoal/80 border-brand-gold/35"
                }`}>
                  {period.yearsRange}
                </span>
                <span className="text-xs font-serif font-black text-brand-gold">
                  Época 0{index + 1}
                </span>
              </div>

              {/* Título e Tagline */}
              <h3 className={`font-serif text-base font-black mb-1.5 transition-colors line-clamp-1 ${
                isActive ? "text-brand-crusade text-[17px]" : "text-brand-navy"
              }`}>
                {period.title}
              </h3>
              
              <p className="text-xs text-charcoal/80 font-serif leading-relaxed line-clamp-2 h-8 italic">
                {period.tagline}
              </p>

              {/* Informações rápidas na base do card */}
              <div className="mt-4 pt-3 border-t border-brand-gold/20 flex items-center justify-between text-[10px] text-charcoal/60 font-serif">
                <span className="truncate max-w-[120px]" title={period.monarchOrLeader}>
                  👑 {period.monarchOrLeader.replace(/ \(.*\)/, "")}
                </span>
                <span>
                  📍 {period.capital.split(" / ")[0]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
