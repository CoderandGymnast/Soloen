import { NodeClient } from "src/blockchain/nodeclient.blockchain";
import { Synchronizer } from "../synchronizer.worker";
import { EventEmitter } from "events"
import { Event } from "src/services/events/events";
import { AddressService } from "src/services/address.service";
import TronWeb from "tronweb"

const TRANSFER_CONTRACT = "TransferContract"

export class AddressTracker implements Synchronizer.Listener {

    private readonly trackedData: {
        hex: string,
        balance: string
    }[] = []

    private addresses: string[] = []

    constructor(
        private readonly channel: EventEmitter,
        private readonly addressService: AddressService
    ) {
    }

    async start() {
        this.addListener()
        await this.syncToDB()
        console.log("[TRACKER]: Address Tracker successfully started")
        console.log("[TRACKER]: Tracked addresses: ")
        console.log(this.addresses.map(address => TronWeb.address.fromHex(address)))
    }

    async syncToDB() {
        const addresses = await this.addressService.getAll()
        this.trackedData.push(...addresses.map(address => {
            return {
                hex: address.hex,
                balance: address.balance
            }
        }))
        this.addresses.push(...addresses.map(address => address.hex))
    }

    async process(block: NodeClient.Block) {

        const transactions = block.transactions
        if (!transactions) return

        for (let transaction of transactions) {
            await this.processTransaction(transaction)
        }
    }

    private addListener() {
        this.channel.on(Event.ADDRESS, hexAddress => {
            this.trackedData.push({
                hex: hexAddress,
                balance: "0"
            })
            this.addresses.push(hexAddress)
            console.log(`[TRACKER]: Address Tracker receives address: '${hexAddress}'`)
        })
    }

    private async processTransaction(transaction: NodeClient.Transaction) {
        for (let contract of transaction.raw_data.contract) {
            if (!this.isTransferContract(contract)) continue
            this.processContract(contract)
        }
    }

    private async processContract(contract: NodeClient.Contract) {
        const ownerAddress = contract.parameter.value.owner_address.toUpperCase()
        const toAddress = contract.parameter.value.to_address.toUpperCase()
        if (this.addresses.includes(ownerAddress)) {
            const index = this.trackedData.findIndex(address => address.hex === ownerAddress)
            if (index === -1) {
                console.log("[WARNING]: 2 address lists at Address Tracker are not match")
                return
            }
            this.trackedData[index].balance = (parseInt(this.trackedData[index].balance) - contract.parameter.value.amount).toString()
            await this.addressService.updateBalance(this.trackedData[index].hex, this.trackedData[index].balance)
            console.log(`[TRACKER]: Address '${TronWeb.address.fromHex(ownerAddress)}' sends '${contract.parameter.value.amount}' SUNs`)
        } else if (this.addresses.includes(toAddress)) {
            const index = this.trackedData.findIndex(address => address.hex === toAddress)
            if (index === -1) {
                console.log("[WARNING]: 2 address lists at Address Tracker are not match")
                return
            }
            this.trackedData[index].balance = (parseInt(this.trackedData[index].balance) + contract.parameter.value.amount).toString()
            await this.addressService.updateBalance(this.trackedData[index].hex, this.trackedData[index].balance)
            console.log(`[TRACKER]: Address '${TronWeb.address.fromHex(toAddress)}' receives '${contract.parameter.value.amount}' SUNs`)
        }
    }

    private isTransferContract(contract: NodeClient.Contract) {
        return contract.type === TRANSFER_CONTRACT ? true : false
    }
}