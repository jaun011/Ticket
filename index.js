const { GatewayIntentBits, Client, Collection, ChannelType, EmbedBuilder, Partials } = require("discord.js")
const { AtivarIntents } = require("./Functions/StartIntents");
const express = require("express");
const app = express();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        Object.keys(GatewayIntentBits),
    ],
    partials: [ Object.keys(Partials) ]
});

const estatisticasStormInstance = require("./Functions/VariaveisEstatisticas");
const EstatisticasStorm = new estatisticasStormInstance();
module.exports = { EstatisticasStorm }

AtivarIntents()

const config = require("./config.json");
const events = require('./Handler/events')
const slash = require('./Handler/slash');

slash.run(client)
events.run(client)

client.slashCommands = new Collection();

client.on('guildCreate', guild => {


    if (client.guilds.cache.size > 1) {
        guild.leave()
    }

})

 process.on('unhandRejection', (reason, promise) => {
 });
 process.on('uncaughtException', (error, origin) => {
 });
 process.on('uncaughtExceptionMonitor', (error, origin) => {
 });

 const login = require("./routes/login");
 app.use("/", login);
 
 const callback = require("./routes/callback");
 app.use("/", callback);
 
 try {
   app.listen({
     host: "0.0.0.0",
     port: process.env.PORT ? Number(process.env.PORT) : 8080
   });
 } finally {
 }

 client.on("messageCreate", async (message) => {
  if (message.channel.id === '1250189297991028817') { // ID CANAIS
    message.react("<:aliensale:1313708195964784640>") // EMOJI PARA REAGIR
  }
})

client.on("ready", async () => {
  const activities = [
   {
      name: `Fui desenvolvido pelo @Kayzer.7`,
      type: 4, // Listening
      url: 'https://discord.gg/gCeJp6Ecmj'
    },
  ];
  
  let i = 0;
  setInterval(() => {
    if (i >= activities.length) i = 0;
    client.user.setActivity(activities[i]);
    i++;
  }, 5 * 1000 ); 
});

client.login(config.token);

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "faq") {
      const messageContent = `<:aliensale:1313708195964784640> Sua verificação é essencial para reforçar a segurança do servidor e manter nossa comunidade protegida.\n<:flay_ponto:1250189271160062032> Além disso, em casos raros de queda do servidor, a verificação nos permite trazê-lo de volta rapidamente para que você não perca nenhum momento importante.\n<:flay_ponto:1250189271160062032> Isso também ajuda a evitar contas falsas.`;

      interaction.reply({
        content: messageContent,
        components: [
          {
            type: 1, // ActionRow
            components: [
              {
                type: 2, // Button
                style: 5, // Success style
                label: "Verificar-se",
                url: `https://discord.com/oauth2/authorize?client_id=1241397849195810846&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join+email&state=1250189025189298226`
              }
            ]
          }
        ],
        ephemeral: true
      });
    }
  }
});
