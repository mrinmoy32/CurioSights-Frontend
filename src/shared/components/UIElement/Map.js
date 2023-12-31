import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
  // useRef is hook in React that help us create reference to node or element in the DOM
  // without using the document.getElementById function. Also useRef helps us to create reference
  // to a certain element that might stay uneffected even after rerendering of the UI
  const mapRef = useRef();
  const { center, zoom } = props; //example of object destructuring

  //useEffect allows us to regester a logic or a function
  //that should be executed when certain inputs change
  //if we pass empty dependancy array the callback func
  //will execute only once when this component is loaded

  //LETS use GOOGLE MAP alternative OpenLayers hence commented the below function inside useEffect

  // useEffect(() => {
  //   const map = new window.google.maps.Map(mapRef.current, {
  //       center: center,
  //       zoom: zoom,
  //     });

  //     new window.google.maps.Marker({ position: center, map: map });
  // }, [center, zoom]);

  useEffect(() => {
    new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
