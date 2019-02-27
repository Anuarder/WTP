module.exports = {
    port: process.env.PORT || 8081,
    database_url: "mongodb://localhost/WTP",
    secret: process.env.SECRET ||'secret'
}