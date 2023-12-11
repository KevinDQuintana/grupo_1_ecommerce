window.addEventListener('load', function (){
	
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
		} else {
			field.nextElementSibling.innerText = '';
			field.nextElementSibling.classList.remove('error');
			shouldEmpty = true;
		};
	};

	function handleIsNumeric(msg, field) {
		if (!validator.isNumeric(field.value)) {
			field.nextElementSibling.innerText = msg;
			field.nextElementSibling.classList.add('error');
			shouldEmpty = false;
		} else {
			field.nextElementSibling.innerText = '';
			field.nextElementSibling.classList.remove('error');
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
	function imageValid () {
		let image = document.querySelector('#image');

		image.addEventListener('blur', () => {
			handleIsEmpty('El campo imagen esta vacío!', image, null);
		});
		image.addEventListener('input', () => {
			handleAllowExtension(image);
		});


	};

	function nameValid () {
		let name = document.querySelector('#name');
		
		name.addEventListener('blur', () => {
			handleIsEmpty('El campo nombre esta vacío!', name, null);
		});
		name.addEventListener('input', () => {
			handleIsLength('El campo nombre debe contener al menos 8 caracteres!', name, 8);
		});
	};

	function priceValid () {
		let price = document.querySelector('#price');
		
		price.addEventListener('blur', () =>  {
			handleIsEmpty('El campo precio esta vacío!', price, null);
		});
		price.addEventListener('input', () => {
			handleIsNumeric('El campo precio debe contener solo números!', price);
		});
	};

	function discountValid () {
		let discount = document.querySelector('#discount');

		discount.addEventListener('blur', () =>  {
			handleIsEmpty('El campo descuento esta vacío!', discount), null;
		});
		discount.addEventListener('input', () => {
			handleIsNumeric('El campo descuento debe contener solo números!', discount);
		});
	};

	function descriptionTitleValid () {
		let descriptionTitle = document.querySelector('#descriptionTitle');

		descriptionTitle.addEventListener('blur', () => {
			handleIsEmpty('El campo título de la descripción esta vacío!', descriptionTitle, null);
		});
		descriptionTitle.addEventListener('input', () => {
			handleIsLength('El campo título de la descripción debe contener al menos 10 caracteres!', descriptionTitle, 10);
		});
	};

	function descriptionValid () {
		let description = document.querySelector('#description');

		description.addEventListener('blur', () => {
			handleIsEmpty('El campo descripción esta vacío!', description, null);
		});
		description.addEventListener('input', () => {
			handleIsLength('El campo descripción debe contener al menos 20 caracteres!', description, 20);
		});
	};

	function stockValid () {
		let stock = document.querySelector('#stock');

		stock.addEventListener('blur', () =>  {
			handleIsEmpty('El campo stock esta vacío!', stock, null);
		});
		stock.addEventListener('input', () => {
			handleIsNumeric('El campo stock debe contener solo números!', stock);
		});
		
	};

	function specsValid () {
		let specs = document.querySelector('#specs');

		specs.addEventListener('blur', () => {
			handleIsEmpty('El campo características del producto esta vacío!', specs, null);
		});
		specs.addEventListener('input', () => {
			handleIsLength('El campo características del producto debe contener al menos 20 caracteres!', specs, 20);
		});
	};

	function categoryValid () {
		let category = document.querySelector('#category');

		category.addEventListener('blur', () => {
			handleIsEmpty('El campo categoría esta vacío!', category, true);
		});

	};

	function brandValid () {
		let brand = document.querySelector('#brand');

		brand.addEventListener('blur', () => {
			handleIsEmpty('El campo marca esta vacío!', brand, true);
		});
	};

	function formValid () {
		let form = document.querySelector('#mainForm');

		form.addEventListener('submit', (e) => {
			if (handleInputEmpty()) {
				e.preventDefault();
				alert('Faltan completar campos del formulario!');
			};
		});
	};

	// Inicialización de eventos.
	imageValid();
	nameValid();
	priceValid();
	discountValid();
	descriptionTitleValid();
	descriptionValid();
	stockValid();
	specsValid();
	categoryValid();
	brandValid();

	formValid();

});