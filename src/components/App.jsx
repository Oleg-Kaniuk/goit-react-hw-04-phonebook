// Імпортуючи useState та useEffect з бібліотеки React
import { useState, useEffect } from "react";

// Імпортуючи функцію nanoid для генерації унікальних ідентифікаторів
import { nanoid } from "nanoid";

// Імпортуючи компонент Notify з бібліотеки Notiflix для відображення повідомлень
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Імпортуючи стилізований компонент для головного контейнера
import { MainContainer } from "./App.styled";

// Імпортуючи компоненти форми, списку контактів та фільтра
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";

// Ключ для локального сховища
const KEY_LS = 'contacts';

// Початковий масив контактів
const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

// Визначення головного компоненту App
export const App = () => {
  // Використання useState для стану контактів та фільтра
  const [contacts, setContacts] = useState(() => {
    // Ініціалізація стану контактів з локального сховища або значенням за замовчуванням
    const initialState = JSON.parse(localStorage.getItem(KEY_LS));
    return initialState || initialContacts;
  });
  const [filter, setFilter] = useState('');

  // Використання useEffect для автоматичного збереження контактів у локальному сховищі при їх зміні
  useEffect(() => {
    localStorage.setItem(KEY_LS, JSON.stringify(contacts));
  }, [contacts]);

  // Обробник події відправлення форми додавання контакту
  const onSubmitForm = data => {
    const obj = { ...data, id: nanoid() };

    setContacts(prevContacts => {
      // Перевірка, чи ім'я не дублюється серед існуючих контактів
      if (newName(prevContacts, obj) === undefined) {
        // Додавання нового контакту до стану контактів
        return [...prevContacts, obj];
      } else {
        // Виведення повідомлення про дублювання ім'я контакту
        Notify.warning(`${obj.name} is already in contacts`, {
          width: '300px',
          position: 'right-top',
          timeout: 2000,
          fontSize: '20px',
        });
        // Повернення незміненого стану контактів
        return [...prevContacts];
      };
    });
  };

  // Функція для перевірки наявності імені в існуючих контактах
  const newName = (prevContacts, obj) => {
    return prevContacts.find(({ name }) =>
      name.toLowerCase() === obj.name.toLowerCase());
  };

  // Функція для видалення контакту за його ідентифікатором
  const removeContact = (contactId) => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId));
  }

  // Обробник події зміни значення фільтрації
  const onChangeFilter = (evt) => {
    const { value } = evt.currentTarget;
    setFilter(value);
  }

  // Функція для фільтрації контактів за іменем
  const filterByName = () => {
    const lowerFilter = filter.toLowerCase().trim();
    return contacts.filter(({ name }) =>
      (name.toLowerCase().includes(lowerFilter)))
  }

  // Отримання відфільтрованих контактів
  const visibleContacts = filterByName();

  // Повертаємо JSX: головний контейнер з компонентами форми, списку контактів та фільтра
  return (
    <MainContainer>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onSubmitForm} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChangeFilter={onChangeFilter} />
      <ContactList onRemoveContact={removeContact} contacts={visibleContacts}/>
    </MainContainer>
  );
};
