module.exports = {
    name: 'presenceUpdate',
    once: true,
    async execute(client, newPresence) {
        console.log([newPresence]);
        console.log([client]);
    },
};
