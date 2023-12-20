const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const UserGuild = require('../../models/UserGuild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Configura algumas informações basicas para o bot.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption((option) =>
            option
                .setName('canal-boasvindas')
                .setDescription('Canal de mensagem de boas vidas.')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName('mensagem')
                .setDescription('Seta a mensagem de boas vindas.')
                .setRequired(true),
        )
        .addRoleOption((option) =>
            option
                .setName('cargo')
                .setDescription(
                    'Seta o cargo que o usuario irá receber quando concordar com as regras.',
                )
                .setRequired(true),
        )
        .addChannelOption((option) =>
            option
                .setName('canal-regras')
                .setDescription('Canal com as regras do servidor.')
                .setRequired(true),
        ),
    async execute(interaction) {
        const { options } = interaction;
        const Channel = options.getChannel('canal-boasvindas');
        const Msg = options.getString('mensagem');
        const Role = options.getRole('cargo');
        const RoleChannel = options.getChannel('canal-regras');

        if (
            !interaction.guild.members.me.permissions.has(
                PermissionFlagsBits.SendMessages,
            )
        ) {
            interaction.reply({
                content:
                    'Você não possui a permissão necessaria para esse procedimento.🤫',
                ephemeral: true,
            });
        }

        const data = await UserGuild.findOne({
            where: { Guild: interaction.guild.id },
        });
        if (!data) {
            await UserGuild.create({
                Guild: interaction.guild.id,
                Channel: Channel.id,
                RoleChannel: RoleChannel.id,
                Msg: Msg,
                Role: Role.id,
            });
        } else {
            await UserGuild.update(
                {
                    Channel: Channel.id,
                    RoleChannel: RoleChannel.id,
                    Msg: Msg,
                    Role: Role.id,
                },
                { where: { Guild: interaction.guild.id } },
            );
        }
        interaction.reply({
            content: 'Configuração inicial efetuada!! 🥰',
            ephemeral: true,
        });
    },
};
