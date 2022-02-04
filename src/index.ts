// Libreries
import app from './app'
import database from './database'
import logo from './config/logo'
import message from './config/message';
;


//Init App
console.clear()
console.log('\x1b[36m', logo, '\x1b[0m')

//Starting Server
const port = app.get('port')
let sPort = port.toString()
app.listen(port, () => {
    // Server Status
    message('conn','       Server:',`http://localhost:${sPort}`)

    // Database Status
    database.once('open', () => {
        message('conn','     Database:','MongoDB Connected')
        message('finish')
        console.log('\n')
    })
    database.on('error', err => {
        message('err','     Database:', 'Could not connect')
        message('finish')
        console.log('\n')
        process.exit(0)
    })
}).on('error', (e) => {
    message('err','       Server:', e.message)
    message('finish')
 })