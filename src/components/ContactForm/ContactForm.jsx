import { Component } from "react";
import { Form, Input, Label, ButtonAdd } from "./ContactForm.styled";

export class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    }  

    onSubmitAddContact = (evt) => {
        evt.preventDefault();
        this.props.onSubmit(this.state)
        this.reset();
    }

    onChangeInput = (evt) => {
        const { name, value } = evt.currentTarget;
        this.setState({ [name]: value });
    }

    reset = () =>
        this.setState({
            name: '',
            number: '',
        })

    render() {
        const { name, number } = this.state;

        return (
            <Form onSubmit={this.onSubmitAddContact}>
                <Label>
                    Name
                    <Input
                        type="text"
                        name="name"
                        value={name}
                        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces"
                        required
                        onChange={this.onChangeInput}
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
                        onChange={this.onChangeInput}
                    />
                </Label>
                <ButtonAdd type="submit">
                    Add contact
                </ButtonAdd>
            </Form>
        );
    }
}