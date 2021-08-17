import GameBoard from "./GameBoard";

describe('Test GameBoard',()=>{
   let gameBoard;
   let gameBoard2;
   beforeEach(()=>{
    gameBoard = new GameBoard();
    gameBoard2 = new GameBoard();
   });
   test('Test 1: Add Ship to game Board',()=>{
    const fakeShip = {
        getshipPositions: ()=>{
            return [
            {
                coordinates: "11"
            },
            {
                coordinates: "12"
            }
        ];
        }
    }
    const fakeShip2 = {
        getshipPositions: ()=>{
            return [
                {
                    coordinates: "00",
                },
                {
                    coordinates: "01",
                    hit: true
                },
                {
                    coordinates: "02"
                }
            ];
        },
        hit: (coordinates)=>{
            expect(typeof coordinates).toBe("string");
        }
    }
    expect(gameBoard.addShip(fakeShip)).toEqual([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 2, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    expect(gameBoard.addShip(fakeShip2)).toEqual([[3, 3, 3, 0, 0, 0, 0, 0, 0, 0], [0, 2, 2, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    expect(gameBoard.receiveAttack("00")).toBe(true);
    expect(gameBoard.receiveAttack("01")).toBe(false);
   });
});

describe('Test GameBoard 2',()=>{
    let gameBoard;
    beforeEach(()=>gameBoard = new GameBoard());
    let mockShip = {
        getshipPositions: ()=>{
            return [
                {
                    coordinates: "00",
                    hit: true
                },
                {
                    coordinates: "01",
                    hit: true
                }
            ];
        },
        hit: (coordinates)=>{
            expect(typeof coordinates).toBe("string");  
        }
    }

    test('Adding Ship to GameBoard and check for isAllShipSunk',()=>{
        expect(gameBoard.addShip(mockShip)).not.toBe([]);
        expect(gameBoard.isAllShipSunk()).toBe(true);
    });
});