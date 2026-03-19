import { createContext, useContext } from 'react'

interface ThemeContextType {
  theme: 'dark' | 'light'
  toggle: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggle: () => {},
})

export const useTheme = () => useContext(ThemeContext)
