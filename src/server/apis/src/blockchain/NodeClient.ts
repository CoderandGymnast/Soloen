import { stat } from "fs"
import { Synchronizer } from "src/worker/synchronizer.worker"
import TronWeb from "tronweb"
import { getRepository } from "typeorm"

const DEFAULT_ID = 1

export class NodeClient {

    readonly nodeClients: TronWeb

    constructor(
        private readonly options: NodeClient.Options,
    ) {
        this.nodeClients = new TronWeb(this.options)
        this.checkConnection()
    }

    private async checkConnection() {
        const state = await this.nodeClients.isConnected()
        const isConnected = !Object.entries(state).map(([node, status]) => {
            if(!status) console.log(`[WARNING]: Could not connect to '${node}'`)
            return status
        }).includes(false)
        if(!isConnected) throw Error("Could not connect to Tron nodes")
        console.log("[NOTIFICATION]: Established connection to Tron nodes")
    }

    async getCurrentBlock(): Promise<NodeClient.Block> {
        return await this.nodeClients.trx.getCurrentBlock()
    }

    async getSynchronizationProgress(): Promise<Synchronizer.Progress> {

        const repository = getRepository(Synchronizer.Progress)
        const progress = (await repository.find({ id: 1 }))[0]

        if (!progress) {
            const currentBlock = await this.getCurrentBlock()
            return { blockNumber: currentBlock.block_header.raw_data.number }
        }

        return {
            blockNumber: progress.blockNumber
        }
    }

    async getBlockRange(start: number, end: number): Promise<NodeClient.Block[]> {
        return await this.nodeClients.trx.getBlockRange(start, end)
    }

    async updateSynchronizationProgress(progress: Synchronizer.Progress) {
        const repository = getRepository(Synchronizer.Progress)
        return await repository.save({ id: DEFAULT_ID, blockNumber: progress.blockNumber })
    }
}

export namespace NodeClient {

    export class Options {
        fullHost: string
        eventServer: string
    }

    export class Block {
        blockID: string
        block_header: {
            raw_data: {
                number: number,
                txTrieRoot: string,
                witness_address: string,
                parentHash: string,
                version: number,
                timestamp: number
            },
            witness_signature: string
        }
        transactions: [
            {
                ret: any[],
                signature: any[],
                txID: string,
                raw_data: any[],
                raw_data_hex: string
            }
        ]
    }
}