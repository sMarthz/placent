const container = document.querySelector('.container')
const sizeEl = document.querySelector('.size')
let size = sizeEl.value
const color = document.querySelector('.color')
const resetBtn = document.querySelector('.btn')

let contador = 0;
let temporizador = 10;
let puedeDibujar = true;
let intervalo

let draw = false

function populate(size) {
  container.style.setProperty('--size', size)
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div')
    div.classList.add('pixel')
    div.setAttribute('pixel-id', i)
    /* div.addEventListener('mouseover', function(){
        if(!draw) return
        div.style.backgroundColor = color.value
    }) */
    div.addEventListener('mousedown', function(){
        if (puedeDibujar) {
            div.style.backgroundColor = color.value;
            puedeDibujar = false;
            intervalo = setInterval(contar, 1000);

            const idPixel = div.getAttribute("pixel-id");
            const colorPixel = color.value;
            console.log("idPixel",idPixel)
            console.log("colorPixel",colorPixel)
            
        }
    })

    container.appendChild(div)
  }
}

/* window.addEventListener("mousedown", function(){
    draw = true
}) */
window.addEventListener("mouseup", function(){
    draw = false
})

sizeEl.addEventListener('keyup', function(){
    size = sizeEl.value
})

function contar() {
    contador++;
    if (temporizador <= contador) {
        clearInterval(intervalo);
        contador = 0;
        puedeDibujar = true;
        alert("Ya puedes volver a dibujar");
    }
}




populate(size)