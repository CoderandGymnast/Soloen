import TronWeb from "tronweb"

const accounts = [
    {
        privateKey: "D19BE50FCCB230CAA5B74E74DD70DAC9488D9DA231642CB181FA8C278F54BD80",
        publicKey: "04ACDF95543AC3AE2AD3156E0C049BCD6594DEB7016183C615AF00A011227D68EB1FA9D28C063657981452F651CF273BFBE4F97F76FEA8DA285C3770C07E00EB80",
        address: {
            base58: "TQhmaTG2Msfr5P8y87A63hcAUsRWrtmNvM",
            hex: "41A19E6C9BA523A01AD23C5DE4895195DF34763B1D"
        }
    }
]

describe("TronWeb", () => {
    it("should connect to the Tron nodes", async () => {

        const options = {
            fullHost: "https://api.shasta.trongrid.io"
        }
        const nodes = new TronWeb(options)
        const state = await nodes.isConnected()
        console.log(state)
    })
})

describe("TronWeb.trx", () => {
    it("should display the account information", async() => {
        const options = {
            fullHost: "https://api.shasta.trongrid.io"
        }
        const nodes = new TronWeb(options)
        const balance = await nodes.trx.getBalance(accounts[0].address.base58)
        expect(balance).toBeGreaterThanOrEqual(0)
    })
})

/** [NOTES]
 * 1. Tron Testnet Faucet: https://www.trongrid.io/shasta/.
 * 2. Account information: https://shasta.tronscan.org/#/address/TQhmaTG2Msfr5P8y87A63hcAUsRWrtmNvM.
 */

