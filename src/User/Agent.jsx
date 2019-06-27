import React from 'react';
import ContactAgent from "../About/ContactAgent";
import Modal from "../Modal";

class Agent extends React.Component {
    state = {
        data: [],
        openModal: false,
        id: '',
        name: '',
        email: '',
        message: '',
        agentEmail: '',
        error: false
    };

    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        const id = this.props.match.params.id;
        const requestOption = {
            method: "GET"
        };

        fetch("http://127.0.0.1:8000/api/agents/" + id, requestOption)
            .then(res => res.json())
            .then(data => {
                this.setState({data});
                this.setState({
                    error: false
                })
            })
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    };

    handleModal = id => {
        this.setState({
            openModal: true,
        });

        const requestOptions = {
            method: 'GET',
        };

        fetch("http://127.0.0.1:8000/api/agents/" + id, requestOptions)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    id: data.id,
                    agentEmail: data.email
                })
            });
    };

    closeModal = () => {
        this.setState({
            openModal: false
        });
    };

    sendEmail = (id) => {
        const {email, name, message} = this.state;

        const data = {email: email, name: name, message: message};

        const requestOption = {
            method: 'POST',
            body: JSON.stringify(data),
        };

        fetch("http://127.0.0.1:8000/api/contact/" + id, requestOption)
            .then(res => res.json())
            .catch(error => (
                alert(error.message)
            ))
            .then(response => (
                alert(response.message)
            ))
            .then(this.loadData);

        this.setState({
            openModal: false
        })
    };

    onError = () => {
        const {error} = this.state;
        if (!error) {
            this.setState({
                error: true,
            });
        }
    };

    render() {
        const {id, firstname, lastname, email, mobile} = this.state.data;
        const {error, openModal} = this.state;
        const imageName = require("../Images/ico_avatar_1189275.png");
        return (
            <div>
                <Modal show={openModal} onClose={this.closeModal}>
                    <ContactAgent id={id} handleChange={(event) => this.handleChange(event)}
                                  sendEmail={() => this.sendEmail(id)}/>
                </Modal>
                <h4 key={id}><b>{firstname} {lastname} {email} {mobile}</b></h4>
                {error === true ? <img src={imageName} alt={"user_avatar"} width="70" height="70"/> :
                    <img onErrorCapture={this.onError}
                         src={`http://127.0.0.1:8000/api/media/user/${id}`}
                         alt={"media" + id} width="70" height="70"/>}
                <br/>
                <button onClick={() => this.handleModal(id)}>Contact {firstname} {lastname}</button>
            </div>
        )
    }

}

export default Agent;