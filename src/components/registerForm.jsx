import React from 'react';
import Joi from 'joi-browser';
import Form from "./common/form";
import * as userService from "../services/userService";

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
    doSubmit = async () => {
        try {
            const response = await userService.register(this.state.data);
            localStorage.setItem('token', response.headers['x-auth-token']);
            this.props.history.push('/');            
        } catch (ex) {
            console.log(ex);
            
            if (ex.response && ex.response.status === 400){
                const errors = { ...this.state.errors};
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    }
    render() {
        return (
        <div>
            <h1>Sign up</h1>
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