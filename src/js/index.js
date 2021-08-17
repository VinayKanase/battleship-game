import "../styles/style.css";
import GameBoard from "./GameBoard";
import Ship from "./Ship";
// fade, fadebottom, fadeleft, faderight, fadetop, glow

function fancytext(mainClass, styletype = "fade", timer = 50) {
  const fancyhead = document.querySelector(mainClass);
  const stringText = fancyhead.textContent;
  const splitText = stringText.split("");
  const textlength = splitText.length;
  fancyhead.textContent = "";
  for (var i = 0; i < textlength; i++) {
    fancyhead.innerHTML += `<span>${splitText[i]}</span>`;
  }

  let character = 0;
  let Timer = setInterval(animate, timer);
  function animate() {
    const span = fancyhead.querySelectorAll("span")[character];
    if (styletype === "glow") {
        span.classList.add("glow");
        document.querySelectorAll(".glow").forEach((element) => {
            element.style.animationDelay = timer * textlength - 10;
        });
    } else 
        span.classList.add(styletype);
    character++;
    if (character === textlength) {
      return done();
    }
    function done() {
      clearInterval(Timer);
      Timer = null;
    }
    }   
}
fancytext('.main-heading',"glow",150);



function addBlocksToGameBoard() {
  let grid = document.querySelectorAll('.gameBoard');
  grid.forEach((gr)=>{
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 10; j++){
        gr.innerHTML += `<div data-coordinates="${i}${j}" class='gridItem'></div>`;
      }
    }
  });
}
addBlocksToGameBoard();

const domManager = (function(){
  const setShips = document.getElementById('setShips');
  const gameBoard =  document.getElementById('setPlayerGameBoard');
  let shipCount = 0;
  function init(){
    setShips.classList.remove('display-none');
    console.log(gameBoard);
    gameBoard.addEventListener("mouseover",(e)=>{
      if(shipCount === 0){
        // e.target.classList.add('placedShip');
        // console.log(e.target.nextSibling);
        // e.target.nextSibling.classList.add('placedShip');
        // e.target.nextSibling.nextSibling.classList.add('placedShip');
        //  TODO : Find way to add ship at place of hover and in order of decreasing size of ship
      }
    });
  }
  return {init};
})();
const Game = (function(){
  let gameBoard;
  function init(){
    domManager.init();
    gameBoard = new GameBoard();
  }
  function createShip(){
    // let ship = new Ship()
  }
  return {init}
})();

document.getElementById('start').addEventListener("click",()=>{
  document.querySelector('.startModal').classList.add('display-none');
  Game.init();
});