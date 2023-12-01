window.addEventListener('load' , function(){


let email = document.querySelector('#email');
let nombre = document.querySelector('#firstName');
let password = document.querySelector('#password');
let apellido = document.querySelector('#lastName');
let dni = document.querySelector('#dni');
let telefono = document.querySelector('#phone');
let imagen = document.querySelector('#image');
let emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

let validacionCampoVacio = function(message, e) {
    let campo = e.target;
    let campoValor = e.target.value.trim();
    if(campoValor == '' || campoValor == null){
        campo.nextElementSibling.classList.add('error')
        campo.nextElementSibling.innerText = message
    } else {
        campo.nextElementSibling.innerText = ''
        campo.nextElementSibling.classList.remove('error')
}
}
let comprobarEmail = function(e){
    let campo = e.target
    if(!emailValidation.test(email.value)){
        campo.nextElementSibling.innerText = 'Este email no es valido'
        campo.nextElementSibling.classList.add('error');
     } else {
        campo.nextElementSibling.classList.remove('error');
        campo.nextElementSibling.innerText = ''
     }
}
let comprobarNyA = function (message, e) {
    let campo = e.target
    let campoValor = e.target.value
    if(campoValor.trim().length < 2){
        campo.nextElementSibling.innerText = message;
        campo.nextElementSibling.classList.add('error')
    } else {
        campo.nextElementSibling.innerText = ''
}
}
dni.addEventListener('input', function (e){
    let campo = e.target
   if(dni.value.trim().length <8 || dni.value.trim().length > 8){
    campo.nextElementSibling.innerText = 'Intente insertar un DNI valido'
    campo.nextElementSibling.classList.add('error')
} else {
    campo.nextElementSibling.innerText = ''
}})
imagen.addEventListener('change', function (e){
    const campo = e.target
    const extImage = e.target.files[0].name.split('.').pop().toLowerCase();
    const extPermitidas = ['jpg', 'jpeg', 'png', 'gif'];
    if(!extPermitidas.includes(extImage)){
        campo.nextElementSibling.classList.add('error')
        campo.nextElementSibling.innerText = `Agregue una imagen valida con alguna de estas extensiones ${extPermitidas}`
    } else {
        campo.nextElementSibling.classList.remove('error')
        campo.nextElementSibling.innerText = ''
}
})

email.addEventListener('blur', (e) => validacionCampoVacio('El campo email no puede estar vacio', e));
nombre.addEventListener('blur', (e) => validacionCampoVacio('El campo nombre no puede estar vacio', e));
apellido.addEventListener('blur', (e) => validacionCampoVacio('El campo apellido no puede estar vacio', e));
password.addEventListener('blur', (e) => validacionCampoVacio('El campo contraseña no puede estar vacio', e));
dni.addEventListener('blur', (e) => validacionCampoVacio('El campo del DNI no puede estar vacio', e));
telefono.addEventListener('blur', (e) => validacionCampoVacio('El campo de telefono no puede estar vacio', e));

nombre.addEventListener('input', (e) => comprobarNyA('El campo nombre debe tener minimo 2 caracteres', e));
apellido.addEventListener('input', (e) => comprobarNyA('El campo apellido debe tener minimo 2 caracteres', e));
email.addEventListener('input', comprobarEmail );

});