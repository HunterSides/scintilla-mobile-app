import React, { memo } from 'react'
import { View } from '../../../components'
import { Platform, StyleSheet } from 'react-native'

interface Props {
  children?: React.ReactNode
}

const BalanceContainer = ({ children }: Props) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 243,
    borderColor: '#EF766C',
    borderWidth: 1,

    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#26292C',
    borderRadius: 24,
  },
})

export default memo(BalanceContainer)
