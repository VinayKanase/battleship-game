// Player 1 || AI || Player 2

export default class GameBoard{
    constructor(){
        this.gameBoard = [];
        this.createGameBoardRow();
        this.ships = [];
        this.missedAttacksCoordinates = [];
    }

    createGameBoardRow() {
        let array = [];
        for(let i = 0; i < 10; i++){
            array.push(0);
        }
        this.gameBoard.push(array);
        if(this.gameBoard.length < 10){
            return this.createGameBoardRow();
        }
    }

    addShip(ship){
        this.ships.push(ship);
        ship.getshipPositions().forEach(position => {
            let positionArray = position.coordinates.split("");
            this.gameBoard[parseInt(positionArray[0])][parseInt(positionArray[1])] = ship.getshipPositions().length;
        });

        return this.gameBoard;
    }
    receiveAttack(coordinates){
        let tempArr = coordinates.split("");
        let onBoardPos = this.gameBoard[parseInt(tempArr[0])][parseInt(tempArr[1])];
        if(onBoardPos === 0){
            this.missedAttacksCoordinates.push(coordinates);
            return false;
        }else if(onBoardPos > 0){
            let ship = this.ships.find((ship) => ship.getshipPositions().length === onBoardPos);
            let position = ship.getshipPositions().find((pos)=>pos.coordinates === coordinates);
            // checks for if this position is already hitted
            if(position.hit) return false;
            ship.hit(coordinates);
            return true;
        }
    }
    isAllShipSunk(){
        let isSunk = true;
        if(this.ships.length <= 0) return undefined;
        this.ships.forEach((ship)=>{
            let positions = ship.getshipPositions();
            positions.forEach((pos)=>{
                if(!pos.hit) isSunk = false; 
            });
        });

        return isSunk;
    }
}