import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElement/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElement/Modal";
import Map from "../../shared/components/UIElement/Map";
import { AuthContext } from "../../shared/context/auth.context";
import "./PlaceItem.css";

function PlaceItem(props) {
  const auth = useContext(AuthContext)

  const [showMap, setShowMap] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const [showConfirmDeleteModal, setshowConfirmDeleteModal] = useState(false);
  const openConfirmDeleteModalHandler = () => setshowConfirmDeleteModal(true);
  const closeConfirmDeleteModalHandler = () =>
    setshowConfirmDeleteModal(false);

  const confirmDeleteHandler = () => console.log("DELETING", props);

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmDeleteModal}
        header="Are you sure?"
        onCancel={closeConfirmDeleteModalHandler}
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeConfirmDeleteModalHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Deleting a place cannot be undone, all the data related to this place
          will be permanently removed
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && (<Button to={`/places/${props.id}`}>EDIT</Button>)}
            {auth.isLoggedIn && (<Button danger onClick={openConfirmDeleteModalHandler}>
              DELETE
            </Button>)}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}

export default PlaceItem;
