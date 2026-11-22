/*============================================================
  PORTFOLIO DATA — single source of truth
  ------------------------------------------------------------
  Everything on the home page, the projects page, the project
  pages and the command palette (Ctrl/⌘ + K) is generated
  from this file.

  ➜ To add a project: copy one object in PROJECTS and edit it.
  ➜ To add screenshots: drop images in assets/img/<project>-imgs/
     and list them in `gallery` as { src, icon, title, text }.
     `icon` is a Boxicons class (https://boxicons.com).
  ➜ Mobile-only apps: set `device: 'phone'` so screenshots are
     shown in phone frames instead of browser frames.
============================================================*/

window.PORTFOLIO = {
  profile: {
    name: 'Jacem Ben Ahmed',
    role: 'Software Engineer',
    location: 'Zarzis, Tunisia',
    timezone: 'Africa/Tunis',
    email: 'jacem.benahmed.contact@gmail.com',
    status: 'Open to full-time roles',
    cv: 'assets/resume/cv_JacemBenAhmed_(EN).pdf',
    links: {
      github: 'https://github.com/JacemBenAhmed',
      linkedin: 'https://www.linkedin.com/in/jacem-ben-ahmed',
      codeforces: 'https://codeforces.com/',
      leetcode: 'https://leetcode.com/'
    },
    summary:
      'Software engineer working with .NET and Vue.js, and with Capacitor for Android apps. I also add AI features (OCR, semantic search, LLMs) and set up Docker and CI/CD pipelines.',
    languages: [
      { name: 'Arabic', level: 'Native' },
      { name: 'English', level: 'Intermediate' },
      { name: 'French', level: 'Intermediate' }
    ]
  },

  /* Role lenses used by the "Hiring for…" switch */
  lenses: [
    { id: 'all', label: 'Everything' },
    { id: 'ai', label: 'AI' },
    { id: 'fullstack', label: 'Full-stack' },
    { id: 'devops', label: 'DevOps' },
    { id: 'mobile', label: 'Mobile' }
  ],

  PROJECTS: [
    {
      id: 'evalia',
      name: 'Evalia',
      tagline: 'Technical assessment platform with AI',
      year: '2026',
      context: 'NeoLedge · Final-year project',
      role: 'Full-stack & AI',
      platforms: 'Web · Android',
      categories: ['ai', 'fullstack', 'devops', 'mobile'],
      featured: true,
      accent: '#f5b301',
      icon: 'bx-brain',
      summary:
        'Companies use Evalia to create technical tests, send them to candidates and review the results. You can upload a document and the AI generates questions from it.',
      highlights: [
        'Questions generated from documents (OCR, embeddings, LLM)',
        'Several companies on one platform, each with its own roles',
        'Timed tests, anti-cheat and automatic reports'
      ],
      tech: ['ASP.NET Core', 'Vue.js', 'FastAPI', 'PostgreSQL', 'ChromaDB', 'Docker', 'Nginx', 'Capacitor', 'GitHub Actions'],
      logo: 'assets/img/evalia-imgs/logo.png',
      cover: "assets/img/evalia-imgs/Capture d'écran 2026-08-13 183622.png",
      url: 'projects/evalia.html'
    },
    {
      id: 'signy',
      name: 'Signy',
      tagline: 'Electronic signature platform',
      year: '2025',
      context: 'NeoLedge · Internship',
      role: 'Full-stack',
      platforms: 'Web',
      categories: ['ai', 'fullstack'],
      featured: true,
      accent: '#2563eb',
      icon: 'bx-pen',
      summary:
        'Signy lets an organization send documents for signature, sign them with a personal certificate and check later that a signed PDF was not modified.',
      highlights: [
        'Signatures backed by a personal certificate',
        'Anyone can check if a signed PDF is authentic',
        'AI summary of a document before signing'
      ],
      tech: ['.NET', 'Vue.js', 'SignalR', 'SQL Server', 'Azure DevOps', 'Docker'],
      logo: 'assets/img/signnow-imgs/sign now v2/signnow-icon-512.png',
      cover: 'assets/img/signnow-imgs/sign now v2/dashboard.png',
      url: 'projects/digital-signature.html',
      problem:
        'Contracts and internal documents often need several signatures. Sending PDFs by email makes it hard to know who signed, who is late, and whether the file was changed afterwards.',
      solution:
        'Signy puts the whole flow in one place: send a request, sign in the browser, follow progress, and get a sealed PDF with a certificate of completion that anyone can verify.',
      metrics: [
        { value: 'Certificate', label: 'Signature per user' },
        { value: 'SHA-256', label: 'Document integrity' },
        { value: 'FR · EN', label: 'Languages' }
      ],
      features: [
        { icon: 'bx-send', title: 'Signature requests', text: 'Send one or more documents to several people and follow who has signed and who has not.' },
        { icon: 'bx-pen', title: 'Sign in the browser', text: 'Pick a saved signature, place it on the page and sign. It is applied with your personal certificate.' },
        { icon: 'bx-shield-quarter', title: 'Verify a document', text: 'Upload a signed PDF to check who signed it and that nothing changed since.' },
        { icon: 'bx-bot', title: 'AI summary', text: 'Get a short summary of a document before you sign it.' },
        { icon: 'bx-buildings', title: 'Teams and projects', text: 'Group people by department and share projects and documents inside the team.' },
        { icon: 'bx-history', title: 'Audit trail', text: 'Every action is logged, and each document keeps its version history.' }
      ],
      architecture: ['Vue.js client', 'ASP.NET API', 'Signature & certificate service', 'AI summary', 'SQL Server'],
      gallery: [
        { src: 'assets/img/signnow-imgs/sign now v2/dashboard.png', icon: 'bx-grid-alt', title: 'Dashboard', text: 'What needs your signature, what others still have to sign, and activity over the last 14 days.' },
        { src: 'assets/img/signnow-imgs/sign now v2/demandes_taches.png', icon: 'bx-list-check', title: 'Requests', text: 'Received and sent requests with status, progress and due date.' },
        { src: 'assets/img/signnow-imgs/sign now v2/sign_document.png', icon: 'bx-pen', title: 'Signing a document', text: 'Three steps: choose a signature, place it on the page, sign.' },
        { src: 'assets/img/signnow-imgs/sign now v2/document_preview.png', icon: 'bx-file', title: 'Document view', text: 'Preview with version history, related requests and the AI summary panel.' },
        { src: 'assets/img/signnow-imgs/sign now v2/verify_document.png', icon: 'bx-shield-quarter', title: 'Verification', text: 'Upload a signed PDF and see right away if it is authentic and unchanged.' },
        { src: 'assets/img/signnow-imgs/sign now v2/signatures.png', icon: 'bx-edit-alt', title: 'Saved signatures', text: 'Draw a signature once and reuse it. One is set as default.' },
        { src: 'assets/img/signnow-imgs/sign now v2/services.png', icon: 'bx-buildings', title: 'Departments', text: 'Admins group users by department so they can share projects.' },
        { src: 'assets/img/signnow-imgs/sign now/summary-AI.png', icon: 'bx-bot', title: 'AI summary', text: 'A short summary of the document generated before signing.' }
      ]
    },
    {
      id: 'edity',
      name: 'Edity',
      tagline: 'Collaborative document editor with an AI agent',
      year: '2026',
      context: 'Personal project',
      role: 'Solo, from design to deployment',
      platforms: 'Web · Android',
      categories: ['ai', 'fullstack', 'mobile'],
      featured: true,
      isNew: true,
      accent: '#4f6bed',
      icon: 'bx-edit',
      summary:
        'Edity is a document editor where you can write with other people in real time and ask an AI agent to edit the text. You review each change before it is applied.',
      highlights: [
        'AI agent that proposes edits you accept or reject',
        'Real-time editing and sharing with roles',
        'ASP.NET Core API with Clean Architecture'
      ],
      tech: ['ASP.NET Core', 'Clean Architecture', 'Vue.js', 'Capacitor', 'SignalR', 'PostgreSQL', 'Docker', 'LLM'],
      logo: 'assets/img/edity-imgs/icon-512.png',
      cover: 'assets/img/edity-imgs/edity_editor.png',
      url: 'projects/edity.html',
      problem:
        'People usually write in one tool, share it in another and copy text into a chatbot to improve it. The AI does not see the full document, and it is hard to know what it changed.',
      solution:
        'In Edity the AI agent reads the whole document and shows its edits directly in the page. You accept or reject each one, while your collaborators see the document update live.',
      metrics: [
        { value: 'Real-time', label: 'Co-editing' },
        { value: 'Accept / reject', label: 'AI edits' },
        { value: 'Web + Android', label: 'Platforms' }
      ],
      features: [
        { icon: 'bx-bot', title: 'AI agent', text: 'Ask for a change in plain words. The agent edits the document and you review each change.' },
        { icon: 'bx-group', title: 'Real-time collaboration', text: 'Several people edit the same document and see each other\'s changes live (SignalR).' },
        { icon: 'bx-share-alt', title: 'Sharing with roles', text: 'Invite people as editor or viewer. Only invited people can open the link.' },
        { icon: 'bx-list-ul', title: 'Outline and stats', text: 'Navigate long documents with the outline, and see word, page and heading counts.' },
        { icon: 'bx-export', title: 'Export', text: 'Download documents as PDF or Word.' },
        { icon: 'bx-mobile-alt', title: 'Android app', text: 'The same Vue.js code packaged as an Android app with Capacitor.' }
      ],
      architecture: ['Vue.js client', 'SignalR hub', 'ASP.NET Core API', 'AI agent', 'PostgreSQL'],
      gallery: [
        { src: 'assets/img/edity-imgs/edity_dashboard.png', icon: 'bx-home-alt', title: 'Home', text: 'Recent documents and an activity feed: edits, shares and AI actions.' },
        { src: 'assets/img/edity-imgs/edity_editor.png', icon: 'bx-edit', title: 'Editor', text: 'Full text editor with an outline on the left and the AI panel on the right.' },
        { src: 'assets/img/edity-imgs/edity_ai_agent.png', icon: 'bx-bot', title: 'AI agent at work', text: 'The agent\'s changes appear in the page. Accept or reject each one, or all at once.' },
        { src: 'assets/img/edity-imgs/edity_editor2.png', icon: 'bx-info-circle', title: 'Document info', text: 'Word count, pages, headings and who has access.' },
        { src: 'assets/img/edity-imgs/edity_share.png', icon: 'bx-share-alt', title: 'Sharing', text: 'Invite people by email as editor or viewer.' }
      ]
    },
    {
      id: 'fylora',
      name: 'Fylora',
      tagline: 'Android app to find your documents fast',
      year: '2026',
      context: 'Personal project',
      role: 'Solo, mobile and AI',
      platforms: 'Android',
      device: 'phone',
      categories: ['ai', 'mobile'],
      featured: true,
      isNew: true,
      accent: '#ee7b4a',
      icon: 'bx-folder-open',
      summary:
        'Fylora reads the documents on your phone and lets you find them by asking in normal words, by text or voice. It can also scan paper documents and file them automatically.',
      highlights: [
        'Search by meaning, e.g. "my electricity bill"',
        'Scan a page: title, category and tags are suggested',
        'Sensitive documents never leave the phone'
      ],
      tech: ['Vue.js', 'TypeScript', 'Capacitor', 'Java', 'Python', 'FastAPI', 'SQLite', 'OCR', 'LLM'],
      logo: 'assets/img/fylora-imgs/fylora-logo-512.png',
      cover: 'assets/img/fylora-imgs/Screenshot_2026-11-22-21-46-06-240_com.fylora.app-edit.jpg',
      covers: [
        'assets/img/fylora-imgs/Screenshot_2026-11-22-21-46-06-240_com.fylora.app-edit.jpg',
        'assets/img/fylora-imgs/Screenshot_2026-11-22-21-49-15-121_com.fylora.app-edit.jpg',
        'assets/img/fylora-imgs/Screenshot_2026-11-22-21-48-13-119_com.fylora.app-edit.jpg'
      ],
      url: 'projects/fylora.html',
      problem:
        'IDs, invoices, CVs and certificates end up spread across downloads, photos and chat apps. When you need one, you scroll through folders and file names that mean nothing.',
      solution:
        'Fylora indexes the content of your documents, not just their names. You ask for what you need, and it shows the matching files and explains why each one matched.',
      metrics: [
        { value: '850+', label: 'Documents indexed in testing' },
        { value: 'Text + voice', label: 'Search' },
        { value: 'Native', label: 'Java plugins' }
      ],
      features: [
        { icon: 'bx-search-alt', title: 'Search by meaning', text: 'Type or say what you want. Fylora understands the request and finds the right files.' },
        { icon: 'bx-scan', title: 'Scan and file', text: 'Scan paper pages into one PDF. The AI suggests a title, a category and tags.' },
        { icon: 'bx-microphone', title: 'Voice search', text: 'Speech recognition through a custom Capacitor plugin written in Java.' },
        { icon: 'bx-folder', title: 'Your folders', text: 'Choose which folders Fylora reads. Your files are never moved or deleted.' },
        { icon: 'bx-shield-quarter', title: 'Privacy settings', text: 'Choose which file types the AI reads, and keep ID, health and bank files on the phone.' },
        { icon: 'bx-chip', title: 'Python AI service', text: 'A FastAPI service handles text extraction (OCR) and the search models.' }
      ],
      architecture: ['Vue.js + TS app', 'Capacitor (Java plugins)', 'SQLite (local)', 'FastAPI service', 'OCR + AI models'],
      gallery: [
        { src: 'assets/img/fylora-imgs/Screenshot_2026-11-22-21-46-06-240_com.fylora.app-edit.jpg', icon: 'bx-search', title: 'Search', text: 'Ask in your own words, by text or voice. Categories and recent searches below.' },
        { src: 'assets/img/fylora-imgs/Screenshot_2026-11-22-21-49-15-121_com.fylora.app-edit.jpg', icon: 'bx-bulb', title: 'Results', text: 'Matching documents with the passage that matched and why it was chosen.' },
        { src: 'assets/img/fylora-imgs/Screenshot_2026-11-22-21-46-30-596_com.fylora.app-edit.jpg', icon: 'bx-file', title: 'Documents', text: 'All documents with filters by type, category and AI reading status.' },
        { src: 'assets/img/fylora-imgs/Screenshot_2026-11-22-21-47-32-285_com.google.android.gms.jpg', icon: 'bx-camera', title: 'Scanner', text: 'Edges are detected automatically. Manual or automatic capture.' },
        { src: 'assets/img/fylora-imgs/Screenshot_2026-11-22-21-47-57-461_com.google.android.gms-edit.jpg', icon: 'bx-crop', title: 'Clean up the scan', text: 'Enhance, filter and crop the page before saving.' },
        { src: 'assets/img/fylora-imgs/Screenshot_2026-11-22-21-48-13-119_com.fylora.app-edit.jpg', icon: 'bx-purchase-tag-alt', title: 'Save with AI tags', text: 'Title, category and tags are suggested. You can change them.' },
        { src: 'assets/img/fylora-imgs/Screenshot_2026-11-22-21-48-33-833_com.fylora.app-edit.jpg', icon: 'bx-folder', title: 'Folders', text: 'Pick the places Fylora reads. It never changes your files.' },
        { src: 'assets/img/fylora-imgs/Screenshot_2026-11-22-21-48-47-940_com.fylora.app-edit.jpg', icon: 'bx-cog', title: 'AI settings', text: 'Choose what the AI reads and exclude sensitive documents.' }
      ]
    },
    {
      id: 'daberly',
      name: 'Daberly',
      tagline: 'Wholesale e-commerce platform',
      year: '2025',
      context: 'Client project · In production',
      role: 'Full-stack & deployment',
      platforms: 'Web',
      categories: ['fullstack', 'devops'],
      featured: true,
      accent: '#f2622e',
      icon: 'bx-shopping-bag',
      summary:
        'Daberly is an online store for a wholesale business. Sellers order from the catalogue, the admin manages orders and stock, and new agents and sellers join with an invitation code.',
      highlights: [
        'Catalogue with live stock and bulk ordering',
        'Admin dashboard for sales, orders and stock',
        'Docker and Nginx on a VPS, deployed with GitHub Actions'
      ],
      tech: ['.NET Core', 'Vue.js', 'SignalR', 'PostgreSQL', 'Docker', 'Nginx', 'GitHub Actions'],
      logo: 'assets/img/daberly-imgs/daberly v2/icon-512x512.png',
      cover: 'assets/img/daberly-imgs/daberly v2/catalogue.png',
      url: 'projects/daberly.html',
      problem:
        'The business took orders by phone and chat. Stock, prices and order status lived in different places, and adding a new seller meant setting everything up by hand.',
      solution:
        'One platform with a catalogue, an order flow with clear statuses, and an admin panel. Sellers join with an invitation code that sets their role, and support happens in a built-in chat.',
      metrics: [
        { value: 'Live', label: 'In production' },
        { value: 'Real-time', label: 'Chat & announcements' },
        { value: 'CI/CD', label: 'Automatic deploys' }
      ],
      features: [
        { icon: 'bx-store', title: 'Catalogue', text: 'Products by category with variants, live stock and quantity selection.' },
        { icon: 'bx-receipt', title: 'Order tracking', text: 'Every order goes through clear steps: pending, confirmed, shipping, delivered.' },
        { icon: 'bx-bar-chart-alt-2', title: 'Admin dashboard', text: 'Revenue, orders, average basket, best sellers and low-stock alerts.' },
        { icon: 'bx-key', title: 'Invitation codes', text: 'Admins invite agents and sellers with a code that sets their role when they sign up.' },
        { icon: 'bx-chat', title: 'Chat and announcements', text: 'Real-time chat with buyers and live announcements with SignalR.' },
        { icon: 'bx-server', title: 'Deployment', text: 'Docker and Nginx on a VPS. Each push to main is deployed by GitHub Actions.' }
      ],
      architecture: ['Vue.js storefront & admin', 'ASP.NET Core API', 'SignalR hub', 'PostgreSQL', 'Docker + Nginx (VPS)'],
      gallery: [
        { src: 'assets/img/daberly-imgs/daberly v2/catalogue.png', icon: 'bx-store', title: 'Catalogue', text: 'Products by category with price, stock and quick add to cart.' },
        { src: 'assets/img/daberly-imgs/daberly v2/dashboard_admin.png', icon: 'bx-bar-chart-alt-2', title: 'Admin dashboard', text: 'Revenue per day, orders by status and key numbers for the period.' },
        { src: 'assets/img/daberly-imgs/daberly v2/commandes.png', icon: 'bx-list-ul', title: 'Orders', text: 'All orders with filters by status, seller and date.' },
        { src: 'assets/img/daberly-imgs/daberly v2/mes_commandes.png', icon: 'bx-receipt', title: 'Order details', text: 'Items, delivery info and a progress bar for each step.' },
        { src: 'assets/img/daberly-imgs/daberly v2/invitations.png', icon: 'bx-user-plus', title: 'Invitations', text: 'Codes for new agents and sellers, with usage and expiry.' },
        { src: 'assets/img/daberly-imgs/daberly v2/intation_avec_code.png', icon: 'bx-key', title: 'New invitation', text: 'A code and a sign-up link are generated and sent by email.' },
        { src: 'assets/img/daberly-imgs/daberly v1/chat.png', icon: 'bx-chat', title: 'Chat', text: 'Real-time conversations between buyers and the shop.' },
        { src: 'assets/img/daberly-imgs/daberly v1/videosproducts-playlists.png', icon: 'bx-video', title: 'Product videos', text: 'Video playlists to show products in detail.' }
      ]
    }
  ],

  EXPERIENCE: [
    {
      company: 'NeoLedge',
      logo: 'assets/img/neoledge_logo.png',
      role: 'Software Engineer Intern',
      period: 'Feb 2026 — Jun 2026',
      project: 'evalia',
      categories: ['ai', 'fullstack', 'devops', 'mobile'],
      summary: 'Built Evalia, a platform for technical assessments with AI-generated questions.',
      points: [
        'Built a multi-tenant architecture with authentication, roles and organization management.',
        'Integrated an AI pipeline (OCR, embeddings, semantic search, LLMs) that generates questions from documents.',
        'Developed the assessment flow: timed sessions, anti-cheat, background report generation and live monitoring.',
        'Wrote unit and integration tests and set up CI/CD with Docker and GitHub Actions.'
      ],
      tech: ['.NET Core', 'Vue.js', 'Capacitor', 'Azure DevOps', 'Docker', 'GitHub Actions']
    },
    {
      company: 'NeoLedge',
      logo: 'assets/img/neoledge_logo.png',
      role: 'Software Engineer Intern',
      period: 'Jul 2025 — Sep 2025',
      project: 'signy',
      categories: ['ai', 'fullstack'],
      summary: 'Built Signy, an electronic signature platform with AI document summaries.',
      points: [
        'Developed document management and signing workflows with .NET and Vue.js.',
        'Added AI document summaries and OCR text extraction.',
        'Implemented certificate-based signatures that guarantee authenticity and integrity.',
        'Added real-time notifications and shared tasks with SignalR.'
      ],
      tech: ['.NET', 'Vue.js', 'SignalR', 'SQL Server', 'Azure DevOps', 'Docker']
    },
    {
      company: 'NeoLedge',
      logo: 'assets/img/neoledge_logo.png',
      role: 'Web Developer Intern',
      period: 'Aug 2024 — Sep 2024',
      project: null,
      categories: ['fullstack'],
      summary: 'Built an application to receive, sort and track incoming client documents (bureau d’ordre).',
      points: [
        'Built the admin and dashboard interfaces used to manage and monitor requests.',
        'Worked on both the .NET backend and the Vue.js frontend.'
      ],
      tech: ['.NET Core', 'Vue.js', 'SQL Server', 'Azure', 'Docker']
    },
    {
      company: 'SOFTIFI',
      logo: 'assets/img/softifi_logo.png',
      role: 'DevOps Intern',
      period: 'Jul 2024',
      project: null,
      categories: ['devops'],
      summary: 'Automated the deployment of custom Odoo modules.',
      points: [
        'Set up CI/CD pipelines with Jenkins.',
        'Used Ansible for configuration management and deployment.',
        'Deployed Odoo modules with Docker and Kubernetes.'
      ],
      tech: ['Jenkins', 'Ansible', 'Shell', 'Docker', 'Kubernetes', 'Odoo', 'PostgreSQL']
    }
  ],

  EDUCATION: [
    { school: 'ISIMG', degree: 'Software Engineering degree', period: '2023 — 2026' },
    { school: 'ISIMG', degree: 'Integrated Preparatory Cycle (MPI)', period: '2021 — 2023' }
  ],

  /* `icon` = Simple Icons slug (monochrome, adapts to theme). `bx` = Boxicons fallback. */
  SKILLS: [
    {
      group: 'Frontend & Mobile',
      lens: ['fullstack', 'mobile'],
      items: [
        { name: 'Vue.js', icon: 'vuedotjs' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'Capacitor', icon: 'capacitor' },
        { name: 'Java (Android)', icon: 'openjdk', match: ['Java'] },
        { name: 'HTML & CSS', icon: 'html5' }
      ]
    },
    {
      group: 'Backend',
      lens: ['fullstack'],
      items: [
        { name: '.NET / ASP.NET Core', icon: 'dotnet', match: ['.NET', '.NET Core', 'ASP.NET Core'] },
        { name: 'C#', bx: 'bx-code-curly' },
        { name: 'Clean Architecture', bx: 'bx-layer' },
        { name: 'SignalR', bx: 'bx-broadcast' },
        { name: 'FastAPI', icon: 'fastapi' },
        { name: 'Python', icon: 'python' },
        { name: 'Express.js', icon: 'express' }
      ]
    },
    {
      group: 'AI & Data',
      lens: ['ai'],
      items: [
        { name: 'LLM integration', bx: 'bx-bot', match: ['LLM'] },
        { name: 'OCR', bx: 'bx-scan' },
        { name: 'Embeddings & RAG', bx: 'bx-network-chart', match: ['ChromaDB'] },
        { name: 'ChromaDB', bx: 'bx-data' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'SQL Server', bx: 'bx-server' },
        { name: 'SQLite', icon: 'sqlite' },
        { name: 'MongoDB', icon: 'mongodb' }
      ]
    },
    {
      group: 'DevOps & Cloud',
      lens: ['devops'],
      items: [
        { name: 'Docker', icon: 'docker' },
        { name: 'Kubernetes', icon: 'kubernetes' },
        { name: 'GitHub Actions', icon: 'githubactions' },
        { name: 'Jenkins', icon: 'jenkins' },
        { name: 'Azure DevOps', bx: 'bx-cloud', match: ['Azure DevOps', 'Azure'] },
        { name: 'Ansible', icon: 'ansible' },
        { name: 'Nginx', icon: 'nginx' },
        { name: 'SonarQube', bx: 'bx-bug' },
        { name: 'OWASP ZAP', bx: 'bx-shield-quarter' },
        { name: 'Snyk', icon: 'snyk' },
        { name: 'Shell / Bash', icon: 'gnubash', match: ['Shell'] }
      ]
    }
  ],

  CP: {
    stats: [
      { value: '500+', label: 'Problems solved' },
      { value: '2×', label: 'National CP winner' },
      { value: '35 / 100', label: 'TCPC 2026 rank' },
      { value: '93rd', label: 'IEEEXtreme 18.0' }
    ],
    achievements: [
      { icon: 'bx-trophy', text: 'Winner — ENIG DEV 3.0 competitive programming contest' },
      { icon: 'bx-trophy', text: 'Winner — ENIG Brain Boost competitive programming contest' },
      { icon: 'bx-medal', text: '35th of 100 teams — TCPC 2026, Tunisian Collegiate Programming Contest' },
      { icon: 'bx-medal', text: '93rd place — IEEEXtreme 18.0' }
    ]
  }
};
