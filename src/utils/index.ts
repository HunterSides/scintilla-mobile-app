/* eslint-disable no-case-declarations */
import 'react-native-get-random-values'
import * as crypto from 'expo-crypto'
import * as bip39 from 'bip39'
//import { Mnemonic } from 'jmes'
import { primitives } from '@scintilla-network/js-sdk/src'
import { convertToEur } from './convert'
import { notateWeiValue } from './notateWei'
import { validatePin } from './validatePin'
import { navigateToScreen } from './navigate'
import { handleLockout } from './lockout'
import axios from 'axios'
const Mnemonic = primitives.Mnemonic
const SCHEMA_PREFIX = 'scintilla:'
const randomBytes = crypto.getRandomValues(new Uint8Array(16))
const mnemonic = Mnemonic.generateMnemonic(randomBytes)
const accountIndex = 0
const addressIndex = 0

/* error
const address = mnemonic 
  .toMasterDerivableKey()
  .derivePath(`m/44'/4369'`)
  .derivePath(`m/${accountIndex}'`)
  .derivePath(`m/0/${addressIndex}`)
  .toAddress()
  */
const address = new Mnemonic(mnemonic)
  .toMasterDerivableKey()
  .derivePath(`m/44'/4369'`)
  .derivePath(`m/${accountIndex}'`)
  .derivePath(`m/0/${addressIndex}`)
  .toAddress()

const identity = {}
const BASE_API = `http://51.158.54.220:8885/scintilla`

const getCoinBal = async (address: string) => {
  // const [coins] = await client.providers.LCDC.bank?.balance(address)
  // const uscintillaBalance =
  //   parseFloat(coins.get('uscintilla')?.toData()?.amount) / 1e6

  // return uscintillaBalance || 0 // return 0 if no balance

  // Implement balances and sort
  return 1234
}

const performREST = async (restProps: any) => {
  let request = {
    path: '',
    body: {},
  }

  // If we have sent a string, we assume it's a path
  if (typeof restProps === 'string') {
    // Should be fetched from seeds etc...
    // @ts-ignore
    request = { path: `${BASE_API}` + restProps }
  }
  // If we have sent an object, we assume it's a request object
  if (typeof restProps === 'object') {
    // @ts-ignore
    request = restProps
    request.path = `${BASE_API}` + request.path
    const response = axios.post(request.path, request.body)
    return response
  }

  const response = axios.get(request.path)

  return response
}

const sendTransaction = async (
  recipientMoniker: string,
  senderMoniker: string,
  senderAddress: string,
  assetSymbol: string,
  amount: number
) => {
  const command = {
    type: 'banking.transfer',
    recipient: recipientMoniker,
    sender: senderMoniker,
    assets: [{ symbol: assetSymbol, amount: amount }],
    signature: `${senderMoniker}-${senderAddress}`,
  }

  const broadcast = await performREST({
    path: `/command`,
    body: { command },
  })
  console.log({ broadcast })
  const res = {}
  console.log({ res })
  return res
}

/*using @scintilla-network/js-sdk*/

// const getCoinBal = async () => {
//   const coins = await account.fetchBalance()
//   const uscintillaObject = coins.assets['uscintilla']
//   const uscintillaBalance =
//     parseFloat(uscintillaObject?.toData()?.amount) / 1e6

//   return uscintillaBalance || 0 // return 0 if no balance
// }

// const sendTransaction = async (
//   address: string,
//   amount: number,
//   mnemonic: string
// ) => {
//   const wallet = client.createWallet(new Mnemonic(mnemonic))
//   const account = wallet.getAccount()
//   const res = await account.sendMessage({
//     recipientAddress: address,
//     recipientAmount: amount,
//   })

//   console.log({ res })
//   return res
// }

const faucetRequest = async (
  recipientMoniker: string,
  // actually senderAddress, but keeping this name so it doesn't confuse in this case.
  recipientAddress: string,
  assetSymbol: string,
  amount: number
) => {
  const command = {
    type: 'banking.mint',
    recipient: recipientMoniker,
    assets: [{ symbol: assetSymbol, amount: amount }],
    signature: `${recipientMoniker}-${recipientAddress}`,
  }

  const broadcast = await performREST({
    path: `/command`,
    body: { command },
  })
  console.log({ broadcast })
  const res = {}
  console.log({ res })
  return res
}
/*Identity*/
const createUserIdentity = async (moniker: string, address: any) => {
  const command = {
    type: 'identity.createUserIdentity',
    moniker: moniker,
    address: address,
    signature: `${moniker}-${address}`,
  }

  const broadcast = await performREST({
    path: `/command`,
    body: { command },
  })
  console.log({ broadcast })
  const res = {}
  console.log({ res })
  return res
}

const getUserIdentity = async (address: string) => {
  const identity = await performREST(`/identity/${address}`)
  return identity
}

const restoreUserIdentity = async (mnemonic: string) => {
  // If exist (fetch) populate state

  const address = new Mnemonic(mnemonic)
    .toMasterDerivableKey()
    .derivePath(`m/44'/4369'`)
    .derivePath(`m/${accountIndex}'`)
    .derivePath(`m/0/${addressIndex}`)
    .toAddress()

  return getUserIdentity(address)

  // const account = await accountFromMnemonic(mnemonic)
  // console.log(account) // will log the account object even if the account is invalid

  // const tokenRes = await getToken(account.response)
  // const { username } = tokenRes.identity
  // const identity = { username, account, token: tokenRes.token }
  // return identity
}

/*Auth */
const accountFromMnemonic = async (mnemonic: string) => {
  // const wallet = client.createWallet(new Mnemonic(mnemonic))
  // const response = wallet.getAccount()
  // const publicKey = response.getPublic()
  // const message = 'scintilla'
  // const signedMessage = response.signMessage(message)
  // const isVerified = response.verifySignature(
  //   signedMessage,
  //   message,
  //   publicKey
  // )
  // const signature = { signedMessage, isVerified }
  // const account = {
  //   response,
  //   signature,
  //   address: response.getAddress(),
  //   privateKey: response.getPrivate(),
  //   publicKey: response.getPublic(),
  // }

  // return account
  const address = new Mnemonic(mnemonic)
    .toMasterDerivableKey()
    .derivePath(`m/44'/4369'`)
    .derivePath(`m/${accountIndex}'`)
    .derivePath(`m/0/${addressIndex}`)
    .toAddress()
  const identity = restoreUserIdentity(mnemonic)

  return { address, identity }
}

const getToken = async (account?: any) => {
  // const tokenReq = await client.providers.identityAPI.getToken(
  //   account
  // )
  // console.log(tokenReq)
  // return tokenReq.data
  return true
}

/*Marketplace */

export {
  mnemonic,
  SCHEMA_PREFIX,
  address,
  faucetRequest,
  convertToEur,
  getCoinBal,
  sendTransaction,
  getToken,
  createUserIdentity,
  getUserIdentity,
  restoreUserIdentity,
  notateWeiValue,
  validatePin,
  navigateToScreen,
  handleLockout,
}
