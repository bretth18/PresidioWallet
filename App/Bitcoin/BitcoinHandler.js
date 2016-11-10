'use strict';

// import {  } from 'bitcore-lib';
import Mnemonic from 'bitcore-mnemonic';


// export function generatePrivateKey() {
//   var
// }

export function generatePassphrase() {
  // gen new phrase
  let hashPhrase = new Mnemonic(Mnemonic.Words.ENGLISH);
  if (Mnemonic.isValid(hashPhrase)){
    console.log('valid Mnemonic phrase generatre');
    let stringHashPhrase = hashPhrase.toString();

    let passphraseObject = {
      hashPhrase: hashPhrase,
      stringHashPhrase: stringHashPhrase,
    };
    return passphraseObject;
  } else {
    console.log('failed to generate Mnemonic phrase');
    return null;
  }
}

/* generates a HDPrivateKey object from a hash phrase object */
export function generatePrivateKey(phraseObject) {
  // this can take a param for the network (test, production btc)
  let privateKey = phraseObject.hashPhrase.toHDPrivateKey();
  console.log('private key generated from hash', privateKey);

  return privateKey;
}
