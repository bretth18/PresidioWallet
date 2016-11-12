'use strict';


import Bitcoin from 'react-native-bitcoinjs-lib';
import bip39 from 'bip39';
import crypto from 'crypto';
import bigi from 'bigi';

/* Generates a new 12 word Mnemonic passphrase */
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

/* Retrieve hash from Deterministic Phrase */
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

/* Converts a keyPair to WIF format */
export function generateWIF(privateKey) {
  let wifKey = privateKey.toWIF();

  return wifKey;
}

/* function executed upon re-open, takes phrase and
    re-generates the key, returning a wallet object
    TODO: Implement check measures                */
export function reOpenWallet(hashPhrase) {
  // regen hash
  let privateKeyHex = Bitcoin.crypto.hash256(hashPhrase);
  var d = bigi.fromBuffer(privateKeyHex);
  console.log('regenerated private key hex from async phrase: ', d);

  // generate the keyPair
  let privateKey = new Bitcoin.ECPair(d);
  privateKey.compressed = true;
  console.log('regenerated private key from hash from async: ', privateKey);

  // get WIF
  let wif = generateWIF(privateKey);

  let walletObject = {
    passphrase: hashPhrase,
    privateKey: privateKey,
    wif: wif
  };

  return walletObject;

}

/* Creates a new wallet object with a
   newly generated passphrase */
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

/* transaction function takes our wallet private key and the address of the
    recipient */
export function createTransactionSend(myPrivateKey, recieveAddress) {

  let myAddress = myPrivateKey.getAddress();

  var transaction = new Bitcoin.TransactionBuilder();

}
