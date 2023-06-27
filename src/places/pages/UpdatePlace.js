import React from 'react';
import { useParams } from 'react-router-dom';
import DUMMY_PLACES from './UserPalces';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
  } from "../../shared/util/validators";

function UpdatePlace() {
    const placeId = useParams().placeId;

    const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);
    //console.log(DUMMY_PLACES);

    if (!identifiedPlace){
        return <div className='center'><h2>Could not find place</h2></div>
    }
  return (
    <form>
        <Input 
        id="title" 
        element="input" 
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
        />
        <Input 
        id="description" 
        element="textarea" 
        label="Description"
        validators={[VALIDATOR_MINLENGTH(10)]}
        errorText="Please enter a valid description min 10 characters."
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
        />
        <Button type='submit' disbled={true}>UPDATE PLACE</Button>
    </form>
  )
}

export default UpdatePlace