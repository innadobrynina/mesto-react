import React from 'react';

function Main(props) {

    /* function handleEditAvatarClick() {
        document.querySelector('.popup_type_update-avatar').classList.add('popup_opened');
    }

    function handleEditProfileClick() {
        document.querySelector('.popup_type_profile').classList.add('popup_opened');
    }


    function handleAddPlaceClick() {
        document.querySelector('.popup_type_add').classList.add('popup_opened');
    } */
    return (
        <main>
            <div className="content">
                <section className="profile">
                    <div className="profile__avatar-block">
                        <img className="profile__avatar" src="#" alt="аватар" />
                        <div onClick={props.onEditAvatar} className="profile__avatar-overlay"></div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__title">Жак-Ив Кусто</h1>
                            <button onClick={props.onEditProfile} className="profile__button-edit" type="button" aria-label="Редактировать профиль"></button>
                        </div>
                        <p className="profile__subtitle">Исследователь океана</p>

                    </div>

                    <button onClick={props.onAddPlace} className="profile__button-add" aria-label="Добавить карточку" type="button"></button>

                </section>
                <section className="elements">
                </section>
            </div>
        </main>
    );
}

export default Main;