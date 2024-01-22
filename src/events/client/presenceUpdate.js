module.exports = {
    name: 'presenceUpdate',
    once: true,
    async execute(oldPresence, newPresence) {
        console.log([oldPresence]);
        console.log([newPresence]);
    },
};
