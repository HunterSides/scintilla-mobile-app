import React, { memo } from 'react'
import {
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'

const Backdrop = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '98%',
    height: '100%',

    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#26292C',

    borderColor: '#EF766C',
    borderWidth: 1,
    borderRadius: 24,
  },
  scrollViewContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

export default memo(Backdrop)
