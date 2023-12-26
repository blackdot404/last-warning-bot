const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
} = require('discord.js');
const UserReacts = require('../../models/UserReacts');
const UserGuild = require('../../models/UserGuild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tag-cargos')
        .setDescription('Configura algumas informações basicas para o bot.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) =>
            option
                .setName('id-emoji')
                .setDescription(
                    'ID do Emoji que será inserido no canal de Classes.',
                )
                .setRequired(true),
        )
        .addRoleOption((option) =>
            option
                .setName('id-cargo')
                .setDescription(
                    'ID do cargo que irá receber quem reagir com esse Emoji.',
                )
                .setRequired(true),
        ),
    async execute(interaction) {
        const { options } = interaction;
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
