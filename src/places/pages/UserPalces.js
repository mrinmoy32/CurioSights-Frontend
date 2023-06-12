import React from "react";
import PlacesList from "../components/PlacesList";

const UserPlaces = () => {
  const dummyPlaces = [
    {
      id: "p1",
      title: "Tirupati Balaji Temple",
      description: "Most visited indian temple",
      imageUrl: "https://static.toiimg.com/photo/msid-98194132/98194132.jpg",
      address: "M8MX+863, Tirumala, Tirupati, Andhra Pradesh 517501",
      loaction: {
        lat: 13.6832576,
        lng: 79.27801,
      },
      creator:'u1'
    },
    {
      id: "p1",
      title: "Tirupati Balaji Temple",
      description: "Most visited indian temple",
      imageUrl: "https://static.toiimg.com/photo/msid-98194132/98194132.jpg",
      address: "M8MX+863, Tirumala, Tirupati, Andhra Pradesh 517501",
      loaction: {
        lat: 13.6832576,
        lng: 79.27801,
      },
      creator:'u2'
    },
    {
      id: "p1",
      title: "Tirupati Balaji Temple",
      description: "Most visited indian temple",
      imageUrl: "https://static.toiimg.com/photo/msid-98194132/98194132.jpg",
      address: "M8MX+863, Tirumala, Tirupati, Andhra Pradesh 517501",
      loaction: {
        lat: 13.6832576,
        lng: 79.27801,
      },
      creator:'u3'
    },
  ];

  return <PlacesList places={dummyPlaces} />;
};

export default UserPlaces;
