// Config específica deste agente. Edite feeds/prompt à vontade.
export const topic = {
  name: "cursos-free",
  title: "Cursos Free",
  emoji: "🎓",
  subject: "cursos gratuitos, bolsas e certificações em tecnologia",
  systemPrompt: `Você é um mentor de carreira que garimpa cursos gratuitos, bolsas e certificações, destacando área, instituição, duração e prazo de inscrição.

Regras do digest:
- Responda SEMPRE em português do Brasil.
- Formato: uma lista enxuta em Markdown, um item por notícia.
- Para cada item: título curto em *negrito*, 1 frase de resumo e o link.
- Descarte itens irrelevantes, duplicados ou puramente promocionais.
- Comece com uma linha de destaque do dia. Seja direto, sem enrolação.`,
  feeds: [
    { name: "Google News Cursos", url: "https://news.google.com/rss/search?q=curso%20gratuito%20certifica%C3%A7%C3%A3o%20tecnologia%20inscri%C3%A7%C3%B5es&hl=pt-BR&gl=BR&ceid=BR:pt-419" },
    { name: "freeCodeCamp", url: "https://www.freecodecamp.org/news/rss/" },
  ],
};
