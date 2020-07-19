import { createContext } from 'react'
import { VKLoginResult } from 'react-native-vkontakte-login'

export const UserContext = createContext<{ user: VKLoginResult | null; setUser: (user: VKLoginResult | null) => void }>(
  {
    user: null,
    setUser: () => {},
  }
)
