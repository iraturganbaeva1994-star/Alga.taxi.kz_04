import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  fallbackLng: 'ru',
  resources: {
    ru: { translation: { welcome: 'Добро пожаловать' } },
    kz: { translation: { welcome: 'Қош келдіңіз' } }
  }
})

export default i18n
