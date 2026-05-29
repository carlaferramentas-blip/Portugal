import { useState } from "react";
import { StudyGuide, StudyGuideQuizItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, Sparkles, HelpCircle, FileText, Calendar, Compass, 
  Printer, Download, PenTool, Check, AlertCircle, RefreshCw, BookmarkCheck
} from "lucide-react";

interface StudyNotebookProps {
  archivedDocuments: string[];
  currentPeriodTitle: string;
}

export default function StudyNotebook({ archivedDocuments, currentPeriodTitle }: StudyNotebookProps) {
  // Configurações do Guia
  const [eduLevel, setEduLevel] = useState<string>("secundario");
  const [styleFocus, setStyleFocus] = useState<string>("geopolitica");
  const [customNotes, setCustomNotes] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [guideData, setGuideData] = useState<StudyGuide | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Controladores do Quiz
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [activeTab, setActiveTab] = useState<"resumo" | "cronologia" | "vocabulario" | "quiz" | "projeto">("resumo");

  // Fatos históricos divertidos para mostrar na tela de carregamento
  const loadingFacts = [
    "Sabias que Portugal partilha a fronteira continental estável mais antiga de toda a Europa, fixada no Tratado de Alcañizes em 1297?",
    "Sabias que as caravelas portuguesas utilizavam velas triangulares latinas para bolinar, permitindo navegar contra a direção do vento?",
    "Sabias que Portugal foi o primeiro país do mundo a abolir legalmente a pena de morte para crimes civis, em 1867?",
    "Sabias que o Tratado de Windsor de 1386 estabeleceu a aliança diplomática ativa mais antiga do mundo, ainda em vigor entre Portugal e Inglaterra!",
    "Sabias que na Batalha de Aljubarrota das tropas de D. João I utilizaram a tática do quadrado medieval inspirada nos arqueiros ingleses?"
  ];
  const [currentFactIdx, setCurrentFactIdx] = useState(0);

  // Função para rodar factos históricos no loading
  const rotateFact = () => {
    setCurrentFactIdx((prev) => (prev + 1) % loadingFacts.length);
  };

  // Gerador de Guia via IA
  const generateGuide = async () => {
    setStatus("loading");
    setErrorMessage("");
    setQuizAnswers({});

    // Rodar pequenos factos
    const interval = setInterval(rotateFact, 4000);

    try {
      const response = await fetch("/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          era: currentPeriodTitle,
          documents: archivedDocuments,
          educationLevel: 
            eduLevel === "basico" ? "Básico (1º, 2º e 3º Ciclo)" : 
            eduLevel === "secundario" ? "Sénior / Ensino Secundário (10º ao 12º ano)" : "Académico / Ensino Superior",
          focusTopic: 
            styleFocus === "geopolitica" ? "Território, Grandes Batalhas, Diplomacia e Tratados" :
            styleFocus === "cultura" ? "Desenvolvimento Cultural, Mentalidades, Inovações Científicas e Arte" : "Sociedade, Demografia e Vida Quotidiana das populações",
          customNotes: customNotes
        })
      });

      if (!response.ok) {
        throw new Error("Falha no servidor ao processar o guia.");
      }

      const data = await response.json();
      setGuideData(data);
      setStatus("success");
      setActiveTab("resumo");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Não foi possível conectar com o motor de inteligência.");
      setStatus("error");
    } finally {
      clearInterval(interval);
    }
  };

  // Descarregar formato de texto (.txt)
  const downloadTXT = () => {
    if (!guideData) return;

    let content = `========================================================\n`;
    content += `GUIA DE ESTUDO: ${guideData.title}\n`;
    content += `Período Histórico: ${guideData.historicalPeriod}\n`;
    content += `Adaptação Curricular: ${eduLevel.toUpperCase()}\n`;
    content += `========================================================\n\n`;

    content += `--- RESUMO PEDAGÓGICO ---\n\n`;
    content += `${guideData.summaryText}\n\n`;

    content += `--- MARCOS CRONOLÓGICOS ---\n\n`;
    guideData.importantDates.forEach((d) => {
      content += `• [${d.year}] ${d.event}\n  Contexto: ${d.historicalContext}\n\n`;
    });

    content += `--- FIGURAS RELEVANTES ---\n\n`;
    guideData.keyFigures.forEach((f) => {
      content += `• ${f.name} (${f.role})\n  Ação: ${f.description}\n\n`;
    });

    content += `--- GLOSSÁRIO DA ÉPOCA ---\n\n`;
    guideData.vocabulary.forEach((v) => {
      content += `• ${v.term}: ${v.meaning}\n`;
    });
    content += `\n`;

    content += `--- ATIVIDADE RECOMENDADA ---\n\n`;
    content += `Projeto: ${guideData.pedagogicalSuggestion.activityTitle}\n`;
    content += `Como fazer: ${guideData.pedagogicalSuggestion.instructions}\n\n`;

    content += `--- QUIZ DE AUTO-AVALIAÇÃO ---\n\n`;
    guideData.quiz.forEach((q, idx) => {
      content += `Pergunta ${idx + 1}: ${q.question}\n`;
      q.options.forEach((opt, oIdx) => {
        content += `  [ ] ${oIdx + 1}) ${opt}\n`;
      });
      content += `  -> Resposta correta: Opção ${q.correctIndex + 1}\n`;
      content += `  -> Explicação: ${q.explanation}\n\n`;
    });

    content += `\nGerado automaticamente por: História de Portugal Interativa © 2026`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `resumo_historia_portugal_${guideData.historicalPeriod.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Imprimir guia chamando print de folha pura
  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#F5F2ED] border-2 border-brand-gold rounded-lg p-6 md:p-8 shadow-sm overflow-hidden" id="interactive-notebook">
      
      {/* SEÇÃO NÃO IMPRESSA (Apenas para edição) */}
      <div className="no-print">
        {status === "idle" && (
          <div className="flex flex-col gap-6" id="notebook-config-panel">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-sm bg-brand-navy text-brand-gold">
                <BookOpen className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-serif text-lg font-black text-brand-navy">Caderno de Estudo e Resumos IA</h3>
                <p className="text-xs text-charcoal/70 font-serif">Compile as suas descobertas e gere um guia de estudo estruturado e adaptado ao seu plano curricular.</p>
              </div>
            </div>

            {/* Informações compiladas no Caderno */}
            <div className="bg-white p-4 border border-brand-gold/30 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xs" id="compiled-metadata-row">
              <div className="flex gap-4 flex-wrap text-xs font-serif">
                <div>
                  <span className="text-charcoal/60 font-medium">Período Selecionado:</span>
                  <p className="text-brand-navy font-black mt-0.5">📍 {currentPeriodTitle}</p>
                </div>
                <div className="border-l border-brand-gold/35 pl-4">
                  <span className="text-charcoal/60 font-medium">Manuscritos Preservados:</span>
                  <p className="text-brand-crusade font-black mt-0.5">📜 {archivedDocuments.length} documentos originais</p>
                </div>
              </div>
              
              {archivedDocuments.length === 0 ? (
                <span className="text-[10px] text-charcoal/60 italic bg-brand-paper px-3 py-1 rounded-sm border border-brand-gold/25 font-serif">
                  Dica: Adicione manuscritos na aba anterior para enriquecer o seu guia
                </span>
              ) : (
                <span className="text-[10px] text-brand-navy font-black bg-[#E4DEC9] px-3 py-1 rounded-sm border border-brand-gold/40 flex items-center gap-1">
                  <BookmarkCheck className="w-3 h-3 text-brand-crusade" /> {archivedDocuments.length} compilados
                </span>
              )}
            </div>

            {/* Configurações Académicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="edu-options-grid">
              {/* Opção 1: Nível Curricular */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-serif font-black text-brand-crusade uppercase tracking-wider">Grau Educacional de Adaptação</label>
                <div className="grid grid-cols-3 gap-2 bg-[#ECE8DF] p-1 rounded-sm border border-brand-gold/35">
                  <button
                    onClick={() => setEduLevel("basico")}
                    className={`py-2 px-1 text-center text-xs font-serif rounded-sm transition-all ${
                      eduLevel === "basico"
                        ? "bg-brand-navy text-brand-gold font-serif font-black shadow-xs"
                        : "text-charcoal/60 hover:text-brand-navy"
                    }`}
                  >
                    Básico (6º/9º)
                  </button>
                  <button
                    onClick={() => setEduLevel("secundario")}
                    className={`py-2 px-1 text-center text-xs font-serif rounded-sm transition-all ${
                      eduLevel === "secundario"
                        ? "bg-brand-navy text-brand-gold font-serif font-black shadow-xs"
                        : "text-charcoal/60 hover:text-brand-navy"
                    }`}
                  >
                    Secundário
                  </button>
                  <button
                    onClick={() => setEduLevel("superior")}
                    className={`py-2 px-1 text-center text-xs font-serif rounded-sm transition-all ${
                      eduLevel === "superior"
                        ? "bg-brand-navy text-brand-gold font-serif font-black shadow-xs"
                        : "text-charcoal/60 hover:text-brand-navy"
                    }`}
                  >
                    Superior
                  </button>
                </div>
              </div>

              {/* Opção 2: Foco Pedagógico */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-serif font-black text-brand-crusade uppercase tracking-wider">Foco Temático do Resumo</label>
                <div className="grid grid-cols-3 gap-2 bg-[#ECE8DF] p-1 rounded-sm border border-brand-gold/35">
                  <button
                    onClick={() => setStyleFocus("geopolitica")}
                    className={`py-2 px-1 text-center text-xs font-serif rounded-sm transition-all truncate ${
                      styleFocus === "geopolitica"
                        ? "bg-brand-navy text-brand-gold font-serif font-black shadow-xs"
                        : "text-charcoal/60 hover:text-brand-navy"
                    }`}
                    title="Batalhas, Tratados"
                  >
                    Geopolítica
                  </button>
                  <button
                    onClick={() => setStyleFocus("cultura")}
                    className={`py-2 px-1 text-center text-xs font-serif rounded-sm transition-all truncate ${
                      styleFocus === "cultura"
                        ? "bg-brand-navy text-brand-gold font-serif font-black shadow-xs"
                        : "text-charcoal/60 hover:text-brand-navy"
                    }`}
                    title="Ciência, Cultura"
                  >
                    Cultura
                  </button>
                  <button
                    onClick={() => setStyleFocus("sociedade")}
                    className={`py-2 px-1 text-center text-xs font-serif rounded-sm transition-all truncate ${
                      styleFocus === "sociedade"
                        ? "bg-brand-navy text-brand-gold font-serif font-black shadow-xs"
                        : "text-charcoal/60 hover:text-brand-navy"
                    }`}
                    title="Sociedade, quotidiano"
                  >
                    Sociedade
                  </button>
                </div>
              </div>
            </div>

            {/* Notas Pessoais do Aluno */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-serif font-black text-brand-crusade uppercase tracking-wider flex items-center gap-1">
                  <PenTool className="w-3.5 h-3.5" /> Notas Históricas ou Questões Pessoais
                </label>
                <span className="text-[10px] text-charcoal/60 font-serif font-bold">Opcional - a IA responderá a estas anotações</span>
              </div>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Escreva aqui dúvidas específicas, hipóteses de estudo ou notas tiradas no seu roteiro (ex: 'Quero focar na importância do astrolábio' ou 'Explica o papel de D. Afonso Henriques')."
                className="w-full h-24 bg-white border-2 border-brand-gold rounded-lg p-4 text-xs font-serif text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-brand-navy"
              />
            </div>

            {/* Botão Principal de Ativação IA */}
            <button
              id="btn-generate-guide"
              onClick={generateGuide}
              className="w-full py-4 rounded-lg bg-brand-crusade hover:bg-brand-navy text-white font-serif font-black text-sm tracking-wide shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
              Sintetizar Estudo Personalizado com Inteligência Artificial
            </button>
          </div>
        )}

        {/* LOADING STATE */}
        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center min-h-[350px]" id="loading-study-guide">
            {/* Animador Central de Astrolábio */}
            <div className="w-16 h-16 border-4 border-brand-navy border-t-brand-gold rounded-full animate-spin mb-6" id="loading-spinner"></div>
            
            <h4 className="font-serif text-lg font-black text-brand-navy mb-2">Compilando Documentação e Escrevendo Resumo...</h4>
            <p className="text-xs font-serif font-black text-brand-crusade animate-pulse mb-8">Nível de Rigor: Historiador Real • Adaptando ao Grau {eduLevel.toUpperCase()}</p>

            {/* Slider de Fatos Históricos Divertidos para reter utilizadores */}
            <div className="max-w-md bg-white border-2 border-brand-gold rounded-lg p-5 shadow-sm" id="interactive-loading-facts">
              <span className="text-[10px] font-serif tracking-widest text-[#9B1B30] font-black uppercase block mb-1">Dica Curricular</span>
              <p className="text-xs text-charcoal font-serif leading-relaxed italic">
                "{loadingFacts[currentFactIdx]}"
              </p>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {status === "error" && (
          <div className="flex flex-col items-center justify-center py-12 text-center" id="error-study-guide">
            <span className="p-4 rounded-full bg-[#f8d7da] text-[#91242c] border border-brand-gold mb-4">
              <AlertCircle className="w-8 h-8" />
            </span>
            <h4 className="font-serif text-lg font-black text-brand-navy mb-2">Não foi possível gerar o Guia</h4>
            <p className="text-xs text-charcoal/70 max-w-sm mb-6">{errorMessage}</p>
            <button
              onClick={() => setStatus("idle")}
              className="py-2.5 px-6 rounded-lg bg-brand-navy hover:bg-brand-crusade text-xs font-serif font-black text-brand-gold flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Tentar Novamente
            </button>
          </div>
        )}
      </div>

      {/* SUCCESS STATE - VISUALIZAÇÃO COMPLETA DO GUIA DE ESTUDO */}
      {status === "success" && guideData && (
        <div className="flex flex-col gap-6" id="rendered-study-guide-block">
          
          {/* BARRA DE FERRAMENTAS E TÍTULO (Ocultado no Print) */}
          <div className="no-print flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-gold/20 pb-5" id="guide-action-bar">
            <div>
              <span className="text-xs font-serif font-black text-brand-crusade uppercase tracking-widest leading-none">Manuscrito de Estudo Prontificado</span>
              <h3 className="font-serif text-2xl font-black text-brand-navy leading-tight mt-1">{guideData.title}</h3>
              <p className="text-[10px] font-serif font-bold text-charcoal/60 mt-1">Época: <strong>{currentPeriodTitle}</strong> • Grau {eduLevel.toUpperCase()}</p>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-2">
              <button
                onClick={triggerPrint}
                className="py-2.5 px-4 rounded-lg bg-white border border-brand-gold hover:bg-[#ECE8DF] text-xs font-serif font-black text-brand-navy flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4 text-brand-gold" />
                Imprimir / PDF
              </button>
              <button
                onClick={downloadTXT}
                className="py-2.5 px-4 rounded-lg bg-brand-crusade hover:bg-brand-navy text-xs font-serif font-black text-white flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-brand-gold" />
                Descarregar (.TXT)
              </button>
              <button
                onClick={() => setStatus("idle")}
                className="py-2.5 px-3 rounded-lg bg-white border border-brand-gold hover:bg-[#ECE8DF] text-xs font-serif font-black text-charcoal/60 cursor-pointer"
              >
                Novo Guia
              </button>
            </div>
          </div>

          {/* MENUS DE NAVEGAÇÃO DOS SEGUIDORES - APENAS WEB (Ocultado no Print) */}
          <div className="no-print flex gap-1 bg-[#ECE8DF] p-1 rounded-lg border border-brand-gold/30 max-w-full overflow-x-auto" id="guide-dashboard-tabs">
            <button
              onClick={() => setActiveTab("resumo")}
              className={`px-4 py-2 rounded-sm text-xs font-serif font-black whitespace-nowrap transition-all ${
                activeTab === "resumo" ? "bg-brand-navy text-brand-gold shadow-sm" : "text-charcoal/60 hover:text-brand-navy"
              }`}
            >
              📜 Resumo Temático
            </button>
            <button
              onClick={() => setActiveTab("cronologia")}
              className={`px-4 py-2 rounded-sm text-xs font-serif font-black whitespace-nowrap transition-all ${
                activeTab === "cronologia" ? "bg-brand-navy text-brand-gold shadow-sm" : "text-charcoal/60 hover:text-brand-navy"
              }`}
            >
              📅 Cronologia e Figuras
            </button>
            <button
              onClick={() => setActiveTab("vocabulario")}
              className={`px-4 py-2 rounded-sm text-xs font-serif font-black whitespace-nowrap transition-all ${
                activeTab === "vocabulario" ? "bg-brand-navy text-brand-gold shadow-sm" : "text-charcoal/60 hover:text-brand-navy"
              }`}
            >
              📚 Glossário
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`px-4 py-2 rounded-sm text-xs font-serif font-black whitespace-nowrap transition-all ${
                activeTab === "quiz" ? "bg-brand-navy text-brand-gold shadow-sm" : "text-charcoal/60 hover:text-brand-navy"
              }`}
            >
              🧠 Quiz de Aferição
            </button>
            <button
              onClick={() => setActiveTab("projeto")}
              className={`px-4 py-2 rounded-sm text-xs font-serif font-black whitespace-nowrap transition-all ${
                activeTab === "projeto" ? "bg-brand-navy text-brand-gold shadow-sm" : "text-charcoal/60 hover:text-brand-navy"
              }`}
            >
              🎨 Projeto de Aula
            </button>
          </div>

          {/* CONTEÚDO EXPOSITIVO - EXIBIÇÃO EM ABAS INTERATIVAS (Apenas Web) */}
          <div className="no-print min-h-[300px]" id="guide-tab-content-container">
            <AnimatePresence mode="wait">
              {/* TAB RESUMO */}
              {activeTab === "resumo" && (
                <motion.div
                  key="resumo-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-lg p-6 md:p-8 shadow-sm border-2 border-brand-gold relative overflow-hidden text-charcoal"
                >
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200')] bg-cover mix-blend-multiply"></div>
                  <div className="relative z-10 font-serif leading-relaxed text-sm md:text-base">
                    {guideData.summaryText.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx} className="text-charcoal">{para}</p>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB CRONOLOGIA E PERSONAGENS */}
              {activeTab === "cronologia" && (
                <motion.div
                  key="cronologia-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Lado Esquerdo: Linha Temporal */}
                  <div className="bg-white rounded-lg p-5 border-2 border-brand-gold shadow-sm">
                    <h4 className="font-serif text-sm font-black text-brand-crusade uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-brand-gold/20 pb-2">
                      <Calendar className="w-4 h-4 text-brand-gold" /> Marcos Históricos e Datas
                    </h4>
                    <div className="relative border-l-2 border-brand-gold pl-4 space-y-5 py-2">
                      {guideData.importantDates.map((dt, idx) => (
                        <div key={idx} className="relative">
                          {/* Pin verde */}
                          <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-brand-navy border border-brand-gold"></span>
                          <span className="font-serif text-xs font-black text-brand-navy bg-[#ECE8DF] px-2 py-0.5 rounded-sm border border-brand-gold/30">{dt.year}</span>
                          <h5 className="font-serif text-sm font-black text-brand-navy mt-1.5">{dt.event}</h5>
                          <p className="text-xs text-charcoal/80 mt-1 font-serif">{dt.historicalContext}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lado Direito: Figuras de Destaque */}
                  <div className="bg-white rounded-lg p-5 border-2 border-brand-gold shadow-sm flex flex-col gap-4">
                    <h4 className="font-serif text-sm font-black text-[#9B1B30] uppercase tracking-wider flex items-center gap-1.5 border-b border-brand-gold/20 pb-2">
                       <Compass className="w-4 h-4 text-brand-gold" /> Personagens Ilustres do Período
                    </h4>
                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                      {guideData.keyFigures.map((fig, idx) => (
                        <div key={idx} className="p-3 bg-brand-paper/50 border border-brand-gold/25 rounded-md relative hover:border-brand-gold transition-all">
                          <h5 className="font-serif text-[10px] font-bold text-brand-crusade uppercase tracking-wide">{fig.role}</h5>
                          <h6 className="font-serif text-sm font-black text-brand-navy mt-0.5">{fig.name}</h6>
                          <p className="text-xs text-charcoal/90 font-serif leading-relaxed mt-1.5 italic">{fig.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB GLOSSÁRIO */}
              {activeTab === "vocabulario" && (
                <motion.div
                  key="vocabulario-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border-2 border-brand-gold rounded-lg p-5 shadow-sm"
                >
                  <h4 className="font-serif text-sm font-black text-brand-navy uppercase tracking-wider mb-4 border-b border-brand-gold/20 pb-2">
                    Vocabulário e Glossário Clássico
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guideData.vocabulary.map((vocab, vIdx) => (
                      <div key={vIdx} className="p-4 bg-brand-paper/50 rounded-md border border-brand-gold/20 flex items-start gap-3">
                        <span className="font-serif text-xs font-black text-brand-gold bg-brand-navy p-1.5 rounded-sm">0{vIdx + 1}</span>
                        <div>
                          <h5 className="font-serif text-sm font-black text-brand-navy">{vocab.term}</h5>
                          <p className="text-xs text-charcoal/80 mt-1 font-serif leading-relaxed italic">{vocab.meaning}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB QUIZ INTERATIVO */}
              {activeTab === "quiz" && (
                <motion.div
                  key="quiz-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white border-2 border-brand-gold p-5 rounded-lg shadow-sm">
                    <h4 className="font-serif text-sm font-black text-[#9B1B30] uppercase tracking-wider flex items-center gap-1.5 border-b border-brand-gold/20 pb-2 mb-4">
                      <HelpCircle className="w-4 h-4 text-brand-gold" /> Desafio Imperial de Auto-Avaliação
                    </h4>
                    <p className="text-xs text-charcoal/80 mb-6 leading-relaxed font-serif">
                      Prove o seu conhecimento respondendo às questões elaboradas pela chancelaria cibernética. Avalie as suas respostas instantaneamente!
                    </p>

                    <div className="space-y-6">
                      {guideData.quiz.map((q, qIdx) => {
                        const hasSelected = quizAnswers[qIdx] !== undefined;
                        const userSel = quizAnswers[qIdx];
                        return (
                          <div key={qIdx} className="p-5 bg-brand-paper/35 rounded-lg border border-brand-gold/25 flex flex-col gap-4">
                            <h5 className="font-serif text-sm font-black text-brand-navy flex gap-2">
                              <span className="font-serif text-xs font-black text-brand-gold bg-brand-navy px-2 py-0.5 rounded-sm">Questão {qIdx + 1}</span>
                              {q.question}
                            </h5>

                            {/* Opções de escolha */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                              {q.options.map((opt, oIdx) => {
                                const isThisSelected = userSel === oIdx;
                                const isCorrect = q.correctIndex === oIdx;
                                
                                let optionStyle = "bg-white border-brand-gold/30 hover:border-brand-navy text-charcoal";

                                if (hasSelected) {
                                  if (isCorrect) {
                                    optionStyle = "bg-white border-2 border-brand-gold text-brand-navy font-bold shadow-md";
                                  } else if (isThisSelected) {
                                    optionStyle = "bg-red-50 border border-red-350 text-[#9B1B30]";
                                  } else {
                                    optionStyle = "opacity-45 border-brand-gold/15";
                                  }
                                }

                                return (
                                  <button
                                    key={oIdx}
                                    disabled={hasSelected}
                                    onClick={() => {
                                      setQuizAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                                    }}
                                    className={`p-3 rounded-sm border text-left text-xs transition-all relative ${optionStyle} ${!hasSelected && "cursor-pointer"}`}
                                  >
                                    <div className="flex items-start gap-2.5">
                                      <span className="font-serif font-black text-[10px] text-brand-navy border border-brand-gold/50 rounded-sm w-5 h-5 flex items-center justify-center shrink-0">
                                        {String.fromCharCode(65 + oIdx)}
                                      </span>
                                      <span className="font-serif leading-relaxed">{opt}</span>
                                    </div>

                                    {/* Ícones de validação */}
                                    {hasSelected && isCorrect && isThisSelected && (
                                      <Check className="w-4 h-4 text-brand-navy absolute right-3 top-3" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Explicação da resposta */}
                            {hasSelected && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className={`p-3.5 rounded-md text-xs font-serif leading-relaxed mt-2 flex items-start gap-2.5 border ${
                                  userSel === q.correctIndex
                                    ? "bg-[#ECE8DF] border-brand-gold/40 text-brand-navy"
                                    : "bg-red-50/15 border-brand-gold/30 text-[#9B1B30]"
                                  }`}
                              >
                                {userSel === q.correctIndex ? (
                                  <Check className="w-4 h-4 text-brand-navy shrink-0 mt-0.5" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-brand-crusade shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <span className="font-black block mb-0.5">{userSel === q.correctIndex ? "Resposta Sagaz!" : "Equívoco Literário..."}</span>
                                  {q.explanation}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB PROJETO PEDAGÓGICO */}
              {activeTab === "projeto" && (
                <motion.div
                  key="projeto-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border-2 border-brand-gold rounded-lg p-6 flex flex-col gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-brand-navy">
                    <PenTool className="w-5 h-5 text-brand-gold" />
                    <h4 className="font-serif text-sm font-black uppercase tracking-wider">
                      Trabalho Literário Proposto para o Aluno
                    </h4>
                  </div>
                  <h5 className="font-serif text-lg font-black text-brand-navy mt-1">
                    🎯 {guideData.pedagogicalSuggestion.activityTitle}
                  </h5>
                  <div className="border-t border-brand-gold/20 pt-4 mt-2">
                    <h6 className="text-[10px] uppercase tracking-wider text-[#9B1B30] font-serif font-black mb-2">Instruções para realizar individualmente ou em grupo:</h6>
                    <p className="text-xs text-charcoal/85 font-serif leading-relaxed whitespace-pre-line italic">
                      {guideData.pedagogicalSuggestion.instructions}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DOCK DE IMPRESSÃO - ATIVO EXCLUSIVAMENTE NO MODO PRINT (Totalmente formatado em papel) */}
          <div className="print-only hidden space-y-12 text-black bg-white p-8 font-serif leading-relaxed text-justify" id="print-layout-block">
            <div className="border-b-4 border-black pb-4 text-center">
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500">História de Portugal Interativa • Estudo Orientado</span>
              <h2 className="text-3xl font-black uppercase mt-1 tracking-tight">{guideData.title}</h2>
              <div className="flex justify-center gap-8 mt-4 text-[11px] font-mono text-slate-600">
                <span>Período: <strong>{guideData.historicalPeriod}</strong></span>
                <span>Grau Educativo Curricular: <strong>{eduLevel.toUpperCase()}</strong></span>
              </div>
            </div>

            {/* Secção 1: Resumo */}
            <div className="space-y-4">
              <h3 className="text-lg font-black uppercase border-b-2 border-slate-400 pb-1">I. Resumo Temático</h3>
              <p className="text-sm leading-relaxed whitespace-pre-line text-black">
                {guideData.summaryText}
              </p>
            </div>

            {/* Secção 2: Datas */}
            <div className="space-y-4 page-break-before">
              <h3 className="text-lg font-black uppercase border-b-2 border-slate-400 pb-1">II. Marcos Cronológicos Chave</h3>
              <div className="space-y-4">
                {guideData.importantDates.map((dt, idx) => (
                  <div key={idx} className="text-sm">
                    <strong>[{dt.year}] - {dt.event}:</strong> {dt.historicalContext}
                  </div>
                ))}
              </div>
            </div>

            {/* Secção 3: Figuras */}
            <div className="space-y-4">
              <h3 className="text-lg font-black uppercase border-b-2 border-slate-400 pb-1">III. Figuras Históricas Cruciais</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                {guideData.keyFigures.map((fig, idx) => (
                  <div key={idx} className="border border-slate-300 p-2.5 rounded">
                    <strong>{fig.name}</strong> <em>({fig.role})</em>
                    <p className="mt-1 text-slate-700">{fig.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Secção 4: Glossário */}
            <div className="space-y-4">
              <h3 className="text-lg font-black uppercase border-b-2 border-slate-400 pb-1">IV. Glossário e Termos da Época</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {guideData.vocabulary.map((v, vIdx) => (
                  <div key={vIdx} className="text-slate-900">
                    <strong>{v.term}:</strong> {v.meaning}
                  </div>
                ))}
              </div>
            </div>

            {/* Secção 5: Projeto */}
            <div className="space-y-4 page-break-before">
              <h3 className="text-lg font-black uppercase border-b-2 border-slate-400 pb-1">V. Proposta de Tarefa Escolar</h3>
              <div className="p-4 bg-slate-50 border border-slate-300 rounded text-sm">
                <strong>{guideData.pedagogicalSuggestion.activityTitle}</strong>
                <p className="mt-2 text-xs leading-relaxed text-slate-700 leading-relaxed whitespace-pre-line">{guideData.pedagogicalSuggestion.instructions}</p>
              </div>
            </div>

            {/* Secção 6: Quiz e Chave */}
            <div className="space-y-4">
              <h3 className="text-lg font-black uppercase border-b-2 border-slate-400 pb-1">VI. Questionário Exame (Gabarito no Final)</h3>
              <div className="space-y-4 text-xs">
                {guideData.quiz.map((q, qIdx) => (
                  <div key={qIdx} className="space-y-1">
                    <strong>Questão {qIdx + 1}: {q.question}</strong>
                    <div className="grid grid-cols-2 gap-2 pl-4">
                      {q.options.map((opt, oIdx) => (
                        <span key={oIdx}>[ ] {String.fromCharCode(65 + oIdx)}) {opt}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-dashed border-slate-300 text-xs text-slate-650 italic">
                <strong>Chave do Corretor / Soluções:</strong>
                <div className="mt-1 space-y-1 pl-4">
                  {guideData.quiz.map((q, qIdx) => (
                    <div key={qIdx}>
                      Pergunta {qIdx + 1}: Opção {String.fromCharCode(65 + q.correctIndex)} • Explicação: {q.explanation}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
