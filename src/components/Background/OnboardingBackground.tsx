import { memo } from 'react'
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native'

import { View } from '../Themed/Themed'
type Props = {
  children: React.ReactNode
  position?: String
}

const OnboardingBackground = ({ children, position }: Props) => (
  <View style={styles.container}>
    <ImageBackground
      source={require('../../../assets/images/onboarding.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={[
          styles.content,
          position === 'bottom' ? styles.bottom : undefined,
        ]}
        behavior="padding"
      >
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  </View>
)

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    width: '375px',
    height: '812px',
  },
  content: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
})

export default memo(OnboardingBackground)
