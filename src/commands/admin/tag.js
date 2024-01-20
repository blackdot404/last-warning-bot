const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
} = require('discord.js');
const UserReacts = require('../../models/UserReacts');
const UserGuild = require('../../models/UserGuild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tag')
        .setDescription('Configura o sistema de cargo do bot.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addSubcommand((subcommand) =>
            subcommand
                .setName('add')
                .setDescription('Adiciona emoji ao sistema de reação.')
                .addStringOption((option) =>
                    option
                        .setName('emoji')
                        .setDescription('Insira o ID do emoji')
                        .setRequired(true),
                )
                .addRoleOption((option) =>
                    option
                        .setName('cargo')
                        .setDescription(
                            'Insira o cargo que irá receber esse emoji',
                        )
                        .setRequired(true),
                )
                .addIntegerOption((option) =>
                    option
                        .setName('id-grupo')
                        .setDescription(
                            'Inserir um id para agrupar o sistema de tag',
                        )
                        .setRequired(true),
                ),
        ),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand;
        const idEmoji = options.getString('id-emoji');
        const idRole = options.getRole('id-cargo');

        const userGuild = await UserGuild.findOne({
            Guild: interaction.guild.id,
        });
        const userReact = await UserReacts.findOne({ idEmoji: idEmoji });

        const embedFailed = new EmbedBuilder()
            .setDescription(
                '🤖 Você ainda não configurou o bot, use o comando /config',
            )
            .setColor(10944512);

        const embedFailed2 = new EmbedBuilder()
            .setDescription(
                '👎 Você está tentando inserir um Emoji que já está cadastrado.',
            )
            .setColor(10944512);

        const embedSucess = new EmbedBuilder()
            .setDescription('🌌 Emoji & Cargo cadastrado com sucesso!!')
            .setColor(0x0099ff);

        if (!userGuild) {
            interaction.reply({
                embeds: [embedFailed],
            });
        } else if (userReact) {
            interaction.reply({
                embeds: [embedFailed2],
            });
        }

        if (!userReact) {
        }
    },
};
