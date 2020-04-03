const log = {
    
    status: async (message) => {
        ts = new Date();
        console.log(`%c${ts.toLocaleTimeString()} ⚡ ${message}`, 'color: green;');
    },
    table: async (message) => {
        ts = new Date();
        console.table(`%c${message}`, 'color: green;')
    },
    line: async () => {
        console.log('%c----------------------------------------------------', 'color: green;');
    },
}
module.exports = log;