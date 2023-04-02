import React from "react";
import closeIconPath from "../images/close-icon.svg";

const PopupWithForm = ({title, name, isOpen, children, onClose, submitButtonText, onSubmit}) => {
    return (
        <section className={`popup popup_action_${name} ${isOpen ? "popup_active" : ""}`}>
          <div className="popup__container">
            <button
              className="popup__close-button popup__close-button_place_add-post-popup"
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

            <h2 className="popup__header">{title}</h2>

            <form
              action="#"
              className="popup__form popup__form_place_add-post-popup"
              name={name}
              onSubmit={onSubmit}
            >
              {children}  
              <button type="submit" className="popup__save-button">
                {submitButtonText}
              </button>
            </form>
          </div>
        </section>
    );
}

export default PopupWithForm;