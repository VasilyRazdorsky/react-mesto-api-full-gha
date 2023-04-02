import React from "react";
import closeIconPath from "../images/close-icon.svg";

const ImagePopup = ({ card, onClose }) => {
    return (
        <section className={`popup ${card.isOpen ? "popup_active": ""} popup_action_view-post`}>
          <div className="popup__container popup__container_place_view-post-popup">
            <button
              className="popup__close-button popup__close-button_place_view-post-popup"
              aria-label="Закрыть редактирование"
              type="button"
              onClick={onClose}
            >
              <img
                src={closeIconPath}
                alt="Кнопка закрыть"
                className="popup__close-icon"
              />
            </button>

            <img src={card.link} alt={card.name} className="popup__photo" />
            <p className="popup__photo-place">{card.name}</p>
          </div>
        </section>
    );
}

export default ImagePopup;