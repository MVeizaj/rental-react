import React from 'react'

class ContactsSelect extends React.Component{
    state = {
        contacts: []
    };

    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        const requestOption = {
            method: "GET"
        };

        fetch("http://127.0.0.1:8000/api/contacts-select", requestOption)
            .then(res => res.json())
            .then(contacts => (
                this.setState({
                    contacts
                })
            ))
    };


    render() {
        const {contacts} = this.state;
        const {isUpdate, contactValue} = this.props;
        return (
            <select name="contacts">
                {contacts.contacts && contacts.contacts.map(contact => (
                    <option value={contact.id} key={contact.id} selected={isUpdate && contactValue === contact.id && true}>{contact.name}</option>
                ))}
            </select>
        );
    }

}

export default ContactsSelect;