import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  fallbackLng: 'ru',
  resources: {
    ru: { translation: { app: { title: 'Alga Dispatcher', welcome: 'Добро пожаловать в диспетчерскую (scaffold)' } } },
    kz: { translation: { app: { title: 'Alga Dispatcher', welcome: 'Диспетчер панеліне қош келдіңіз (scaffold)' } } }
  }
})

export default i18n
