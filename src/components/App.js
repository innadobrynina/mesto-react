import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';


function App() {
  return (
    <div className="root">
      < Header />
      < Main />
      <Footer />


      <section className="popup popup-profile">
        <form className="popup__container" name="popup" id="edit" method="post" action="#" autocomplete="off" novalidate>
          <h3 className="popup__title">Редактировать профиль</h3>
          <input className="popup__input popup__input_name" type="text" id="title-name" name="name" value="" placeholder="Имя" aria-label="Имя" required minlength="2" maxlength="40" />
          <span className="popup__input-error popup__input-error_name" id="title-name-error"></span>
          <input className="popup__input popup__input_about" type="text" id="about-name" name="about" value="" placeholder="Род деятельности" aria-label="О себе" required minlength="2" maxlength="200" />
          <span className="popup__input-error popup__input-error_about" id="about-name-error"></span>
          <button className="popup__form-submit" type="submit">Сохранить</button>
          <button className="popup__close" type="button"><img src="<%=require('./images/close_icon.svg')%>" className="popup__close-image" alt="кнопка закрытия" /></button>
        </form>
      </section>

      <section className="popup popup-add">
        <form className="popup__container" name="popup-add" method="post" action="#" autocomplete="off" id="add" novalidate>
          <h3 className="popup__title">Новое Место</h3>
          <input className="popup__input popup__input_place" type="text" name="name" id="place-name" value="" placeholder="Название" required minlength="2" maxlength="30" />
          <span className="popup__input-error popup__input-error_place" id="place-name-error"></span>
          <input className="popup__input popup__input_image" type="url" name="link" id="link-image" value="" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error popup__input-error_image" id="link-image-error"></span>
          <button className="popup__form-submit " type="submit">Создать</button>
          <button className="popup__close" type="button"><img src="<%=require('./images/close_icon.svg')%>" className="popup__close-image" alt="кнопка закрытия" /></button>
        </form>
      </section>

      <section className="popup popup-image">
        <form className="popup-image__container" name="popup-image">
          <button className="popup__close" type="button"><img src="<%=require('./images/close_icon.svg')%>" className="popup-image__close-btn" alt="кнопка закрытия" /></button>
          <img src="#" alt="#" className="popup-image__content" id="img01" />
          <div className="popup-image__caption"></div>
        </form>
      </section>

      <section className="popup popup-confirm">
        <form className="popup__container popup__container_confirm">
          <button type="button" className="popup__close"></button>
          <h2 className="popup__title popup__title-confirm">Вы уверены?</h2>
          <div name="confirm" className="popup__form" novalidate>
            <button type="submit" className="popup__form-submit popup__form-submit_confirm">Да</button>
          </div>
        </form>
      </section>

      <section className="popup popup-update-avatar">
        <form className="popup__container popup__container_avatar">
          <button type="button" className="popup__close"></button>
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
      </section>

      <template className="template">
        <div className="card">
          <button type="button" className="card__remove"><img src="<%=require('./images/trash.svg')%>" alt="корзина" /></button>
          <div className="card__image-block">
            <img src="#" alt="#" className="card__image" />
          </div>
          <div className="card__text">
            <h2 className="card__title"></h2>
            <div className="card__like-wrap">
              <button className="card__like" type="button" aria-label="Мне нравится"></button>
              <span className="card__likes-counter"></span>
            </div>
          </div>

        </div>

      </template>
    </div>
  );
}

export default App;