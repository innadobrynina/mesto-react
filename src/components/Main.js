import React from 'react';

function Main(props) {

    return (
        <main>
            <div className="content">
                <section className="profile">
                    <div className="profile__avatar-block">
                        <div className="profile__avatar" alt="аватар" /* src={props.userAvatar} */ style={{ backgroundImage: `url(${props.userAvatar})` }} />
                        <div onClick={props.onEditAvatar} className="profile__avatar-overlay"></div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__title">{props.userName}</h1>
                            <button onClick={props.onEditProfile} className="profile__button-edit" type="button" aria-label="Редактировать профиль"></button>
                        </div>
                        <p className="profile__subtitle">{props.userDescription}</p>

                    </div>

                    <button onClick={props.onAddPlace} className="profile__button-add" aria-label="Добавить карточку" type="button"></button>

                </section>
                <section className="elements">
                    {props.children}
                </section>
            </div>
        </main>
    );
}

export default Main;