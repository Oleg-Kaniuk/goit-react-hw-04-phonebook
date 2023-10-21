// Імпортуючи useState з бібліотеки React для управління станом у функціональному компоненті
import { useState } from "react";

// Імпортуючи стилізовані компоненти форми з вказаного файлу
import { Form, Input, Label, ButtonAdd } from "./ContactForm.styled";

// Визначаємо компонент форми для додавання контактів
export const ContactForm = ({ onSubmit }) => {
    // Використання useState для управління станом ім'я та номеру телефону контакту
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    // Функція для обробки події відправлення форми
    const onSubmitAddContact = (evt) => {
        // Забороняємо дефолтну поведінку форми
        evt.preventDefault();
        // Створюємо об'єкт з даними про контакт та передаємо його до батьківського компонента
        const data = { name, number };
        onSubmit(data);
        // Очищуємо стан ім'я та номеру
        reset();
    };

    // Функція для обробки зміни значення в input'і
    const onChangeInput = (evt) => {
        // Деструктуризація події для отримання імені та значення input'а
        const { name, value } = evt.currentTarget;
        // В залежності від імені поля оновлюємо відповідний стан
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                break;
        };
    };

    // Функція для скидання стану ім'я та номеру
    const reset = () => {
        setName('');
        setNumber('');
    };
    
        return (
            <Form onSubmit={onSubmitAddContact}>
                <Label>
                    Name
                    <Input
                        type="text"
                        name="name"
                        value={name}
                        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces"
                        required
                        onChange={onChangeInput}
                    />
                </Label>
                <Label>
                    Phone number
                    <Input
                        type="tel"
                        name="number"
                        value={number}
                        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        onChange={onChangeInput}
                    />
                </Label>
                <ButtonAdd type="submit">
                    Add contact
                </ButtonAdd>
            </Form>
        );
    }
