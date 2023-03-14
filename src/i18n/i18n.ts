import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import CART_EN from 'src/locales/en/cart.json'
import USER_EN from 'src/locales/en/user.json'
import NAV_EN from 'src/locales/en/nav.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_VI from 'src/locales/vi/product.json'
import CART_VI from 'src/locales/vi/cart.json'
import USER_VI from 'src/locales/vi/user.json'
import NAV_VI from 'src/locales/vi/nav.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN,
    cart: CART_EN,
    user: USER_EN,
    nav: NAV_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI,
    cart: CART_VI,
    user: USER_VI,
    nav: NAV_VI
  }
} as const

export const defaultNS = 'product'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['home', 'product', 'cart', 'user', 'nav'],
  fallbackLng: 'vi',
  defaultNS,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
