import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import DUMMY_PLACES from './UserPalces';
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElement/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./PlaceForm.css";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import { AuthContext } from "../../shared/context/auth.context";

// const DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Tirupati Balaji Temple",
//     description: "Most visited indian temple",
//     imageUrl:
//       "https://blog.thomascook.in/wp-content/uploads/2019/11/tirupati-balaji-temple.jpg.jpg",
//     address: "Tirumala, Tirupati, Andhra Pradesh 517501",
//     location: {
//       lat: 13.683272,
//       lng: 79.347245,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "The Great Wall of China",
//     description: "One of the wonders of the world",
//     imageUrl:
//       "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892506/EducationHub/photos/the-great-wall-of-china.jpg",
//     address: "Jiankou, Huairou District, China",
//     location: {
//       lat: 40.431908,
//       lng: 116.565291,
//     },
//     creator: "u2",
//   },
//   {
//     id: "p3",
//     title: "Machu Picchu",
//     description: "Ancient Inca city in the Andes",
//     imageUrl:
//       "https://cms.valenciatravelcusco.com/media/images/package/sacred-valley-and-machu-picchu-by-train_Z4e2XgX.jpg",
//     address: "Machu Picchu, Aguas Calientes, Peru",
//     location: {
//       lat: -13.163141,
//       lng: -72.545872,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p4",
//     title: "TajMahal",
//     description: "One of the 7 world wonders",
//     location: {
//       lat: 27.1751448,
//       lan: 59.5851109,
//     },
//     imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
//     address: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001",
//     creator: "u2",
//   },
// ];

function UpdatePlace() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: loadedPlace.title,
              isValid: true,
            },
            description: {
              value: loadedPlace.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  // const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);
  //console.log(DUMMY_PLACES);

  const updatePlaceSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      navigate(`/${auth.userId}/places`)
    } catch (error) {}
  };

  if (loadedPlace) {
    console.log(loadedPlace);
  }

  //fallback
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  //fallback
  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={updatePlaceSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            value={loadedPlace.title}
            valid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please enter a valid description min 10 characters."
            onInput={inputHandler}
            value={loadedPlace.description}
            valid={true}
          />
          <Button type="submit" disbled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
}

export default UpdatePlace;
