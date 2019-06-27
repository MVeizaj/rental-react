import React from 'react'

function Contacts(props) {
    const {id, name, email, mobile, notes, handleEditModal, handleDelete} = props;
    return (
        <tr>
            <td key={id}>{name}</td>
            <td>{email}</td>
            <td>{mobile}</td>
            <td>{notes}</td>
            <td>
                <button onClick={() => handleEditModal(id)}>Edit</button>
                <button onClick={() => handleDelete(id)}>Delete</button>
            </td>
        </tr>
    )
}

export default Contacts;