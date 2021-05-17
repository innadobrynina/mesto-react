import React, { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';

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

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
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
    api.deleteCard(card._id).then(() => {
      // Определяем, являемся ли мы владельцем текущей карточки
      const isOwn = card.owner._id === currentUser._id;
      setCards(isOwn);
    })
      .catch((err) =>
        console.log(`Ошибка: ${err}`));
  }

  function handleCardLike(card) {
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);


    api.putLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`));
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
        />

        <Footer />
        <PopupWithForm
          title='Редактировать профиль'
          name='profile'
          buttonText='Сохранить'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
          <input className="popup__input popup__input_name" type="text" id="title-name" name="name" placeholder="Имя" aria-label="Имя" required minLength={2} maxLength={40} />
          <span className="popup__input-error popup__input-error_name" id="title-name-error"></span>
          <input className="popup__input popup__input_about" type="text" id="about-name" name="about" placeholder="Род деятельности" aria-label="О себе" required minLength={2} maxLength={200} />
          <span className="popup__input-error popup__input-error_about" id="about-name-error"></span>
        </PopupWithForm>

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

        <PopupWithForm
          title='Обновить аватар'
          name='update-avatar'
          buttonText='Обновить'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>

          <input id="avatar-link" type="url" name="avatar" className="popup__input" placeholder="Ссылка на аватар" required aria-label="Ссылка на аватар" />
          <span className="popup__input-error popup__input-error_avatar" id="avatar-link-error"></span>

        </PopupWithForm>

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
