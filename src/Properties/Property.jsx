import React from 'react';
import PropertiesMedia from "./PropertiesMedia";

class Property extends React.Component{
    state = {
        data: []
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        const id = this.props.match.params.id;
        const requestOption = {
            method: "GET"
        };

        fetch("http://127.0.0.1:8000/api/properties/" + id, requestOption)
            .then(res => res.json())
            .then(data => {
                this.setState({data})
            })
    };

    render() {
        const {id, name, area, price, description} = this.state.data;
        const routeID = this.props.match.params.id;
        return (
            <div>
                <h4 key={id}><b>{name} {area} {price} {description}</b></h4>
                <PropertiesMedia id={routeID}/>
            </div>
        );
    }
}

export default Property;