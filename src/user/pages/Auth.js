import React, { useState, useContext } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { AuthContext } from "../../shared/context/auth.context";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Auth.css";

function Auth() {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsloading] =useState(false);
  const [error, setError] =useState();

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

  const AuthSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
    } else {
      try {
        setIsloading(true);
        setError(null);
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        console.log(responseData);
        setIsloading(false);
        auth.login();

      } catch (error) {
        setError(error.message || 'Something went wrong, plesae try again')
        console.log('fetch error', error);
      }
      
      console.log(formState.inputs); //send this to Backend when Backend is ready
    }
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
      {isLoading && <LoadingSpinner asOverlay/>}
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
