import React from "react";
import PopupWithForm from "./PopupWithForm";

const DeleteCardPopup = ({ isOpen, onClose, onAgreeToDelete, chosenCard }) => {
  function handleSubmit(e) {
    e.preventDefault();
    onAgreeToDelete(chosenCard);
  }

  return (
   <PopupWithForm
    title="Вы уверены?"
    name="delete-card"
    isOpen={isOpen}
    children={<></>}
    onClose={onClose}
    submitButtonText="Да"
    onSubmit={handleSubmit}
   />
  );
};

export default DeleteCardPopup;
