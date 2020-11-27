const config = {
    server: {
        port: process.env.SERVER_PORT || 3000,
        allowedHost: process.env.ALLOW_HOST || "localhost"
    },
    database: {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT) || 3306,
        name: process.env.DB_NAME || "soloen",
        type: process.env.DB_TYPE || "mysql",
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "",
        tables: {
            wallet: process.env.DB_TABLE_WALLET || "wallet",
            address: process.env.DB_TABLE_ADDRESS || "address",
        }   
    }
}

export default config