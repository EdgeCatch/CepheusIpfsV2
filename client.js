const ipfsClient = require("ipfs-http-client");
const ItemManager = require("./lib/ItemManager");
const OrderManager = require("./lib/OrderManager");
const nodeUrl = "/ip4/127.0.0.1/tcp/5001";
const cryptico = require('cryptico');

let main = async () => {
    try {

        var privateKey = cryptico.generateRSAKey("", 2048);
        var publicKey = cryptico.publicKeyString(privateKey);

        let ipfs = ipfsClient(nodeUrl);
        await ipfs.id();
        let marketContractAddress = "KT1N5h4c7kZ85DDjrYGqv6xmQRwufG2x2c5c";
        let itemManager = await ItemManager.createInstance(ipfs, marketContractAddress);
        let orderManager = new OrderManager(ipfs);
        await itemManager.add(
            "seller",
            "name",
            "price",
            "category",
            "type",
            "count",
            "size",
            "colour",
            [("image", "image")]);
        let cid = await orderManager.add(
            "dfda83b95889",
            "34e842d6b8fd",
            "name",
            "phone",
            "postOffice",
            publicKey,
            publicKey
        );
        console.log(await orderManager.getByCid(cid));
        console.log(await itemManager.getAll());
    } catch (e) {
        console.log(e);
    }
};

main().then(() => console.log("Done!"));