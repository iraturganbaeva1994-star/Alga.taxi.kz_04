import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  fallbackLng: 'ru',
  resources: {
    ru: { translation: {
      app: { title: 'Alga Dispatcher', welcome: 'Добро пожаловать в диспетчерскую (scaffold)' },
      settings: {
        title: 'Настройки',
        contact_number: 'Контактный номер',
        logo_url: 'URL логотипа',
        show_phone_numbers: 'Показывать номера клиентов и водителей',
        save: 'Сохранить',
        only_admin_edit: 'Только администратор может редактировать'
      },
      reports: { title: 'Отчёты', date_from: 'Дата с', date_to: 'Дата по' }
    } },
    kz: { translation: {
      app: { title: 'Alga Dispatcher', welcome: 'Диспетчер панеліне қош келдіңіз (scaffold)' },
      settings: {
        title: 'Баптаулар',
        contact_number: 'Байланыс нөмірі',
        logo_url: 'Логотип URL',
        show_phone_numbers: 'Клиенттер мен жүргізушілердің нөмірлерін көрсету',
        save: 'Сақтау',
        only_admin_edit: 'Тек админ өзгерте алады'
      },
      reports: { title: 'Есептер', date_from: 'Басталу дата', date_to: 'Соңғы дата' }
    } }
  }
})

export default i18n
