const msg = (type: string, key:string='', content: string='') => {
    if (type === 'conn') {
        return console.log('\x1b[90m', key, '\x1b[32m', content, '\x1b[90m')
    } else if (type === 'err') {
        return console.log('\x1b[90m', key, '\x1b[91m', content, '\x1b[90m')
    } else if (type === 'finish') {
        return console.log("\n\n               ", '\x1b[30m\x1b[100m', " Press Ctrl+C to finish ... ", '\x1b[0m')
    }
}

export default msg