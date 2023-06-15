import React from "react";
import {useParams} from "react-router-dom"; 
import PlacesList from "../components/PlacesList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Tirupati Balaji Temple",
    description: "Most visited indian temple",
    imageUrl: "https://blog.thomascook.in/wp-content/uploads/2019/11/tirupati-balaji-temple.jpg.jpg",
    address: "Tirumala, Tirupati, Andhra Pradesh 517501",
    loaction: {
      lat: 13.6832576,
      lng: 79.27801,
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

const UserPlaces = () => {
  //useParams hook gives us access to the parameters of the dynamic segments like dynamic path in route
  //in this case we can get the UserId and useParams will return an object which has the
  // dynamic segment we set up in the route config as properties. So for UserPlaces component there will be 
  // a userId property. The path is set in App.js
  
  const userId = useParams().userId;
  console.log(useParams);
  const loadedPlaces = DUMMY_PLACES.filter(place=>place.creator === userId)

  return <PlacesList places={loadedPlaces} />;
};

export default UserPlaces;
