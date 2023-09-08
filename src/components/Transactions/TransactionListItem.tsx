import { useState } from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native'

import { Transaction } from '../../types'
import { formatDate } from '../../utils/formatDate'

export const TransactionListItem = (transaction: Transaction) => {
  const shortenAddress = (address) => {
    if (!address || address.length < 7) return address
    return address.slice(0, 4) + '...' + address.slice(-3)
  }
  const SendReceiveText = () => {
    return (
      <Text style={styles.topText}>
        {transaction.tx_type === 'Sent' ? 'Sent' : 'Received'}
      </Text>
    )
  }

  const SendIcon = () => {
    return (
      <Image
        source={require('../../../assets/icons/send-midnight.png')}
        style={{
          width: 15,
          height: 15,
          alignSelf: 'center',
        }}
      />
    )
  }
  const ReceiveIcon = () => {
    return (
      <Image
        source={require('../../../assets/icons/receive-midnight.png')}
        style={{
          width: 18.5,
          height: 17,
          alignSelf: 'center',
        }}
      />
    )
  }

  return (
    <View style={styles.transactionListItem}>
      <Pressable>
        {transaction.tx_type === 'Sent' ? SendIcon : ReceiveIcon}
      </Pressable>
      <View style={styles.transactionType}>
        <Text style={styles.topText}>
          {transaction.tx_type === 'Sent' ? 'Sent' : 'Received'}
        </Text>
        <Text style={styles.bottomText}>
          {formatDate(transaction.timestamp)}
        </Text>
      </View>
      <View style={styles.transactionValue}>
        <Text style={styles.topText}>
          {transaction.amount} Scintilla
        </Text>
        <Text style={styles.bottomText}>
          {transaction.tx_type === 'Sent'
            ? shortenAddress(transaction.to_address)
            : shortenAddress(transaction.from_address)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  transactionListItem: {
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center',
    width: '100%',
    height: 60,
    color: 'white',
    backgroundColor: 'transparent',
  },
  transactionType: {
    flexDirection: 'column',
    marginLeft: 37,
    backgroundColor: 'transparent',
  },
  transactionValue: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  topText: {
    fontSize: 16,
    color: '#263047',
    fontWeight: '500',
  },
  bottomText: {
    fontSize: 12,
    color: '#454E62',
    fontWeight: '400',
  },
})
