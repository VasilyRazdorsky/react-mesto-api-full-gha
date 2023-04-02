import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { register, login, checkToken } from "../utils/auth";

function App() {
  //Стейты

  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({
    link: "",
    name: "",
    isOpen: false,
  });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [cardToDelete, setCardToDelete] = React.useState({ test: 1 });
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(true);

  // Работа с контекстом currentUser

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser({
            name: userInfo.name,
            about: userInfo.about,
            avatar: userInfo.avatar,
            id: userInfo._id,
          });
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }, [loggedIn]);

  // Работа с закрытием всех попапов

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({
      link: "",
      name: "",
      isOpen: false,
    });
    setIsInfoToolTipOpen(false);
  }

  // Работа с выбранной карточкой

  const handleCardClick = (link, name) => {
    setSelectedCard({
      link: link,
      name: name,
      isOpen: true,
    });
  };

  // Работа с редактированием профиля

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  function handleUpdateUser(inputValues) {
    api
      .changeUserInfo(inputValues)
      .then((res) => {
        currentUser.name = res.name;
        currentUser.about = res.about;
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  // Работа с редактированием аватара

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  function handleUpdateAvatar(inputValues) {
    api
      .changeAvatar(inputValues)
      .then((res) => {
        currentUser.avatar = res.avatar;
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  // Работа с отрисовкой карточек, лайками

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getCardsInfo()
        .then((cardsInfo) => {
          setCards(cardsInfo);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);
    if (isLiked) {
      api
        .deleteLikeFromPost(card._id)
        .then((newCard) => {
          setCards(cards.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    } else {
      api
        .addLikeOnPost(card._id)
        .then((newCard) => {
          setCards(cards.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }

  // Работа с удалением карточки

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  const handleDeleteCardClick = (card) => {
    setIsDeleteCardPopupOpen(true);
    setCardToDelete(card);
  };

  // Работа с добавлением карточек

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  function handleAddPlaceSubmit(cardInfo) {
    api
      .addNewCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  // Работа с авторизацией

  const history = useHistory();

  function handleRegister(password, email) {
    register(password, email)
      .then((res) => {
        if (res) {
          setIsRegistered(true);
          setIsInfoToolTipOpen(true);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setIsRegistered(false);
        setIsInfoToolTipOpen(true);
      });
  }

  function handleLogin(password, email) {
    login(password, email)
      .then((data) => {
          setLoggedIn(true);
          setEmail(email);
          history.push("/mesto");
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setIsRegistered(false);
        setIsInfoToolTipOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      if (token) {
        checkToken()
          .then((res) => {
            if (res) {
              setEmail(res.email);
              setLoggedIn(true);
              history.push("/mesto");
            }
          })
          .catch((err) => console.log(`Ошибка ${err}`));
      }
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header email={email} onLogout={handleLogout} />
        <Switch>
          <ProtectedRoute
            component={Main}
            path="/mesto"
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
          />
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/mesto" /> : <Redirect to="sign-in" />}
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onAgreeToDelete={handleDeleteCard}
          chosenCard={cardToDelete}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          isRegistered={isRegistered}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
