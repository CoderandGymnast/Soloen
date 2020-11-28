import TronWeb from "tronweb"
import { NodeClient } from "../../../server/apis/src/blockchain/nodeclient.blockchain"

const options = {
    fullHost: "https://api.shasta.trongrid.io", 
    eventServer: "https://api.shasta.trongrid.io"
}

const nodeClients = new TronWeb(options)

const main = async () => {
    const block = await nodeClients.trx.getCurrentBlock()
    console.log(block)
    const blocks = (await nodeClients.trx.getBlockRange(10124827, 10124828)) as NodeClient.Block[]
    for(let transaction of blocks[0].transactions) {
        for(let contract of transaction.raw_data.contract) {
            if(!(contract.type === "TransferContract")) continue
            console.log(contract)
        }
    }
}

main()


