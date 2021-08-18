import "../styles/style.css";
import GameBoard from "./GameBoard";
import Ship from "./Ship";
import PlaceShipsToGameBoard from './ShipsPlacementAI';
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
      let row = document.createElement('div');
      row.classList.add('row');
      gr.append(row);
      for(let j = 0; j < 10; j++){
        row.innerHTML += `<div data-coordinates="${i}${j}" class='gridItem'></div>`;
      }
    }
  });
}
addBlocksToGameBoard();

const domManager = (function(){
  const setShips = document.getElementById('setShips');
  const gameBoard =  document.getElementById('setPlayerGameBoard');
  let shipCount = 5;
  let isOkToPlaceShip = false;
  let rotate = false;
  let playerCanStartGame = false;
  function init(){
    setShips.classList.remove('display-none');
    activeBoard();
  }
  function activeBoard(){
    gameBoard.addEventListener("mouseover",(e)=>{
      if(!e.target.classList.contains('gridItem')) return;
      let x = +e.target.dataset.coordinates.slice(0,1);
      let y = +e.target.dataset.coordinates.slice(1);
      clearSetBoard();
      for(let i = 0; i < shipCount;i++){
        let pos;
        if(rotate){
          if(!gameBoard.children[x+i]) {
            isOkToPlaceShip = false;
            return clearSetBoard();  
          }
          pos = gameBoard.children[x+i].children[y];
        }
        else if(!rotate){
          pos = gameBoard.children[x].children[y+i];
        }
        if(!pos || pos.classList.contains('shipDrop')) {
          isOkToPlaceShip = false;
          return clearSetBoard();
        }
        pos.classList.add('placedShip');
        isOkToPlaceShip = true;
      }
    });
  }
  gameBoard.addEventListener("click",(e)=>{
    if(!e.target.classList.contains('gridItem') || playerCanStartGame) return;
    if(isOkToPlaceShip){
      let coordinatesArray = [];
      let x = +e.target.dataset.coordinates.slice(0,1);
      let y = +e.target.dataset.coordinates.slice(1);
      for(let i = 0; i < shipCount;i++){
        let pos;
        if(rotate){
          if(!gameBoard.children[x+i]) {
            isOkToPlaceShip = false;
            return clearSetBoard();  
          }
          pos = gameBoard.children[x+i].children[y];
        }
        else if(!rotate){
          pos = gameBoard.children[x].children[y+i];
        }
        if(!pos) {
          isOkToPlaceShip = false;
          return clearSetBoard();
        }
        document.getElementById(shipCount).style.opacity = '0.5';
        pos.classList.add('shipDrop');
        coordinatesArray.push(`${rotate ? x+i : x}${rotate ? y : y+i}`);
      }
      shipCount--;
      let count = Game.createShip(coordinatesArray);
      if(count == 5) playerCanStartGame = true;
    }
  });
  document.getElementById('clear').addEventListener("click",()=>{
      clearSetBoard();
      document.querySelectorAll('.shipDrop').forEach(ship=>{
        ship.classList.remove('shipDrop');
      })
      shipCount = 5;
      isOkToPlaceShip = false;
  });
  document.getElementById('rotate').addEventListener("click",()=>rotate=!rotate);
  document.getElementById('beginGame').addEventListener("click",()=>{
    if(playerCanStartGame){
      document.getElementById('setShips').classList.add('display-none');
      document.getElementById('mainPage').classList.remove('display-none');
      beginGame();
    }
  });
  function clearSetBoard(){
    let placedShips = document.querySelectorAll('.placedShip');
    placedShips.forEach(ship=>{
      ship.classList.remove('placedShip');
    })
  }
  function beginGame(){
    let ships = Game.totalShips().map((ship)=>ship.getshipPositions());
    let playerBoard = document.getElementById('playerBoard');
    ships.forEach(ship=>{
      ship.forEach(pos=>{
        let element = playerBoard.querySelector(`[data-coordinates="${pos.coordinates}"`);
        element.classList.add('shipDrop');
      }); 
    });

    let oships = Game.returnComputerShips().map((ship)=>ship.getshipPositions());
    let opponentBoard = document.getElementById('opponentBoard');
    console.log(oships);
    oships.forEach(ship=>{
      ship.forEach(pos=>{
        let element = opponentBoard.querySelector(`[data-coordinates="${pos.coordinates}"`);
        element.classList.add('shipDrop');
      }); 
    });
  }
  return {init};
})();
const Game = (function(){
  let gameBoard;
  let opponentGameBoard;
  function init(){
    domManager.init();
    gameBoard = new GameBoard();
    opponentGameBoard = new GameBoard();
    PlaceShipsToGameBoard().forEach((ship)=>opponentGameBoard.addShip(new Ship(ship)));
  }
  function createShip(shipCoordinates){
    let ship = new Ship(shipCoordinates);
    gameBoard.addShip(ship);
    if(gameBoard.ships.length > 5){
      gameBoard.ships = gameBoard.ships.slice(5,6);
    }
    return gameBoard.ships.length;
  }
  function returnComputerShips(){
    return opponentGameBoard.ships;
  }
  function totalShips(){
    return gameBoard.ships;
  }
  return {init, createShip, totalShips, returnComputerShips}
})();

document.getElementById('start').addEventListener("click",()=>{
  document.querySelector('.startModal').classList.add('display-none');
  Game.init();
});