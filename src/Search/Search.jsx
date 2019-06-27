import React from 'react';
import TypesSelect from "../SelectForm/TypesSelect";
import ZonesSelect from "../SelectForm/ZonesSelect";
import Results from "../FilterResults/Results";

class SearchApp extends React.Component {
    state = {
        parameters: {
            maxArea: 0,
            maxPrice: 0,
            minArea: 0,
            minPrice: 0
        },
        data: {
            count: 0,
            page: 0,
            total: 0,
            totalPages: 0,
            properties: []
        },
        area: 0,
        price: 0,
        status: 1,
        hasParking: 1,
        hasFurniture: 1,
        zone: '',
        types: ''
    };

    constructor(props) {
        super(props);

        this.loadParameters = this.loadParameters.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFirst = this.handleFirst.bind(this);
        this.handleLast = this.handleLast.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
    }

    componentDidMount() {
        this.loadParameters();
    }

    loadParameters = () => {
        const requestOption = {
            method: "GET"
        };

        fetch("http://127.0.0.1:8000/api/area-price", requestOption)
            .then(res => res.json())
            .then(parameters => (
                this.setState({
                    parameters
                })
            ))
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    };

    handleShow = (id, event) => {
        event.preventDefault();
        console.log(id)
    };

    handleSearch = (area, price, status, furniture, parking, types, zone, page = 1) => {

        const requestOption = {
            method: "GET"
        };

        fetch("http://127.0.0.1:8000/api/search?area=" + area + "&price=" + price + "&status=" +
            status + "&furniture=" + furniture + "&parking=" + parking + "&type=" + types +
            "&zone=" + zone + "&page=" + page, requestOption)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    data
                });
            });
    };

    handleFirst = () => {
        const {area, price, status, hasFurniture, hasParking, types, zone} = this.state;
        this.handleSearch(area, price, status, hasFurniture, hasParking, types, zone, 1);
    };

    handlePrevious = () => {
        const {area, price, status, hasFurniture, hasParking, types, zone} = this.state;
        const {page} = this.state.data;
        this.handleSearch(area, price, status, hasFurniture, hasParking, types, zone, parseInt(page) - 1);
    };

    handleNext = () => {
        const {area, price, status, hasFurniture, hasParking, types, zone} = this.state;
        const {page} = this.state.data;
        this.handleSearch(area, price, status, hasFurniture, hasParking, types, zone, parseInt(page) + 1);
    };

    handleLast = () => {
        const {area, price, status, hasFurniture, hasParking, types, zone} = this.state;
        const {totalPages} = this.state.data;
        this.handleSearch(area, price, status, hasFurniture, hasParking, types, zone, totalPages);
    };

    render() {
        const {data, area, price, status, hasFurniture, hasParking, types, zone} = this.state;
        const {total, page, totalPages} = this.state.data;
        const {minArea, maxArea, minPrice, maxPrice} = this.state.parameters;
        return (
            <div>
                area
                <input type="range" name="area" onChange={this.handleChange}
                       min={minArea} max={maxArea}/>{area}
                <br/>
                price
                <input type="range" name="price" onChange={this.handleChange}
                       min={minPrice} max={maxPrice}/>{price}
                <br/>
                status
                <select name="status" onChange={this.handleChange}>
                    <option value="1">Sale</option>
                    <option value="0">Rent</option>
                </select>
                <br/>
                type
                <TypesSelect handleChange={this.handleChange}/>
                <br/>
                zone
                <ZonesSelect handleChange={this.handleChange}/>
                <br/>
                has furniture
                <select name="hasFurniture" onChange={this.handleChange}>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
                <br/>
                has parking
                <select name="hasParking" onChange={this.handleChange}>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
                <br/>
                <button
                    onClick={() => this.handleSearch(area, price, status, hasFurniture, hasParking, types, zone)}>Search
                </button>
                <br/>
                <div>
                    {data.properties && data.properties.map(property => (
                        <Results id={property.id} name={property.name} area={property.area}
                                 handleShow={(event) => this.handleShow(property.id, event)}/>
                    ))}
                </div>
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

export default SearchApp;