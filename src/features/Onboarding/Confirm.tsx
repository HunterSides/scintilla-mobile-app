import { Route } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native'
import {
  Navbar,
  StyledButton,
  TextInfo,
  TextTitle,
  SeedList,
  Background,
  Backdrop,
  BackdropSmall,
} from '../../components'
import { Text, View } from '../../components/Themed/Themed'
import { Navigation } from '../../types'
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'
import storage from '../../store/storage'
import {
  createUserIdentity,
  address,
  getToken,
  navigateToScreen,
  validatePin,
} from '../../utils'
import { useStoreActions } from '../../hooks/storeHooks'

type Props = {
  navigation: Navigation
  route: Route<any>
}

export default function ConfirmScreen({ navigation, route }: Props) {
  const [mnemonic, setMnemonic] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([])
  const addAccount = useStoreActions((actions) => actions.addAccount)
  useEffect(() => {
    if (route.params && route.params.recoveryPhrase) {
      const words = route.params.recoveryPhrase.split(' ')
      setMnemonicWords(Array.from({ length: words.length }, () => ''))
      setMnemonic(route.params.recoveryPhrase)
      setName(route.params.name)
      setUsername(route.params.username)

      // Auto-populate mnemonic during development
      if (__DEV__) {
        setMnemonicWords(words)
      }
    }
  }, [route.params])

  const performRegister = async () => {
    console.log(`address: ${address}`)
    await createUserIdentity(username, address)

    await addAccount({
      index: 0,
      title: 'default',
      address: address,
      username: username,
      name: name,
    })
    await storage.setSecureItem('mnemonic', mnemonic)

    await navigateToScreen(navigation, 'Root', {
      screen: 'Balance',
      params: {},
    })
  }
  const handleSubmit = async () => {
    await performRegister()
  }

  return (
    <View style={styles.container}>
      <Background>
        <Backdrop>
          <OnboardingNavbar
            navigation={navigation}
            children="BackUp"
          />
          <View style={styles.centeredContainer}>
            <TextTitle>Confirm Recovery Phrase</TextTitle>
            <TextInfo>
              Confirm the following words from your recovery phrase
            </TextInfo>
          </View>
          <SeedList
            mnemonicWords={mnemonicWords}
            setMnemonicWords={setMnemonicWords}
          />

          <SafeAreaView style={styles.buttonContainer}>
            <StyledButton enabled={true} onPress={handleSubmit}>
              <Text
                style={{
                  textTransform: 'none',
                  fontStyle: 'normal',
                  color: '#FCFCFD',
                  fontSize: 16,
                  fontWeight: '700',
                }}
              >
                Sign up
              </Text>
            </StyledButton>
          </SafeAreaView>
        </Backdrop>
      </Background>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'none',
    justifyContent: 'center',
  },
  centeredContainer: {
    alignItems: 'center',
    backgroundColor: 'none',
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '93%',
    height: 49,
    marginTop: 'auto',
    marginBottom: 14,
  },
  centeredText: {
    textAlign: 'center',
  },
})
