//A custom hook is a function that starts with use and can share stateful logic

//Here in form-hook I want to hold my useReducer logic that I've set up in NewPlace
import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  //You can build a hook that uses other built-in hooks (like useState())
  //and any component that uses your hook will then use the built-in hooks you might be using
  //in your custom hook as well.

  //This allows you to build hooks like the useForm() hook that we are creating here.
  //The idea here is that we can share our stateful form logic (that uses useReducer() in our case)
  //across components. This avoids code duplication, makes it easy to change the code
  //and leads to more readable code.

  //With all that "custom hook" jargon, it's easy to overlook that custom hooks in the end
  //are normal JavaScript functions though - never forget that!

  //If you use useForm() in your component function, it will get called for every re-evaluation
  //of your component (i.e. for every re-render cycle). Hence all the logic in a custom hook runs
  //every time your component function is executed.

  //Of course a lot of built-in hooks like useState() or useReducer() have mechanisms to ensure
  //that state changes are kept across re-render cycles.

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);
  return [formState, inputHandler];
};
