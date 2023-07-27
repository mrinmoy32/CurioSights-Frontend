import React from "react";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import './Auth.css'

function Auth() {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const AuthSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); //send this to Backend when Backend is ready
  };

  return (
    <form className="authentication" onSubmit={AuthSubmitHandler}>
        <h4 className="authentication__header">Login Required!</h4>
        <hr />
      <Input
        id="email"
        element="input"
        type="email"
        label="Email"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email id."
        onInput={inputHandler}
        placeholder="Please enter the email id"
      />
      <Input
        id="password"
        element="input"
        type="password"
        label="Password"
        validators={[VALIDATOR_MINLENGTH(8)]}
        errorText="Please enter a valid password (at least 8 characters)"
        onInput={inputHandler}
        placeholder="Please enter the password"
      />
      <Button type="submit" disabled={!formState.isValid}>
        LOGIN
      </Button>
      <Button>SIGN UP</Button>
    </form>
  );
}

export default Auth;
