const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('recruit')
        .setDescription('Recrutamento de novos players.'),
    async execute(client) {
        const reChannel = await client.channel.send('Teste');

        console.log(reChannel.id);
    },
};
