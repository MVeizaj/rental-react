import React from 'react'

class TypesSelect extends React.Component{
    state = {
        types: []
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

        fetch("http://127.0.0.1:8000/api/types-filter", requestOption)
            .then(res => res.json())
            .then(types => (
                this.setState({
                    types
                })
            ))
    };


    render() {
        const {types} = this.state;
        const {handleChange, isUpdate, typeValue} = this.props;
        return (
            <select name="types" onChange={handleChange}>
                <option value=''>Choose an option</option>
                {types.types && types.types.map(type => (
                    <option value={type.id} key={type.id} selected={isUpdate && typeValue === type.id && true}>{type.name}</option>
                ))}
            </select>
        );
    }

}

export default TypesSelect;