const { EmbedBuilder } = require('discord.js');
const UserGuild = require('../../models/UserGuild');

module.exports = {
    name: 'guildMemberAdd',
    once: true,
    async execute(user, guild, client) {
        /*
            'user' representa o usuario acessando a servidor discord
            'guild' representa o servidor discord
            'client' representa o bot discord
        */
        const data = await UserGuild.findOne({ Guild: client.guild.id });
        if (!data) return;
        const channel = data.Channel;
        const roleChannel = data.RoleChannel;
        const msg = data.Msg;

        const welcomeChannel = await guild.channels.cache.get(channel);

        const welcomeEmbed = new EmbedBuilder()
            .setTitle(':mega: Bem vindo(a) :mega:')
            .setDescription(
                `**${user.username}**, bem-vindo(a) ao servidor **${guild.name}**!
                \nUma palavra rápida do chefe da guilda: **${msg}**
                \nAtualmente estamos com **${guild.memberCount} membros**.
                \nNão esqueça de ler as <#${roleChannel}>
                \n`,
            )
            .setColor(16312092)
            .setFooter({
                text: client.user.username,
                iconURL: client.user.displayAvatarURL(),
            })
            .setTimestamp()
            .setThumbnail(user.displayAvatarURL());

        welcomeChannel.send({ embeds: [welcomeEmbed] });
    },
};
