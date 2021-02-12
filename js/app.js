const gameContainer = document.querySelector('.game-container')
const startBtn = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
const close = document.getElementById('close')
const gameOver = document.querySelector('.game-over-bg')
const finalScore = document.querySelector('#final-score')
let squares = []                                    
let snake = [23,22,21]
let direction = 1
let speed = 700
let apple = 0
let trap = 0
let extra = 0
let score = 0


for(let i = 0; i<400; i++){
   const square = document.createElement('div')
   squares.push(square)
   gameContainer.append(square)
   if (i !== 0 && i - 19 < 0){
        squares[i].style.borderBottom = '2px solid black'
   } else if (i !== 399 && i+20 > 400){
        squares[i].style.borderTop = '2px solid black'
   } else if ( i !== 0 && i !== 380 && i % 10 === 0 && i / 10 % 2 === 0){
        squares[i].style.borderRight = '2px solid black'
   } else if(i !==399 && i !== 19 && (i+1) % 10 === 0 && (i+1) / 10 % 2 === 0 ){
    squares[i].style.borderLeft = '2px solid black'
   }
}



scoreDisplay.textContent = score

snake.forEach(index => squares[index].classList.add('snake'))

function generateApple(){
    apple = Math.floor(Math.random()*400)
    while (squares[apple].classList.contains('snake') ||
    apple - 20 < 0 ||
    apple + 20 > 400 ||
    apple % 10 === 0 && apple / 10 % 2 === 0 ||
    (apple+1) % 10 === 0 && (apple+1) / 10 % 2 === 0 ){

        apple = Math.floor(Math.random()*400)

    }      
    squares[apple].classList.add('apple')
    
}  

function control(event){
    if(event.keyCode === 40){
        direction = 20
    } else if (event.keyCode === 38){
        direction = -20
    } else if (event.keyCode === 37){
        direction = -1
    } else if (event.keyCode === 39){
        direction = 1
    }
}
function move(){
    let tail = snake.pop() 
    squares[tail].classList.remove('snake')
    snake.unshift(snake[0]+direction)
    squares[snake[0]].classList.add('snake')
    
    if (snake[0] - 20 < 0 && direction === -20 ||
        snake[0] + 20 > 400 && direction === 20 ||
        snake[0] % 10 === 0 && snake[0] / 10 % 2 === 0 && direction === -1 ||
        (snake[0]+1) % 10 === 0 && (snake[0]+1) / 10 % 2 === 0 && direction === 1 ||
        squares[snake[0]+direction].classList.contains('snake')
    ){
        clearInterval(moving)
        clearInterval(bomb)
        clearInterval(star)
        squares[snake[0]].classList.remove('snake')
        squares[apple].classList.remove('apple')
        squares[trap].classList.remove('bomb')
        squares[extra].classList.remove('star')
        gameOver.style.display = 'block'
        finalScore.textContent = score
    } 
     

    if (squares[snake[0]].classList.contains('apple')){
        squares[snake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        snake.push(tail)
        generateApple()
        speed *= 0.9
        score++
        scoreDisplay.textContent = score
    }

    if (squares[snake[0]].classList.contains('bomb')){
        squares[snake[0]].classList.remove('bomb')
        squares[extra].classList.remove('star')
        squares[apple].classList.remove('apple')
        clearInterval(moving)
        clearInterval(bomb)
        clearInterval(star)
        gameOver.style.display = 'block'
    }

    if (squares[snake[0]].classList.contains('star')){
        squares[snake[0]].classList.remove('star')
        score += 2
        scoreDisplay.textContent = score
    }
}

let moving = setInterval(move,speed)
generateApple()

document.addEventListener('keyup', control)
startBtn.addEventListener('click',restart)

function restart(){ 
    gameOver.style.display = 'none'   
    snake.forEach(index => squares[index].classList.remove('snake'))
    snake = [23,22,21]
    snake.forEach(index => squares[index].classList.add('snake'))
    direction = 1
    speed = 1000
    squares[apple].classList.remove('apple')
    generateApple()
    score = 0
    scoreDisplay.textContent = score
    clearInterval(moving)
    clearInterval(bomb)
    clearInterval(star)
    moving = setInterval(move,speed)
    bomb = setInterval (boom, 30000)
    star = setInterval(price, 60000)
}

let bomb = setInterval (boom, 30000)
function boom(){
    squares[trap].classList.remove('bomb')
    trap = Math.floor(Math.random()*400)
    while (squares[trap].classList.contains('snake') ||
    trap - 20 < 0 ||
    trap + 20 > 400 ||
    trap % 10 === 0 && trap / 10 % 2 === 0 ||
    (trap+1) % 10 === 0 && (trap+1) / 10 % 2 === 0 ){

        trap = Math.floor(Math.random()*400)

    }      
    squares[trap].classList.add('bomb')
}

let star = setInterval(price, 50000)
function price(){
    extra = Math.floor(Math.random()*400)
    while (squares[extra].classList.contains('snake') ||
    extra - 20 < 0 ||
    extra + 20 > 400 ||
    extra % 10 === 0 && extra / 10 % 2 === 0 ||
    (extra+1) % 10 === 0 && (extra+1) / 10 % 2 === 0 ){

        trap = Math.floor(Math.random()*400)

    }      
    squares[extra].classList.add('star')
}

document.getElementById('up').addEventListener('click', moveUp)
document.getElementById('left').addEventListener('click', moveLeft)
document.getElementById('down').addEventListener('click', moveDown)
document.getElementById('right').addEventListener('click', moveRight)

function moveUp(){
    direction = -20
}
function moveLeft(){
    direction = -1
}
function moveDown(){
    direction = 20
}
function moveRight(){
    direction = 1
}

close.addEventListener('click', restart)


