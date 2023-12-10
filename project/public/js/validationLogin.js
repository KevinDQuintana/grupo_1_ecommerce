window.addEventListener('load', function (){

	// Funciones de validaciones.
	function handleIsEmpty(msg, field, shouldEmpty) {
		if (validator.isEmpty(field.value)) {
			field.nextElementSibling.innerText = msg;
			field.nextElementSibling.classList.add('error');
			return true;
		} else {
			if (shouldEmpty) {
				field.nextElementSibling.innerText = '';
				field.nextElementSibling.classList.remove('error');
				return false;
			};
		};
	};

	function handleIsEmail(email) {
		if (!validator.isEmail(email.value.trim())) {
			email.nextElementSibling.innerText = 'El email es invalido';
			email.nextElementSibling.classList.add('error');
			shouldEmpty = false;
			return true;
		} else {
			email.nextElementSibling.innerText = '';
			email.nextElementSibling.classList.remove('error');
			shouldEmpty = true;
			return false;
		};
	};

	function handleInputEmpty() {
		let inputs = document.querySelectorAll('.controlar');
		
		for (let input of inputs) {
			if (validator.isEmpty(input.value)) {
				return true;
			};
  		};
	};

	// Funciones de elementos/campos.
	function emailValid () {
		let email = document.querySelector('#email');

		email.addEventListener('blur', () => {
			handleIsEmpty('El campo email esta vacío!', email, null);
			validator.isEmpty(email.nextElementSibling.innerText) ? errorEmail = false:  errorEmail = true; 
		});
		email.addEventListener('input', () => {
			handleIsEmail(email);
			validator.isEmpty(email.nextElementSibling.innerText) ? errorEmail = false:  errorEmail = true; 
		});
	};
	
	function passwordValid () {
		let password = document.querySelector('#password');

		password.addEventListener('blur', () => {
			handleIsEmpty('El campo contraseña esta vacío!', password, null);
			validator.isEmpty(password.nextElementSibling.innerText) ? errorPassword = false:  errorPassword = true; 
		});
		password.addEventListener('input', () => {
			handleIsEmpty('', password, true);
			validator.isEmpty(password.nextElementSibling.innerText) ? errorPassword = false:  errorPassword = true; 
		});
	};

	function formValid () {
		let form = document.querySelector('#mainForm');
		form.addEventListener('submit', (e) => {
			if (handleInputEmpty() || errorEmail || errorPassword) {
				e.preventDefault();
				alert('Faltan completar campos del formulario!');
			};
		});
	};

	// Inicialización de errores.
	let errorEmail, errorPassword;

	// Inicialización de eventos.
	emailValid();
	passwordValid();

	formValid();
});