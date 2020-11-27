import TronWeb from "tronweb"

const accounts = [
    {
        privateKey: "D19BE50FCCB230CAA5B74E74DD70DAC9488D9DA231642CB181FA8C278F54BD80",
        publicKey: "04ACDF95543AC3AE2AD3156E0C049BCD6594DEB7016183C615AF00A011227D68EB1FA9D28C063657981452F651CF273BFBE4F97F76FEA8DA285C3770C07E00EB80",
        address: {
            base58: "TQhmaTG2Msfr5P8y87A63hcAUsRWrtmNvM",
            hex: "41A19E6C9BA523A01AD23C5DE4895195DF34763B1D"
        }
    },
    {
        privateKey: "688DDD65F6A41A2C0DC5006B3FBF68604306E09CAD59AFD7A011472CCA9699CD",
        publicKey: "04BD0BBDE498C49167826AF55C1FFF3C347596AEB48C2082924FE7A258583A8E56723BDAE6A53A6A084327419A640F24F8EEBD53E4CF639E7CEE289988AAE03675",
        address: {
            base58: "TK9knCfyUyRWYMc1nE3pNyzNQUJwr3S1RD",
            hex: "4164B7D1A26D638FD6F7DF5A3F164D1F4AAB04EAB4"
        }
    }
]

const index = async () => {

    const options = {
        fullHost: "https://api.shasta.trongrid.io"
    }
    const nodes = new TronWeb(options)
    const state = await nodes.isConnected()
    const isConnected = !Object.values(state).includes(false)
    if (!isConnected) throw Error("[CONNECTION ERROR]: Fail to connect to Tron nodes")
    console.log("Connected to Tron nodes")

    const balance = await nodes.trx.getBalance(accounts[0].address.base58)
    console.log(`Balance: ${balance}`)

    const param = [
        accounts[1].address.base58, 10, accounts[0].address.base58, { permissionId: 2 }
    ]
    const transaction = await nodes.transactionBuilder.sendTrx(...param)
    const signedTransaction = await nodes.trx.sign(transaction, accounts[0].privateKey)
    console.log(signedTransaction.txID)

    const response = await nodes.trx.broadcast(signedTransaction)
    if(!response.result) throw Error("[TRANSFER ERROR]: Could not transfer TRX")
    console.log("Cha-Ching")
}

index()

/** [NOTES]: 
 * Account information: 
 * 1. Sender: https://shasta.tronscan.org/#/address/TQhmaTG2Msfr5P8y87A63hcAUsRWrtmNvM
 * 2. Receiver: https://shasta.tronscan.org/#/address/TK9knCfyUyRWYMc1nE3pNyzNQUJwr3S1RD
 */


