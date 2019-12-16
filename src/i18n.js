import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {
            "Error occurred": "Error occurred",
            "Sign In": "Sign In",
            "Sign Up": "Sign Up",
            "Username": "Username",
            "Email": "Email",
            "Password": "Password",
            "No account": "Don't have an account? Sign Up",
            "Has account": "Already have an account? Sign in",
            "Dashboard": "Dashboard",
            "Health": "Health",
            "Productivity": "Productivity",
            "Today's pulse rate": "Today's pulse rate",
            "Today's productivity rate": "Today's productivity rate",
            "History": "History",
            "Date": "Date",
            "Office": "Office",
            "Average productivity": "Average productivity",
            "Average health status": "Average health status",
            "Profile": "Profile",
            "First name": "First name",
            "Last name": "Last name",
            "Age": "Age",
            "Close": "Close",
            "BPM": "BPM",
            "index": "index"
        }
    },
    ua: {
        translation: {
            "Error occurred": "Виникла помилка",
            "Sign In": "Вхід",
            "Sign Up": "Реєстрація",
            "Username": "Ім'я користувача",
            "Email": "Адреса електронної пошти",
            "Password": "Пароль",
            "No account": "Не маєте облікового запису? Зареєструватися",
            "Has account": "Вже маєте обліковий запис? Увійти",
            "Dashboard": "Загальна інформація",
            "Health": "Здоров'я",
            "Productivity": "Продуктивність",
            "Today's pulse rate": "Сьогодняшня частота пульсу",
            "Today's productivity rate": "Сьогодняшня продуктивність",
            "History": "Історія",
            "Date": "Дата",
            "Office": "Офіс",
            "Average productivity": "Середня продуктивність",
            "Average health status": "Середній стан здоров'я",
            "Profile": "Обліковий запис",
            "First name": "Ім'я",
            "Last name": "Прізвище",
            "Age": "Вік",
            "Close": "Закрити",
            "BPM": "Пульс",
            "index": "індекс"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: (localStorage.getItem("currentLanguage") !== null && localStorage.getItem("currentLanguage") !== 'null')
            ? localStorage.getItem("currentLanguage") : 'en',

        keySeparator: false,

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
