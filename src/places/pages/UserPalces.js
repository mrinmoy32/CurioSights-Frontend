import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import PlacesList from "../components/PlacesList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";

// const DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Tirupati Balaji Temple",
//     description: "Most visited indian temple",
//     imageUrl: "https://blog.thomascook.in/wp-content/uploads/2019/11/tirupati-balaji-temple.jpg.jpg",
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

const UserPlaces = () => {
  //useParams hook gives us access to the parameters of the dynamic segments like dynamic path in route
  //in this case we can get the UserId and useParams will return an object which has the
  // dynamic segment we set up in the route config as properties. So for UserPlaces component there will be 
  // a userId property. The path is set in App.js
  
  const userId = useParams().userId;
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    }
    fetchPlaces();
  }, [sendRequest, userId ])

  const placeDeletedHandle = (deletedPlaceId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId))
  }

  // const loadedPlaces = DUMMY_PLACES.filter(place=>place.creator === userId)

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      {isLoading && (
      <div className="center">
        <LoadingSpinner />
      </div>
      )}
      {!isLoading && loadedPlaces && <PlacesList places={loadedPlaces} onDeletePlace={placeDeletedHandle}/>}
    </React.Fragment>
  );
};

export default UserPlaces;
