import { useState } from "react";
import { HistoricalPeriod, MapRegion } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Info, Globe, Map as MapIcon, Calendar, User, Eye } from "lucide-react";

interface MapExplorerProps {
  currentPeriod: HistoricalPeriod;
}

export default function MapExplorer({ currentPeriod }: MapExplorerProps) {
  const [mapType, setMapType] = useState<"continental" | "global">("continental");
  const [hoveredRegion, setHoveredRegion] = useState<MapRegion | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null);
  
  const [hoveredDock, setHoveredDock] = useState<{ name: string; type: string; description: string } | null>(null);
  const [selectedDock, setSelectedDock] = useState<{ name: string; type: string; description: string } | null>(null);

  const [hoveredRoute, setHoveredRoute] = useState<{ name: string; captain: string; year: number } | null>(null);

  const regions = currentPeriod.mapData.mainlandRegions;
  const docks = currentPeriod.mapData.worldDocks;
  const routes = currentPeriod.mapData.maritimeRoutes || [];

  return (
    <div className="bg-white border-2 border-brand-gold rounded-lg p-6 shadow-sm overflow-hidden text-charcoal flex flex-col md:flex-row gap-8 min-h-[500px]" id="map-explorer-container">
      {/* Sidebar de Informação */}
      <div className="w-full md:w-1/3 flex flex-col justify-between gap-6" id="map-explorer-info-sidebar">
        <div>
          <div className="flex items-center gap-3 mb-2" id="map-explorer-header">
            <span className="p-2.5 rounded-sm bg-brand-crusade text-brand-gold">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs font-serif font-black tracking-wider text-brand-crusade uppercase">Cartografia Régia</span>
              <h3 className="font-serif text-2xl font-black tracking-tight text-brand-navy">{currentPeriod.title}</h3>
            </div>
          </div>
          <p className="text-xs text-charcoal/60 font-mono mb-4 font-bold">{currentPeriod.yearsRange}</p>

          <p className="text-xs md:text-sm leading-relaxed text-charcoal/80 mb-6 font-serif">
            Examine as fronteiras soberanas e a projeção ultramarina portuguesa desta era. Utilize as opções abaixo para alternar entre o território continental de Portugal e as grandes rotas ultramarinas.
          </p>

          {/* Seletores de Tipo de Mapa */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#F5F2ED] rounded-lg border border-brand-gold/25 mb-6" id="map-selectors shadow-inner">
            <button
              id="btn-map-continental"
              onClick={() => {
                setMapType("continental");
                setSelectedRegion(null);
                setSelectedDock(null);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 text-xs font-serif font-black rounded-sm transition-all ${
                mapType === "continental"
                  ? "bg-brand-navy text-white shadow-sm"
                  : "text-charcoal/70 hover:text-brand-navy"
              }`}
            >
              <MapIcon className="w-4 h-4 text-brand-gold" />
              Reino de Portugal
            </button>
            <button
              id="btn-map-global"
              onClick={() => {
                setMapType("global");
                setSelectedRegion(null);
                setSelectedDock(null);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 text-xs font-serif font-black rounded-sm transition-all ${
                mapType === "global"
                  ? "bg-brand-navy text-white shadow-sm"
                  : "text-charcoal/70 hover:text-brand-navy"
              }`}
            >
              <Globe className="w-4 h-4 text-brand-gold" />
              Alcance Global
            </button>
          </div>
        </div>

        {/* Detalhes Dinâmicos */}
        <div className="bg-[#F9F7F2] border border-brand-gold/30 rounded-lg p-5 min-h-[220px] flex flex-col justify-between" id="dynamic-map-details bg-wood">
          <AnimatePresence mode="wait">
            {mapType === "continental" ? (
              // Informações sobre regiões continentais
              (selectedRegion || hoveredRegion) ? (
                <motion.div
                  key="region-details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-serif font-bold text-brand-crusade uppercase tracking-wider">Província do Reino</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-serif font-bold border ${
                        (selectedRegion || hoveredRegion)!.status === "controlled"
                          ? "bg-white text-brand-navy border-brand-navy/35"
                          : (selectedRegion || hoveredRegion)!.status === "contested"
                          ? "bg-brand-gold/10 text-brand-crusade border-brand-gold/45"
                          : "bg-brand-crusade/10 text-brand-crusade border-brand-crusade/30"
                      }`}>
                        {(selectedRegion || hoveredRegion)!.status === "controlled" ? "Domínio Seguro" :
                         (selectedRegion || hoveredRegion)!.status === "contested" ? "Fronteira Contestada" : "Alheio ao Reino"}
                      </span>
                    </div>
                    <h4 className="text-base font-black font-serif text-brand-navy mb-2">
                      {(selectedRegion || hoveredRegion)!.name}
                    </h4>
                    <p className="text-xs text-charcoal/80 leading-relaxed mb-4 font-serif italic">
                      {(selectedRegion || hoveredRegion)!.description}
                    </p>
                  </div>
                  {selectedRegion && (
                    <button 
                      id="reset-region-selection"
                      onClick={() => setSelectedRegion(null)} 
                      className="text-left text-xs font-serif text-brand-crusade hover:text-brand-navy mt-2 flex items-center gap-1 font-bold"
                    >
                      <Eye className="w-3.5 h-3.5" /> Clique para libertar seleção
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="region-placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-8 text-charcoal/60 font-serif text-xs leading-relaxed"
                >
                  <MapIcon className="w-8 h-8 opacity-25 mb-2 text-brand-gold" />
                  <span>Passe o cursor ou clique nas regiões feudais e províncias para avaliar dinastias, conquistas e demarcações de fronteira.</span>
                </motion.div>
              )
            ) : (
              // Informações sobre docks/routes globais
              docks.length === 0 ? (
                <motion.div
                  key="global-no-docks"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-8 text-brand-crusade font-serif text-xs leading-relaxed font-bold"
                >
                  <Globe className="w-8 h-8 opacity-30 mb-2 text-brand-gold" />
                  <span>Neste tempo memorável, Portugal centrava as suas forças na consolidação nacional e na Reconquista. Alterne para a Era dos Descobrimentos.</span>
                </motion.div>
              ) : (selectedDock || hoveredDock) ? (
                <motion.div
                  key="dock-details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-serif font-black text-brand-crusade uppercase tracking-wider">Feitoria ultramarina</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-serif border bg-brand-navy text-brand-gold border-brand-gold/45 font-bold">
                        {(selectedDock || hoveredDock)!.type === "colony" ? "Vice-Reinado Soberano" : "Praça-Forte / Feitoria comercial"}
                      </span>
                    </div>
                    <h4 className="text-base font-bold font-serif text-brand-navy mb-2">
                      {(selectedDock || hoveredDock)!.name}
                    </h4>
                    <p className="text-xs text-charcoal/80 leading-relaxed font-serif italic">
                      {(selectedDock || hoveredDock)!.description}
                    </p>
                  </div>
                  {selectedDock && (
                    <button 
                      id="reset-dock-selection"
                      onClick={() => setSelectedDock(null)} 
                      className="text-left text-xs font-serif text-brand-crusade hover:text-brand-navy mt-2 font-bold"
                    >
                      Limpar praça-forte selecionada
                    </button>
                  )}
                </motion.div>
              ) : hoveredRoute ? (
                <motion.div key="route-details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
                  <span className="text-xs font-serif font-black text-brand-crusade uppercase tracking-wider">Carreira / Armada Real</span>
                  <h4 className="text-base font-black font-serif text-brand-navy">{hoveredRoute.name}</h4>
                  <div className="flex gap-4 text-xs font-serif text-charcoal/70">
                    <span className="flex items-center gap-1 font-bold"><User className="w-3.5 h-3.5 text-brand-gold" /> Capitão-Mor: {hoveredRoute.captain}</span>
                    <span className="flex items-center gap-1 font-bold"><Calendar className="w-3.5 h-3.5 text-brand-gold" /> Ano: {hoveredRoute.year}</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="global-placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-8 text-charcoal/60 font-serif text-xs leading-relaxed"
                >
                  <Globe className="w-8 h-8 opacity-25 mb-2 text-brand-gold" />
                  <span>Passe sobre os enclaves de comércio ultramarino ou as rotas traçadas pelas caravelas para ler as notas de navegação.</span>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Canvas do Mapa */}
      <div className="flex-1 flex items-center justify-center bg-[#ECE8DF] border-2 border-brand-gold/30 rounded-lg p-4 min-h-[350px] relative" id="map-canvas-container">
        {/* Enquadramento decorativo */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-brand-gold pointer-events-none"></div>
        <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-brand-gold pointer-events-none"></div>
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-brand-gold pointer-events-none"></div>
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-brand-gold pointer-events-none"></div>

        {mapType === "continental" ? (
          /* MAPA CONTINENTAL DE PORTUGAL */
          <div className="w-full max-w-[240px] aspect-[1/2] flex items-center justify-center" id="continental-svg-map">
            <svg
              viewBox={currentPeriod.mapData.viewBox}
              className="w-full h-full drop-shadow-[0_8px_16px_rgba(43,27,18,0.15)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Plano de fundo geográfico (Ria / Mar) */}
              <text x={10} y={150} className="fill-brand-navy/35 text-[10px] font-serif font-black tracking-widest pointer-events-none uppercase italic" transform="rotate(-90 10 150)">
                Oceano Atlântico
              </text>
              <text x={140} y={180} className="fill-brand-crusade/25 text-[10px] font-serif tracking-widest pointer-events-none" opacity="0.6">
                Castela
              </text>

              {/* Desenho das Regiões de Portugal */}
              {regions.map((reg) => {
                const isHovered = hoveredRegion?.id === reg.id;
                const isSelected = selectedRegion?.id === reg.id;
                
                // Determinamos o preenchimento com base no status de controlo da época
                let fill = "#E4DEC9"; // Fora (none)
                let stroke = "#BCD4AF37";
                let strokeStyle = "";

                if (reg.status === "controlled") {
                  fill = reg.colorHex; 
                } else if (reg.status === "contested") {
                  fill = "rgba(180, 140, 60, 0.2)";
                  stroke = "#D4AF37";
                  strokeStyle = "4,4";
                } else if (reg.status === "none") {
                  fill = "rgba(71, 85, 105, 0.05)";
                  stroke = "#C4BEAE";
                }

                return (
                  <motion.path
                    key={reg.id}
                    d={reg.path}
                    id={`map-region-${reg.id}`}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 1.5}
                    strokeDasharray={strokeStyle}
                    onMouseEnter={() => setHoveredRegion(reg)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => {
                      if (selectedRegion?.id === reg.id) {
                        setSelectedRegion(null);
                      } else {
                        setSelectedRegion(reg);
                      }
                    }}
                    whileHover={{ scale: 1.015, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="cursor-pointer transition-colors duration-150 relative"
                    style={{
                      filter: isSelected ? "drop-shadow(0 0 6px rgba(212, 175, 55, 0.8))" : isHovered ? "brightness(1.03)" : "none"
                    }}
                  />
                );
              })}

              {/* Marcadores de Cidades Relevantes na época */}
              {currentPeriod.id === "fundacao" && (
                <>
                  <circle cx={90} cy={75} r={3.5} fill="#9B1B30" className="stroke-white stroke-2" />
                  <text x={100} y={78} className="fill-brand-navy text-[9px] font-serif font-black" pointerEvents="none">Guimarães</text>

                  <circle cx={85} cy={140} r={3.5} fill="#002147" className="stroke-white stroke-2" />
                  <text x={95} y={143} className="fill-brand-navy text-[9px] font-serif font-black" pointerEvents="none">Coimbra</text>
                </>
              )}
              {currentPeriod.id !== "fundacao" && (
                <>
                  {/* Lisboa instalada como capital/porto maior */}
                  <circle cx={42} cy={232} r={4} fill="#9B1B30" className="stroke-white stroke-2 animate-pulse" />
                  <text x={53} y={235} className="fill-brand-crusade text-[10px] font-serif font-black" pointerEvents="none">Lisboa</text>

                  <circle cx={75} cy={75} r={3} fill="#002147" className="stroke-white" />
                  <text x={83} y={78} className="fill-brand-navy/80 text-[9px] font-serif font-bold" pointerEvents="none">Porto</text>
                </>
              )}
            </svg>
          </div>
        ) : (
          /* MAPA MUNDIAL E ROTAS ULTRAMARINAS (viewBox 0 0 800 400) */
          <div className="w-full flex flex-col justify-center items-center" id="global-svg-map">
            <svg
              viewBox="0 0 800 400"
              className="w-full h-auto drop-shadow-[0_8px_16px_rgba(43,27,18,0.15)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Esboços esquemáticos dos continentes e océanos */}
              {/* Oceano */}
              <rect width={800} height={400} fill="#E4DEC9" rx={8} />
              
              <text x={250} y={180} className="fill-brand-navy/20 font-serif italic text-[11px] pointer-events-none">Oceano Atlântico</text>
              <text x={520} y={290} className="fill-brand-navy/20 font-serif italic text-[11px] pointer-events-none">Oceano Índico</text>

              {/* Continente Sul-Americano (Esquema simplificado) */}
              <path d="M 120,200 C 130,220 180,240 220,260 C 230,280 200,340 180,380 C 140,360 110,300 100,240 Z" fill="#DDD9CF" stroke="#C5BDB0" strokeWidth={1} />
              
              {/* África (Esquema simplificado) */}
              <path d="M 360,150 C 370,160 410,200 420,225 C 430,240 435,270 440,320 C 420,310 400,290 380,250 C 350,220 340,195 330,170 Z" fill="#DDD9CF" stroke="#C5BDB0" strokeWidth={1} />

              {/* Europa (Esquema simplificado) */}
              <path d="M 320,80 C 340,85 380,90 370,140 C 390,135 410,120 440,110 C 450,130 500,100 430,70 Z" fill="#DDD9CF" stroke="#C5BDB0" strokeWidth={1} />

              {/* Índia e Ásia (Esquema simplificado) */}
              <path d="M 540,150 C 560,170 580,200 580,200 L 620,210 L 660,180 Z" fill="#DDD9CF" stroke="#C5BDB0" strokeWidth={1} />

              {/* Desenho das Rotas Marítimas como linhas tracejadas dinâmicas */}
              {routes.map((rt) => {
                const isHovered = hoveredRoute?.name === rt.name;
                return (
                  <g key={rt.name}>
                    <path
                      d={rt.pathD}
                      fill="none"
                      stroke={rt.color === "#ef4444" ? "#9B1B30" : "#002147"}
                      strokeWidth={isHovered ? 3.5 : 2}
                      strokeDasharray="6,4"
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredRoute({ name: rt.name, captain: rt.captain, year: rt.year })}
                      onMouseLeave={() => setHoveredRoute(null)}
                    />
                    {/* Linha invisível mais larga para capturar o rato facilmente */}
                    <path
                      d={rt.pathD}
                      fill="none"
                      stroke="transparent"
                      strokeWidth={15}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredRoute({ name: rt.name, captain: rt.captain, year: rt.year })}
                      onMouseLeave={() => setHoveredRoute(null)}
                    />
                  </g>
                );
              })}

              {/* Enclaves / Feitorias coloniais desenhados como enclaves circulares */}
              {docks.map((dk) => {
                const isHovered = hoveredDock?.name === dk.name;
                const isSelected = selectedDock?.name === dk.name;
                
                return (
                  <g key={dk.name}>
                    <motion.circle
                      cx={dk.x}
                      cy={dk.y}
                      r={isSelected ? 8 : isHovered ? 6 : 4.5}
                      fill={dk.type === "colony" ? "#9B1B30" : "#D4AF37"}
                      stroke="#fff"
                      strokeWidth={1.5}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredDock(dk)}
                      onMouseLeave={() => setHoveredDock(null)}
                      onClick={() => {
                        if (selectedDock?.name === dk.name) {
                          setSelectedDock(null);
                        } else {
                          setSelectedDock(dk);
                        }
                      }}
                      animate={{
                        scale: isSelected || isHovered ? 1.25 : 1
                      }}
                    />
                    {/* Etiqueta pequena */}
                    {(isSelected || isHovered) && (
                      <g transform={`translate(${dk.x + 8}, ${dk.y - 8})`} className="pointer-events-none">
                        <rect width={130} height={18} fill="#002147" stroke="#D4AF37" strokeWidth={1} rx={4} />
                        <text x={6} y={12} fill="#D4AF37" className="text-[9px] font-mono font-bold">{dk.name}</text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Indicador de partida de Lisboa */}
              <circle cx={370} cy={140} r={5} fill="#10b981" stroke="#fff" strokeWidth={2} />
              <text x={380} y={135} fill="#9B1B30" className="text-[10px] font-serif font-black" pointerEvents="none">Lisboa</text>
            </svg>
            <div className="flex justify-center gap-6 mt-4 flex-wrap text-charcoal/70 font-serif text-[10px] font-bold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#9B1B30] border border-white"></span> Vice-Reinado Histórico</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] border border-white"></span> Feitoria de Comércio</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
