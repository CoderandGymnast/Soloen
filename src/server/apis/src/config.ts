const config = {
    server: {
        port: process.env.SERVER_PORT || 3000,
        allowedHost: process.env.ALLOW_HOST || "localhost"
    },
    database: {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT) || 3307,
        name: process.env.DB_NAME || "soloen",
        type: process.env.DB_TYPE || "mysql",
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "",
        tables: {
            wallet: process.env.DB_TABLE_WALLET || "wallet",
            address: process.env.DB_TABLE_ADDRESS || "address",
            progress: process.env.DB_PROGRESS || "progress",
            contract: process.env.DB_CONTRACT || "contract",
            user: process.env.DB_USER || "user"
        }   
    },
    nodes: {
        fullHost: process.env.NODES_FULL_HOST || "https://api.shasta.trongrid.io",
        eventServer: process.env.NODES_EVENT_SERVER || "https://api.shasta.trongrid.io"
    }
}

export default config