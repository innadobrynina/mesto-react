import React, { useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ link: '', name: '', isOpen: false });

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

  return (
    <div className="root">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
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
  );
}

export default App;
