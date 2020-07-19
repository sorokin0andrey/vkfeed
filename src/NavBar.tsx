import React, { useContext, useCallback, memo } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import VKLogin from 'react-native-vkontakte-login'
import { Touchable } from '@busfor/react-native-touchable'

import { UserContext } from './context'

export default memo(({ title }: Props) => {
  const { user, setUser } = useContext(UserContext)

  const onPressLogout = useCallback(() => VKLogin.logout().finally(() => setUser(null)), [setUser])

  return (
    <View style={styles.navBar}>
      <Text style={styles.title}>{title}</Text>
      {user && (
        <Touchable onPress={onPressLogout}>
          <Text>Выйти</Text>
        </Touchable>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  navBar: {
    height: 56,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  title: {
    fontWeight: '700',
    fontSize: 18,
  },
})

interface Props {
  title: string
}
