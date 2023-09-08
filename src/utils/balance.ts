//working

const ALEX_L1_IDENTITY_API_ENDPOINT = 'http://51.38.52.37:3001'
const ALEX_L1_FAUCET_API_ENDPOINT = 'http://51.38.52.37:1889'
const ALEX_L1_LCDC = {
  chainID: 'scintilla-888',
  URL: 'http://51.38.52.37:1888',
  isClassic: false,
}

const client = new Client({
  providers: {
    faucetAPI: {
      endpoint: {
        api_url: ALEX_L1_FAUCET_API_ENDPOINT,
      },
    },
    identityAPI: {
      endpoint: {
        api_url: ALEX_L1_IDENTITY_API_ENDPOINT,
      },
    },
    LCDC: ALEX_L1_LCDC,
  },
})

const getCoinBal = async (address: string) => {
  const [coins] = await client.providers.LCDC.bank?.balance(address)
  const uscintillaBalance =
    parseFloat(coins.get('uscintilla')?.toData()?.amount) / 1e6
  return uscintillaBalance
}
