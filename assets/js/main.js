let container = document.getElementById('grid');
let mode = 0;
var bombs = [];
//Click su play
document.getElementById('start').addEventListener('click',
    function () {
        let levels = document.getElementById('levels').value;
        switch (levels) {
            case "uno":
                mode = 100;
                document.documentElement.style.setProperty('--column', '10');
                break;
            case "due":
                mode = 81;
                document.documentElement.style.setProperty('--column', '9');
                break;
            case "tre":
                mode = 49;
                document.documentElement.style.setProperty('--column', '7');
                break
        }
        //Rimozione dei div precedenti
        container.innerHTML = '';
        //Box creation
        box(mode)
    }
)

function box(a) {
    let array = [];
    for (i = 0; i < a; i++) {
        array.push(i);
    }
    //Generazione Bombe
    for (i = 0; i < 16; i++) {
        let num = numGen(a);
        if (!(bombs.includes(num))) {
            bombs.push(num);
        } else {
            i--;
        }
    }
    //Swap numeri random
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    //Swap bombe
    for (let i = bombs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    //Generazione box
    for (i = 1; i <= a; i++) {
        let box = document.createElement('div');
        box.classList.add('box');
        box.innerHTML = array[i - 1];
        container.appendChild(box);
        box.addEventListener('click',
            function clicked() {
                if (bombs.includes(Number(this.innerHTML))) {
                    this.classList.add('boom');
                    gameEnd();
                } else {
                    this.classList.add('clicked');
                    this.removeEventListener('click', clicked)
                }
            }
        )
    }
}

function numGen(z) {
    x = (Math.floor(Math.random() * z) + 1);
    return x;
}

//test scoperta bombe
function gameEnd(){
    for(i=0; i<container.children.length; i++){
        let check = container.children[i];
        if(bombs.includes(Number(check.innerHTML))){
            container.children[i].classList.add('boom');
        } else {
            container.children[i].classList.add('clicked');
        }
    }
}