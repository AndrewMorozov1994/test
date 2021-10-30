const toggleMenu = () => {
    const buttonBurger = document.querySelector(`.header__burger`);
    const menu = document.querySelector(`.header__nav-wrapper`);

    if (!buttonBurger) {return}

    buttonBurger.addEventListener(`click`, (e) => {
        e.preventDefault();
        buttonBurger.classList.toggle(`header__burger--opened`);
        menu.classList.toggle(`header__nav-wrapper--open`)
    })
}

export default toggleMenu;
