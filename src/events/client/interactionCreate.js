module.exports = {
    name: 'interactionCreate',
    once: true,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.log(error);
                await interaction.reply({
                    content:
                        'Houve um problema para executar o comando, fale com um administrador.',
                    ephemeral: true,
                });
            }
        }
    },
};
