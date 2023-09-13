/**
 * Variables
 */
let palabraW = '';
const url = 'https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase';

fetch(url).then(response => response.json())
.then(response => {
    console.log("asd",response);
    palabraW = response[0].toUpperCase();
})
.catch(err => console.error(err));


const mybutton = document.getElementById('reset');
const palabras = ["actor", "altar", "arbol", "ropas", "manis"];
const htmPalabra = document.getElementById('palabra');
const campos = document.querySelectorAll('.campo')
const indiceAleatorio = palabras[Math.floor(Math.random() * palabras.length)];
let intentos = 6;
let palabraD = indiceAleatorio.split('');
console.log(indiceAleatorio);

campos.forEach((campo, index) => {
    campo.addEventListener('input', (event) => {
        const valor = event.target.value;
        const inputLength = event.target.value.length;
        // Si se ingresó una letra, pasar al siguiente campo
        if (valor.match(/[a-zA-Z]/)) {
            if (index < campos.length - 1) {
                campos[index + 1].focus();
                event.target.setSelectionRange(inputLength, inputLength);
            }
        }
        
    });
    campo.addEventListener('keydown', (event) => {
        
        // vuelve a la letra anterior
        if(event.key === 'Backspace'){
            if(index !== 0){
                campos[index].value = ''
                campos[index - 1].focus();
            }   
        }
        if(event.key === 'Enter'){
            wordlePPY();
        }
        
    });
    
});
/**
 * juego wordlePPY
 * @returns si la palabra es pequeña no hace nada
 */
function wordlePPY() {
    console.log(palabraW[0]);
   // palabraW = palabraW.split('');
    console.log("asd",palabraW);
    
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    let myInput = '';
    campos.forEach((campo) => {
        myInput += campo.value.toUpperCase();
    });
   
    
    if(myInput.length < 5){
        htmPalabra.innerHTML = "PALABRA CORTA";
        return;
    }
    if(myInput.includes(palabraW)){
        alert("ASDASDASD");
    }
    for (let i in palabraW) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        console.log("primera palabra "+ palabraW[i],"segunda "+ myInput[i]);
        if (palabraW[i] === myInput[i]) {
            SPAN.innerHTML = myInput[i];
            SPAN.style.backgroundColor = 'green';

        } else if (palabraW.includes(myInput[i])) {
            SPAN.innerHTML = myInput[i];
            SPAN.style.backgroundColor = 'yellow';

        } else {
            SPAN.innerHTML = myInput[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN);

    }
    GRID.appendChild(ROW);
    --intentos;
    htmPalabra.innerHTML = "tienes " + intentos + " intentos";


    if (myInput.includes(palabraW) || intentos === 0) {
        const mensaje = myInput.includes(palabraW) ? "GANASTE 😀" : "PERDISTE 😖";
        htmPalabra.innerHTML = mensaje;
    
        campos.forEach((campo) => {
            campo.readOnly = true;
            campo.blur();
        });
    
        mybutton.style.display = 'block';
    }
    
}
//metodo para recargar la pag de 0
function reloadF(){
    window.location.href = window.location.href;
}

// Abrir el modal cuando se hace clic en el botón
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('myModal');
const closeModalBtn = document.querySelector('.close');

openModalBtn.addEventListener('click', function() {
    modal.style.display = 'block';
});

// Cerrar el modal cuando se hace clic en la "X"
closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Cerrar el modal cuando se hace clic fuera del modal
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
