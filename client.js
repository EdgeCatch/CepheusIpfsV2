const ipfsClient = require("ipfs-http-client");
const ItemManager = require("./lib/ItemManager");
const OrderManager = require("./lib/OrderManager");
const nodeUrl = "/ip4/127.0.0.1/tcp/5001";
const itemsCid = "bafyreiggcejixnw5wo3gesymhbcwfo7p6yrro2u2se4fcsxikwiexk2efm";
const ordersCid = "bafyreigxfjbkrvk3ifdhfxbjrswkt2rlqbdt2od55oinhd5jtsocccxpby";

let main = async () => {
    try {
        let ipfs = ipfsClient(nodeUrl);
        await ipfs.id();

        let itemManager = new ItemManager(ipfs, itemsCid);
        let orderManager = new OrderManager(ipfs, ordersCid);
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
        await orderManager.add(
            "orderId",
            "dfda83b95889",
            "34e842d6b8fd",
            "zdpuB2oe6QpcftiJvAJkEJy4giHTkcivvURDUz14UdgxnVZc2",
            "zdpuAzZissX6KVNymgHsF5S8jtn79P3tEjTbc9A3eQp9JFAHh"
        );
        console.log(await orderManager.getAll());
        console.log(await itemManager.getAll());
    } catch (e) {
        console.log(e);
    }
};

main().then(() => console.log("Done!"));