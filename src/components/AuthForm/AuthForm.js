import React from 'react';
import Classes from './AuthForm.module.css';
import AuthFormInput from '../Inputs/AuthFormInput/AuthFormInput';

class AuthForm extends React.Component {
  state = {
    formFields: [
      { name: 'handle', placeholder: 'Enter your handle', type: 'text', validation: {}, value: '', },
      { name: 'password', placeholder: 'Enter your password', type: 'password', validation: {}, value: '', },
      { name: 'newHandle', placeholder: 'Enter your new handle', type: 'text', validation: {}, value: '', },
      { name: 'newPassword', placeholder: 'Enter your new password', type: 'new-password', validation: {}, value: '', },
      { name: 'confirmNewPassword', placeholder: 'Confirm your new password', type: 'new-password', validation: {}, value: '', },
    ],
  }

  handleChange = (e, fieldName) => {
    const formFields = [...this.state.formFields]
    const targetFieldIndex = formFields.findIndex(field => field.name === fieldName);
    formFields[targetFieldIndex].value = e.target.value;
    this.setState({ formFields: formFields });
  }

  renderInputs = () => {
    const currentFields = [ ...this.state.formFields ];
    const selectedFields = this.props.isSignUp ? [currentFields[2], currentFields[3], currentFields[4]] : [currentFields[0], currentFields[1]];
    return selectedFields.map((field, i) => {
      return <AuthFormInput
        key={`id_${i}_${field.name}`}
        placeholder={field.placeholder}
        name={field.name}
        type={field.type}
        validation={field.validation}
        onChange={(e) => { this.handleChange(e, field.name) }}
        value={field.value}
      />
    });
  }

  render() {
    const form = this.renderInputs();

    return (
      <div className={Classes.AuthForm} data-test='component-auth-form'>
        {form}
        <button 
          type='submit'
          value={'Submit'}
          data-test='submit-button'>Submit</button>
      </div>
    );
  }
}

export default AuthForm;
