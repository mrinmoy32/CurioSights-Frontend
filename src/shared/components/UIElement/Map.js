import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
    // useRef is hook in React that help us create reference to node or element in the DOM 
    // without using the document.getElementById function. Also useRef helps us to create reference
    // to a certain element that might stay uneffected even after rerendering of the UI
  const mapRef = useRef();
  const {center, zoom} = props;
    //useEffect allows us to regester a logic or a function 
    //that should be executed when certain inputs change
    //if we pass empty dependancy array the callback func 
    //will execute only once when this component is loaded
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
      });
    
      new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom])
  
  

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
