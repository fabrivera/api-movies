export default {
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb+srv://new-db-mongo:6k58Z3g8pa9RwT3@cluster0.1v9de.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        USER: process.env.USER,
        PASSWORD: process.env.PASSWORD
    },
    jwtSecret: process.env.JWT_SECRET || 'someSecretCode'
}