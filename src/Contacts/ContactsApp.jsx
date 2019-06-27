import React from 'react'
import Modal from "../Modal";
import ContactsCreateUpdate from "./ContactsCreateUpdate";
import Contacts from "./Contacts";
import ContactsSearch from "./ContactsSearch";

class ContactsApp extends React.Component {
    state = {
        data: {
            count: 0,
            page: 0,
            total: 0,
            totalPages: 0,
            contacts: []
        },
        openModal: false,
        name: '',
        email: '',
        mobile: '',
        notes: '',
        search: '',
        isUpdate: false,
        id: ''
    };

    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEditModal = this.handleEditModal.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(page = 1) {
        const requestOption = {
            method: 'GET'
        };

        fetch("http://127.0.0.1:8000/api/contacts?page=" + page, requestOption)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        data
                    });
                });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const {name, email, mobile, notes} = this.state;

        const data = {name: name, email: email, mobile: mobile, notes: notes};

        const requestOption = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        fetch("http://127.0.0.1:8000/api/contacts", requestOption)
            .then(res => res.json())
            .catch(error => {
                console.error('Error:', error.message);
                alert(error.message);
            })
            .then(response => {
                    console.log('Success:' + response.message);
                    alert(response.message);
                }
            )
            .then(() => {
                this.loadData();
            });

        this.setState({
            name: '',
            email: '',
            mobile: '',
            notes: '',
            openModal: false
        })

    };

    handleUpdate = (id) => {
        const {name, email, mobile, notes} = this.state;

        const data = {name: name, email: email, mobile: mobile, notes: notes};

        const requestOption = {
            method: 'PUT',
            body: JSON.stringify(data),
        };

        fetch("http://127.0.0.1:8000/api/contacts/" + id, requestOption)
            .then(res => res.json())
            .catch(error => {
                console.error('Error:', error.message);
                alert(error.message);
            })
            .then(response => {
                    console.log('Success:' + response.message);
                    alert(response.message);
                }
            )
            .then(() => {
                this.loadData();
            });

        this.setState({
            name: '',
            email: '',
            mobile: '',
            notes: '',
            openModal: false
        })

    };

    handleDelete = (id) => {
        const requestOption = {
            method: 'DELETE'
        };

        fetch("http://127.0.0.1:8000/api/contacts/" + id, requestOption)
            .then(res => res.json())
            .catch(error => {
                console.error('Error:', error.message);
                alert(error.message);
            })
            .then(response => {
                    console.log('Success:' + response.message);
                    alert(response.message);
                }
            )
            .then(() => {
                this.loadData();
            });
    };

    handleFilter = (search, page = 1) => {

        const requestOptions = {
            method: 'GET',
        };

        fetch("http://127.0.0.1:8000/api/contacts?search=" + search + '&page=' + page, requestOptions)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        data
                    });
                });
    };

    handleEditModal = id => {
        this.setState({
            openModal: true,
            isUpdate: true
        });

        const requestOptions = {
            method: 'GET',
        };

        fetch("http://127.0.0.1:8000/api/contacts/" + id, requestOptions)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    mobile: data.mobile,
                    notes: data.notes
                })
            });
    };

    handleFirst = () => {
        const {search} = this.state;
        this.handleFilter(search, 1);
    };

    handlePrevious = () => {
        const {page} = this.state.data;
        const {search} = this.state;
        this.handleFilter(search, parseInt(page) - 1);
    };

    handleNext = () => {
        const {page} = this.state.data;
        const {search} = this.state;
        this.handleFilter(search, parseInt(page) + 1);
    };

    handleLast = () => {
        const {totalPages} = this.state.data;
        const {search} = this.state;
        this.handleFilter(search, totalPages);
    };

    handleModal() {
        this.setState({
            openModal: true,
            isUpdate: false
        })
    }

    closeModal() {
        this.setState({
            openModal: false,
        })
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    };

    render() {
        const {data, openModal, search, name, email, mobile, notes, isUpdate, id} = this.state;
        const {page, total, totalPages} = this.state.data;

        return (
            <div>
                <button onClick={this.handleModal}>Add Contact</button>
                <Modal show={openModal} onClose={this.closeModal}>
                    <ContactsCreateUpdate valueName={isUpdate ? name : ''} valueEmail={isUpdate ? email : ''}
                                          valueMobile={isUpdate ? mobile : ''}
                                          valueNotes={isUpdate ? notes : ''}
                                          handleChange={this.handleChange}
                                          handleSubmit={isUpdate ? () => this.handleUpdate(id) : this.handleSubmit}
                                          buttonName={isUpdate ? 'Edit Contact' : 'Add Contact'}/>
                </Modal>
                <br/>
                <ContactsSearch search={search} handleChange={(event) => this.handleChange(event)}
                                keyUpHandle={() => this.handleFilter(search)}/>
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                    {data.contacts && data.contacts.map(contact => (
                        <Contacts id={contact.id} name={contact.name} email={contact.email} mobile={contact.mobile}
                                  notes={contact.notes}
                                  handleEditModal={this.handleEditModal} handleDelete={() => {
                            if (window.confirm('Are you sure?')) this.handleDelete(contact.id)
                        }}/>
                    ))}
                    </tbody>
                </table>
                {total > 5 &&
                <div>
                    {(page > 1) && <button onClick={this.handleFirst}>First</button>}
                    {(page > 1) && <button onClick={this.handlePrevious}>Previous</button>}
                    <button>{page}</button>
                    {(page < totalPages) && <button onClick={this.handleNext}>Next</button>}
                    {(page < totalPages) && <button onClick={this.handleLast}>Last</button>}
                </div>
                }
            </div>
        )
    }
}

export default ContactsApp;