import { Controller } from "@nestjs/common";
import { NodeClient } from "src/blockchain/NodeClient";
import config from "src/config";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

const MAX_BLOCK_RANGE = 100
const SLEEP_INTERVAL = 100

export class Synchronizer {

    private readonly trackedData = {
        systemBlockNumber: 0,
        unprocessedBlocks: [],
        hasServerStarted: false
    }

    constructor(
        private readonly nodeClient: NodeClient,
        private readonly listeners: Synchronizer.Listener[]
    ) { }

    async start() {
        console.log("[NOTIFICATION]: Synchronizer is processing...")
        await this.init()
        this.process()
    }

    private async init() {
        const progress = await this.nodeClient.getSynchronizationProgress()
        this.trackedData.systemBlockNumber = progress.blockNumber
        const currentBlock = await this.nodeClient.getCurrentBlock()
        const currentBlockNumber = currentBlock.block_header.raw_data.number
        if (progress.blockNumber > currentBlockNumber) throw new Error(`(nonsense data):  System Block number '${progress.blockNumber}' - Latest Block number: '${currentBlockNumber}'`)
        else if (progress.blockNumber < currentBlockNumber) {
            this.trackedData.unprocessedBlocks = await this.nodeClient.getBlockRange(progress.blockNumber + 1, progress.blockNumber + MAX_BLOCK_RANGE - 1)
        } else {
            this.notify()
        }
    }

    private async process() {
        while (true) {

            if (this.trackedData.unprocessedBlocks.length) this.patch()

            const currentBlock = await this.nodeClient.getCurrentBlock()
            const currentBlockNumber = currentBlock.block_header.raw_data.number
            const systemBlockNumber = this.trackedData.systemBlockNumber

            if (systemBlockNumber > currentBlockNumber) {
                throw new Error(`(nonsense data):  System Block number '${systemBlockNumber}' - Latest Block number: '${currentBlockNumber}'`)
            } else if (systemBlockNumber === currentBlockNumber) {
                this.notify()
                await this.sleep()
                continue
            } else if (currentBlockNumber - systemBlockNumber > 1) {
                this.trackedData.unprocessedBlocks = await this.nodeClient.getBlockRange(systemBlockNumber + 1, systemBlockNumber + MAX_BLOCK_RANGE - 1)
                continue
            } else {
                await this.processBlock(currentBlock)
            }
        }
    }

    private async sleep() {
        return new Promise(resolve => setTimeout(() => {
            resolve(1)
        }, SLEEP_INTERVAL))
    }

    private async emit(block: NodeClient.Block) {
        const listenerPromises = this.listeners.map(listener => listener.process(block))
        if (!listenerPromises.length) return
        return await Promise.all(listenerPromises)
    }

    private async patch() {
        for (let block of this.trackedData.unprocessedBlocks) {
            await this.processBlock(block)
        }
        this.trackedData.unprocessedBlocks = []
    }

    private async processBlock(block: NodeClient.Block) {
        await this.emit(block)
        const blockNumber = block.block_header.raw_data.number
        await this.nodeClient.updateSynchronizationProgress({ blockNumber })
        this.trackedData.systemBlockNumber = blockNumber
    }

    private notify() {
        if (!this.trackedData.hasServerStarted) {
            console.log("[NOTIFICATION]: Soloen system has been synchronized with the Tron Blockchain")
            this.trackedData.hasServerStarted = true
        }
    }
}

export namespace Synchronizer {

    export interface Listener {
        process(block: NodeClient.Block): Promise<void>
    }

    @Entity({ name: config.database.tables.progress })
    export class Progress {
        @PrimaryGeneratedColumn()
        id?: number

        @Column()
        blockNumber: number
    }
}