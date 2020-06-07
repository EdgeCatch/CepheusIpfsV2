const ipfsClient = require("ipfs-http-client");
const ItemManager = require("./lib/ItemManager");
const OrderManager = require("./lib/OrderManager");
const nodeUrl = "/ip4/127.0.0.1/tcp/5001";
const crypto = require('crypto');

let main = async () => {
    try {
        let ipfs = ipfsClient(nodeUrl);
        await ipfs.id();
        let marketContractAddress = "KT1N5h4c7kZ85DDjrYGqv6xmQRwufG2x2c5c";
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        })
        let encr = OrderManager.encrypt(publicKey, { name: "name", phone: "phone", post: "post" })
        console.log(encr);
        let decr = OrderManager.decrypt(privateKey, encr);
        console.log(decr);


        // let itemManager = await ItemManager.createInstance(ipfs, marketContractAddress);
        // let orderManager = new OrderManager(ipfs);
        // await itemManager.add(
        //     "seller",
        //     "name",
        //     "price",
        //     "category",
        //     "type",
        //     "count",
        //     "size",
        //     "colour",
        //     [("image", "image")]);
        // let cid = await orderManager.add(
        //     "orderId",
        //     "dfda83b95889",
        //     "34e842d6b8fd",
        //     "zdpuB2oe6QpcftiJvAJkEJy4giHTkcivvURDUz14UdgxnVZc2",
        //     "zdpuAzZissX6KVNymgHsF5S8jtn79P3tEjTbc9A3eQp9JFAHh"
        // );
        // console.log(await orderManager.getByCid(cid));
        // console.log(await itemManager.getAll());
    } catch (e) {
        console.log(e);
    }
};

main().then(() => console.log("Done!"));