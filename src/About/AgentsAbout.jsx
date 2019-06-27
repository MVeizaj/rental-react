import React from 'react';
import {Link} from "react-router-dom";

class AgentsAbout extends React.Component {
    state = {
        error: false,
        page: this.props.page
    };

    onError = () => {
        const {error} = this.state;
        if (!error) {
            this.setState({
                error: true
            });
        }
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const {page} = this.state;
        if (nextProps.page !== page){
            this.setState({
                page: nextProps.page,
                error: false
            })
        }
    }

    render() {
        const {error} = this.state;
        const {id, firstName, lastName} = this.props;

        const imageName = require("../Images/ico_avatar_1189275.png");

        return (
            <div key={id}>
                {error === false ?
                    <img onErrorCapture={this.onError} src={`http://127.0.0.1:8000/api/media/user/${id}`}
                         alt={`user${id}`} width="70" height="70"/> :
                    <img src={imageName} alt={"user_avatar"} width="70" height="70"/>
                }
                <h4 key={id}><b>{firstName} {lastName}</b></h4>
                <Link to={"/agent/" + id}>More Info</Link>
            </div>
        );
    }

}

export default AgentsAbout;
