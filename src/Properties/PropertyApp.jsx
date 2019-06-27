import React from 'react';
import Properties from "./Properties";
import PropertiesSearch from "./PropertiesSearch";
import Modal from "../Modal";
import PropertiesCreateUpdate from "./PropertiesCreateUpdate";

class PropertyApp extends React.Component {
    state = {
        data: {
            count: 0,
            page: 0,
            total: 0,
            totalPages: 0,
            properties: []
        },
        search: '',
        openModal: false,
        isUpdate: false,
        id: '',
        name: '',
        description: '',
        address: '',
        area: '',
        notes: '',
        price: '',
        furniture: '',
        parking: '',
        status: '',
        zone: '',
        type: '',
        contact: ''
    };

    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSale = this.handleSale.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(page = 1) {
        const requestOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${window.token}`
            }
        };

        fetch("http://127.0.0.1:8000/api/properties?page=" + page, requestOption)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        data
                    });
                });
    }

    handleDelete = (id) => {
        const requestOption = {
            method: 'DELETE'
        };

        fetch("http://127.0.0.1:8000/api/properties/" + id, requestOption)
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

        fetch("http://127.0.0.1:8000/api/properties?search=" + search + '&page=' + page, requestOptions)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        data
                    });
                });
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
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

    handleEditModal = id => {
        this.setState({
            openModal: true,
            isUpdate: true
        });

        const requestOptions = {
            method: 'GET',
        };

        fetch("http://127.0.0.1:8000/api/properties/" + id, requestOptions)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    address: data.address,
                    area: data.area,
                    notes: data.notes,
                    price: data.price,
                    furniture: data.has_furniture,
                    parking: data.has_parking,
                    status: data.status
                });
                data.zone &&
                this.setState({
                    zone: data.zone.id
                });
                data.type &&
                this.setState({
                    type: data.type.id
                });
                data.contact &&
                this.setState({
                    contact: data.contact.id
                })
            });
    };

    handleSale = id => {
        const requestOption = {
            method: "PATCH"
        };

        fetch("http://127.0.0.1:8000/api/sold/" + id, requestOption)
            .then(res => res.json())
            .catch(error => (
                alert(error.message)
            ))
            .then(response => (
                alert(response.message)
            ))
            .then(() => (
                this.loadData()
            ))
    };

    render() {
        const {page, total, totalPages} = this.state.data;
        const {
            data, openModal, isUpdate, search, name, description
            , address, area, notes, price, id, furniture, parking, status,
            type, contact, zone
        } = this.state;
        return (
            <div>
                <button onClick={this.handleModal}>Add Property</button>
                <Modal show={openModal} onClose={this.closeModal}>
                    <PropertiesCreateUpdate valueName={isUpdate ? name : ''} valueAddr={isUpdate ? address : ''}
                                            valueDesc={isUpdate ? description : ''}
                                            valueArea={isUpdate ? area : ''}
                                            valueNotes={isUpdate ? notes : ''}
                                            valuePrice={isUpdate ? price : ''} valueParking={parking}
                                            valueFurniture={furniture} isUpdate={isUpdate} valueStatus={status}
                                            valueZone={zone} valueType={type} valueContact={contact}
                                            handleChange={this.handleChange}
                                            handleSubmit={isUpdate ? () => this.handleUpdate(id) : this.handleSubmit}
                                            buttonName={isUpdate ? 'Edit Property' : 'Add Property'}
                    />
                </Modal>
                <br/>
                <PropertiesSearch search={search} handleChange={(event) => this.handleChange(event)}
                                  keyUpHandle={() => this.handleFilter(search)}/>
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Agent</th>
                        <th>Actions</th>
                    </tr>
                    {data.properties && data.properties.map(property => (
                        <Properties id={property.id} name={property.name}
                                    description={property.description.substring(0, 60)}
                                    userFirstname={property.user.firstname} userLastname={property.user.lastname}
                                    handleEditModal={this.handleEditModal} handleDelete={() => {
                            if (window.confirm('Are you sure?')) this.handleDelete(property.id)
                        }} soldButtonName={property.is_sold ? 'Sold' : 'UnSold'} handleSale={this.handleSale}/>
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

export default PropertyApp;