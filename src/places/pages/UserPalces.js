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
      creator: "u3",
    },
  ];

  return <PlacesList places={dummyPlaces} />;
};

export default UserPlaces;
