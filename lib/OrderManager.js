const crypto = require('crypto');

class OrderManager {
    constructor(ipfs) {
        this.ipfs = ipfs;
    }

    static decrypt(privateKey, encryptedString) {
        let decryptedBuffer = crypto.privateDecrypt(privateKey, Buffer.from(encryptedString, "hex"));
        return JSON.parse(decryptedBuffer.toString())
    }

    static encrypt(publicKey, object) {
        let buffer = Buffer.from(JSON.stringify(object));
        return crypto.publicEncrypt(publicKey, buffer).toString("hex");
    }
    async getByCid(cid) {
        return await this.ipfs.dag.get(cid);
    }

    async add(buyer, seller, name, phone, postOffice, buyerPublicKey, sellerPublicKey) {
        let orderInfo = { name, phone, postOffice };
        let encryptedForBuyer = OrderManager.encrypt(orderInfo, buyerPublicKey);
        let encryptedForSeller = OrderManager.encrypt(orderInfo, sellerPublicKey);
        let order = {
            buyer,
            seller,
            encryptedForBuyer,
            encryptedForSeller
        };
        return await this.ipfs.dag.put(order);
    }
}

module.exports = OrderManager