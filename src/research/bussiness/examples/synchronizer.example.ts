import TronWeb from "tronweb"

const options = {
    fullHost: "https://api.shasta.trongrid.io", 
    eventServer: "https://api.shasta.trongrid.io"
}

const nodeClients = new TronWeb(options)

const main = async () => {
    const block = await nodeClients.trx.getCurrentBlock()
    console.log(block)
    const blocks = await nodeClients.trx.getBlockRange(10, 11)
    blocks.forEach(block => {
        console.log(block)
    });
}

main()


