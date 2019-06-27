import React from 'react'
import Users from "./Users";
import UsersSearch from "./UsersSearch";
import Modal from "../Modal";
import UsersCreateUpdate from "./UsersCreateUpdate";

class UserApp extends React.Component {
    state = {
        data: {
            count: 0,
            page: 0,
            total: 0,
            totalPages: 0,
            agents: []
        },
        search: '',
        openModal: false,
        isUpdate: false,
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address: '',
        zone: null,
        notes: '',
        isAdmin: false,
        id: '',
        photo: ''
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
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }


    componentDidMount() {
        this.loadData();
    }

    loadData(page = 1) {
        const requestOption = {
            method: 'GET'
        };

        fetch("http://127.0.0.1:8000/api/agents?page=" + page, requestOption)
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

        const {
            firstName, lastName, address, isAdmin, email, zone, mobile, notes
        } = this.state;

        const data = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            isAdmin: isAdmin,
            email: email,
            mobile: mobile,
            notes: notes,
            zone: zone
        };

        const requestOption = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        fetch("http://127.0.0.1:8000/api/agents", requestOption)
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
            firstName: '',
            lastName: '',
            address: '',
            isAdmin: '',
            photo: '',
            email: '',
            mobile: '',
            notes: '',
            zone: '',
            openModal: false
        })

    };

    handleUpdate = (id) => {
        const {firstName, lastName, address, isAdmin, email, zone, mobile, notes} = this.state;

        const data = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            isAdmin: isAdmin,
            email: email,
            mobile: mobile,
            notes: notes,
            zone: zone
        };

        const requestOption = {
            method: 'PATCH',
            body: JSON.stringify(data),
        };

        fetch("http://127.0.0.1:8000/api/user/" + id, requestOption)
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
            firstName: '',
            lastName: '',
            address: '',
            isAdmin: '',
            email: '',
            mobile: '',
            notes: '',
            zone: '',
            openModal: false
        })

    };

    handleDelete = (id) => {
        const requestOption = {
            method: 'DELETE'
        };

        fetch("http://127.0.0.1:8000/api/agents/" + id, requestOption)
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

        fetch("http://127.0.0.1:8000/api/agents?search=" + search + '&page=' + page, requestOptions)
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

        fetch("http://127.0.0.1:8000/api/agents/" + id, requestOptions)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    id: data.id,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    address: data.address,
                    isAdmin: data.is_admin,
                    email: data.email,
                    mobile: data.mobile,
                    notes: data.notes,
                });
                data.zone &&
                this.setState({
                    zone: data.zone.id
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
            isUpdate: false,
            firstName: '',
            lastName: '',
            address: '',
            isAdmin: '',
            photo: '',
            email: '',
            mobile: '',
            notes: '',
            zone: '',
        })
    };

    closeModal() {
        this.setState({
            openModal: false,
        })
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    };

    handleResetPassword = (id) => {
        const requestOption = {
            method: "PUT"
        };

        fetch("http://127.0.0.1:8000/api/reset-password/" + id, requestOption)
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

    onChangeHandler = event => {
        this.setState({
            media: event.target.files
        })
    };

    render() {
        const {
            data, search, openModal, isUpdate, firstName, lastName,
            address, id, mobile, email, notes,
            zone, isAdmin
        } = this.state;
        const {total, page, totalPages} = this.state.data;
        return (
            <div>
                <button onClick={this.handleModal}>Add User</button>
                <Modal show={openModal} onClose={this.closeModal}>
                    <UsersCreateUpdate valueFirstName={isUpdate ? firstName : ''}
                                       valueLastName={isUpdate ? lastName : ''} valueEmail={isUpdate ? email : ''}
                                       valueMobile={isUpdate ? mobile : ''}
                                       valueAddress={isUpdate ? address : ''}
                                       valueNotes={isUpdate ? notes : ''}
                                       valueZone={isUpdate ? zone : ''}
                                       isAdmin={isUpdate && isAdmin}
                                       isUpdate={isUpdate}
                                       handleChange={this.handleChange}
                                       onChangeHandler={this.onChangeHandler}
                                       handleSubmit={isUpdate ? () => this.handleUpdate(id) : this.handleSubmit}
                                       buttonName={isUpdate ? 'Edit User' : 'Add User'}/>
                </Modal>
                <UsersSearch search={search} handleChange={(event) => this.handleChange(event)}
                             keyUpHandle={() => this.handleFilter(search)}/>
                <table>
                    <tbody>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                    {data.agents && data.agents.map(agent => (
                        <Users id={agent.id} username={agent.username} email={agent.email} mobile={agent.mobile}
                               firstName={agent.firstname} lastName={agent.lastname}
                               handleEditModal={this.handleEditModal} handleDelete={() => {
                            if (window.confirm('Are you sure?')) this.handleDelete(agent.id)
                        }} handleResetPassword={this.handleResetPassword}/>
                    ))}
                    </tbody>
                </table>
                {total > 10 &&
                <div>
                    {(page > 1) && <button onClick={this.handleFirst}>First</button>}
                    {(page > 1) && <button onClick={this.handlePrevious}>Previous</button>}
                    <button>{page}</button>
                    {(page < totalPages) && <button onClick={this.handleNext}>Next</button>}
                    {(page < totalPages) && <button onClick={this.handleLast}>Last</button>}
                </div>
                }
            </div>
        );
    }
}

export default UserApp;