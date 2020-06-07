const IpfsManager = require("./IpfsManager")

class ItemManager extends IpfsManager {
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
        this.prevCid = await this.ipfs.dag.put(item);
        return this.prevCid;
    }
}
module.exports = ItemManager