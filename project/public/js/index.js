const menuButton = document.querySelector('.header__menu-button')
const menu = document.querySelector('.header__menu');

menuButton.addEventListener('click', () => {
	let attrib = menu.getAttribute('data-visible');
	if (attrib === 'false') {
		menu.setAttribute('data-visible', true);
	} else if (attrib === 'true') {
		menu.setAttribute('data-visible', false);
	}
});
