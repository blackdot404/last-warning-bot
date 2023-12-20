const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands');

        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith('.js'));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(
                    `[COMANDOS]: efetuado a leitura do ${command.data.name} com sucesso.`,
                );
            }
        }
        const clientId = '1175807146324144180';
        const guildId = '861781344552091658';

        const rest = new REST({ version: '10' }).setToken(
            process.env.BOT_TOKEN,
        );

        try {
            console.log(
                'Importando comandos (/) da aplicação para o servidor Discord.',
            );
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: client.commandArray,
            });

            console.log(client.commandArray);

            console.log(
                'Importação dos comandos (/) da aplicação efetuada com sucesso.',
            );
        } catch (error) {
            console.error(error);
        }
    };
};
