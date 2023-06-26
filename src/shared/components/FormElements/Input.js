import React, { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";
import "./Input.css";

//In below code inputReducer is the reducer that takes current state and action
//So in this reducer function we will always have to return new state depending on action
//we can use switch statement to find what action we have like option that were dispatched
//will have a type property
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      // so depending upon the change type we would return the new statement
      return {
        ...state, //the ...state copies all the key, value pairs from current state
        value: action.val, //here we are passing the new value as a property in action object
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

function Input(props) {
  // when we are managing more than one state, and the two states are kind of connected
  //then we can use 2 useState hooks but it's better to use useReducer hook
  //With useReducer hook we can manage more complex state with ease and we can write some logic that runs
  //whenever want to change the state to do more complex step than just setting the value

  // useReducer hooks takes a argument called reducer is a func that receives an action which we can dispatch
  // and it receives the current state and updates the current state based on the action recived
  //then return the new state and useReducer will take the new state and give the state back to component
  // and rerender the component

  //userReducer taking the inputReducer as argumnet, also useReducer can take 2nd argument as
  //initial state with which we want to initialize our component like we used below

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });
  //just like useState hook useReducer also retruns an array with exactly 2 elements
  //which we would be storing in variables using the array destructing shown above
  //and the 2 elements we always get from useReducer are current state and a dispacth func which we can call
  //Here those are inputState and dispatch

  //So this is how we will disptach actions to the reducer function which will run throgh the function and
  //return new state, which will update the input state and the component will rerender

  //The object passed to the dispatch function is actually the action object

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  // console.log(inputState.value); //here we get the text typed in the input field of form

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}

export default Input;
