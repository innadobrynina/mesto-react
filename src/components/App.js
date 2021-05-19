import React, { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ link: '', name: '', isOpen: false });

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(name, link) {
    setSelectedCard({
      name: name,
      link: link,
      isOpen: true
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({ link: '', name: '', isOpen: false })
  }

  useEffect(() => {
    api.getUserInfo()
      .then((results) => {
        setCurrentUser(
          {
            _id: results._id,
            name: results.name,
            about: results.about,
            avatar: results.avatar
          }
        )
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`));
  }, [])

  useEffect(() => {
    api.getCards()
      .then((results) => {
        setCards(results)
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`));
  }, [])

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        // Определяем, являемся ли мы владельцем текущей карточки
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`));
  }

  function handleCardLike(card) {
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);


    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`));
  }

  function handleUpdateUser(currentUser) {
    api.setUserInfo(currentUser)
      .then((results) => {
        setCurrentUser(results)
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
      .finally(() => closeAllPopups());
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then((avatar) => setCurrentUser(avatar))
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
      .finally(() => closeAllPopups());
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
        >
        </Main>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          title='Новое место'
          name='add'
          buttonText='Создать'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <input className="popup__input popup__input_place" type="text" name="name" id="place-name" placeholder="Название" required minLength={2} maxLength={30} />
          <span className="popup__input-error popup__input-error_place" id="place-name-error"></span>
          <input className="popup__input popup__input_image" type="url" name="link" id="link-image" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error popup__input-error_image" id="link-image-error"></span>
        </PopupWithForm>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          title='Вы уверены?'
          name='popup-confirm'
          buttonText='Сохранить'>
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
