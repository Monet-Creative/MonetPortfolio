import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { OfferId } from "./lib/catalog"

export type Lang = "pt" | "en"

type CaseItem = {
  title: string
  tag: string
}

type StepItem = {
  title: string
  description: string
}

type OfferItem = {
  title: string
  description: string
  chip: string
}

type FaqItem = {
  q: string
  a: string
}

type Dictionary = {
  nav: {
    inicio: string
    servicos: string
    precos: string
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
    badge: string
    titleLine1: string
    titleLine2: string
    subtitle: string
    ctaPrimary: string
    ctaBuy: string
    ctaSecondary: string
    highlights: string[]
  }
  services: string[]
  offer: {
    eyebrow: string
    headingPrefix: string
    headingGradient: string
    subtitle: string
    landing: OfferItem & { mockTitle: string; mockCta: string }
    events: OfferItem & { mockTitle: string; mockName: string; mockGuest: string; mockCta: string }
    institutional: OfferItem
    systems: OfferItem & { mockLabel: string }
  }
  pricing: {
    eyebrow: string
    headingPrefix: string
    headingGradient: string
    subtitle: string
    promo: string
    tabs: { images: string; videos: string; landing: string }
    packSingle: string
    packMulti: string
    unit: { images: [string, string]; videos: [string, string] }
    total: string
    each: string
    popular: string
    bestValue: string
    pay: string
    landing: {
      static: { title: string; description: string; features: string[] }
      admin: { title: string; description: string; features: string[]; badge: string }
    }
    note: string
  }
  cases: {
    eyebrow: string
    headingPrefix: string
    headingGradient: string
    subtitle: string
    items: CaseItem[]
    link: string
  }
  reels: {
    eyebrow: string
    headingPrefix: string
    headingGradient: string
    subtitle: string
    watch: string
    play: string
    pause: string
    mute: string
    unmute: string
    previous: string
    next: string
    titles: string[]
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
    subtitle: string
    ctaText: string
    ctaButton: string
    items: FaqItem[]
  }
  contact: {
    eyebrow: string
    headingPrefix: string
    headingGradient: string
    subtitle: string
    fastest: string
  }
  checkout: {
    back: string
    eyebrow: string
    summary: string
    total: string
    secure: string
    loading: string
    processing: string
    configError: string
    paymentError: string
    statusHeading: string
    approved: string
    statusLoading: string
    invalidPayment: string
    briefTitle: string
    briefText: string
    briefButton: string
    briefMessage: string
    backToSite: string
    offers: Record<OfferId, string>
  }
  consent: {
    title: string
    text: string
    policy: string
    acceptAll: string
    rejectAll: string
    customize: string
    save: string
    necessaryTitle: string
    necessaryText: string
    analyticsTitle: string
    analyticsText: string
    marketingTitle: string
    marketingText: string
    alwaysOn: string
  }
  footer: {
    rights: string
    inicio: string
    portfolio: string
    contato: string
    privacy: string
    cookies: string
    tagline: string
    navTitle: string
    contactTitle: string
    legalTitle: string
    payTitle: string
    payNote: string
    pix: string
    credit: string
    debit: string
    boleto: string
  }
}

const dictionaries: Record<Lang, Dictionary> = {
  pt: {
    nav: {
      inicio: "Início",
      servicos: "Serviços",
      precos: "Preços",
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
      badge: "Desenvolvimento acelerado por IA",
      titleLine1: "Seu site no ar em",
      titleLine2: "dias, não meses.",
      subtitle:
        "Sites, landing pages e sistemas sob medida, desenvolvidos com inteligência artificial para entregar mais rápido sem abrir mão da qualidade.",
      ctaPrimary: "Pedir orçamento no WhatsApp",
      ctaBuy: "Comprar no site",
      ctaSecondary: "Ver projetos",
      highlights: ["Landing pages em 3 a 7 dias úteis", "100% responsivo", "Código e acessos são seus"],
    },
    services: ["Landing pages", "Sites institucionais", "Sistemas sob medida", "Eventos", "Aniversários", "Design"],
    offer: {
      eyebrow: "Serviços",
      headingPrefix: "O que a gente",
      headingGradient: "constrói.",
      subtitle: "Do convite de aniversário ao sistema da sua empresa: cada projeto feito sob medida.",
      landing: {
        title: "Landing pages",
        description: "Uma página focada em um objetivo: vender, captar contatos ou divulgar um lançamento.",
        chip: "3 a 7 dias úteis",
        mockTitle: "Seu produto aqui",
        mockCta: "Comprar agora",
      },
      events: {
        title: "Eventos e convites",
        description: "Convites digitais para chás, aniversários e casamentos, com confirmação de presença online.",
        chip: "Com RSVP",
        mockTitle: "Confirme sua presença",
        mockName: "Seu nome",
        mockGuest: "Acompanhante",
        mockCta: "Confirmar",
      },
      institutional: {
        title: "Sites institucionais",
        description: "A presença online da sua empresa, com páginas de serviços, sobre e contato.",
        chip: "Multipáginas",
      },
      systems: {
        title: "Sistemas sob medida",
        description: "Painéis, cadastros e automações para organizar a operação do seu negócio.",
        chip: "Web apps",
        mockLabel: "Vendas",
      },
    },
    pricing: {
      eyebrow: "Preços",
      headingPrefix: "Quanto",
      headingGradient: "custa.",
      subtitle: "Valores claros, sem surpresa. Escolha o pacote e fale com a gente no WhatsApp.",
      promo: "Promoção",
      tabs: { images: "Imagens", videos: "Vídeos", landing: "Landing Pages" },
      packSingle: "Pacote Único",
      packMulti: "Pacote {n} {unit}",
      unit: { images: ["Imagem", "Imagens"], videos: ["Vídeo", "Vídeos"] },
      total: "total",
      each: "cada",
      popular: "Mais Popular",
      bestValue: "Melhor Valor",
      pay: "Realizar pagamento",
      landing: {
        static: {
          title: "Landing Page Estática",
          description: "Uma página focada em um objetivo: vender, captar contatos ou divulgar um lançamento.",
          features: ["Página focada em conversão", "100% responsiva", "Entrega em 3 a 7 dias úteis", "Código e acessos são seus"],
        },
        admin: {
          title: "Landing Page com Painel Administrativo",
          description: "Tudo da landing page estática, com um painel para você gerenciar o site sozinho.",
          features: [
            "Tudo da Landing Page Estática",
            "Painel administrativo",
            "Atualize textos, fotos e informações",
            "Código e acessos são seus",
          ],
          badge: "Mais completa",
        },
      },
      note: "Valores em reais (R$).",
    },
    cases: {
      eyebrow: "Portfólio",
      headingPrefix: "Projetos",
      headingGradient: "recentes.",
      subtitle: "Alguns dos sites e páginas que já colocamos no ar.",
      link: "Veja mais no GitHub →",
      items: [
        { title: "Chá Revelação", tag: "Eventos" },
        { title: "Aviator", tag: "Aviação" },
        { title: "Gaming Code", tag: "Jogos" },
        { title: "Essenza Estética", tag: "Estética e Saúde" },
      ],
    },
    reels: {
      eyebrow: "Instagram",
      headingPrefix: "Nosso conteúdo em",
      headingGradient: "movimento.",
      subtitle: "Os vídeos do nosso feed, direto do Instagram.",
      watch: "Ver no Instagram",
      play: "Reproduzir",
      pause: "Pausar",
      mute: "Desativar som",
      unmute: "Ativar som",
      previous: "Vídeo anterior",
      next: "Próximo vídeo",
      titles: [
        "Sua clínica está perdendo clientes?",
        "O painel da sua clínica",
        "Site para clínicas de estética",
        "Seu site no ar em 7 dias",
        "Sua ideia vira obra-prima digital",
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
      subtitle: "Tudo o que você precisa saber antes de começar seu projeto.",
      ctaText: "Não encontrou sua resposta?",
      ctaButton: "Pergunte no WhatsApp",
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
      fastest: "Mais rápido",
    },
    checkout: {
      back: "Voltar aos preços",
      eyebrow: "Pagamento",
      summary: "Seu pedido",
      total: "Total",
      secure: "Pagamento processado pelo Mercado Pago. Os dados do seu cartão não passam pelos nossos servidores.",
      loading: "Carregando pagamento…",
      processing: "Processando seu pagamento…",
      configError: "Não foi possível carregar o pagamento agora. Tente novamente em instantes ou fale com a gente no WhatsApp.",
      paymentError: "Não foi possível concluir o pagamento. Confira os dados e tente de novo, ou fale com a gente no WhatsApp.",
      statusHeading: "Resultado do pagamento",
      approved: "Pagamento aprovado! Obrigado pela compra.",
      statusLoading: "Consultando seu pagamento…",
      invalidPayment: "Pagamento não encontrado. Volte aos preços e tente novamente.",
      briefTitle: "Próximo passo",
      briefText: "Envie o briefing pelo WhatsApp com o número do pagamento para começarmos o seu pedido.",
      briefButton: "Enviar briefing no WhatsApp",
      briefMessage: "Olá! Acabei de pagar o pacote {item} (pagamento {id}) e quero enviar o briefing.",
      backToSite: "Voltar ao site",
      offers: {
        images_1: "Criativos — Pacote Único (1 imagem)",
        images_3: "Criativos — Pacote 3 Imagens",
        images_5: "Criativos — Pacote 5 Imagens",
        videos_1: "Vídeo animado — Pacote Único (1 vídeo)",
        videos_3: "Vídeos animados — Pacote 3 Vídeos",
        videos_5: "Vídeos animados — Pacote 5 Vídeos",
        landing_static: "Landing Page Estática",
        landing_admin: "Landing Page com Painel Administrativo",
      },
    },
    consent: {
      title: "Sua privacidade",
      text: "Usamos cookies necessários para o site funcionar e, com a sua permissão, cookies de estatísticas para entender como o site é usado e melhorá-lo. Você pode aceitar, recusar ou escolher o que permitir, e mudar de ideia quando quiser.",
      policy: "Política de Privacidade",
      acceptAll: "Aceitar todos",
      rejectAll: "Recusar opcionais",
      customize: "Personalizar",
      save: "Salvar preferências",
      necessaryTitle: "Necessários",
      necessaryText: "Idioma, sua escolha de cookies e segurança do pagamento. Sempre ativos.",
      analyticsTitle: "Estatísticas",
      analyticsText: "Google Analytics: páginas vistas, cliques e rolagem, de forma agregada, para melhorar o site.",
      marketingTitle: "Marketing",
      marketingText: "Anúncios e remarketing. Hoje não usamos; fica reservado para campanhas futuras.",
      alwaysOn: "Sempre ativo",
    },
    footer: {
      rights: "Todos os direitos reservados.",
      inicio: "Início",
      portfolio: "Portfólio",
      contato: "Contato",
      privacy: "Privacidade",
      cookies: "Cookies",
      tagline: "Sites, landing pages e sistemas que transformam visitas em clientes.",
      navTitle: "Navegação",
      contactTitle: "Contato",
      legalTitle: "Legal",
      payTitle: "Formas de pagamento",
      payNote: "Pagamento processado com segurança pelo Mercado Pago. Parcelamos no cartão de crédito.",
      pix: "Pix",
      credit: "Cartão de crédito",
      debit: "Cartão de débito",
      boleto: "Boleto",
    },
  },
  en: {
    nav: {
      inicio: "Home",
      servicos: "Services",
      precos: "Pricing",
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
      badge: "AI-accelerated development",
      titleLine1: "Your website live in",
      titleLine2: "days, not months.",
      subtitle:
        "Websites, landing pages and custom systems, built with artificial intelligence to ship faster without cutting corners.",
      ctaPrimary: "Get a quote on WhatsApp",
      ctaBuy: "Buy on the site",
      ctaSecondary: "See projects",
      highlights: ["Landing pages in 3 to 7 business days", "100% responsive", "You own the code and access"],
    },
    services: ["Landing pages", "Corporate websites", "Custom systems", "Events", "Birthdays", "Design"],
    offer: {
      eyebrow: "Services",
      headingPrefix: "What we",
      headingGradient: "build.",
      subtitle: "From birthday invitations to your company's system: every project tailor-made.",
      landing: {
        title: "Landing pages",
        description: "A page focused on one goal: selling, capturing leads or promoting a launch.",
        chip: "3 to 7 business days",
        mockTitle: "Your product here",
        mockCta: "Buy now",
      },
      events: {
        title: "Events & invitations",
        description: "Digital invitations for showers, birthdays and weddings, with online RSVP.",
        chip: "With RSVP",
        mockTitle: "Confirm attendance",
        mockName: "Your name",
        mockGuest: "Plus one",
        mockCta: "Confirm",
      },
      institutional: {
        title: "Corporate websites",
        description: "Your company's online presence, with services, about and contact pages.",
        chip: "Multi-page",
      },
      systems: {
        title: "Custom systems",
        description: "Dashboards, records and automations to organize your business operations.",
        chip: "Web apps",
        mockLabel: "Sales",
      },
    },
    pricing: {
      eyebrow: "Pricing",
      headingPrefix: "How much it",
      headingGradient: "costs.",
      subtitle: "Clear prices, no surprises. Pick a package and message us on WhatsApp.",
      promo: "Promo",
      tabs: { images: "Images", videos: "Videos", landing: "Landing Pages" },
      packSingle: "Single Pack",
      packMulti: "{n} {unit} Pack",
      unit: { images: ["Image", "Images"], videos: ["Video", "Videos"] },
      total: "total",
      each: "each",
      popular: "Most Popular",
      bestValue: "Best Value",
      pay: "Make payment",
      landing: {
        static: {
          title: "Static Landing Page",
          description: "A page focused on one goal: selling, capturing leads or promoting a launch.",
          features: ["Conversion-focused page", "100% responsive", "Delivered in 3 to 7 business days", "You own the code and access"],
        },
        admin: {
          title: "Landing Page with Admin Panel",
          description: "Everything in the static landing page, plus a panel so you can manage the site yourself.",
          features: [
            "Everything in the Static Landing Page",
            "Admin panel",
            "Update texts, photos and information",
            "You own the code and access",
          ],
          badge: "Most complete",
        },
      },
      note: "Prices in Brazilian reais (R$).",
    },
    cases: {
      eyebrow: "Portfolio",
      headingPrefix: "Recent",
      headingGradient: "projects.",
      subtitle: "Some of the websites and pages we've already shipped.",
      link: "See more on GitHub →",
      items: [
        { title: "Gender Reveal", tag: "Events" },
        { title: "Aviator", tag: "Aviation" },
        { title: "Gaming Code", tag: "Games" },
        { title: "Essenza Estética", tag: "Aesthetics & Health" },
      ],
    },
    reels: {
      eyebrow: "Instagram",
      headingPrefix: "Our content in",
      headingGradient: "motion.",
      subtitle: "The videos from our feed, straight from Instagram.",
      watch: "Watch on Instagram",
      play: "Play",
      pause: "Pause",
      mute: "Mute",
      unmute: "Unmute",
      previous: "Previous video",
      next: "Next video",
      titles: [
        "Is your clinic losing clients?",
        "Your clinic's dashboard",
        "Websites for aesthetic clinics",
        "Your website live in 7 days",
        "Your idea becomes a digital masterpiece",
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
      subtitle: "Everything you need to know before starting your project.",
      ctaText: "Didn't find your answer?",
      ctaButton: "Ask on WhatsApp",
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
      fastest: "Fastest",
    },
    checkout: {
      back: "Back to pricing",
      eyebrow: "Payment",
      summary: "Your order",
      total: "Total",
      secure: "Payment processed by Mercado Pago. Your card details never touch our servers.",
      loading: "Loading payment…",
      processing: "Processing your payment…",
      configError: "We couldn't load the payment right now. Try again shortly or message us on WhatsApp.",
      paymentError: "We couldn't complete the payment. Check your details and try again, or message us on WhatsApp.",
      statusHeading: "Payment result",
      approved: "Payment approved! Thank you for your purchase.",
      statusLoading: "Checking your payment…",
      invalidPayment: "Payment not found. Go back to pricing and try again.",
      briefTitle: "Next step",
      briefText: "Send your brief on WhatsApp with the payment number so we can start your order.",
      briefButton: "Send brief on WhatsApp",
      briefMessage: "Hi! I just paid for the {item} pack (payment {id}) and I'd like to send my brief.",
      backToSite: "Back to the site",
      offers: {
        images_1: "Creatives — Single Pack (1 image)",
        images_3: "Creatives — 3 Images Pack",
        images_5: "Creatives — 5 Images Pack",
        videos_1: "Animated video — Single Pack (1 video)",
        videos_3: "Animated videos — 3 Videos Pack",
        videos_5: "Animated videos — 5 Videos Pack",
        landing_static: "Static Landing Page",
        landing_admin: "Landing Page with Admin Panel",
      },
    },
    consent: {
      title: "Your privacy",
      text: "We use necessary cookies to run the site and, with your permission, analytics cookies to understand how it is used and improve it. You can accept, decline or choose what to allow, and change your mind at any time.",
      policy: "Privacy Policy (Portuguese)",
      acceptAll: "Accept all",
      rejectAll: "Decline optional",
      customize: "Customize",
      save: "Save preferences",
      necessaryTitle: "Necessary",
      necessaryText: "Language, your cookie choice and payment security. Always on.",
      analyticsTitle: "Analytics",
      analyticsText: "Google Analytics: aggregated page views, clicks and scrolling, to improve the site.",
      marketingTitle: "Marketing",
      marketingText: "Ads and remarketing. Not used today; reserved for future campaigns.",
      alwaysOn: "Always on",
    },
    footer: {
      rights: "All rights reserved.",
      inicio: "Home",
      portfolio: "Portfolio",
      contato: "Contact",
      privacy: "Privacy",
      cookies: "Cookies",
      tagline: "Websites, landing pages and systems that turn visits into clients.",
      navTitle: "Navigate",
      contactTitle: "Contact",
      legalTitle: "Legal",
      payTitle: "Payment methods",
      payNote: "Payments securely processed by Mercado Pago. Credit card installments available.",
      pix: "Pix",
      credit: "Credit card",
      debit: "Debit card",
      boleto: "Boleto",
    },
  },
}

export const WHATSAPP_NUMBER = "5583921565651"
export const CONTACT_EMAIL = "contato.monetcreative@gmail.com"
export const GITHUB_URL = "https://github.com/Monet-Creative"
export const INSTAGRAM_URL = "https://www.instagram.com/monetcreative_"

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
