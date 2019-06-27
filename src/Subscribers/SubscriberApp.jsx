import React from 'react'

class SubscriberApp extends React.Component {
    state = {
        email: ''
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    handleSubscribe = () => {
        const {email} = this.state;

        const data = {email: email};

        const requestOption = {
            method: "POST",
            body: JSON.stringify(data)
        };

        fetch("http://127.0.0.1:8000/api/subscribe", requestOption)
            .then(res => res.json())
            .catch(error => {
                console.log(error.message);
                alert(error.message);
            })
            .then( response => {
                console.log(response.message);
                alert(response.message);
            });

        this.setState({
            email: ''
        })
    };

    render() {
        const {email} = this.state;
        return (
            <div>
                <input type="email" name="email" onChange={this.handleChange} value={email}/>
                <input type="submit" value="Subscribe" onClick={this.handleSubscribe}/>
            </div>
        )
    }
}

export default SubscriberApp