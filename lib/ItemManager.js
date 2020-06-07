const { TezosToolkit } = require("@taquito/taquito");

class ItemManager {
    constructor(ipfs, marketContract, prevCid) {
        this.ipfs = ipfs;
        this.marketContract = marketContract;
        this.prevCid = prevCid;
    }

    static async createInstance(ipfs, marketContractAddress, provider = "https://api.tez.ie/rpc/carthagenet") {
        let Tezos = new TezosToolkit();
        await Tezos.setProvider({ rpc: provider });
        let marketContract = await Tezos.contract.at(marketContractAddress);
        const storage = await marketContract.storage();
        return new ItemManager(ipfs, marketContract, storage.items_db);
    }

    async traverse(cid) {
        const result = [];
        while (cid) {
            const current = await this.ipfs.dag.get(cid);
            result.push(current);
            const prev = current.value.prev;
            if (prev) {
                cid = prev;
            } else {
                return result;
            }
        }
    }

    async updatePrevCid() {
        const storage = await this.marketContract.storage();
        this.prevCid = storage.items_db;
    }

    async getAll() {
        await this.updatePrevCid();
        return await this.traverse(this.prevCid);
    }

    async getByCid(cid) {
        return await this.ipfs.dag.get(cid);
    }

    async add(
        seller,
        name,
        price,
        category,
        type,
        count,
        size,
        colour,
        images
    ) {
        await this.updatePrevCid();
        let item = {
            seller,
            name,
            price,
            category,
            type,
            count,
            size,
            colour,
            images,
            prev: this.prevCid
        };
        await this.updatePrevCid();
        this.prevCid = await this.ipfs.dag.put(item);
        return this.prevCid;
    }
}
module.exports = ItemManager