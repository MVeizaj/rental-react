import React from 'react'

function ChangePassword(props) {
    const {id, handleChange, changePassword} = props;
    return(
        <div>
            OLD<input type="password" name="oldPassword" onChange={handleChange}/>
            <br/>
            NEW<input type="password" name="newPassword" onChange={handleChange}/>
            <br/>
            NEW<input type="password" name="repeatedPassword" onChange={handleChange}/>
            <br/>
            <button onClick={() => changePassword(id)}>Change Password</button>
        </div>
    )
}

export default ChangePassword