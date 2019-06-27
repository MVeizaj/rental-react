import React from 'react';
import Modal from "../Modal";
import ChangePassword from "./ChangePassword";

class UserProfile extends React.Component {
    state = {
        photo: null,
        imageHash: Date.now(),
        error: false,
        changePasswordModal: false,
        oldPassword: '',
        newPassword: '',
        repeatedPassword: '',
    };

    constructor(props) {
        super(props);

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.handlePasswordModal = this.handlePasswordModal.bind(this);
        this.closePasswordModal = this.closePasswordModal.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onChangeHandler = event => {
        this.setState({
            photo: event.target.files[0]
        })
    };

    onClickHandler = () => {
        const {photo} = this.state;
        const id = this.props.match.params.id;

        if (photo === null) {
            alert("Upload a file!");
        } else {
            const data = new FormData();
            data.append('photo', photo);

            const requestOption = {
                method: "POST",
                body: data
            };

            fetch("http://127.0.0.1:8000/api/media/user/" + id, requestOption)
                .then(res => res.json())
                .then(response => {
                    alert(response.message);
                    this.setState({
                        imageHash: Date.now(),
                        error: false
                    });
                })
                .catch(error => {
                    alert(error.message);
                })

        }

    };

    onError = () => {
        const {error} = this.state;
        if (!error) {
            this.setState({
                error: true,
            });
        }
    };

    handlePasswordModal = (id) => {
        this.setState({
            changePasswordModal: true
        });

        const requestOptions = {
            method: 'GET',
        };

        fetch("http://127.0.0.1:8000/api/agents/" + id, requestOptions)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    id: data.id
                })
            });
    };

    closePasswordModal() {
        this.setState({
            changePasswordModal: false
        })
    };

    changePassword = (id) => {
        const {oldPassword, newPassword, repeatedPassword} = this.state;

        const data = {oldPassword: oldPassword, newPassword: newPassword, repeatedPassword: repeatedPassword};

        const requestOption = {
            method: "PUT",
            body: JSON.stringify(data)
        };

        fetch("http://127.0.0.1:8000/api/change-password/" + id, requestOption)
            .then(res => res.json())
            .catch(error => (
                alert(error.message)
            ))
            .then(response => {
                alert(response.message);
                response.status === 'OK' && this.setState({changePasswordModal: false})
            })
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    };

    render() {
        const id = this.props.match.params.id;
        const {imageHash, error} = this.state;

        const imageName = require("../Images/ico_avatar_1189275.png");

        const {changePasswordModal} = this.state;

        return (
            <div>
                <div>
                    <input type="file" name="photo" onChange={this.onChangeHandler}/>
                    <br/>
                    <button onClick={this.onClickHandler}>Upload</button>
                    <br/>
                    {error === true ? <img src={imageName} alt={"user_avatar"} width="70" height="70"/> :
                        <img onErrorCapture={this.onError}
                             src={`http://127.0.0.1:8000/api/media/user/${id}?${imageHash}`}
                             alt={"media" + id} width="70" height="70"/>}
                </div>
                <div>
                    <br/>
                    <button onClick={() => this.handlePasswordModal(id)}>Change Password</button>
                    <br/>
                    <Modal show={changePasswordModal} onClose={this.closePasswordModal}>
                        <ChangePassword id={id} handleChange={this.handleChange} changePassword={this.changePassword}/>
                    </Modal>
                </div>
            </div>
        );
    }

}

export default UserProfile;