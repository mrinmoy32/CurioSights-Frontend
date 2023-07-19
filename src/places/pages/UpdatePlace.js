import React from 'react';
import { useParams } from 'react-router-dom';
// import DUMMY_PLACES from './UserPalces';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
  } from "../../shared/util/validators";

  const DUMMY_PLACES = [
    {
      id: "p1",
      title: "Tirupati Balaji Temple",
      description: "Most visited indian temple",
      imageUrl: "https://blog.thomascook.in/wp-content/uploads/2019/11/tirupati-balaji-temple.jpg.jpg",
      address: "Tirumala, Tirupati, Andhra Pradesh 517501",
      location: {
        lat: 13.683272,
        lng: 79.347245,
      },
      creator: "u1",
    },
    {
      id: "p2",
      title: "The Great Wall of China",
      description: "One of the wonders of the world",
      imageUrl:
        "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892506/EducationHub/photos/the-great-wall-of-china.jpg",
      address: "Jiankou, Huairou District, China",
      location: {
        lat: 40.431908,
        lng: 116.565291,
      },
      creator: "u2",
    },
    {
      id: "p3",
      title: "Machu Picchu",
      description: "Ancient Inca city in the Andes",
      imageUrl:
        "https://cms.valenciatravelcusco.com/media/images/package/sacred-valley-and-machu-picchu-by-train_Z4e2XgX.jpg",
      address: "Machu Picchu, Aguas Calientes, Peru",
      location: {
        lat: -13.163141,
        lng: -72.545872,
      },
      creator: "u1",
    },
  ];

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