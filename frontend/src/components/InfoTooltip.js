import React from "react";
import closeIconPath from "../images/close-icon.svg";
import successRegistrationPath from "../images/success-registration.svg";
import failRegistrationPath from "../images/registration-denied.svg";

function InfoTooltip({ isOpen, onClose, isRegistered }){
    return (
        <section className={`popup ${isOpen ? "popup_active" : ""}`}>
          <div className="popup__container popup__container_place_infotooltip">
            <button
              className="popup__close-button"
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

            <img src={isRegistered ? successRegistrationPath : failRegistrationPath} alt="Успешная регистрация" className="popup__infotooltip-image"/>

            <h2 className="popup__header popup__header_place_infotooltip">{
                isRegistered ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."
            }</h2>

          </div>
        </section>
    )
}

export default InfoTooltip;