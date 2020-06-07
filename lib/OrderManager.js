const IpfsManager = require("./IpfsManager")

class OrderManager extends IpfsManager {
    async add(buyer, seller, encryptedForBuyer, encryptedForSeller) {
        let order = {
            buyer,
            seller,
            encryptedForBuyer,
            encryptedForSeller,
        };
        this.prevCid = await this.ipfs.dag.put(order);
        return this.prevCid;
    }
}

module.exports = OrderManager