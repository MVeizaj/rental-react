import React from 'react';
import Results from "../FilterResults/Results";
import TypesFilter from "./TypesFilter";

class HomeApp extends React.Component {
    state = {
        data: {
            count: 0,
            page: 0,
            total: 0,
            totalPages: 0,
            properties: []
        },
        search: [],
    };

    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);
        this.handleFirst = this.handleFirst.bind(this);
        this.handleLast = this.handleLast.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = (page = 1) => {

        const requestOption = {
            method: "GET"
        };

        fetch("http://127.0.0.1:8000/api/home?page=" + page, requestOption)
            .then(res => res.json())
            .then(data => (
                this.setState({
                    data
                })
            ));
    };

    handleChange = (event, search) => {
        const {name, value, checked} = event.target;
        let index;
        if (checked) {
            search.push(+value);
        } else {
            index = search.indexOf(+value);
            search.splice(index, 1);
        }
        this.setState({[name]: search});

        this.handleFilter(search.toString())
    };

    handleFilter = (search, page = 1) => {
        const requestOption = {
            method: "GET"
        };

        fetch("http://127.0.0.1:8000/api/home?search=" + search.toString() + "&page=" + page, requestOption)
            .then(res => res.json())
            .then(data => (
                this.setState({
                    data
                })
            ));
    };

    handleFirst = () => {
        const {search} = this.state;
        this.handleFilter(search.toString(), 1);
    };

    handlePrevious = () => {
        const {search} = this.state;
        const {page} = this.state.data;
        this.handleFilter(search.toString(), parseInt(page) - 1);
    };

    handleNext = () => {
        const {search} = this.state;
        const {page} = this.state.data;
        this.handleFilter(search.toString(), parseInt(page) + 1);
    };

    handleLast = () => {
        const {search} = this.state;
        const {totalPages} = this.state.data;
        this.handleFilter(search.toString(), totalPages);
    };

    render() {
        const {data, search} = this.state;
        const {total, page, totalPages} = this.state.data;
        return (
            <div>
                <TypesFilter search={search} handleChange={this.handleChange}/>
                {data.properties && data.properties.map(property => (
                    <Results id={property.id} name={property.name} area={property.area}/>
                ))}
                <br/>
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

export default HomeApp;