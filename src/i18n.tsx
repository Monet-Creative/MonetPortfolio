import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Lang = "pt" | "en"

type CaseItem = {
  title: string
  tag: string
}

type ToolItem = {
  title: string
  description: string
}

type ContactCardItem = {
  title: string
  description: string
}

type Dictionary = {
  nav: {
    inicio: string
    metodo: string
    portfolio: string
    faq: string
    contato: string
    openMenu: string
  }
  hero: {
    titleLine1: string
    titleLine2: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
  }
  cases: {
    heading: string
    items: CaseItem[]
    link: string
  }
  tools: {
    headingLine1: string
    headingLine2: string
    headingGradient: string
    subtitle: string
    items: Record<"Frontend" | "Databases" | "Backend" | "Workflow" | "Development" | "Tools", ToolItem>
  }
  contact: {
    eyebrow: string
    headingPrefix: string
    headingGradient: string
    subtitle: string
    cards: {
      github: ContactCardItem
      linkedin: ContactCardItem
      email: ContactCardItem
    }
  }
  footer: {
    rights: string
    inicio: string
    portfolio: string
    contato: string
  }
}

const dictionaries: Record<Lang, Dictionary> = {
  pt: {
    nav: {
      inicio: "Início",
      metodo: "Método",
      portfolio: "Portfólio",
      faq: "FAQ",
      contato: "Fale conosco",
      openMenu: "Abrir menu",
    },
    hero: {
      titleLine1: "Seu site pronto em",
      titleLine2: "semanas, não meses.",
      subtitle: "Desenvolvimento de sites e sistemas acelerado por inteligência artificial.",
      ctaPrimary: "Entre em contato",
      ctaSecondary: "Veja o que construímos",
    },
    cases: {
      heading: "Casos de sucesso",
      link: "Confira nossos projetos →",
      items: [
        { title: "Um parceiro técnico que reduz o seu risco, não a sua margem", tag: "E-commerce" },
        { title: "Cavland", tag: "Branding & Site" },
        { title: "Ecossistema 4.0", tag: "Plataforma" },
        { title: "Pate Nicolini", tag: "Institucional" },
        { title: "Ajudo adultos no desenvolvimento de relacionamentos mais saudáveis", tag: "Landing Page" },
        { title: "GM Store", tag: "Loja Virtual" },
      ],
    },
    tools: {
      headingLine1: "As ferramentas que uso",
      headingLine2: "para construir experiências",
      headingGradient: "digitais.",
      subtitle:
        "Tecnologias e práticas usadas para construir aplicações confiáveis, responsivas e de fácil manutenção.",
      items: {
        Frontend: {
          title: "Frontend",
          description: "Interfaces responsivas construídas com componentes limpos e reutilizáveis.",
        },
        Databases: {
          title: "Databases",
          description: "Trabalho com dados estruturados e integrações de banco de dados.",
        },
        Backend: {
          title: "Backend",
          description: "APIs e lógica de aplicação focadas em integrações confiáveis.",
        },
        Workflow: {
          title: "Workflow",
          description: "Práticas ágeis e colaboração em todo o ciclo de desenvolvimento.",
        },
        Development: {
          title: "Development",
          description: "Código limpo, escalável e de fácil manutenção para aplicações web.",
        },
        Tools: {
          title: "Tools",
          description: "Ferramentas que dão suporte ao meu fluxo de trabalho diário.",
        },
      },
    },
    contact: {
      eyebrow: "Contato",
      headingPrefix: "Vamos construir algo",
      headingGradient: "significativo.",
      subtitle: "Tem um projeto, uma oportunidade ou uma ideia pra conversar? Vamos adorar ouvir você.",
      cards: {
        github: { title: "GitHub", description: "Veja nossos projetos, contribuições e código." },
        linkedin: { title: "LinkedIn", description: "Conecte-se e acompanhe nossos projetos." },
        email: { title: "Email", description: "Envie uma mensagem - vamos adorar ouvir você." },
      },
    },
    footer: {
      rights: "Todos os direitos reservados.",
      inicio: "Início",
      portfolio: "Portfólio",
      contato: "Contato",
    },
  },
  en: {
    nav: {
      inicio: "Home",
      metodo: "Method",
      portfolio: "Portfolio",
      faq: "FAQ",
      contato: "Get in touch",
      openMenu: "Open menu",
    },
    hero: {
      titleLine1: "Your website ready in",
      titleLine2: "weeks, not months.",
      subtitle: "Website and systems development accelerated by artificial intelligence.",
      ctaPrimary: "Get in touch",
      ctaSecondary: "See what we've built",
    },
    cases: {
      heading: "Success stories",
      link: "See our projects →",
      items: [
        { title: "A technical partner that reduces your risk, not your margin", tag: "E-commerce" },
        { title: "Cavland", tag: "Branding & Site" },
        { title: "Ecossistema 4.0", tag: "Platform" },
        { title: "Pate Nicolini", tag: "Corporate site" },
        { title: "Helping adults build healthier relationships", tag: "Landing Page" },
        { title: "GM Store", tag: "Online Store" },
      ],
    },
    tools: {
      headingLine1: "The tools I use",
      headingLine2: "to build digital",
      headingGradient: "experiences.",
      subtitle:
        "Technologies and practices used to build reliable, responsive and maintainable applications.",
      items: {
        Frontend: {
          title: "Frontend",
          description: "Responsive interfaces built with clean, reusable components.",
        },
        Databases: {
          title: "Databases",
          description: "Working with structured data and database integrations.",
        },
        Backend: {
          title: "Backend",
          description: "APIs and application logic focused on reliable integrations.",
        },
        Workflow: {
          title: "Workflow",
          description: "Agile practices and collaboration throughout the development cycle.",
        },
        Development: {
          title: "Development",
          description: "Clean, scalable, maintainable code for web applications.",
        },
        Tools: {
          title: "Tools",
          description: "Tools that support my daily workflow.",
        },
      },
    },
    contact: {
      eyebrow: "Contact",
      headingPrefix: "Let's build something",
      headingGradient: "meaningful.",
      subtitle: "Have a project, an opportunity or an idea to talk about? We'd love to hear from you.",
      cards: {
        github: { title: "GitHub", description: "See our projects, contributions and code." },
        linkedin: { title: "LinkedIn", description: "Connect with us and follow our projects." },
        email: { title: "Email", description: "Send a message - we'd love to hear from you." },
      },
    },
    footer: {
      rights: "All rights reserved.",
      inicio: "Home",
      portfolio: "Portfolio",
      contato: "Contact",
    },
  },
}

type LanguageContextValue = {
  lang: Lang
  t: Dictionary
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "monet-lang"

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "pt"
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === "en" ? "en" : "pt"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en"
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, t: dictionaries[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
