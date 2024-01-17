const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('teste')
        .setDescription('Teste in test'),
    async execute(client) {
        const reChannel = await client.channel.send('Teste');

        console.log(reChannel.id);
    },
};
