// import bitcoin from 'react-native-bitcoinjs-lib';
//
// it('can create a [complex] Transaction', function (done) {
//   this.timeout(30000)
//
//   var network = bitcoin.networks.testnet;
//   var alice = bitcoin.ECPair.makeRandom({ network: network });
//   var bob = bitcoin.ECPair.makeRandom({ network: network });
//   var alicesAddress = alice.getAddress();
//   var bobsAddress = bob.getAddress();
//
//   blockchain.t.faucetMany([
//     {
//       address: alicesAddress,
//       value: 4e4
//     },
//     {
//       address: bobsAddress,
//       value: 2e4
//     }
//   ], function (err, unspents) {
//     if (err) return done(err)
//
//     var tx = new bitcoin.TransactionBuilder(network);
//     tx.addInput(unspents[0].txId, unspents[0].vout);
//     tx.addInput(unspents[1].txId, unspents[1].vout);
//     tx.addOutput(blockchain.t.RETURN, 3e4);
//     tx.addOutput('mvGVHWi6gbkBZZPaqBVRcxvKVPYd9r3fp7', 1e4);
//     tx.sign(0, alice);
//     tx.sign(1, bob);
//
//     blockchain.t.transactions.propagate(tx.build().toHex(), done);
//   });
// });
