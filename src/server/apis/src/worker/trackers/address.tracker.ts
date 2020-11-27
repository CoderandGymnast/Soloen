import { NodeClient } from "src/blockchain/NodeClient";
import { Synchronizer } from "../synchronizer.worker";

export class AddressTracker implements Synchronizer.Listener{
    async process(block: NodeClient.Block) {
        console.log(`[ADDRESS TRACKER]: process block '${block.block_header.raw_data.number}'`)
    }
}