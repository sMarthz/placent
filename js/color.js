function changeColor() {
    let red = document.getElementById('range-red').value;
    let green = document.getElementById('range-green').value;
    let blue = document.getElementById('range-blue').value;
    let color = 'rgb(' + red + ',' + green + ',' + blue + ')';
    document.getElementById('current-color').style.backgroundColor = color;
    document.getElementById('color-output').innerHTML = color;
}

document.getElementById('range-red').addEventListener('input',changeColor);
document.getElementById('range-green').addEventListener('input',changeColor);
document.getElementById('range-blue').addEventListener('input',changeColor);