export default {
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb+srv://api-movies:5hJ273WQGrZT9mn@cluster0.1v9de.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        USER: process.env.USER,
        PASSWORD: process.env.PASSWORD
    },
    jwtSecret: process.env.JWT_SECRET || 'someSecretCode'
}