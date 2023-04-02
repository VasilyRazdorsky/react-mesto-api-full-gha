import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {

    const [name, setName] = React.useState("");

    function handleNameChange(e){
        setName(e.target.value);
    }

    const [description, setDescription] = React.useState("");

    function handleDescriptionChange(e){
        setDescription(e.target.value);
    }

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e){
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description
        })
    }

    return (
        <PopupWithForm
          title="Редактировать профиль"
          name="action_edit"
          isOpen={isOpen}
          children={
            <>
              <input
                type="text"
                name="name"
                placeholder="Имя"
                className="popup__input popup__input_text_profile-name"
                id="name-input"
                required
                minLength="2"
                maxLength="40"
                value={name ?? ""}
                onChange={handleNameChange}
              />
              <span className="popup__error name-input-error"></span>
              <input
                type="text"
                name="moreInfo"
                placeholder="О себе"
                className="popup__input popup__input_text_profile-more-info"
                id="info-input"
                required
                minLength="2"
                maxLength="200"
                value={description ?? ""}
                onChange={handleDescriptionChange}
              />
              <span className="popup__error info-input-error"></span>
            </>
          }
          onClose={onClose}
          submitButtonText="Сохранить"
          onSubmit={handleSubmit}
        />
    );
}

export default EditProfilePopup;