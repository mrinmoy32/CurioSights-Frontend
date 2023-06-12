import React from "react";
import Card from "../../shared/components/UIElement/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

function PlacesList(props) {
  if (props.places.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places found</h2>
          <button>Share Places</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.places.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
}

export default PlacesList;
