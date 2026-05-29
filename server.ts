import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let currentDirname: string;
if (typeof __dirname !== "undefined") {
  currentDirname = __dirname;
} else if (import.meta && import.meta.url) {
  const filename = fileURLToPath(import.meta.url);
  currentDirname = path.dirname(filename);
} else {
  currentDirname = process.cwd();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client lazily to prevent crashing on boot if key is temporarily missing
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API endpoint for generating custom study guides / personalized summaries
  app.post("/api/generate-summary", async (req, res) => {
    try {
      const { era, documents, educationLevel, focusTopic, customNotes } = req.body;

      const ai = getGeminiClient();

      const prompt = `Cria um guia de estudo educativo personalizado em Português sobre a História de Portugal.
Foco na Era/Período: "${era || "História Geral"}".
Tópico de ênfase: "${focusTopic || "Geral"}".
Nível educativo adaptado: "${educationLevel || "Secundário"}".
Documentos históricos originais de referência incluídos pelo utilizador: "${(documents || []).join(", ") || "Nenhum específico"}".
Notas ou reflexões adicionais do aluno a incorporar: "${customNotes || "Nenhumas"}".

Garante que o conteúdo é historicamente exato, rigoroso e pedagógico. Adapta a linguagem ao nível de educação selecionado (por exemplo, linguagem simplificada e acessível para "Básico (1º/2º ciclo)", contextualizada e estruturada para "Secundário", académica e aprofundada para "Universitário").`;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "Título atrativo do guia de estudo personalizado.",
          },
          historicalPeriod: {
            type: Type.STRING,
            description: "O período histórico em causa.",
          },
          summaryText: {
            type: Type.STRING,
            description: "O resumo histórico pedagógico extenso, dividido em secções ou parágrafos claramente estruturados em Português.",
          },
          keyFigures: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Nome da figura histórica." },
                role: { type: Type.STRING, description: "Cargo ou papel (ex: Rei de Portugal, Navegador, Diplomata)." },
                description: { type: Type.STRING, description: "Breve explicação do seu impacto e ações principais." }
              },
              required: ["name", "role", "description"]
            },
            description: "Figuras históricas cruciais deste período.",
          },
          importantDates: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                year: { type: Type.STRING, description: "Ano ou data exata (ex: '1143' ou '14 de Agosto de 1385')." },
                event: { type: Type.STRING, description: "Nome do evento histórico chave correspondente." },
                historicalContext: { type: Type.STRING, description: "Explicitação do contexto ou consequência deste marco." }
              },
              required: ["year", "event", "historicalContext"]
            },
            description: "Marcos cronológicos mais relevantes deste período."
          },
          vocabulary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                term: { type: Type.STRING, description: "Termo de época (ex: 'Chancelaria', 'Feitoria', 'Caraveleiro')." },
                meaning: { type: Type.STRING, description: "Definição clara e pedagógica." }
              },
              required: ["term", "meaning"]
            },
            description: "Glossário ou vocabulário de época essencial."
          },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING, description: "Pergunta de escolha múltipla sobre o conteúdo explicado." },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Exatamente 4 opções de resposta plausíveis."
                },
                correctIndex: { type: Type.INTEGER, description: "O índice da resposta correta nas opções (0 a 3)." },
                explanation: { type: Type.STRING, description: "Explicação pedagógica detalhada do porquê de a resposta ser correta ou errada." }
              },
              required: ["question", "options", "correctIndex", "explanation"]
            },
            description: "Três perguntas de aferição de conhecimentos divertidas e educativas."
          },
          pedagogicalSuggestion: {
            type: Type.OBJECT,
            properties: {
              activityTitle: { type: Type.STRING, description: "Título de uma tarefa prática educacional recomendada." },
              instructions: { type: Type.STRING, description: "Instruções passo a passo para o aluno realizar em casa ou na sala de aula." }
            },
            required: ["activityTitle", "instructions"],
            description: "Sugestão de projeto ou atividade prática (ex: analisar um mapa, escrever uma carta fictícia, criar uma maquete)."
          }
        },
        required: [
          "title",
          "historicalPeriod",
          "summaryText",
          "keyFigures",
          "importantDates",
          "vocabulary",
          "quiz",
          "pedagogicalSuggestion"
        ]
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "És um historiador escolar especialista na História de Portugal com enorme capacidade pedagógica para ensinar estudantes de todos os ciclos educativos com rigor, paixão e clareza.",
          responseMimeType: "application/json",
          responseSchema,
        },
      });

      if (!response.text) {
        throw new Error("Empty response from AI engine.");
      }

      const parsedJSON = JSON.parse(response.text.trim());
      res.json(parsedJSON);

    } catch (error: any) {
      console.error("Error generating study guide summary:", error);
      res.status(500).json({
        error: "Ocorreu um erro ao gerar o resumo interativo.",
        details: error.message || error
      });
    }
  });

  let isProduction = false;
  if (typeof __filename !== "undefined") {
    isProduction = __filename.endsWith("server.cjs");
  }
  if (process.env.NODE_ENV === "production") {
    isProduction = true;
  }

  const distPath = isProduction ? currentDirname : path.join(currentDirname, "dist");

  // Setup Vite Dev Server / Static files
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      root: currentDirname,
    });
    app.use(vite.middlewares);

    // Serve index.html dynamically with Vite transformation in dev mode
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const fs = await import("fs");
        let template = fs.readFileSync(path.resolve(currentDirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Open in browser: http://localhost:${PORT}`);
  });
}

startServer();
