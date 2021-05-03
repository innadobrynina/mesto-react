import React from "react";
import closeIcon from '../images/close_icon.svg'

function ImagePopup(props) {
    return (
        <section
            className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}
        >
            <div className="popup-image__container">
                <button className="popup__close" aria-label="Закрыть" type="button" onClick={props.onClose}>
                    <img src={closeIcon} className="popup-image__close-btn" alt="кнопка закрытия" />
                </button>

                <img src={props.name} alt={props.name} className="popup-image__content" id="img01" />
                <div className="popup-image__caption">{props.name}</div>
            </div>
        </section>
    );
}

export default ImagePopup;