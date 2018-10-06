import React, { Component } from 'react';
import Joi from 'joi-browser';

class Form extends Component {
    state = { 
        data: {},
        errors: {}
    }

    validate = () => {
        const options = {abortEarly: false};
        const { error } = Joi.validate(this.state.data, this.schema, options);
        
        const errors = {}
        if (!error) return null;
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
        // return Object.keys(errors).length === 0 ? null : errors;
    }
    validateProperty= ({name, value}) => {
        const obj = { [name]: value } //computed properties in ES6 to take and store values dynamically
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema )
        // if (!error) return null;
        // return error.details[0].message
        return error ? error.details[0].message : null;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {}  });
        if (errors) return;
        this.doSubmit();
    }
    handleChange = ({ currentTarget: input }) => {
        const errors = {...this.state.errors}
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name]=errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data}
        data[input.name] = input.value;
        this.setState({ data, errors })
    }
}
 
export default Form;