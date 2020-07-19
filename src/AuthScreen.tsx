import React, { useCallback, useContext, memo } from 'react'
import { Text, SafeAreaView, StyleSheet, View } from 'react-native'
import { Touchable } from '@busfor/react-native-touchable'
import VKLogin from 'react-native-vkontakte-login'

import { UserContext } from './context'
import NavBar from './NavBar'

export default memo(() => {
  const { setUser } = useContext(UserContext)

  const onPressLogin = useCallback(() => {
    VKLogin.login(['friends', 'wall'])
      .then((user) => setUser(user))
      .catch((err) => console.log(err))
  }, [setUser])

  return (
    <SafeAreaView style={styles.container}>
      <NavBar title='Авторизация' />
      <View style={styles.buttonContainer}>
        <Touchable style={styles.button} onPress={onPressLogin}>
          <Text style={styles.buttonText}>Войти с помощью VK</Text>
        </Touchable>
      </View>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#4a75a8',
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderRadius: 16,
  },

  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
})
