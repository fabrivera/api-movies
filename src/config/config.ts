export default {
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/apimovies',
        USER: process.env.USER,
        PASSWORD: process.env.PASSWORD
    },
    jwtSecret: process.env.JWT_SECRET || 'someSecretCode'
}