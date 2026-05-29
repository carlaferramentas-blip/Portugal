import { HistoricalPeriod, HistoricalDocument } from "./types";

export const HISTORICAL_DOCUMENTS: HistoricalDocument[] = [
  {
    id: "tratado-zamora",
    title: "Tratado de Zamora",
    year: 1143,
    author: "D. Afonso Henriques e D. Afonso VII de Leão",
    locationCreated: "Catedral de Zamora, Reino de Leão",
    description: "O documento diplomático fundador que estabelece a independência do Condado Portucalense e o nascimento oficial de Portugal como reino soberano.",
    significance: "O rei Afonso VII de Leão reconhece formalmente D. Afonso Henriques como rei soberano, desvinculando Portugal da vassalagem leonense. Representa o início diplomático da nacionalidade.",
    highDefImageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200", // Fallback parchment texture
    transcription: "In nomine Domini. Ego Adefonsus, Dei gratia Portugalensium Rex... coram domino venerabili Guidoni de Vico cardinali apostolice sedis legato... confirmo amicitiam et pacem cum consanguineo meo imperatore... et pro regni mei tuitione...",
    modernTranslation: "Em nome do Senhor. Eu Afonso, por graça de Deus Rei dos Portugueses... perante o senhor venerável Guido de Vico, cardeal legado da Sé Apostólica... confirmo amizade e paz com o meu consanguíneo imperador (Afonso VII)... e pela defesa e soberania do meu reino liberto de vassalagem, prometendo lealdade espiritual unicamente à Santa Sé.",
    annotations: [
      "Assinatura em cruz de D. Afonso Henriques com o título oficial de 'Rex' (Rei).",
      "Mediação essencial do cardeal Guido de Vico, representante do Papa, garantindo proteção papal à nova dinastia.",
      "Reconhecimento mútuo de fronteiras espirituais e militares contra o inimigo comum na Península Ibérica."
    ]
  },
  {
    id: "tratado-windsor",
    title: "Tratado de Windsor",
    year: 1386,
    author: "D. João I de Portugal e Ricardo II de Inglaterra",
    locationCreated: "Windsor, Inglaterra",
    description: "A aliança diplomática ativa mais antiga do mundo, selada após a vitória decisiva na Batalha de Aljubarrota contra as pretensões castelhanas.",
    significance: "Consolidou a Dinastia de Avis portuguesas e formalizou a amizade perpétua, assistência militar mútua e livre comércio entre Portugal e Inglaterra, culminando no casamento de D. João I com Filipa de Lencastre.",
    highDefImageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200",
    transcription: "Sit omnibus notum... perpetua amicitia, liga, confoderatio... inter reges et regna Portugalie et Anglie... pro defensione regnorum et jurium suorum contra quoscumque invasores...",
    modernTranslation: "Seja de todos conhecido... que se estabelece uma amizade, liga e confederação perpétua... entre os reis e reinos de Portugal e de Inglaterra... para ajuda mútua, comércio recíproco e defesa de ambos os reinos e dos seus direitos contra qualquer invasor que se atreva a violar as suas fronteiras.",
    annotations: [
      "Selado com os selos reais de cera vermelha suspensos por cordões de seda.",
      "Cláusula de privilégios comerciais recíprocos extraordinários para os mercadores ingleses no Porto e de Lisboa, e os portugueses em Londres.",
      "Fundou a base para a introdução da linhagem da 'Ínclita Geração' liderada no século XV pelo Infante D. Henrique."
    ]
  },
  {
    id: "tratado-tordesilhas",
    title: "Tratado de Tordesilhas",
    year: 1494,
    author: "D. João II de Portugal e os Reis Católicos de Espanha",
    locationCreated: "Tordesillas, Castela",
    description: "O tratado que dividiu o mundo descoberto e por descobrir entre as duas grandes superpotências marítimas da época, alterando a geopolítica global.",
    significance: "Portugal consegue empurrar o meridiano de demarcação estipulado pelo Papa para 370 léguas a oeste de Cabo Verde. Esta manobra genial de D. João II garantiu a Portugal a posse das terras do Brasil, antes mesmo de serem oficialmente visitadas por Cabral em 1500.",
    highDefImageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200",
    transcription: "Que se trace y señale por el dicho mar océano una raya o línea derecha de polo a polo... a las ochocientas y setenta leguas de las islas de Cabo Verde... todo lo que se hallare al oriente sea para el Rey de Portugal, y al occidente para Castilla...",
    modernTranslation: "Que se trace e marque pelo dito mar oceano uma linha direita, de polo a polo... a trezentas e setenta léguas da ilha de Cabo Verde para a parte do poente... de forma que tudo o que for descoberto ao oriente desta linha pertença ao Senhor Rei de Portugal e ao seu Reino, e tudo o que for descoberto a ocidente pertença aos Reis de Castela.",
    annotations: [
      "A linha vertical imaginária cruza o Brasil central, viabilizando o nascimento do império luso-brasileiro.",
      "Assinado em duplicado, em castelhano e português, com selos de chumbo maciço.",
      "Excluiu expressamente as restantes reparações europeias (França, Inglaterra), provocando protesto célebre do rei francês sobre o 'Testamento de Adão'."
    ]
  },
  {
    id: "carta-caminha",
    title: "Carta de Pero Vaz de Caminha",
    year: 1500,
    author: "Pero Vaz de Caminha (Escrivão da armada de Cabral)",
    locationCreated: "Porto Seguro, Ilha de Vera Cruz (Brasil)",
    description: "A certidão de nascimento oficial do Brasil. Escrita à mão para relatar detalhadamente ao Rei D. Manuel I o achamento da Terra de Santa Cruz.",
    significance: "Considerada um monumento literário e histórico. Descreve com pormenor humanista e etnográfico o primeiro encontro com os povos indígenas, a flora, a fauna e a ausência imediata de metais preciosos.",
    highDefImageUrl: "https://images.unsplash.com/photo-1513301358391-13650bfbca73?auto=format&fit=crop&q=80&w=1200",
    transcription: "Senhor: Posto que o capitão-mor desta vossa frota... dê a Vossa Alteza conta do achamento desta vossa terra nova... não deixarei de dar também minha conta... A feição deles é serem pardos, maneira de avermelhados, de bons rostos e bons narizes, bem feitos...",
    modernTranslation: "Senhor: Embora o capitão-mor desta vossa frota relate a Vossa Alteza o achamento desta vossa terra nova que se ora achou... eu não deixarei de dar também o meu testemunho... A feição deles é serem pardos, um tanto avermelhados, com bons rostos e narizes bem feitos. Andam nus, sem nenhuma cobertura, e não dão importância a cobrir ou mostrar as suas vergonhas, tendo nisto tanta inocência como em mostrar o rosto.",
    annotations: [
      "A carta termina com o pedido de Caminha para libertar do exílio o seu genro, uma nota profundamente pessoal.",
      "Reflete o espírito científico e de curiosidade empírica que marcou a Renascença portuguesa.",
      "Descreve a primeira missa celebrada em solo brasileiro pelo Frei Henrique de Coimbra sob o hastear da cruz de Cristo."
    ]
  },
  {
    id: "constituicao-1976",
    title: "Constituição da República Portuguesa",
    year: 1976,
    author: "Assembleia Constituinte de Portugal",
    locationCreated: "Palácio de São Bento, Lisboa",
    description: "O documento fundamental da democracia contemporânea, aprovado dois anos após a Revolução dos Cravos para consagrar as liberdades cívicas e o fim da ditadura.",
    significance: "Restabeleceu o sufrágio universal, os direitos civis invioláveis, a separação de poderes, as autonomias regionais dos Açores e Madeira, e libertou Portugal de quarenta anos de censura e opressão colonialista.",
    highDefImageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
    transcription: "A 25 de Abril de 1974, o Movimento das Forças Armadas... coroando a longa resistência do povo português... libertou Portugal do regime fascista. A Assembleia Constituinte afirma a decisão do povo português de defender a independência nacional, garantir os direitos fundamentais... e construir uma sociedade livre...",
    modernTranslation: "O mesmo texto original em plena vigência, marcando a génese do Estado Democrático de Direito moderno: consagração da soberania popular, pluralismo político, independência dos tribunais e a dignidade humana como pilar supremo da nação.",
    annotations: [
      "Préambulo solene com homenagem direta aos capitães de Abril e à luta popular contra a ditadura.",
      "Consagrou o Tribunal Constitucional e o referendo, blindando o país contra retornos autoritários.",
      "Assinada por líderes históricos de todo o espectro democrático (Mário Soares, Sá Carneiro, Álvaro Cunhal)."
    ]
  }
];

export const HISTORICAL_PERIODS: HistoricalPeriod[] = [
  {
    id: "fundacao",
    slug: "fundacao-e-conquista",
    title: "Fundação e Reconquista",
    yearsRange: "1095 – 1185",
    monarchOrLeader: "D. Afonso Henriques (O Conquistador)",
    capital: "Guimarães / Coimbra",
    tagline: "Nascimento de uma Nação à espada e diplomacia.",
    introduction: "Após revoltar-se contra a própria mãe, D. Teresa, na Batalha de S. Mamede (1128), o jovem infante D. Afonso Henriques assumiu a liderança do Condado Portucalense e iniciou uma dupla campanha: expandir as fronteiras para sul combatendo as forças muçulmanas Almorávidas e garantir a independência diplomática legal frente ao seu poderoso primo, o Imperador Afonso VII de Leão.",
    fullStory: "A independência tornou-se real com o Tratado de Zamora em 1143 e foi blindada pelo reconhecimento papal da bula Manifesto Probatum em 1179. No campo de batalha, ajudado por cruzados europeus rumo à Terra Santa, Afonso Henriques conquistou a posição fortificada de Santarém e efetuou a tomada mítica de Lisboa em 1147 no termo de um cerco brutal de quatro meses. Até à sua morte em 1185, continuou a empurrar as linhas de defesa a sul, consolidando o território do rio Tejo ao rio Mondego.",
    keyLegacy: [
      "Guimarães designada como o 'Berço da Nação'.",
      "Fundação da robusta Ordem de Avis e integração dos Templários para defesa de fronteiras.",
      "Instauração da dinastia Afonsina (Borgonha) que reinaria durante dois séculos."
    ],
    documents: ["tratado-zamora"],
    events: [
      {
        id: "batalha-saomamede",
        year: 1128,
        dateStr: "24 de Junho de 1128",
        title: "Batalha de S. Mamede",
        description: "D. Afonso Henriques derrota as tropas de sua mãe D. Teresa e do conde galego Fernão Peres de Trava nos campos de Guimarães, assumindo o governo do Condado.",
        type: "political",
        location: "Guimarães",
        keyFigures: ["D. Afonso Henriques", "D. Teresa", "Fernão Peres de Trava"]
      },
      {
        id: "batalha-ourique",
        year: 1139,
        dateStr: "25 de Julho de 1139",
        title: "Batalha de Ourique",
        description: "Vitória lendária de D. Afonso Henriques contra cinco reis mouros nos campos do Alentejo. Após a vitória, as tropas aclamam-no oficialmente Rei de Portugal.",
        type: "military",
        location: "Ourique, Alentejo",
        keyFigures: ["D. Afonso Henriques", "Cinco Reis Mouros"]
      },
      {
        id: "tomada-lisboa",
        year: 1147,
        dateStr: "25 de Outubro de 1147",
        title: "Conquista de Lisboa",
        description: "Assalto anfíbio e cerco às muralhas de Lisboa. Com o auxílio de cavaleiros cruzados ingleses, normandos e alemães, a cidade passa em definitivo para mãos portuguesas.",
        type: "military",
        location: "Lisboa",
        keyFigures: ["D. Afonso Henriques", "Cruzados Germânicos e Ingleses"]
      }
    ],
    mapData: {
      viewBox: "0 0 200 400",
      mainlandRegions: [
        { id: "norte", name: "Minho e Norte (Condado Original)", status: "controlled", path: "M 50,40 L 130,40 L 140,85 L 120,110 L 40,110 L 45,75 Z", colorHex: "#10b981", description: "Bastião original do Condado Portucalense sob D. Afonso Henriques." },
        { id: "centro", name: "Beira e Centro Coimbra", status: "controlled", path: "M 40,110 L 120,110 L 135,160 L 120,205 L 35,205 L 30,150 Z", colorHex: "#34d399", description: "Região anexada e fortalecida com castelos na linha do Mondego." },
        { id: "lisboa", name: "Estremadura e Vale do Tejo", status: "contested", path: "M 35,205 L 120,205 L 100,245 L 38,245 L 25,235 Z", colorHex: "#f59e0b", description: "Conquistada em 1147 após a queda de Lisboa e Santarém; zona frágil de transição." },
        { id: "alentejo", name: "Além-Tejo (Alentejo)", status: "none", path: "M 38,245 L 100,245 L 135,245 L 125,325 L 50,325 L 42,285 Z", colorHex: "#ef4444", description: "Sob domínio do califado almóada, alvo de frequentes incursões militares cruzadas." },
        { id: "algarve", name: "Gharb al-Andalus (Algarve)", status: "none", path: "M 50,325 L 125,325 L 135,365 L 55,365 Z", colorHex: "#b91c1c", description: "Território muçulmano consolidado no extremo sul, completamente inacessível nesta fase." }
      ],
      worldDocks: []
    }
  },
  {
    id: "consolidacao",
    slug: "consolidacao-fronteiras",
    title: "Consolidação e Fronteiras",
    yearsRange: "1185 – 1385",
    monarchOrLeader: "D. Afonso III / D. Dinis (O Lavrador)",
    capital: "Coimbra / Lisboa",
    tagline: "Fixação histórica da mais antiga fronteira europeia.",
    introduction: "Este período marca o avanço definitivo das conquistas até ao limite sul do território e a estabilização institucional do reino. Portugal deixa de ser um projeto de conquista de fronteiras móveis e passa a focar-se no povoamento, na lei, no desenvolvimento agrícola e no florescimento cultural em torno da primeira universidade.",
    fullStory: "O rei D. Afonso III conquista em definitivo Faro e Silves em 1249, repelindo as ambições do reino vizinho de Castela sobre o Algarve. Em 1297, o Tratado de Alcañizes fixa de forma extraordinária as fronteiras de Portugal, que permanecem quase inalteradas até aos dias de hoje. O seu sucessor, D. Dinis, impulsiona a cultura, cria o 'Pinhal de Leiria' para conter as dunas e fornecer madeira futura, funda a Universidade de Coimbra em 1290 e impõe a língua portuguesa como oficial em todos os documentos jurídicos.",
    keyLegacy: [
      "O Tratado de Alcañizes estabelece as fronteiras mais estáveis e antigas de toda a Europa.",
      "Adoção oficial do Português como idioma da chancelaria régia.",
      "Elevação de Lisboa a capital administrativa e comercial marítima definitiva."
    ],
    documents: ["tratado-windsor"],
    events: [
      {
        id: "conquista-algarve",
        year: 1249,
        dateStr: "Março de 1249",
        title: "Conquista Definitiva do Algarve",
        description: "D. Afonso III toma Faro, Silves e Albufeira de forma sistemática. O território continental português atinge o seu limite geográfico meridional.",
        type: "military",
        location: "Faro, Algarve",
        keyFigures: ["D. Afonso III", "Paio Peres Correia"]
      },
      {
        id: "universidade-dinis",
        year: 1290,
        dateStr: "1 de Março de 1290",
        title: "Fundação da Universidade",
        description: "D. Dinis assina o documento 'Scientiae thesaurus mirabilis', criando formalmente o Estudo Geral em Lisboa, que mais tarde se fixa em Coimbra como farol de conhecimento.",
        type: "cultural",
        location: "Lisboa / Coimbra",
        keyFigures: ["D. Dinis", "Papa Nicolau IV"]
      },
      {
        id: "batalha-aljubarrota",
        year: 1385,
        dateStr: "14 de Agosto de 1385",
        title: "Batalha de Aljubarrota",
        description: "Superando uma desvantagem numérica massiva, a genial tática militar do quadrado do Condestável D. Nuno Álvares Pereira rechaça as divisões de cavalaria de Castela, assegurando o trono e a independência lusa.",
        type: "military",
        location: "Aljubarrota, Leiria",
        keyFigures: ["D. João I", "D. Nuno Álvares Pereira", "João I de Castela"]
      }
    ],
    mapData: {
      viewBox: "0 0 200 400",
      mainlandRegions: [
        { id: "norte", name: "Minho e Norte", status: "controlled", path: "M 50,40 L 130,40 L 140,85 L 120,110 L 40,110 L 45,75 Z", colorHex: "#059669", description: "Região densamente povoada e pacificada." },
        { id: "centro", name: "Centro e Beiras", status: "controlled", path: "M 40,110 L 120,110 L 135,160 L 120,205 L 35,205 L 30,150 Z", colorHex: "#059669", description: "Área agrícola dinâmica de expansão senhorial e monástica." },
        { id: "lisboa", name: "Lisboa e Vale do Tejo", status: "controlled", path: "M 35,205 L 120,205 L 100,245 L 38,245 L 25,235 Z", colorHex: "#059669", description: "Porto de comércio fluvial e marítimo ascendente na Europa Ocidental." },
        { id: "alentejo", name: "Alentejo Consolidado", status: "controlled", path: "M 38,245 L 100,245 L 135,245 L 125,325 L 50,325 L 42,285 Z", colorHex: "#34d399", description: "Cedido a ordens cavaleiras para repovoamento e exploração de cereais." },
        { id: "algarve", name: "Reino do Algarve", status: "controlled", path: "M 50,325 L 125,325 L 135,365 L 55,365 Z", colorHex: "#34d399", description: "Anexado por D. Afonso III, pacificado após acordos diplomáticos de fronteira com Castela." }
      ],
      worldDocks: []
    }
  },
  {
    id: "descobrimentos",
    slug: "descobrimentos-imperio",
    title: "Era dos Descobrimentos",
    yearsRange: "1415 – 1580",
    monarchOrLeader: "D. João II / D. Manuel I (O Venturoso)",
    capital: "Lisboa",
    tagline: "O mar sem fim e o encontro global de civilizações.",
    introduction: "Após assegurar a sua independência, Portugal vira-se para o Oceano Atlântico. Iniciando com a conquista de Ceuta em 1415, os navegadores portugueses, financiados pela Ordem de Cristo e sob a direção estratégica do Infante D. Henrique, desvendaram as correntes atlânticas, inventaram a caravela latina e desenharam o primeiro mapa global da Terra.",
    fullStory: "Passo a passo, as tripulações dobraram o temido Cabo Bojador (1434), colonizaram a Madeira e os Açores, cruzaram o Equador e, em 1488, Bartolomeu Dias dobrou o Cabo da Boa Esperança, revelando a ligação por mar com o Índico. A culminação deu-se com a expedição heroica de Vasco da Gama, que ancorou em Calecute (Índia) em 1498, inaugurando a Rota da Seda Marítima, seguida pela armada de Pedro Álvares Cabral que oficializou o Brasil em 1500. D. Manuel I governa o período dourado do comércio de especiarias puras e sedas asiáticas sob o estilo Manuelino.",
    keyLegacy: [
      "Desenvolvimento da caravela e de técnicas avançadas de navegação astronómica com o astrolábio.",
      "Criação das primeiras feitorias costeiras africanas e asiáticas geridas centralmente.",
      "Inauguração da Globalização, interligando a Europa, África, Ásia e as Américas."
    ],
    documents: ["tratado-tordesilhas", "carta-caminha"],
    events: [
      {
        id: "conquista-ceuta",
        year: 1415,
        dateStr: "21 de Agosto de 1415",
        title: "Conquista de Ceuta",
        description: "A frota militar liderada por D. João I e os seus filhos (incluindo o Infante D. Henrique) assalta a praça comercial muçulmana no Norte de África, assinalando o início da expansão ultra-marítima.",
        type: "military",
        location: "Ceuta, Magrebe",
        keyFigures: ["D. João I", "Infante D. Henrique", "D. Duarte"]
      },
      {
        id: "rota-da-gama",
        year: 1498,
        dateStr: "20 de Maio de 1498",
        title: "Vasco da Gama chega à Índia",
        description: "Ancoragem heróica em Calecute após quase um ano em mar aberto. Portugal quebra o monopólio mercantil das repúblicas italianas e árabes, abrindo o comércio direto de especiarias.",
        type: "scientific",
        location: "Calecute, Índia",
        keyFigures: ["Vasco da Gama", "D. Manuel I"]
      },
      {
        id: "achamento-brasil",
        year: 1500,
        dateStr: "22 de Abril de 1500",
        title: "Achamento do Brasil",
        description: "A frota do capitão-mor Pedro Álvares Cabral avista o Monte Pascoal na Bahia, lançando âncoras na Terra de Santa Cruz e iniciando a presença portuguesa no continente americano.",
        type: "scientific",
        location: "Porto Seguro, Brasil",
        keyFigures: ["Pedro Álvares Cabral", "Pero Vaz de Caminha"]
      }
    ],
    mapData: {
      viewBox: "0 0 200 400",
      mainlandRegions: [
        { id: "norte", name: "Norte de Portugal", status: "controlled", path: "M 50,40 L 130,40 L 140,85 L 120,110 L 40,110 L 45,75 Z", colorHex: "#047857", description: "Bastião de onde partem nobres marinheiros." },
        { id: "centro", name: "Centro de Portugal", status: "controlled", path: "M 40,110 L 120,110 L 135,160 L 120,205 L 35,205 L 30,150 Z", colorHex: "#047857", description: "Fornecedora de cereais e de resina para calafetar caravelas." },
        { id: "lisboa", name: "Grande Lisboa Marítima", status: "controlled", path: "M 35,205 L 120,205 L 100,245 L 38,245 L 25,235 Z", colorHex: "#059669", description: "Porto Central e Casa da Índia, a capital metropolitana mais rica da Europa Ocidental." },
        { id: "alentejo", name: "Alentejo Interior", status: "controlled", path: "M 38,245 L 100,245 L 135,245 L 125,325 L 50,325 L 42,285 Z", colorHex: "#047857", description: "Reserva de recursos alimentares para as armadas." },
        { id: "algarve", name: "Algarve e Sagres", status: "controlled", path: "M 50,325 L 125,325 L 135,365 L 55,365 Z", colorHex: "#059669", description: "Sede de estaleiros navais e ponto estratégico de ancoragem meridional." }
      ],
      worldDocks: [
        { name: "Salvador (Brasil)", x: 220, y: 260, type: "colony", description: "Grande colónia agrícola rica em cana-de-açúcar e pau-brasil." },
        { name: "Madeira e Açores", x: 320, y: 160, type: "colony", description: "Primeira colonização, rica em açúcar, trigo e vinha." },
        { name: "S. Jorge da Mina (Gana)", x: 380, y: 220, type: "trading-post", description: "Fortaleza chave de comércio e ouro na Costa Ocidental Africana." },
        { name: "Goa (Índia)", x: 580, y: 200, type: "trading-post", description: "Capital administrativa do Estado Português da Índia." },
        { name: "Macau (China)", x: 660, y: 180, type: "trading-post", description: "Porto de comércio estratégico estabelecido na foz do Rio das Pérolas." }
      ],
      maritimeRoutes: [
        {
          name: "Vasco da Gama (1497-1498)",
          year: 1498,
          captain: "Vasco da Gama",
          pathD: "M 370,140 C 310,180 300,280 440,320 C 500,290 530,240 580,200",
          color: "#f59e0b",
          points: [
            { x: 370, y: 140, label: "Lisboa" },
            { x: 320, y: 210, label: "Volta do Mar" },
            { x: 440, y: 320, label: "Cabo da Boa Esperança" },
            { x: 580, y: 200, label: "Calecute (Índia)" }
          ]
        },
        {
          name: "Pedro Álvares Cabral (1500)",
          year: 1500,
          captain: "Pedro Álvares Cabral",
          pathD: "M 370,140 C 260,190 220,260 220,260 C 240,290 280,310 440,320 C 500,290 540,240 580,200",
          color: "#06b6d4",
          points: [
            { x: 370, y: 140, label: "Lisboa" },
            { x: 220, y: 260, label: "Porto Seguro (Brasil)" },
            { x: 440, y: 320, label: "Cabo da Boa Esperança" },
            { x: 580, y: 200, label: "Calecute" }
          ]
        }
      ]
    }
  },
  {
    id: "restauracao",
    slug: "restauracao-imperio-ouro",
    title: "União Ibérica e Restauração",
    yearsRange: "1580 – 1820",
    monarchOrLeader: "D. João IV (O Restaurador) / Marquês de Pombal",
    capital: "Lisboa",
    tagline: "Do eclipse da independência à reconstrução monumental.",
    introduction: "Após o infeliz desaparecimento de D. Sebastião na batalha de Alcácer-Quibir (1578) sem deixar herdeiros, Portugal sofreu uma crise de sucessão violenta, caindo sob a coroa dos monarcas Filipes de Espanha durante 60 anos (União Ibérica).",
    fullStory: "A independência foi recuperada de armas na mão na gloriosa conjuração de 1 de Dezembro de 1640, de onde ascendeu D. João IV ao trono, iniciando a dinastia de Bragança. O século XVIII assiste ao gigantesco afluxo do ouro extraído em Minas Gerais (Brasil), financiando monumentos gigantescos como o Convento de Mafra. A 1 de Novembro de 1755, um cataclismo de terra e mar arrasou Lisboa por completo. A tragédia permitiu a ascensão iluminista do Marquês de Pombal, que reconstruiu a baixa pombalina de Lisboa com planos urbanos pioneiros antissísmicos modernos.",
    keyLegacy: [
      "Assinatura do Tratado de Tratado de Madrid (1750) que fixa as vastas fronteiras modernas do Brasil.",
      "Planeamento urbanístico pioneiro anti-terramoto da Baixa Pombalina em grelha geométrica.",
      "Desenvolvimento de manufaturas nacionais e mercantilismo sob reformas pombalinas."
    ],
    documents: [],
    events: [
      {
        id: "restauracao-1640",
        year: 1640,
        dateStr: "1 de Dezembro de 1640",
        title: "Restauração da Independência",
        description: "Os 40 Conjurados portugueses assaltam o Paço da Ribeira, executam o secretário Miguel de Vasconcelos e aclamam D. João IV, Duque de Bragança, restaurando a soberania portuguesa.",
        type: "political",
        location: "Lisboa, Portugal",
        keyFigures: ["D. João IV", "Duquesa D. Luísa de Gusmão", "Miguel de Vasconcelos"]
      },
      {
        id: "terramoto-1755",
        year: 1755,
        dateStr: "1 de Novembro de 1755",
        title: "O Grande Terramoto de Lisboa",
        description: "Um violento sismo seguido de tsunami e incêndios generalizados fustiga Lisboa na manhã do dia de Todos os Santos, destruindo 85% da riqueza monumental da cidade.",
        type: "cultural",
        location: "Lisboa",
        keyFigures: ["Marquês de Pombal", "D. José I"]
      }
    ],
    mapData: {
      viewBox: "0 0 200 400",
      mainlandRegions: [
        { id: "norte", name: "Norte de Portugal", status: "controlled", path: "M 50,40 L 130,40 L 140,85 L 120,110 L 40,110 L 45,75 Z", colorHex: "#059669", description: "Fiel às campanhas de restauração da Dinastia de Bragança." },
        { id: "centro", name: "Centro de Portugal", status: "controlled", path: "M 40,110 L 120,110 L 135,160 L 120,205 L 35,205 L 30,150 Z", colorHex: "#059669", description: "Área militarmente fortificada na fronteira contra invasões espanholas." },
        { id: "lisboa", name: "Lisboa em Reconstrução", status: "controlled", path: "M 35,205 L 120,205 L 100,245 L 38,245 L 25,235 Z", colorHex: "#10b981", description: "A Baixa de Lisboa, destruída em 1755, cresce desenhada sob grelha moderna militar." },
        { id: "alentejo", name: "Alentejo Fortificado", status: "controlled", path: "M 38,245 L 100,245 L 135,245 L 125,325 L 50,325 L 42,285 Z", colorHex: "#059669", description: "Bastião de imensas praças-fortes como Elvas para dissuadir invasores." },
        { id: "algarve", name: "Algarve", status: "controlled", path: "M 50,325 L 125,325 L 135,365 L 55,365 Z", colorHex: "#059669", description: "Reconexão pacificada." }
      ],
      worldDocks: [
        { name: "Interior do Brasil (Minas)", x: 200, y: 270, type: "colony", description: "Vasta exploração de ouro e pedras preciosas que financia a coroa." },
        { name: "Luanda (Angola)", x: 420, y: 250, type: "colony", description: "Centro administrativo colonial e entreposto militar de reposição comercial." }
      ]
    }
  },
  {
    id: "revolucoes",
    slug: "seculo-liberal-republica",
    title: "O Século do Liberalismo e República",
    yearsRange: "1820 – 1910",
    monarchOrLeader: "D. Pedro IV / Teófilo Braga",
    capital: "Lisboa",
    tagline: "Do império absoluto à fundação da cidadania republicana.",
    introduction: "O século XIX foi de imensa instabilidade política e guerra civil em Portugal. A invasão de tropas napoleónicas empurrou a côrte portuguesa para o exílio no Brasil, culminando na posterior Revolução Liberal do Porto em 1820 e na perda irreparável do Brasil que declarou independência em 1822 sob D. Pedro I (IV de Portugal).",
    fullStory: "A nação dividiu-se num debate sangrento entre Liberais e Absolutistas, prevalecendo a Carta Constitucional. No final do século, o declínio económico e as humilhações internacionais da coroa perante o Ultimato Inglês de 1890 sobre os territórios colónias de África (o Mapa Cor-de-Rosa) criaram condições irreversiveis de revolta urbana. Isto culminou na Revolução Democrática de 5 de Outubro de 1910, depondo a monarquia de Bragança e instalando a Primeira República Portuguesa.",
    keyLegacy: [
      "Instauração da primeira Constituição Republicana e do sufrágio laico parlamentar.",
      "Introdução do direito de greve, divórcio livre e sistema de ensino público universal.",
      "Redefinição geopolítica nacional focada nos territórios colonias africanos (Angola e Moçambique)."
    ],
    documents: [],
    events: [
      {
        id: "revolucao-liberal",
        year: 1820,
        dateStr: "24 de Agosto de 1820",
        title: "Revolução Liberal do Porto",
        description: "Sublevação militar na praça do Porto contra a regência britânica e ausência do rei. Exige o retorno imediato da côrte do Rio de Janeiro e a redação da primeira constituição que elimine o absolutismo político.",
        type: "political",
        location: "Porto, Portugal",
        keyFigures: ["Manuel Fernandes Tomás", "Coronel Sepúlveda"]
      },
      {
        id: "implantacao-republica",
        year: 1910,
        dateStr: "5 de Outubro de 1910",
        title: "Implantação da República",
        description: "Revolucionários civis e militares armados na Rotunda em Lisboa destituem o rei D. Manuel II. Da varanda dos Paços do Concelho, é proclamado o fim da Monarquia e estabelecida a Primeira República.",
        type: "political",
        location: "Lisboa, Portugal",
        keyFigures: ["Teófilo Braga", "José Relvas", "Manuel de Arriaga"]
      }
    ],
    mapData: {
      viewBox: "0 0 200 400",
      mainlandRegions: [
        { id: "norte", name: "Norte de Portugal", status: "controlled", path: "M 50,40 L 130,40 L 140,85 L 120,110 L 40,110 L 45,75 Z", colorHex: "#059669", description: "Bastião liberal e berço da revolução industrial nacional no Porto." },
        { id: "centro", name: "Centro de Portugal", status: "controlled", path: "M 40,110 L 120,110 L 135,160 L 120,205 L 35,205 L 30,150 Z", colorHex: "#059669", description: "Sedes administrativas tradicionais ligadas às estradas-de-ferro." },
        { id: "lisboa", name: "Lisboa Revolucionária", status: "controlled", path: "M 35,205 L 120,205 L 100,245 L 38,245 L 25,235 Z", colorHex: "#10b981", description: "Centro urbano dos combates de 1910 de desestabilização monárquica." },
        { id: "alentejo", name: "Alentejo latifundiário", status: "controlled", path: "M 38,245 L 100,245 L 135,245 L 125,325 L 50,325 L 42,285 Z", colorHex: "#059669", description: "Zona agrícola de expansão cerealífera gerida por latifundiários." },
        { id: "algarve", name: "Faro e Algarve", status: "controlled", path: "M 50,325 L 125,325 L 135,365 L 55,365 Z", colorHex: "#059669", description: "Pacificado." }
      ],
      worldDocks: [
        { name: "Angola (Luanda)", x: 420, y: 250, type: "colony", description: "Território de colonização ativa desenhado no 'Mapa Cor-de-Rosa' de ocupação interna." },
        { name: "Moçambique (Lourenço Marques)", x: 460, y: 280, type: "colony", description: "Entreposto comercial rico de ligação direta aos mercados do Índico." }
      ]
    }
  },
  {
    id: "democracia",
    slug: "ditadura-ao-seculoxxi",
    title: "Ditadura, Liberdade e Democracia",
    yearsRange: "1910 – Hoje",
    monarchOrLeader: "António de Oliveira Salazar / Mário Soares",
    capital: "Lisboa",
    tagline: "Dos longos anos de opressão ao sol radiante de Abril.",
    introduction: "Após o colapso turbulento da Primeira República, um golpe militar em 1926 abriu caminho ao regime ditatorial fascista do Estado Novo (1933-1974) sob Salazar. A opressão da polícia política (PIDE), a severa censura prévia, e a eclosão da desgastante Guerra Colonial Africana (1961-1974) arrastaram o país para um isolamento profundo sob o lema nacional-conservador de 'Orgulhosamente Sós'.",
    fullStory: "A libertação nacional surgiu pacífica e triunfante a 25 de Abril de 1974. Movidos pelo ideal do Movimento das Forças Armadas (MFA), os militares depuseram o regime com cravos vermelhos nos canos das espingardas, devolvendo a democracia plena ao povo português. Seguiu-se a imediata descolonização pacífica africana e, em 1986, a adesão europeia de Portugal à União Europeia (CEE) encabeçada pelo estadista Mário Soares, desencadeando um processo ímpar de infraestruturação, progresso socioeconómico e afirmação cosmopolita global.",
    keyLegacy: [
      "Conquista irrevocável da liberdade de expressão, imprensa livre e voto democrático em massa.",
      "Generalização do Serviço Nacional de Saúde (SNS) público e gratuito e da escola pública unificada.",
      "Integração ativa como membro fundador do Euro e polo tecnológico moderno europeu."
    ],
    documents: ["constituicao-1976"],
    events: [
      {
        id: "vinteicinco-abril",
        year: 1974,
        dateStr: "25 de Abril de 1974",
        title: "A Revolução dos Cravos",
        description: "A sublevação militar do MFA depõe o governo de Marcelo Caetano. A população junta-se de forma pacífica, oferecendo cravos vermelhos aos soldados, pondo fim a 41 anos de regime ditatorial autoritário.",
        type: "political",
        location: "Lisboa, Portugal",
        keyFigures: ["Salgueiro Maia", "Otelo Saraiva de Carvalho", "Spínola"]
      },
      {
        id: "adesao-cee",
        year: 1986,
        dateStr: "1 de Janeiro de 1986",
        title: "Adesão à Comunidade Europeia",
        description: "Assinatura oficial do tratado que integra Portugal no projeto europeu sob liderança do primeiro-ministro Mário Soares, catalisando verbas estruturais de modernização sem precedentes.",
        type: "political",
        location: "Mosteiro dos Jerónimos, Lisboa",
        keyFigures: ["Mário Soares", "Jacques Delors"]
      }
    ],
    mapData: {
      viewBox: "0 0 200 400",
      mainlandRegions: [
        { id: "norte", name: "Norte de Portugal", status: "controlled", path: "M 50,40 L 130,40 L 140,85 L 120,110 L 40,110 L 45,75 Z", colorHex: "#047857", description: "Bastião têxtil, vinícola e industrial europeu altamente desenvolvido no Minho e Porto." },
        { id: "centro", name: "Centro de Portugal", status: "controlled", path: "M 40,110 L 120,110 L 135,160 L 120,205 L 35,205 L 30,150 Z", colorHex: "#047857", description: "Polo florestal e das indústrias de cerâmica, papel e da prestigiada Universidade de Coimbra." },
        { id: "lisboa", name: "Lisboa Hub Europeu", status: "controlled", path: "M 35,205 L 120,205 L 100,245 L 38,245 L 25,235 Z", colorHex: "#10b981", description: "Capital democrática cosmopolita vibrante, sede de instituições estatais e polos tecnológicos internacionais." },
        { id: "alentejo", name: "Alentejo Sustentável", status: "controlled", path: "M 38,245 L 100,245 L 135,245 L 125,325 L 50,325 L 42,285 Z", colorHex: "#047857", description: "Polo de agricultura biológica tecnológica, adegas de prestígio global e parques de energias renováveis." },
        { id: "algarve", name: "Algarve Turismo", status: "controlled", path: "M 50,325 L 125,325 L 135,365 L 55,365 Z", colorHex: "#059669", description: "Epicentro dinâmico de turismo de praia europeu e de conservação natural da Ria Formosa." }
      ],
      worldDocks: [
        { name: "Região Autónoma da Madeira", x: 310, y: 170, type: "colony", description: "Região autónoma integrada plenamente no seio democrático." },
        { name: "Região Autónoma dos Açores", x: 260, y: 140, type: "colony", description: "Região autónoma atlântica estratégica portuguesa de biodiversidade." }
      ]
    }
  }
];
