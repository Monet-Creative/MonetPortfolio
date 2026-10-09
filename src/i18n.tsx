import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Lang = "pt" | "en"

type CaseItem = {
  title: string
  tag: string
}

type StepItem = {
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
    closeMenu: string
  }
  whatsapp: {
    message: string
    floatingLabel: string
  }
  hero: {
    titleLine1: string
    titleLine2: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    highlights: string[]
  }
  services: string[]
  cases: {
    heading: string
    subtitle: string
    items: CaseItem[]
    link: string
  }
  method: {
    eyebrow: string
    headingPrefix: string
    headingGradient: string
    subtitle: string
    steps: StepItem[]
    stackLabel: string
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
      closeMenu: "Fechar menu",
    },
    whatsapp: {
      message: "Olá! Vim pelo site da Monet e quero um orçamento.",
      floatingLabel: "Falar no WhatsApp",
    },
    hero: {
      titleLine1: "Seu site no ar em",
      titleLine2: "dias, não meses.",
      subtitle:
        "Sites, landing pages e sistemas sob medida, desenvolvidos com inteligência artificial para entregar mais rápido sem abrir mão da qualidade.",
      ctaPrimary: "Pedir orçamento no WhatsApp",
      ctaSecondary: "Ver projetos",
      highlights: ["Landing pages em 3 a 7 dias úteis", "100% responsivo", "Código e acessos são seus"],
    },
    services: ["Landing pages", "Sites institucionais", "Sistemas sob medida", "Eventos", "Aniversários", "Design"],
    cases: {
      heading: "Projetos recentes",
      subtitle: "Alguns dos sites e páginas que já colocamos no ar.",
      link: "Veja mais no GitHub →",
      items: [
        { title: "Chá Revelação", tag: "Eventos" },
        { title: "Aviator", tag: "Aviação" },
        { title: "Gaming Code", tag: "Jogos" },
        { title: "PokeBattle", tag: "Entretenimento" },
      ],
    },
    method: {
      eyebrow: "Método",
      headingPrefix: "Da ideia ao site no ar em",
      headingGradient: "4 etapas.",
      subtitle:
        "A IA acelera o código e as revisões; as decisões de design e de negócio continuam com a gente. Resultado: menos tempo e menos custo para você.",
      steps: [
        {
          title: "Alinhamento",
          description: "Conversamos sobre seu negócio, objetivo e público para definir escopo, prazo e orçamento.",
        },
        {
          title: "Layout",
          description: "Criamos o visual da página e ajustamos com você até a aprovação.",
        },
        {
          title: "Desenvolvimento",
          description: "Construímos o site com código limpo, rápido e testado em celular, tablet e desktop.",
        },
        {
          title: "Publicação",
          description: "Colocamos o site no ar com seu domínio e entregamos todos os acessos.",
        },
      ],
      stackLabel: "Tecnologias que usamos",
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
          a: "Basta nos chamar no WhatsApp ou enviar um email explicando sua ideia. Retornamos rapidamente com uma proposta detalhada e sob medida para o seu caso.",
        },
      ],
    },
    contact: {
      eyebrow: "Contato",
      headingPrefix: "Vamos construir algo",
      headingGradient: "significativo.",
      subtitle: "Conte sua ideia e receba uma proposta sob medida. Sem compromisso.",
      cards: {
        whatsapp: { title: "WhatsApp", description: "Resposta mais rápida." },
        email: { title: "Email", description: "Prefere escrever? Mande sua ideia." },
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
      closeMenu: "Close menu",
    },
    whatsapp: {
      message: "Hi! I found Monet's website and I'd like a quote.",
      floatingLabel: "Chat on WhatsApp",
    },
    hero: {
      titleLine1: "Your website live in",
      titleLine2: "days, not months.",
      subtitle:
        "Websites, landing pages and custom systems, built with artificial intelligence to ship faster without cutting corners.",
      ctaPrimary: "Get a quote on WhatsApp",
      ctaSecondary: "See projects",
      highlights: ["Landing pages in 3 to 7 business days", "100% responsive", "You own the code and access"],
    },
    services: ["Landing pages", "Corporate websites", "Custom systems", "Events", "Birthdays", "Design"],
    cases: {
      heading: "Recent projects",
      subtitle: "Some of the websites and pages we've already shipped.",
      link: "See more on GitHub →",
      items: [
        { title: "Gender Reveal", tag: "Events" },
        { title: "Aviator", tag: "Aviation" },
        { title: "Gaming Code", tag: "Games" },
        { title: "PokeBattle", tag: "Entertainment" },
      ],
    },
    method: {
      eyebrow: "Method",
      headingPrefix: "From idea to live site in",
      headingGradient: "4 steps.",
      subtitle:
        "AI speeds up the code and the reviews; design and business decisions stay with us. The result: less time and lower cost for you.",
      steps: [
        {
          title: "Alignment",
          description: "We talk about your business, goals and audience to define scope, timeline and budget.",
        },
        {
          title: "Layout",
          description: "We design the page and refine it with you until it's approved.",
        },
        {
          title: "Development",
          description: "We build the site with clean, fast code, tested on phone, tablet and desktop.",
        },
        {
          title: "Launch",
          description: "We put the site live on your domain and hand over all access.",
        },
      ],
      stackLabel: "Technologies we use",
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
          a: "Just message us on WhatsApp or send an email describing your idea. We quickly get back with a detailed proposal tailored to your case.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      headingPrefix: "Let's build something",
      headingGradient: "meaningful.",
      subtitle: "Tell us your idea and get a tailored proposal. No strings attached.",
      cards: {
        whatsapp: { title: "WhatsApp", description: "Fastest reply." },
        email: { title: "Email", description: "Prefer writing? Send us your idea." },
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

export const WHATSAPP_NUMBER = "5524981297207"
export const CONTACT_EMAIL = "contato.monetcreative@gmail.com"
export const GITHUB_URL = "https://github.com/Monet-Creative"

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
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
