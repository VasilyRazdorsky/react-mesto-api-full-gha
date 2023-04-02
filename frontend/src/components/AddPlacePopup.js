import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {

    const [postName, setPostName] = React.useState("");

    function handleSetPostName(e){
        setPostName(e.target.value);
    }

    const [link, setLink] = React.useState("");

    function handleSetLink(e){
        setLink(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        onAddPlace({
            postName,
            link,
        });
        setPostName("");
        setLink("");
    }

    function handleClose(){
      onClose();
      setPostName("");
      setLink("");
    }

    return (
      <PopupWithForm
        title="Новое место"
        name="add-post"
        isOpen={isOpen}
        children={
          <>
            <input
                type="text"
                name="postName"
                placeholder="Название"
                className="popup__input popup__input_text_post-name"
                id="post-name-input"
                required
                minLength="2"
                maxLength="30"
                value={postName}
                onChange={handleSetPostName}
              />
              <span className="popup__error post-name-input-error"></span>
              <input
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_text_post-img-href"
                id="url-input"
                required
                value={link}
                onChange={handleSetLink}
              />
              <span className="popup__error url-input-error"></span>
          </>
        }
        onClose={handleClose}
        submitButtonText="Сохранить"
        onSubmit={handleSubmit}
      />
    );
}

export default AddPlacePopup;