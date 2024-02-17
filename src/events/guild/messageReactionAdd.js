module.exports = {
    name: 'messageReactionAdd',
    once: true,
    async execute(messageReaction, user) {
        if (user.bot) return;
        // console.log(messageReaction._emoji.name, messageReaction._emoji.id);
    },
};
