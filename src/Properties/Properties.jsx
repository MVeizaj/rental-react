import React from 'react';
import {Link} from "react-router-dom";

function Properties(props) {
    const {
        id, name, description, userFirstname, userLastname,
        handleEditModal, handleDelete, soldButtonName, handleSale
    } = props;
    return (
        <tr>
            <td key={id}>{name}</td>
            <td>{description}...</td>
            <td>{userFirstname} {userLastname}</td>
            <td>
                <button onClick={() => handleEditModal(id)}>Edit</button>
                <Link to={"media/property/"+id}>Media</Link>
                <button onClick={() => handleDelete(id)}>Delete</button>
                <button onClick={() => handleSale(id)}>{soldButtonName}</button>
            </td>
        </tr>
    )
}

export default Properties;