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

type FaqItem = {
  q: string
  a: string
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
  faq: {
    eyebrow: string
    headingPrefix: string
    headingGradient: string
    items: FaqItem[]
  }
  contact: {
    eyebrow: string
    headingPrefix: string
    headingGradient: string
    subtitle: string
    cards: {
      whatsapp: ContactCardItem
      github: ContactCardItem
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
    faq: {
      eyebrow: "FAQ",
      headingPrefix: "Perguntas",
      headingGradient: "frequentes.",
      items: [
        {
          q: "Quanto tempo leva para o projeto ficar pronto?",
          a: "O prazo varia conforme a complexidade. Landing pages costumam levar entre 3 e 7 dias úteis, enquanto sites institucionais ou sistemas sob medida têm prazos definidos após o briefing inicial e alinhamento dos requisitos.",
        },
        {
          q: "Como funciona o processo de desenvolvimento?",
          a: "Nosso processo é dividido em quatro etapas simples: alinhamento inicial para entender suas necessidades, criação e aprovação do layout, desenvolvimento técnico com testes rigorosos, e publicação final com entrega dos acessos.",
        },
        {
          q: "O site funciona perfeitamente em celulares e tablets?",
          a: "Sim. Todos os nossos projetos são 100% responsivos, leves e otimizados para carregar rápido e oferecer uma ótima experiência em qualquer tela ou dispositivo.",
        },
        {
          q: "Terei custos adicionais após a entrega?",
          a: "O desenvolvimento é pago uma única vez. Custos recorrentes normais da internet incluem apenas o registro do domínio (anual) e a hospedagem (mensal/anual), e nós orientamos você em toda essa configuração.",
        },
        {
          q: "O site ou sistema será totalmente meu?",
          a: "Sim. Após a finalização e quitação do projeto, todos os acessos, arquivos, banco de dados e direitos pertencem integralmente a você ou à sua empresa.",
        },
        {
          q: "Consigo atualizar o conteúdo do site por conta própria?",
          a: "Sim. Estruturamos a solução para que você tenha autonomia para alterar textos, fotos e informações básicas com facilidade, sem depender de suporte técnico para ajustes do dia a dia.",
        },
        {
          q: "E se eu encontrar algum erro ou precisar de suporte após o lançamento?",
          a: "Oferecemos um período de garantia pós-entrega para correção de qualquer instabilidade ou ajuste técnico, além de opções de planos contínuos de suporte e manutenção se você preferir.",
        },
        {
          q: "Como solicito um orçamento?",
          a: "Basta clicar no botão de contato, nos enviar uma mensagem no WhatsApp ou preencher o formulário explicando sua ideia. Retornamos rapidamente com uma proposta detalhada e sob medida para o seu caso.",
        },
      ],
    },
    contact: {
      eyebrow: "Contato",
      headingPrefix: "Vamos construir algo",
      headingGradient: "significativo.",
      subtitle: "Tem um projeto, uma oportunidade ou uma ideia pra conversar? Vamos adorar ouvir você.",
      cards: {
        whatsapp: { title: "WhatsApp", description: "Fale com a gente agora." },
        github: { title: "GitHub", description: "Veja nossos projetos, contribuições e código." },
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
    faq: {
      eyebrow: "FAQ",
      headingPrefix: "Frequently asked",
      headingGradient: "questions.",
      items: [
        {
          q: "How long does it take to finish a project?",
          a: "Timelines vary with complexity. Landing pages usually take 3 to 7 business days, while corporate sites and custom systems get a timeline after the initial briefing and requirements alignment.",
        },
        {
          q: "How does the development process work?",
          a: "Our process has four simple steps: an initial alignment to understand your needs, layout creation and approval, technical development with rigorous testing, and final publication with delivery of all access.",
        },
        {
          q: "Does the site work perfectly on phones and tablets?",
          a: "Yes. All our projects are 100% responsive, lightweight and optimized to load fast and deliver a great experience on any screen or device.",
        },
        {
          q: "Will I have additional costs after delivery?",
          a: "Development is paid once. Normal recurring internet costs only include the domain registration (yearly) and hosting (monthly/yearly), and we guide you through the whole setup.",
        },
        {
          q: "Will the site or system be fully mine?",
          a: "Yes. Once the project is completed and paid, all access, files, databases and rights belong entirely to you or your company.",
        },
        {
          q: "Can I update the site content on my own?",
          a: "Yes. We build the solution so you can easily change texts, photos and basic information, without relying on technical support for day-to-day adjustments.",
        },
        {
          q: "What if I find a bug or need support after launch?",
          a: "We offer a post-delivery warranty period to fix any instability or technical adjustment, plus ongoing support and maintenance plans if you prefer.",
        },
        {
          q: "How do I request a quote?",
          a: "Just click the contact button, message us on WhatsApp or fill out the form describing your idea. We quickly get back with a detailed proposal tailored to your case.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      headingPrefix: "Let's build something",
      headingGradient: "meaningful.",
      subtitle: "Have a project, an opportunity or an idea to talk about? We'd love to hear from you.",
      cards: {
        whatsapp: { title: "WhatsApp", description: "Talk to us right now." },
        github: { title: "GitHub", description: "See our projects, contributions and code." },
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
