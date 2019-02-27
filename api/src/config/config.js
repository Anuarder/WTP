module.exports = {
    port: process.env.PORT || 8081,
    database_url: "mongodb://localhost/DL",
    secret: process.env.SECRET ||'secret'
}