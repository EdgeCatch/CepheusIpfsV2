const cryptico = require('cryptico');

class OrderManager {
    constructor(ipfs) {
        this.ipfs = ipfs;
    }

    static decrypt(privateKey, encryptedString) {
        let decryptesString = cryptico.decrypt(encryptedString, privateKey).plaintext;
        return JSON.parse(decryptesString)
    }

    static encrypt(publicKey, object) {
        let buffer = JSON.stringify(object);
        return cryptico.encrypt(buffer, publicKey).cipher;
    }
    async getByCid(cid) {
        return await this.ipfs.dag.get(cid);
    }

    async add(buyer, seller, name, phone, postOffice, buyerPublicKey, sellerPublicKey) {
        let orderInfo = { name, phone, postOffice };
        let encryptedForBuyer = OrderManager.encrypt(buyerPublicKey, orderInfo);
        let encryptedForSeller = OrderManager.encrypt(sellerPublicKey, orderInfo);
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