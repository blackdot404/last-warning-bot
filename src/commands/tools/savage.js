const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const UserSavage = require('../../models/UserSavage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('savage')
        .setDescription('Comando para organizar a PT de Savage')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('config')
                .setDescription('Configurar a sala de texto da savage.')
                .addChannelOption((option) =>
                    option
                        .setName('sala-savage')
                        .setDescription('Insira a sala de savage.')
                        .setRequired(true),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('criar')
                .setDescription('Criar PT para savage.')
                .addStringOption((option) =>
                    option
                        .setName('emoji')
                        .setDescription('Insira o ID do emoji')
                        .setRequired(true),
                ),
        ),
    async execute(interaction) {
        const data = await UserSavage.findOne({
            where: { Guild: interaction.guild.id },
        });

        if (!data) return;
    },
};
