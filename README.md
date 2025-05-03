
  <h1>FURIA Chatbot</h1>

  <img src="https://gamepedia.cursecdn.com/fortnite_esports_gamepedia_en/e/e4/FURIA_Esportslogo_square.png" alt="Logo da FURIA" width="200" />

  <p>O <strong>FURIA Chatbot</strong> é uma aplicação de Telegram criada para interagir com os fãs da FURIACS, oferecendo informações sobre partidas, elenco, notícias, estatísticas dos jogadores, e muito mais. Além disso, ele permite que os torcedores enviem feedbacks sobre as últimas partidas.</p>

  <h2>Funcionalidades</h2>
    <ul>
        <li><strong>/start</strong>: Exibe uma mensagem de boas-vindas e oferece acesso aos comandos principais.</li>
        <li><strong>/elenco</strong>: Exibe a lista de jogadores do time FURIA.</li>
        <li><strong>/noticias</strong>: Mostra as últimas notícias relacionadas à FURIA.</li>
        <li><strong>/jogos</strong>: Exibe a programação dos próximos jogos da FURIA.</li>
        <li><strong>/campeonato</strong>: Informa sobre o próximo campeonato em que a FURIA estará competindo.</li>
        <li><strong>/estatisticas</strong>: Exibe as estatísticas dos jogadores da FURIA.</li>
        <li><strong>/feedback</strong>: Permite ao usuário enviar seu feedback sobre a última partida ou sugestões para o time.</li>
    </ul>

  <h2>Tecnologias Usadas</h2>
    <ul>
        <li><a href="https://nodejs.org/en/" target="_blank">Node.js</a> - Ambiente de execução JavaScript.</li>
        <li><a href="https://github.com/yagop/node-telegram-bot-api" target="_blank">node-telegram-bot-api</a> - Biblioteca para interação com o Telegram.</li>
        <li><a href="https://www.npmjs.com/package/dotenv" target="_blank">dotenv</a> - Para carregar variáveis de ambiente de um arquivo .env.</li>
    </ul>

  <h2>Configuração</h2>
    <ol>
        <li><strong>Clone o repositório:</strong>
            <pre><code>git clone https://github.com/seu-usuario/furia-chatbot.git
cd furia-chatbot</code></pre>
        </li>
        <li><strong>Instale as dependências:</strong>
            <pre><code>npm install</code></pre>
        </li>
        <li><strong>Configure o arquivo <code>.env</code>:</strong>
            <p>Crie um arquivo <code>.env</code> na raiz do projeto e adicione o token do seu bot do Telegram:</p>
            <pre><code>BOT_TOKEN=seu_token_aqui</code></pre>
            <p><strong>Nota:</strong> Para obter um token para o bot, crie um novo bot no <a href="https://core.telegram.org/bots#botfather" target="_blank">BotFather</a> no Telegram.</p>
        </li>
        <li><strong>Execute o bot:</strong>
            <pre><code>node index.js</code></pre>
            <p>O bot começará a funcionar, e você poderá interagir com ele no Telegram!</p>
        </li>
    </ol>

  <h2>Contribuição</h2>
    <p>Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novos recursos!</p>
    <h3>Como contribuir:</h3>
    <ol>
        <li>Fork este repositório.</li>
        <li>Crie uma nova branch para sua feature (<code>git checkout -b feature/nova-feature</code>).</li>
        <li>Faça commit das suas mudanças (<code>git commit -am 'Add new feature'</code>).</li>
        <li>Push para a branch (<code>git push origin feature/nova-feature</code>).</li>
        <li>Crie um Pull Request.</li>
    </ol>

</body>
</html>
