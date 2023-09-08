import React, { memo } from 'react'
import { View, Text } from '../../../components'
import { Platform, Pressable, StyleSheet, Image } from 'react-native'

import { Navigation } from '../../../types'
interface Props {
  children?: React.ReactNode
  navigation: Navigation
}

const SendReceive = ({ children, navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('WalletSend')
        }}
        style={styles.button}
      >
        <Image
          source={require('../../../../assets/icons/send.png')}
          style={{
            width: 20,
            height: 20,
            marginLeft: 16,

            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            marginRight: 'auto',
            paddingRight: 30,
            color: '#EF766C',
            alignSelf: 'center',
            textAlign: 'center',
          }}
        >
          Send
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('WalletReceive')
        }}
        style={styles.button}
      >
        <Image
          source={require('../../../../assets/icons/receive.png')}
          style={{
            width: 18.5,
            height: 17,
            marginLeft: 22,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            marginRight: 'auto',
            paddingRight: 10,
            color: '#EF766C',
            alignSelf: 'center',
            textAlign: 'center',
          }}
        >
          Receive
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'none',
    flexDirection: 'row',
    borderRadius: 99,
    justifyContent: 'space-evenly',
    width: '88%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'none',
    borderRadius: 90,

    marginBottom: 13,
    fontSize: 14,
    height: 48,
    width: '44%',
  },
  buttonText: {
    flex: 1,
    fontSize: 14,
    marginRight: 'auto',
    paddingRight: 30,
    color: '#EF766C',
    alignSelf: 'center',
    textAlign: 'center',
  },
})

export default memo(SendReceive)
