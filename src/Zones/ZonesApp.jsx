import React from 'react'
import Zones from './Zones'
import Modal from "../Modal";
import ZoneSearch from "./ZoneSearch";
import ZonesCreateUpdate from "./ZonesCreateUpdate";

class ZonesApp extends React.Component {
    state = {
        data: {
            count: 0,
            page: 0,
            total: 0,
            totalPages: 0,
            zones: []
        },
        openModal: false,
        name: '',
        description: '',
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

        fetch("http://127.0.0.1:8000/api/zones?page=" + page, requestOption)
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

        const {name, description} = this.state;

        const data = {name: name, description: description};

        const requestOption = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        fetch("http://127.0.0.1:8000/api/zones", requestOption)
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
            description: '',
            openModal: false
        })

    };

    handleUpdate = (id) => {
        const {name, description} = this.state;
        const data = {name: name, description: description};

        const requestOption = {
            method: 'PUT',
            body: JSON.stringify(data),
        };

        fetch("http://127.0.0.1:8000/api/zones/" + id, requestOption)
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
            name: '',
            description: ''
        })

    };

    handleDelete = (id) => {
        const requestOption = {
            method: 'DELETE'
        };

        fetch("http://127.0.0.1:8000/api/zones/" + id, requestOption)
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

        fetch("http://127.0.0.1:8000/api/zones?search=" + search + '&page=' + page, requestOptions)
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

        fetch("http://127.0.0.1:8000/api/zone/" + id, requestOptions)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    id: data.id,
                    name: data.name,
                    description: data.description
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
        const {data, openModal, search, name, description, isUpdate, id} = this.state;
        const {page, total, totalPages} = this.state.data;

        return (
            <div>
                <button onClick={this.handleModal}>Add Zone</button>
                <Modal show={openModal} onClose={this.closeModal}>
                    <ZonesCreateUpdate valueName={isUpdate ? name : ''} valueDesc={isUpdate ? description : ''}
                                       handleChange={this.handleChange}
                                       handleSubmit={isUpdate ? () => this.handleUpdate(id) : this.handleSubmit}
                                       buttonName={isUpdate ? 'Edit Zone' : 'Add Zone'}/>
                </Modal>
                <br/>
                <ZoneSearch search={search} handleChange={(event) => this.handleChange(event)}
                            keyUpHandle={() => this.handleFilter(search)}/>
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    {data.zones && data.zones.map(item => (
                        <Zones id={item.id} name={item.name} description={item.description}
                               handleEditModal={this.handleEditModal} handleDelete={() => {
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
        )
    }
}

export default ZonesApp;