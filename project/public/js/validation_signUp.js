window.addEventListener('load', function () {
	let email = document.querySelector('#email');
	let emailSpan = document.querySelector('#emailSpan');

	let shouldEmpty = true;
	function handleEmailEmpty() {
		if (validator.isEmpty(email.value)) {
			emailSpan.innerText = 'El campo email esta vacio!'
			emailSpan.classList.add('error');
		} else {
			if (shouldEmpty) {
				emailSpan.innerText = ''
				emailSpan.classList.remove('error');
			}
		}
	}

	function handleEmailValid() {
		if (!validator.isEmail(email.value)) {
			emailSpan.innerText = 'El email es invalido';
			emailSpan.classList.add('error');
			shouldEmpty = false;
		} else {
			emailSpan.innerText = '';
			emailSpan.classList.remove('error');
			shouldEmpty = true;
		}
	}

	email.addEventListener('blur', handleEmailEmpty);
	email.addEventListener('input', handleEmailValid);
});