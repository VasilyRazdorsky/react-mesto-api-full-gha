import React from "react";
import penIconPath from "../images/pen-icon.svg";
import plusIconPath from "../images/plus-icon.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button className="profile__avatar-button" onClick={onEditAvatar}>
          <div className="profile__avatar-mask">
            <img
              src={currentUser.avatar}
              alt="Аватар профиля"
              className="profile__avatar"
            />
          </div>
        </button>
        <div className="profile__info">
          <div className="profile__info-first-line">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              aria-label="Редактировать"
              type="button"
              onClick={onEditProfile}
            >
              <img
                src={penIconPath}
                alt="Ручка"
                className="profile__pen-icon"
              />
            </button>
          </div>
          <p className="profile__more-info">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          aria-label="Добавить пост"
          type="button"
          onClick={onAddPlace}
        >
          <img src={plusIconPath} alt="Плюс" className="profile__plus-icon" />
        </button>
      </section>

      <section className="elements">
        {cards.map((cardInfo) => (
          <Card
            key={cardInfo._id}
            card={cardInfo}
            src={cardInfo.link}
            alt={cardInfo.name}
            title={cardInfo.name}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;
