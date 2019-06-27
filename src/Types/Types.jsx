import React from 'react';

function Types(props) {
    const {id, name, handleEditModal, handleDelete} = props;
    return (
        <tr>
            <td key={id}>{name}</td>
            <td>
                <button onClick={() => handleEditModal(id)}>Edit</button>
                <button onClick={() => handleDelete(id)}>Delete</button>
            </td>
        </tr>
    );
}

export default Types;