import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Checkbox = () => {
  const [checked, setChecked] = useState(false)

  return (
    <TouchableOpacity
      onPress={() => setChecked(!checked)}
      style={styles.uncheckedCheckbox}
    >
      {checked && (
        <Ionicons name="ios-checkmark" size={32} color="EF766C" />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  uncheckedCheckbox: {
    width: 32,
    height: 32,
    backgroundColor: '#EF766C',
    border: '1px solid EF766C',
    borderRadius: 4,
  },
  checkedCheckbox: {
    width: 32,
    height: 32,
    backgroundColor: 'EF766C',
  },
})

export default Checkbox
