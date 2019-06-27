import React from 'react';

class TypesFilter extends React.Component {
    state = {
        data: {
            types: [],
            count: []
        }
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
            .then(data => (
                this.setState({
                    data
                })
            ))
    };

    render() {
        const {types, count} = this.state.data;
        const itemCount = count && count.length > 0 && count.map(c => c[0]["1"]);
        const {handleChange, search} = this.props;
        return (
            <div>
                {types && types.map((type, i) => (
                    <label key={type.id}>
                        <input
                            type="checkbox"
                            key={type.id}
                            value={type.id}
                            name="search"
                            onChange={(event) => handleChange(event, search)}
                        />

                        {type.name}
                        ({itemCount[i]})
                    </label>
                ))}
            </div>
        );
    }
}

export default TypesFilter