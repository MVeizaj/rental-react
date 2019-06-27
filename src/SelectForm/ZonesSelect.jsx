import React from 'react'

class ZonesSelect extends React.Component{
    state = {
        zones: []
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

        fetch("http://127.0.0.1:8000/api/zones-select", requestOption)
            .then(res => res.json())
            .then(zones => (
                this.setState({
                    zones
                })
            ))
    };


    render() {
        const {zones} = this.state;
        const {handleChange, zoneValue, isUpdate} = this.props;
        return (
            <select name="zone" onChange={handleChange} >
                <option value=''>Choose an option</option>
                {zones.zones && zones.zones.map(zone => (
                    <option value={zone.id} key={zone.id} selected={isUpdate && zoneValue === zone.id && true}>{zone.name}</option>
                ))}
            </select>
        );
    }

}

export default ZonesSelect;