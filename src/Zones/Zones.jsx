import React from 'react'

function Zones(props) {
    const {id, name, description, handleEditModal, handleDelete} = props;
    return (
        <tr>
            <td key={id}>{name}</td>
            <td>{description}</td>
            <td>
                <button onClick={() => handleEditModal(id)}>Edit</button>
                <button onClick={() => handleDelete(id)}>Delete</button>
            </td>
        </tr>
    )
}

export default Zones;