import React from 'react';
import Joi from 'joi-browser';
import Form from "./common/form";

class RegisterForm extends Form {
    state={
        data: {email: '', password: "", username: ''},
        errors: {}
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        email: Joi.string().email().required().label('Email')
    }
    doSubmit = () => {
        //Call server
        console.log('submitted');
    }
    render() {
        return (
        <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('email','Email')}
                {this.renderInput('password','Password', 'password')}
                {this.renderInput('username','Username')}
                {this.renderButton('Register')}
            </form>
        </div>
        );
    }
}

 
export default RegisterForm;