import React, { useState, useEffect } from 'react'
import VKLogin, { VKLoginResult } from 'react-native-vkontakte-login'

import FeedScreen from './FeedScreen'
import AuthScreen from './AuthScreen'
import { UserContext } from './context'

VKLogin.initialize(7543415)

const App = () => {
  const [user, setUser] = useState<VKLoginResult | null>(null)

  useEffect(() => {
    VKLogin.isLoggedIn()
      .then((isLoggedIn) => (isLoggedIn ? VKLogin.getAccessToken() : null))
      .then((authData) => setUser(authData))
      .catch((err) => console.log(err))
  }, [])

  return <UserContext.Provider value={{ user, setUser }}>{user ? <FeedScreen /> : <AuthScreen />}</UserContext.Provider>
}

export default App
