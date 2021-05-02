function Main() {

    function handleEditAvatarClick() {
        document.querySelector('.popup-update-avatar').classList.add('popup_opened');
    }

    function handleEditProfileClick() {
        document.querySelector('.popup-profile').classList.add('popup_opened');
    }


    function handleAddPlaceClick() {
        document.querySelector('.popup-add').classList.add('popup_opened');
    }
    return (
        <main>
            <div className="content">
                <section className="profile">
                    <div className="profile__avatar-block">
                        <img className="profile__avatar" src="#" alt="аватар" />
                        <div onClick={handleEditAvatarClick} className="profile__avatar-overlay"></div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__title">Жак-Ив Кусто</h1>
                            <button onClick={handleEditProfileClick} className="profile__button-edit" type="button" aria-label="Редактировать профиль"></button>
                        </div>
                        <p className="profile__subtitle">Исследователь океана</p>

                    </div>

                    <button onClick={handleAddPlaceClick} className="profile__button-add" aria-label="Добавить карточку" type="button"></button>

                </section>
                <section className="elements">
                </section>
            </div>
        </main>
    );
}

export default Main;