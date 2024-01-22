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
                        .setName('grupo')
                        .setDescription(
                            'Inserir um id para agrupar o sistema de tag',
                        )
                        .setRequired(true),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('rm')
                .setDescription('Remove emoji do sistema de reação.')
                .addStringOption((option) =>
                    option
                        .setName('emoji')
                        .setDescription('Insira o ID do emoji')
                        .setRequired(true),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('at')
                .setDescription(
                    'Ativa o sistema de reação de um grupo especifico.',
                )
                .addIntegerOption((option) =>
                    option
                        .setName('grupo')
                        .setDescription('Insira o grupo que deseja ativar')
                        .setRequired(true),
                ),
        ),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const idEmoji = interaction.options.getString('emoji');
        const idRole = interaction.options.getRole('cargo');
        const idGroup = interaction.options.getInteger('grupo');

        const userGuild = await UserGuild.findOne({
            attributes: ['Guild', 'ClassChannel'],
            where: { Guild: interaction.guild.id },
        });

        const userReact = await UserReacts.findOne({
            attributes: ['idEmoji'],
            where: { idEmoji: idEmoji },
        });

        const embedFailed = new EmbedBuilder()
            .setDescription(
                '🤖 Você ainda não configurou o bot, use o comando /config',
            )
            .setColor(10944512);

        if (!userGuild) {
            interaction.reply({
                embeds: [embedFailed],
            });
        }

        switch (subcommand) {
            case 'add':
                {
                    const embedFailed2 = new EmbedBuilder()
                        .setDescription(
                            '👎 Você está tentando inserir um Emoji que já está cadastrado.',
                        )
                        .setColor(10944512);
                    const embedSucess = new EmbedBuilder()
                        .setDescription(
                            '🌌 Emoji & Cargo cadastrado com sucesso!!',
                        )
                        .setColor(0x0099ff);
                    if (userReact) {
                        interaction.reply({
                            embeds: [embedFailed2],
                        });
                    }

                    await UserReacts.create({
                        idEmoji: idEmoji,
                        idRole: idRole,
                        idGroup: idGroup,
                        idGuild: userGuild.Guild,
                        idClassChannel: userGuild.ClassChannel,
                    })
                        .then(() => {
                            interaction.reply({
                                embeds: [embedSucess],
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            interaction.reply({
                                embeds: [embedFailed2],
                            });
                        });
                }
                break;
            case 'rm':
                {
                    const embedFailed2 = new EmbedBuilder()
                        .setDescription(
                            '👎 Esse emoji não está cadastrado no sistema.',
                        )
                        .setColor(10944512);
                    const embedSucess = new EmbedBuilder()
                        .setDescription('🧺 Emoji apagado com sucesso.')
                        .setColor(0x0099ff);

                    if (!userReact) {
                        interaction.reply({
                            embeds: [embedFailed2],
                        });
                    }

                    await UserReacts.destroy({
                        where: { idEmoji: idEmoji },
                    }).then(() => {
                        interaction.reply({
                            embeds: [embedSucess],
                        });
                    });
                }
                break;

            default:
                break;
        }
    },
};
