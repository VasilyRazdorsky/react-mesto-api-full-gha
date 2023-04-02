import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
    
    const [avatarLinkValue, setAvatarLinkValue] = React.useState("");
    const avatarLinkRef = React.useRef();

    function handleLinkInputChange(e){
        setAvatarLinkValue(e.target.value);
    }

    function handleClose(){
      onClose();
      setAvatarLinkValue("");
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarLinkRef.current.value,
        })
        setAvatarLinkValue("");
        console.log(avatarLinkValue);
    }

    return (
       <PopupWithForm
        title="Обновить аватар"
        name="change-avatar"
        isOpen={isOpen}
        children={
          <>
            <input
                type="url"
                name="avatarLink"
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_text_avatar-img-href"
                id="avatar-input"
                ref={avatarLinkRef}
                value={avatarLinkValue}
                onChange={handleLinkInputChange}
                required
              />
              <span className="popup__error avatar-input-error"></span> 
          </>
        }
        onClose={handleClose}
        submitButtonText="Сохранить"
        onSubmit={handleSubmit}
       />
    );
}

export default EditAvatarPopup;