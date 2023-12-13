window.addEventListener('load', function () {

	// Funciones de validaciones.
	function handleIsEmpty(msg, field, shouldEmpty) {
		if (validator.isEmpty(field.value)) {
			field.nextElementSibling.innerText = msg;
			field.nextElementSibling.classList.add('error');
		} else {
			if (shouldEmpty) {
				field.nextElementSibling.innerText = '';
				field.nextElementSibling.classList.remove('error');
			};
		};
	};

	function handleIsLength(msg, field, minimum) {
		if (!validator.isLength(field.value,{min:minimum})) {
			field.nextElementSibling.innerText = msg;
			field.nextElementSibling.classList.add('error');
			shouldEmpty = false;
			return false;
		} else {
			field.nextElementSibling.innerText = '';
			field.nextElementSibling.classList.remove('error');
			shouldEmpty = true;
			return true;
		};
	};

	function handleIsEmail(email) {
		if (!validator.isEmail(email.value.trim())) {
			email.nextElementSibling.innerText = 'El email es invalido';
			email.nextElementSibling.classList.add('error');
			shouldEmpty = false;
		} else {
			email.nextElementSibling.innerText = '';
			email.nextElementSibling.classList.remove('error');
			shouldEmpty = true;
		};
	};

	function handleIsNumeric(msg, field) {
		if (!validator.isNumeric(field.value)) {
			field.nextElementSibling.innerText = msg;
			field.nextElementSibling.classList.add('error');
			shouldEmpty = false;
			return false;
		} else {
			field.nextElementSibling.innerText = '';
			field.nextElementSibling.classList.remove('error');
			shouldEmpty = true;
			return true;
		};
	};

	function handleIsPassword(password) {
		let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@ñ$!%*?&]{8,}$/;
		if (!validator.matches(password.value, regex)) {
			password.nextElementSibling.innerText = 'La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales';
			password.nextElementSibling.classList.add('error');
			shouldEmpty = false;
		} else {
			password.nextElementSibling.innerText = '';
			password.nextElementSibling.classList.remove('error');
			shouldEmpty = true;
		};
	};

	function handleAllowExtension (image) {
		let fileName = image.value;
		let allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
		let extension = fileName.split('.').pop().toLowerCase();
		if (!allowedExtensions.includes(extension)) {
			image.nextElementSibling.innerText = 'El archivo debe ser .jpg, .jpeg, .png o .gif';
			image.nextElementSibling.classList.add('error');
			shouldEmpty = false;
		} else {
			image.nextElementSibling.innerText = '';
			image.nextElementSibling.classList.remove('error');
			shouldEmpty = true;
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
			if (handleIsLength('El campo contraseña debe tener al menos 8 caracteres', password, 8)) {
				handleIsPassword(password);
			};
			validator.isEmpty(password.nextElementSibling.innerText) ? errorPassword = false:  errorPassword = true; 
		});
	};

	function firstNameValid () {
		let firstName = document.querySelector('#firstName');

		firstName.addEventListener('blur', () => {
			handleIsEmpty('El campo nombre esta vacío!', firstName, null);
			validator.isEmpty(firstName.nextElementSibling.innerText) ? errorFirstName = false:  errorFirstName = true; 
		});
		firstName.addEventListener('input', () => {
			handleIsLength('El campo nombre debe contener al menos 2 caracteres!', firstName, 2);
			validator.isEmpty(firstName.nextElementSibling.innerText) ? errorFirstName = false:  errorFirstName = true; 
		});

	};

	function lastNameValid () {
		let lastName = document.querySelector('#lastName');
		
		lastName.addEventListener('blur', () => {
			handleIsEmpty('El campo apellido esta vacío!', lastName, null);
			validator.isEmpty(lastName.nextElementSibling.innerText) ? errorLastName = false:  errorLastName = true; 
		});
		lastName.addEventListener('input', () => {
			handleIsLength('El campo apellido debe contener al menos 2 caracteres!', lastName, 2);
			validator.isEmpty(lastName.nextElementSibling.innerText) ? errorLastName = false:  errorLastName = true; 
		});
	};

	function dniValid () {
		let dni = document.querySelector('#dni');
		dni.addEventListener('blur', () => {
			handleIsEmpty('El campo dni esta vacío!', dni, null);
			validator.isEmpty(dni.nextElementSibling.innerText) ? errorDni = false:  errorDni = true; 
		});
		dni.addEventListener('input', () => {
			if (handleIsNumeric('El campo dni solo debe contener números', dni)) {
				handleIsLength('El campo dni debe contener al menos 8 dígitos!', dni, 8);
			};
			validator.isEmpty(dni.nextElementSibling.innerText) ? errorDni = false:  errorDni = true; 
		});
	}; 

	function phoneValid () {
		let phone = document.querySelector('#phone');

		phone.addEventListener('blur', () => {
			handleIsEmpty('El campo teléfono esta vacío!', phone, null);
			validator.isEmpty(phone.nextElementSibling.innerText) ? errorPhone = false:  errorPhone = true; 
		});
		phone.addEventListener('input', () => {
			if (handleIsNumeric('El campo número de teléfono solo debe contener números', phone)) {
				handleIsLength('El campo número de teléfono debe tener al menos 8 dígitos', phone, 8);
			};
			validator.isEmpty(phone.nextElementSibling.innerText) ? errorPhone = false:  errorPhone = true; 
		});
	};

	function categoryValid () {
		let category = document.querySelector('#category');

		category.addEventListener('blur', () => {
			handleIsEmpty('El campo categoría esta vacío!', category, true);
			validator.isEmpty(category.nextElementSibling.innerText) ? errorCategory = false:  errorCategory = true; 
		});
	};

	function imageValid () {
		let image = document.querySelector('#image');

		image.addEventListener('blur', () => {
			handleIsEmpty('El campo imagen esta vacío!', image, null);
			validator.isEmpty(image.nextElementSibling.innerText) ? errorImage = false:  errorImage = true; 
		});
		image.addEventListener('input', () => {
			handleAllowExtension(image);
			validator.isEmpty(image.nextElementSibling.innerText) ? errorImage = false:  errorImage = true; 
		});

	};

	function formValid () {
		let form = document.querySelector('#mainForm');

		form.addEventListener('submit', (e) => {
			if (handleInputEmpty() || errorEmail || errorPassword || errorFirstName || errorLastName || errorDni || errorPhone || 
			errorCategory || errorImage) {
				e.preventDefault();
				alert('Faltan completar campos del formulario!');
			};
		});
	};

	// Inicialización de errores.
	let errorEmail, errorPassword, errorFirstName, errorLastName, errorDni, errorPhone, errorCategory, errorImage;

	// Inicialización de eventos.
	emailValid();
	passwordValid();
	firstNameValid();
	lastNameValid();
	dniValid();
	phoneValid();
	categoryValid();
	imageValid();

	formValid();
})