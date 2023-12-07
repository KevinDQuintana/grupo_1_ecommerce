window.addEventListener('load', function (){
    
    let form = document.querySelector('#mainForm');
    console.log(form);
    let name = document.querySelector('#name');
    console.log(name);
    let description = document.querySelector('#description');
    console.log(description);
    // let image = document.querySelector('#image');
    // console.log(image);

    form.addEventListener('submit', function (e) {

        if (name.value == '' || name.value.length < 5 ||
            description.value == '' || description.value.length < 20) {

            e.preventDefault();

            let nameError = document.querySelector('.nameError');
            let descriptionError = document.querySelector('.descriptionError');
            // let imageError = document.querySelector('.imageError');

            if (name.value == '') {
                nameError.innerText = 'Nombre vacío';
            } else if (name.value.length < 5) {
                nameError.innerText = 'Nombre menor a 5 caracteres'
            };

            if (description.value == '') {
                descriptionError.innerText = 'Descripción vacía';
            } else if (description.value.length < 20) {
                descriptionError.innerText = 'Descripción menor a 20 caracteres';
            };


        };

    });

});