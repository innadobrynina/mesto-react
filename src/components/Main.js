import React, { useState, useEffect } from 'react';
import api from '../utils/api.js';
import Card from './Card.js';


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const [user, setUser] = useState();
    const [cards, setCards] = useState([]);
    const [userDescription, setUserDescription] = useState();
    const [userAvatar, setUserAvatar] = useState();


    useEffect(() => {
        api.getUserInfo()
            .then(results => {
                setUser(results.name);
                setUserDescription(results.about);
                setUserAvatar(results.avatar);
            })
            .catch(err =>
                console.log(err));
    }, []);

    useEffect(() => {
        api.getCards()
            .then(results => {
                setCards(results);
            })
            .catch(err =>
                console.log(err));
    }, []);

    return (
        <main>
            <div className="content">
                <section className="profile">
                    <div className="profile__avatar-block">
                        <div className="profile__avatar" alt="аватар" style={{ backgroundImage: `url(${userAvatar})` }} />
                        <div onClick={onEditAvatar} className="profile__avatar-overlay"></div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__title">{user}</h1>
                            <button onClick={onEditProfile} className="profile__button-edit" type="button" aria-label="Редактировать профиль"></button>
                        </div>
                        <p className="profile__subtitle">{userDescription}</p>

                    </div>

                    <button onClick={onAddPlace} className="profile__button-add" aria-label="Добавить карточку" type="button"></button>

                </section>
                <section className="elements">
                    {cards.map(item => (
                        <Card key={item._id} card={item} onCardClick={onCardClick} />
                    ))}
                </section>
            </div>
        </main>
    );
}

export default Main;