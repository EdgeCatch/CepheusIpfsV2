class OrderManager {
    constructor(ipfs) {
        this.ipfs = ipfs;
    }

    async getByCid(cid) {
        return await this.ipfs.dag.get(cid);
    }

    async add(buyer, seller, encryptedForBuyer, encryptedForSeller) {
        let order = {
            buyer,
            seller,
            encryptedForBuyer,
            encryptedForSeller,
        };
        return await this.ipfs.dag.put(order);
    }
}

module.exports = OrderManager