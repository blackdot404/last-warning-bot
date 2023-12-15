require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const sequelize = require('./database/connection');

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith('.js'));

    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

client.handleEvents();
client.handleCommands();
client.login(process.env.BOT_TOKEN);
(async () => {
    await sequelize
        .sync({})
        .then(() =>
            console.log('[DATABASE] CONEXÃO COM BANCO DE DADOS EFETUADA.'),
        )
        .catch((error) => console.log(`[DATABASE] Error: ${error}`));
})();
