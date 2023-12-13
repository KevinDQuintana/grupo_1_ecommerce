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
			validator.isEmpty(image.nextElementSibling.innerText) ? errorImage = false:  errorImage = true; 
		});
		image.addEventListener('input', () => {
			handleAllowExtension(image);
			validator.isEmpty(image.nextElementSibling.innerText) ? errorImage = false:  errorImage = true; 
		});
	};

	function nameValid () {
		let name = document.querySelector('#name');
		
		name.addEventListener('blur', () => {
			handleIsEmpty('El campo nombre esta vacío!', name, null);
			validator.isEmpty(name.nextElementSibling.innerText) ? errorName = false:  errorName = true; 
		});
		name.addEventListener('input', () => {
			handleIsLength('El campo nombre debe contener al menos 8 caracteres!', name, 8);
			validator.isEmpty(name.nextElementSibling.innerText) ? errorName = false:  errorName = true; 
		});
	};

	function priceValid () {
		let price = document.querySelector('#price');
		
		price.addEventListener('blur', () =>  {
			handleIsEmpty('El campo precio esta vacío!', price, null);
			validator.isEmpty(price.nextElementSibling.innerText) ? errorPrice = false:  errorPrice = true; 
		});
		price.addEventListener('input', () => {
			handleIsNumeric('El campo precio debe contener solo números!', price);
			validator.isEmpty(price.nextElementSibling.innerText) ? errorPrice = false:  errorPrice = true; 
		});
	};

	function discountValid () {
		let discount = document.querySelector('#discount');

		discount.addEventListener('blur', () =>  {
			handleIsEmpty('El campo descuento esta vacío!', discount), null;
			validator.isEmpty(discount.nextElementSibling.innerText) ? errorDiscount = false:  errorDiscount = true; 
		});
		discount.addEventListener('input', () => {
			handleIsNumeric('El campo descuento debe contener solo números!', discount);
			validator.isEmpty(discount.nextElementSibling.innerText) ? errorDiscount = false:  errorDiscount = true; 
		});
	};

	function descriptionTitleValid () {
		let descriptionTitle = document.querySelector('#descriptionTitle');

		descriptionTitle.addEventListener('blur', () => {
			handleIsEmpty('El campo título de la descripción esta vacío!', descriptionTitle, null);
			validator.isEmpty(descriptionTitle.nextElementSibling.innerText) ? errorDescriptionTitle = false:  errorDescriptionTitle = true; 
		});
		descriptionTitle.addEventListener('input', () => {
			handleIsLength('El campo título de la descripción debe contener al menos 10 caracteres!', descriptionTitle, 10);
			validator.isEmpty(descriptionTitle.nextElementSibling.innerText) ? errorDescriptionTitle = false:  errorDescriptionTitle = true; 
		});
	};

	function descriptionValid () {
		let description = document.querySelector('#description');

		description.addEventListener('blur', () => {
			handleIsEmpty('El campo descripción esta vacío!', description, null);
			validator.isEmpty(description.nextElementSibling.innerText) ? errorDescription = false:  errorDescription = true; 
		});
		description.addEventListener('input', () => {
			handleIsLength('El campo descripción debe contener al menos 20 caracteres!', description, 20);
			validator.isEmpty(description.nextElementSibling.innerText) ? errorDescription = false:  errorDescription = true; 
		});
	};

	function stockValid () {
		let stock = document.querySelector('#stock');

		stock.addEventListener('blur', () =>  {
			handleIsEmpty('El campo stock esta vacío!', stock, null);
			validator.isEmpty(stock.nextElementSibling.innerText) ? errorStock = false:  errorStock = true; 
		});
		stock.addEventListener('input', () => {
			handleIsNumeric('El campo stock debe contener solo números!', stock);
			validator.isEmpty(stock.nextElementSibling.innerText) ? errorStock = false:  errorStock = true; 
		});
		
	};

	function specsValid () {
		let specs = document.querySelector('#specs');

		specs.addEventListener('blur', () => {
			handleIsEmpty('El campo características del producto esta vacío!', specs, null);
			validator.isEmpty(specs.nextElementSibling.innerText) ? errorSpecs = false:  errorSpecs = true; 
		});
		specs.addEventListener('input', () => {
			handleIsLength('El campo características del producto debe contener al menos 20 caracteres!', specs, 20);
			validator.isEmpty(specs.nextElementSibling.innerText) ? errorSpecs = false:  errorSpecs = true; 
		});
	};

	function categoryValid () {
		let category = document.querySelector('#category');

		category.addEventListener('blur', () => {
			handleIsEmpty('El campo categoría esta vacío!', category, true);
			validator.isEmpty(category.nextElementSibling.innerText) ? errorCategory = false:  errorCategory = true; 
		});
	};

	function brandValid () {
		let brand = document.querySelector('#brand');

		brand.addEventListener('blur', () => {
			handleIsEmpty('El campo marca esta vacío!', brand, true);
			validator.isEmpty(brand.nextElementSibling.innerText) ? errorBrand = false:  errorBrand = true; 
		});
	};

	function formValid () {
		let form = document.querySelector('#mainForm');

		form.addEventListener('submit', (e) => {
			if (handleInputEmpty() || errorImage || errorName || errorPrice || errorDiscount || errorDescriptionTitle || errorDescription || errorStock || errorSpecs || errorCategory || errorBrand) {
				e.preventDefault();
				alert('Faltan completar campos del formulario!');
			};
		});
	};

	// Inicialiazación de errores.
	let errorImage, errorName, errorPrice, errorDiscount, errorDescriptionTitle, errorDescription, errorStock, errorSpecs, errorCategory, errorBrand;

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