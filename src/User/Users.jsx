import React from 'react'
import {Link} from 'react-router-dom';

function Users(props) {
    const {
        id, username, firstName, lastName, email, mobile,
        handleEditModal, handleDelete, handleResetPassword
    } = props;
    return (
        <tr>
            <td key={id}>{username}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{mobile}</td>
            <td>
                <button onClick={() => handleEditModal(id)}>Edit</button>
                <button onClick={() => handleDelete(id)}>Delete</button>
                <button onClick={() => handleResetPassword(id)}>Reset Password</button>
                <Link to={"/user/" + id}>Profile</Link>
            </td>
        </tr>
    )
}

export default Users;