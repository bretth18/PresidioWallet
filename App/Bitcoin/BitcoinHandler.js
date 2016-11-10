'use strict';

// import {  } from 'bitcore-lib';
// import Mnemonic from 'bitcore-mnemonic';
import Bitcoin from 'react-native-bitcoinjs-lib';
import bip39 from 'bip39';
import crypto from 'crypto';
import bigi from 'bigi';

export function generatePassphrase() {
  // gen new phrase
  let hashPhrase = bip39.generateMnemonic();

  if (bip39.validateMnemonic(hashPhrase)) {
    console.log('valid Mnemonic phrase generatred: ',hashPhrase);
    let seedHex = bip39.mnemonicToSeedHex(hashPhrase);
    console.log('hex from phrase is: ', hashPhrase);

    let privateKeyHex = Bitcoin.crypto.hash256(hashPhrase);
    var d = bigi.fromBuffer(privateKeyHex);
    console.log('private key hex is: ', d);

    let passphraseObject = {
      hashPhrase: hashPhrase,
      seedHex: d,
    };
    return passphraseObject;
  } else {
    console.log('failed to generate Mnemonic phrase');
    return null;
  }
}

export function getHashFromPhrase(phrase) {
  let hash = Bitcoin.crypto.hash256(phrase);
  return hash;
}

/* generates a PrivateKeyPair object from a hash phrase object */
export function generatePrivateKey(phraseObject) {
  // this can take a param for the network (test, production btc)
  let privateKey = new Bitcoin.ECPair(phraseObject.seedHex);
  privateKey.compressed = true;
  console.log('private key generated from hash', privateKey);

  return privateKey;
}

export function generateWIF(privateKey) {
  let wifKey = privateKey.toWIF();

  return wifKey;
}

export function createWallet() {
  // generate phrase object
  let passphrase = generatePassphrase();
  let privateKey = generatePrivateKey(passphrase);
  let wif = generateWIF(privateKey);


  let walletObject = {
    passphrase: passphrase.hashPhrase,
    privateKey: privateKey,
    wif: wif
  };

  return walletObject;
}
