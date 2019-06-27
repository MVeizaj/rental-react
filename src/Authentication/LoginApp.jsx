import React from 'react';

class LoginApp extends React.Component {
    state = {
        username: '',
        password: ''
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    };

    handleLogin = () => {
        const {username, password} = this.state;

        const data = {
            username: username,
            password: password
        };

        const requestOption = {
            method: "POST",
            body: JSON.stringify(data)
        };

        fetch(`http://127.0.0.1:8000/login`, requestOption)
            .then(res => res.json())
            .catch(error => {
                alert(error.message)
            })
            .then(response => {
                response.message && alert(response.message);
            })
    };

    render() {
        const {username, password} = this.state;
        return (
            <div>
                <label htmlFor="username">Username</label><input type="text" name="username"
                                                                 onChange={this.handleChange}
                                                                 value={username} />
                <br/>
                <label htmlFor="password">Password</label><input type="password" name="password"
                                                                 onChange={this.handleChange}
                                                                 value={password} />
                <br/>
                <input type="checkbox" value="remember-me"/> Remember me
                <br/>
                <button onClick={this.handleLogin}>Login</button>
            </div>
        )
    }
}

export default LoginApp;