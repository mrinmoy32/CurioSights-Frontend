import React, { useState } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Auth.css";

function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
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

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          name: undefined,
          ...formState.inputs,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          name: {
            value: "",
            isValid: false,
          },
          ...formState.inputs,
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <React.Fragment>
      <form className="authentication" onSubmit={AuthSubmitHandler}>
        <h4 className="authentication__header">Login Required!</h4>
        <hr />
        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="name"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={inputHandler}
            placeholder="Please enter a name"
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email id"
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
          {isLoginMode ? "LOGIN" : "SIGN UP"}
        </Button>
        <div className="authentication__swich-button">
          <Button
            className="authentication__swich-button"
            inverse
            onClick={switchModeHandler}
          >
            {isLoginMode ? "New User? SIGN UP" : "Exixting User? LOGIN"}
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default Auth;
