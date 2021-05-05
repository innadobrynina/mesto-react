import React, { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import Card from './Card.js'
import ImagePopup from "./ImagePopup";
import configAPI from '../utils/Api.js';




function App() {

  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);

  const [user, setUser] = useState({});
  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState({ link: '', name: '', isOpen: false });

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }


  function handleCardClick(name, link) {
    setSelectedCard({
      name: name,
      link: link,
      isOpen: true
    });
  }



  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setSelectedCard({ link: '', name: '', isOpen: false })
  }

  useEffect(() => {
    configAPI.getUserInfo()
      .then((results) => {
        setUser(
          {
            name: results.name,
            description: results.about,
            avatar: results.avatar
          });
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    configAPI.getCards()
      .then((results) => {
        setCards(results);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <div className="root">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        userAvatar={user.avatar}
        userName={user.name}
        userDescription={user.description}>

        {cards.map((card) =>

          <Card
            key={card._id}
            onCardClick={handleCardClick}
            link={card.link}
            name={card.name}
            likes={card.likes.length} />
        )}

      </Main>
      <Footer />
      <PopupWithForm
        title='Редактировать профиль'
        name='profile'
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
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>

        <input id="avatar-link" type="url" name="avatar" className="popup__input" placeholder="Ссылка на аватар" required aria-label="Ссылка на аватар" />
        <span className="popup__input-error popup__input-error_avatar" id="avatar-link-error"></span>

      </PopupWithForm>

      <PopupWithForm
        title='Вы уверены?'
        name='popup-confirm'>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        isOpen={selectedCard.isOpen}
        onClose={closeAllPopups}
      />
      {/*
      </ImagePopup> */}
      {/* <section className="popup popup-profile">
        <form className="popup__container" name="popup" id="edit" method="post" action="#" autocomplete="off" novalidate>
          <h3 className="popup__title">Редактировать профиль</h3>
          <input className="popup__input popup__input_name" type="text" id="title-name" name="name" value="" placeholder="Имя" aria-label="Имя" required minlength="2" maxlength="40" />
          <span className="popup__input-error popup__input-error_name" id="title-name-error"></span>
          <input className="popup__input popup__input_about" type="text" id="about-name" name="about" value="" placeholder="Род деятельности" aria-label="О себе" required minlength="2" maxlength="200" />
          <span className="popup__input-error popup__input-error_about" id="about-name-error"></span>
          <button className="popup__form-submit" type="submit">Сохранить</button>
          <button className="popup__close" type="button"><img src={closeIcon} className="popup__close-image" alt="кнопка закрытия" /></button>
        </form>
      </section> */}

      {/* <section className="popup popup-add">
        <form className="popup__container" name="popup-add" method="post" action="#" autocomplete="off" id="add" novalidate>
          <h3 className="popup__title">Новое Место</h3>
          <input className="popup__input popup__input_place" type="text" name="name" id="place-name" value="" placeholder="Название" required minlength="2" maxlength="30" />
          <span className="popup__input-error popup__input-error_place" id="place-name-error"></span>
          <input className="popup__input popup__input_image" type="url" name="link" id="link-image" value="" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error popup__input-error_image" id="link-image-error"></span>
          <button className="popup__form-submit " type="submit">Создать</button>
          <button className="popup__close" type="button"><img src={closeIcon} className="popup__close-image" alt="кнопка закрытия" /></button>
        </form>
      </section> */}

      {/* <section className="popup popup-image">
        <form className="popup-image__container" name="popup-image">
          <button className="popup__close" type="button"><img src={closeIcon} className="popup-image__close-btn" alt="кнопка закрытия" /></button>
          <img src="#" alt="#" className="popup-image__content" id="img01" />
          <div className="popup-image__caption"></div>
        </form>
      </section> */}

      {/* <section className="popup popup-confirm">
        <form className="popup__container popup__container_confirm">
          <button type="button" className="popup__close"><img src={closeIcon} className="popup__close-image" alt="кнопка закрытия" /></button>
          <h2 className="popup__title popup__title-confirm">Вы уверены?</h2>
          <div name="confirm" className="popup__form" novalidate>
            <button type="submit" className="popup__form-submit popup__form-submit_confirm">Да</button>
          </div>
        </form>
      </section> */}

      {/*  <section className="popup popup-update-avatar">
        <form className="popup__container popup__container_avatar">
          <button type="button" className="popup__close"><img src={closeIcon} className="popup__close-image" alt="кнопка закрытия" /></button>
          <h2 className="popup__title">Обновить аватар</h2>
          <div name="avatar" className="popup__form" novalidate>
            <section className="popup__section">
              <input id="avatar-link" type="url" name="avatar" className="popup__input" value="" placeholder="Ссылка на аватар" required aria-label="Ссылка на аватар" />
              <span className="popup__input-error popup__input-error_avatar" id="avatar-link-error"></span>
            </section>
            <button type="submit" className="popup__form-submit popup__form-submit_avatar">
              Сохранить
                  </button>
          </div>
        </form>
      </section> */}


    </div>
  );
}

export default App;
