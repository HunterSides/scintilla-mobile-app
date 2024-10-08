import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Transaction } from '../../types'
import { formatDate } from '../../utils/formatDate'
type Props = {
  transaction: Transaction | null
  closeModal: () => void
}

const TransactionDetails = ({ transaction, closeModal }: Props) => {
  if (!transaction) {
    return null
  }

  return (
    <View>
      <Text style={styles.title}>Transaction Details</Text>
      <View style={styles.item}>
        <Text style={styles.textSmall}>Status</Text>
        <View>
          {transaction.status === 'Success' ? (
            <Text style={styles.statusTextConfirmed}>
              {transaction.status}
            </Text>
          ) : transaction.status === 'Failed' ? (
            <Text style={styles.statusTextFailed}>
              {transaction.status}
            </Text>
          ) : (
            <Text style={styles.statusTextPending}>
              {transaction.status}
            </Text>
          )}
        </View>

        <View style={styles.itemSeparator} />
      </View>
      <View style={styles.item}>
        <Text style={styles.textSmall}>Date</Text>
        <Text style={styles.textLarge}>
          {formatDate(transaction.timestamp)}
        </Text>
        <View style={styles.itemSeparator} />
      </View>
      <View style={styles.item}>
        <Text style={styles.textSmall}>From</Text>
        <Text style={styles.textLarge}>
          {transaction.body.messages[0].from_address}
        </Text>
        <View style={styles.itemSeparator} />
      </View>
      <View style={styles.item}>
        <Text style={styles.textSmall}>To</Text>
        <Text style={styles.textLarge}>
          {transaction.body.messages[0].to_address}
        </Text>
        <View style={styles.itemSeparator} />
      </View>
      <View style={styles.item}>
        <Text style={styles.textSmall}>Total Amount</Text>
        <Text style={styles.textLarge}>
          {transaction.body.messages[0].amount[0].amount} Scintilla
        </Text>
        <View style={styles.itemSeparator} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  item: {
    marginLeft: 24,
  },
  itemSeparator: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: '#263047',
    opacity: 0.1,
    width: '90%',
    height: 1,
  },
  statusTextConfirmed: {
    color: '#63CC91',
    fontSize: 18,
    fontWeight: '500',
  },
  statusTextFailed: {
    color: '#FF5C5C',
    fontSize: 18,
    fontWeight: '500',
  },
  statusTextPending: {
    color: '#FFC05C',
    fontSize: 18,
    fontWeight: '500',
  },

  textSmall: {
    fontSize: 12,
    fontWeight: '400',
    color: '#454E62',
  },
  textLarge: {
    fontSize: 18,
    fontWeight: '500',
    color: '#263047',
  },
  textConversion: {},
})
export default TransactionDetails
