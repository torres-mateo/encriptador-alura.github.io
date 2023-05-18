// Parte 1:
// Verifica si la cadena contiene caracteres no permitidos (solo letras minúsculas y espacios en blanco)
function validarTexto(cadena) {
    const caracteresNoPermitidos = /[^a-z ]/;
    return caracteresNoPermitidos.test(cadena);
  }
  
function visibilizarError(elemento, textoEscrito, clase) {
    if (validarTexto(textoEscrito)) {
      elemento.classList.add(clase);
    } else {
      elemento.classList.remove(clase);
    }
  }
  
const capturarTexto = document.querySelector('.texto');
const avisoEnRojo = document.querySelector('.advertencia-minusculas');
  
capturarTexto.addEventListener('input', function() {
    const textoIngresado = this.value.trim();
    visibilizarError(this, textoIngresado, 'error');
    visibilizarError(avisoEnRojo, textoIngresado, 'error-aviso');
  });
  
  
  
// Parte 2: 
// Con la validacion anterior configuro el boton de encriptar. texto.


const botonEncriptar = document.querySelector('.boton-encriptar');
let validacionBotonCopiar = 0;

botonEncriptar.addEventListener('click', function(event) {
  event.preventDefault();

  const capturarTexto = document.querySelector('.texto');

  if (capturarTexto.value.trim().length === 0 || validarTexto(capturarTexto.value)) {
    return;
  }

  const vocales = ['e', 'i', 'a', 'o', 'u'];
  const reemplazo = ['enter', 'imes', 'ai', 'ober', 'ufat'];
  const textoEncriptado = encriptarDesencriptarTexto(capturarTexto.value, vocales, reemplazo);
  
  const cuadroTexto = document.querySelector('.encriptado');
  cuadroTexto.innerHTML = '<textarea readonly class="texto-salida"></textarea>';
  const textoSalida = document.querySelector('.texto-salida');
  textoSalida.value = textoEncriptado;
  capturarTexto.value = '';

  const botonCopiar = document.querySelector('.boton-invisible');
  if (validacionBotonCopiar === 0) {
    botonCopiar.classList.add('boton-copiar');
    botonCopiar.classList.remove('boton-invisible');
    validacionBotonCopiar++;
  }
});


// Parte 3: 
// Configuro el boton de desencriptar.

const botonDesencriptar = document.querySelector('.boton-desencriptar');

botonDesencriptar.addEventListener('click', function(event) {
  event.preventDefault();

  const capturarTexto = document.querySelector('.texto');

  if (capturarTexto.value.trim().length === 0 || validarTexto(capturarTexto.value)) {
    return;
  } else {
    const vocales = ['e', 'i', 'a', 'o', 'u'];
    const reemplazo = ['enter', 'imes', 'ai', 'ober', 'ufat'];
    const textoDesencriptado = encriptarDesencriptarTexto(capturarTexto.value, reemplazo, vocales);
    const cuadroTexto = document.querySelector('.encriptado');
    cuadroTexto.innerHTML = '<textarea readonly class="texto-salida"></textarea>';
    const textoSalida = document.querySelector('.texto-salida');
    textoSalida.value = textoDesencriptado;
    capturarTexto.value = '';

    if (validacionBotonCopiar === 0) {
      botonCopiar.classList.replace('boton-invisible', 'boton-copiar');
      validacionBotonCopiar++;
    }
  }
});

// Parte 4: 
// Copiar el texto encriptado.

const botonCopiar = document.querySelector('.boton-invisible');
const avisoTextoCopiado = document.querySelector('.texto-copiado-invisible');
const clase1 = 'texto-copiado-invisible';
const clase2 = 'texto-copiado-visible';

botonCopiar.addEventListener('click', function(event) {
  event.preventDefault();
  const codigoACopiar = document.querySelector('.texto-salida');
  copiarAlPortapapeles(codigoACopiar);
  aparecerDesaparecerAviso(clase1, clase2);
  setTimeout(function() {
    avisoTextoCopiado.classList.replace(clase2, clase1);
  }, 1300);
});

function aparecerDesaparecerAviso(clase1, clase2) {
  avisoTextoCopiado.classList.replace(clase1, clase2);
}

function copiarAlPortapapeles(elemento) {
  const texto = elemento.value;
  navigator.clipboard.writeText(texto)
    .then(() => {
      console.log("Texto copiado al portapapeles: " + texto);
    })
    .catch((error) => {
      console.error("Error al copiar al portapapeles:", error);
    });
}


// parte 5 : 
// Encriptar o desencriptar el texto. 


function encriptarDesencriptarTexto(texto, patrones, reemplazos) {
    const expresiones = patrones.map(patron => new RegExp(patron, 'g'));
  
    for (let i = 0; i < expresiones.length; i++) {
      texto = texto.replace(expresiones[i], reemplazos[i]);
    }
  
    return texto;
  }
