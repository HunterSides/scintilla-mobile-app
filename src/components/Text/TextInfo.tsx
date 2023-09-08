import React, { memo } from 'react'
import { Text, View } from '../Themed/Themed'
import { StyleSheet } from 'react-native'

const TextInfo = ({ children }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.infoText}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: 'transparent',
    width: '80%',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#EF766C',
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'center',
  },
})

export default memo(TextInfo)
