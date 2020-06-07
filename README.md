# Prerequirements

Install `go-ipfs` (for MacOS):

```
wget https://dist.ipfs.io/go-ipfs/v0.5.1/go-ipfs_v0.5.1_darwin-amd64.tar.gz
tar -xvzf go-ipfs_v0.5.1_darwin-amd64.tar.gz
bash install.sh
```
If use another OS follow [official docs](https://docs.ipfs.io/recent-releases/go-ipfs-0-5/install).

Run node locally:
```
ipfs daemon --enable-pubsub-experiment
```
If it is successful the daemon output will be:
```
Swarm listening on /ip4/127.0.0.1/tcp/4001
Swarm listening on /ip4/192.168.0.102/tcp/4001
Swarm listening on /ip6/::1/tcp/4001
Swarm listening on /p2p-circuit
Swarm announcing /ip4/127.0.0.1/tcp/4001
Swarm announcing /ip4/192.168.0.102/tcp/4001
Swarm announcing /ip6/::1/tcp/4001
API server listening on /ip4/127.0.0.1/tcp/5001
WebUI: http://127.0.0.1:5001/webui
Gateway (readonly) server listening on /ip4/127.0.0.1/tcp/8080
Daemon is ready
```

Allow operations for API:
```
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
```
If it is run not locally, the following configurations should be added:
```
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin  '["http://other_host"]'
```
Now the client can connect to the remote node instead of running own node.

# Dependencies

Install dependencies:

```
npm i
```

# Usage

`lib/` contains classes:
- IpfsManager - general manager of IPFS instances; 
- ItemManager - Item instance manager;
- OrderManager - Order instance manager.

The IpfsManager support following API:

### constructor(ipfs, prevCid)
- `ipfs` - instance of `ipfs-http-client` connected to the remote node;
- `prevCid` - cid of the last known record in items or order list.

### getAll()
Returns list of all records.

The `ItemManager` inherits `IpfsManager`:
```
add(seller, name, price, category, type, count, size, colour, images)
Returns new cid of list.
```

The `OrderManager` inherits `IpfsManager`:
```
add(buyer, seller, encryptedForBuyer, encryptedForSeller)
Returns new cid of list.
```

# Known issues

As soon as `IPFS` uses routing by content and its hard to group it properly. The way we use is called linked list where every new entry points to the previous one.

In this concept the whole entries list will be retrieved by the cid of last added entry. It makes client to update the last known head of the list before adding new one. It can cause conflicts if users wants to add the item simultaneously.

The head of list is stored in contracts and is updated when new item is registered in blockchain. On one hand, it allows to ignore all added items, that are not added to contract, on the other hand, it can cause some problems if someone will added the wrong head.

We are looking for the better architecture solution.

# TODO:
- add encoder/decoder for order information for seller and buyer;
- implement get filters;
- connect to contracts to fetch cid;
- implement update cid method.