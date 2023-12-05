window.addEventListener('load', function (){

    let emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    let form = document.querySelector('#mainForm');
    console.log(form);
    let email = document.querySelector('#email');
    console.log(email);
    let password = document.querySelector('#password');
    console.log(password);

    form.addEventListener('submit', function(e){
        
        if (email.value == '' || !emailValidation.test(email.value) || password.value == '') {
            
            e.preventDefault();
            
            let emailError = document.querySelector('.emailError');
            let passwordError = document.querySelector('.passwordError');

            if (email.value == '') {
                emailError.innerText = 'Email vacío';
            } else if (!emailValidation.test(email.value)) {
                emailError.innerText = 'Email inválido';
            };

            if (password.value == '') {
                passwordError.innerText = 'Contraseña vacía';
            };
        
        };

    });

});