
export default class Player{
    constructor(name){
        this.playerName = name;
        this.playerTurns = 0;
        if(this.playerName === "Computer") this.AI = new SimpleAI(this);
    }
    setOpponentGameBoard(gameBoard){
        this.opponentGameBoard = gameBoard;
    }
    increamentPlayerTurn(){
        this.playerTurns++;
        return this.playerTurns;
    }
}