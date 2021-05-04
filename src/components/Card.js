import React from 'react';
import trashCard from '../images/trash.svg'

function Card(props) {

    function handleClick() {
        props.onCardClick(props.name, props.link);
    }
    return (
        <div onClick={handleClick} className="card">
            <button type="button" className="card__remove"><img src={trashCard} alt="корзина" /></button>
            <div className="card__image-block" style={{ backgroundImage: `url(${props.link})` }}>
                <img src="#" alt="#" className="card__image" />
            </div>
            <div className="card__text">
                <h2 className="card__title">{props.name}</h2>
                <div className="card__like-wrap">
                    <button className="card__like" type="button" aria-label="Мне нравится"></button>
                    <span className="card__likes-counter">{props.likes}</span>
                </div>
            </div>

        </div>
    );
}

export default Card;