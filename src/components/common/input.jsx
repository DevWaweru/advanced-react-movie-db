import React from 'react';

// const Input = ({ name, label, error, value, type, onChange }) => {
const Input = ({ name, label, error, ...rest }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {/* <input value={value} onChange={onChange} type={type} name={name} autoFocus id={name} className="form-control" /> */}
            <input {...rest} name={name} autoFocus id={name} className="form-control" />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
     );
}
 
export default Input;