const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const awaitingFeedback = new Set();

const handlers = {
  '/jogadores': `
🎮 *Time Atual da FURIACS*:

- Fallen (IGL)
- KSCERATO (Rifler)
- molodoy (Awper)
- YEKINDAR (Rifler)
- Yuurih (Rifler)
- Sidde (Coach)
- Krizzen (Assistant Coach)

🏆 Estamos prontos para o próximo desafio!
`,
  '/noticias': `
📰 *Últimas Notícias:*

- 30/04: Krizzen é o mais novo Assistant Coach da FURIACS! Confira -> [Krizzen confirmado](https://x.com/FURIA/status/1917597193986310496?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1917597193986310496%7Ctwgr%5E7ae31f38589cf094a17f02ae9cbbd4f0036a68d0%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fwww.hltv.org%2Fnews%2F41581%2Fkrizzen-joins-furia-as-assistant-coach).
- 22/04: FURIA CONFIRMA Mareks "YEKINDAR" como Stand-in no lugar de Felipe "Skullz" que vai para o banco! Confira -> [YEKINDAR confirmado](https://x.com/FURIA/status/1914726018440458417?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1914726018440458417%7Ctwgr%5E5cdeffcbf39359d18b8954924d3e198c37167818%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fdraft5.gg%2Fnoticia%2Ffuria-confirma-adicao-de-yekindar).
- 11/04: FURIA inscreve novo AWPER! Danil "molodoy" entra no lugar de Marcelo "Chelo" que vai para o banco! Confira -> [molodoy confirmado](https://x.com/FURIA/status/1910769948894572972?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1910769948894572972%7Ctwgr%5E6f88989f920d0401aa7b75cc53954d6893e28e83%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fdraft5.gg%2Fnoticia%2Fquem-e-molodoy-jogador-do-cazaquistao-e-novo-awper-da-furia).
`,
  '/jogos': `
📅 *Próximos Jogos:*

- PGL Astana: FURIA x TheMongolZ - 10/05/2025 - 05:00 BRT[Próximo Jogo] (https://www.hltv.org/matches/2382203/the-mongolz-vs-furia-pgl-astana-2025)
`,
  '/campeonato': `
🏆 *Próximo Campeonato:*

- PGL Astana 2025
📆 Início: 10/05/2025 - 16 times disputando o título 
📍 LAN (Global) - Confira tudo sobre o evento aqui -> [PGL Astana 2025](https://www.hltv.org/events/8045/pgl-astana-2025)
`,
  '/estatisticas': `
📊 *Estatísticas 2025:*

- [Fallen](https://www.hltv.org/player/2023/fallen): Rating 2.1 -> 0.93, Idade -> 33 anos, Função -> IGL 
- [molodoy](https://www.hltv.org/player/24144/molodoy): Rating 2.1 -> 1.24, Idade -> 20 anos, Função -> Awper
- [kSCERATO](https://www.hltv.org/player/15631/kscerato): Rating 2.1: 1.19, Idade -> 25 anos, Função -> Rifler
- [Yuurih](https://www.hltv.org/player/12553/yuurih): Rating 2.1: 1.11, Idade -> 25 anos, Função -> Rifler 
- [YEKINDAR](https://www.hltv.org/player/13915/yekindar): Rating 2.1: 1.13, Idade -> 25 anos, Função -> Rifler
`,
  '/feedback': (msg, chatId) => {
    bot.sendMessage(chatId, '📝 Nos envie seu feedback sobre a última partida ou qualquer sugestão para o time!');
    awaitingFeedback.add(chatId);
  }
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeMessage = `
🦅 *FURIA Chatbot* – Bem-vindo torcedor furioso!

🔥 Aqui é **onde a Nação FURIOSA se conecta**

🎮 *Última Partida:*  
FURIA 0 x 2 TheMongolZ – 09/04/2025  
📝 "Foi por pouco! A equipe mostrou garra, mas não conseguiu o empate no segundo mapa."
📊  Estatísticas da Partida aqui -> [Última Partida](https://www.hltv.org/matches/2381321/furia-vs-the-mongolz-pgl-bucharest-2025)
 
📢 *Nos siga nas redes sociais:*  
- [Instagram da FURIA](https://instagram.com/furiagg)  
- [Twitter/X da FURIA](https://x.com/furiagg)  
- [YouTube Oficial](https://www.youtube.com/@FURIAggCS)  
- [Loja Oficial 🛒](https://www.furia.gg/)

💬 Mande seu feedback ou explore os comandos abaixo:
`;

  bot.sendMessage(chatId, welcomeMessage, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🎮 Jogadores', callback_data: '/jogadores' },
          { text: '📰 Notícias', callback_data: '/noticias' }
        ],
        [
          { text: '📅 Jogos', callback_data: '/jogos' },
          { text: '🏆 Campeonato', callback_data: '/campeonato' }
        ],
        [
          { text: '📊 Estatísticas dos Jogadores', callback_data: '/estatisticas' },
          { text: '💬 Feedback', callback_data: '/feedback' }
        ]
      ]
    }
  });
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text.startsWith('/')) return; 

  if (awaitingFeedback.has(chatId)) {
    const feedback = `📩 Feedback de ${msg.from.first_name} (${chatId}):\n${text}\n---\n`;

    fs.appendFile('feedbacks.txt', feedback, (err) => {
      if (err) {
        console.error('Erro ao salvar feedback:', err);
        bot.sendMessage(chatId, '⚠️ Erro ao salvar seu feedback.');
      } else {
        bot.sendMessage(chatId, '✅ Obrigado! Seu feedback foi registrado.');
      }

      awaitingFeedback.delete(chatId);

      bot.sendMessage(chatId, '📌 Selecione outro comando:', {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🎮 Elenco', callback_data: '/jogadores' },
              { text: '📰 Notícias', callback_data: '/noticias' }
            ],
            [
              { text: '📅 Jogos', callback_data: '/jogos' },
              { text: '🏆 Campeonato', callback_data: '/campeonato' }
            ],
            [
              { text: '📊 Estatísticas', callback_data: '/estatisticas' },
              { text: '💬 Feedback', callback_data: '/feedback' }
            ]
          ]
        }
      });
    });
  }
});

// Handlers dos comandos por botão
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  // Verificar se o comando é um feedback
  if (data === '/feedback') {
    handlers['/feedback'](query.message, chatId);
    return; // Para não passar para os outros handlers
  }

  if (handlers[data]) {
    bot.sendMessage(chatId, handlers[data], { parse_mode: 'Markdown' });
  }
});
