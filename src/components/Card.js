import React from 'react';
import trashCard from '../images/trash.svg'

function Card({ card, onCardClick }) {

    function handleCardClick() {
        onCardClick(card);
    }
    return (
        <div className="card">
            <button type="button" className="card__remove"><img src={trashCard} alt="корзина" /></button>
            <div onClick={handleCardClick} className="card__image-block" style={{ backgroundImage: `url(${card.link})` }}>
            </div>
            <div className="card__text">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-wrap">
                    <button className="card__like" type="button" aria-label="Мне нравится" />
                    <span className={`card__likes-counter ${card.likes.length === 0}`}>{card.likes.length}</span>
                </div>
            </div>

        </div>
    );
}

export default Card;