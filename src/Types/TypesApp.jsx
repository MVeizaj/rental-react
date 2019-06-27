import React from 'react';
import '../App.css';
import Types from "./Types";
import TypesCreateUpdate from "./TypesCreateUpdate";
import Modal from "../Modal";
import TypeSearch from "./TypeSearch";

class TypesApp extends React.Component {
    state = {
        data: {
            count: 0,
            page: 0,
            total: 0,
            totalPages: 0,
            types: []
        },
        name: '',
        openModal: false,
        id: '',
        isUpdate: false,
        search: '',
    };

    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleEditModal = this.handleEditModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleFirst = this.handleFirst.bind(this);
        this.handleLast = this.handleLast.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(page = 1) {
        const requestOptions = {
            method: 'GET',
        };

        fetch("http://127.0.0.1:8000/api/types?page=" + page, requestOptions)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        data
                    });
                });
    };

    handleModal = () => {
        this.setState({
            openModal: true,
            isUpdate: false,
            name: '',
        });
    };

    closeModal = () => {
        this.setState({
            openModal: false,
            isUpdate: false
        });
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    };

    handleSubmit = event => {
        event.preventDefault();

        const {name} = this.state;

        const data = {name: name};

        const requestOption = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        fetch("http://127.0.0.1:8000/api/types", requestOption)
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
            openModal: false
        })

    };

    handleEditModal = id => {
        this.setState({
            openModal: true,
            isUpdate: true
        });

        const requestOptions = {
            method: 'GET',
        };

        fetch("http://127.0.0.1:8000/api/types/" + id, requestOptions)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    id: data.id,
                    name: data.name
                })
            });
    };

    handleUpdate = (id) => {
        const data = {name: this.state.name};

        const requestOption = {
            method: 'PUT',
            body: JSON.stringify(data),
        };

        console.log(this.state.name);

        fetch("http://127.0.0.1:8000/api/types/" + id, requestOption)
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
            openModal: false,
            name: ''
        })

    };

    handleDelete = (id) => {
        const requestOption = {
            method: 'DELETE',
        };

        fetch("http://127.0.0.1:8000/api/types/" + id, requestOption)
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

        fetch("http://127.0.0.1:8000/api/types?search=" + search + '&page=' + page, requestOptions)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        data
                    });
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

    render() {
        const {data, openModal, name, isUpdate, id, search} = this.state;
        const {page, total, totalPages} = this.state.data;

        return (
            <div>
                <button onClick={this.handleModal}>Add Type</button>
                <br/>
                <Modal show={openModal} onClose={this.closeModal}>
                    <TypesCreateUpdate value={isUpdate ? name : ''} handleChange={this.handleChange}
                                       handleSubmit={isUpdate ? () => this.handleUpdate(id) : this.handleSubmit}
                                       buttonName={isUpdate ? 'Edit Type' : 'Add Type'}/>
                </Modal>
                <br/>
                <TypeSearch search={search} handleChange={(event) => this.handleChange(event)}
                            keyUpHandle={() => this.handleFilter(search)}/>
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    {data.types && data.types.map(item => (
                        <Types id={item.id} name={item.name} handleEditModal={this.handleEditModal}
                               handleDelete={() => {
                                   if (window.confirm('Are you sure?')) this.handleDelete(item.id)
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
        );
    }
}

export default TypesApp;
