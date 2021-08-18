import PlaceShipsToGameBoard from './ShipsPlacementAI';

describe('Test PlaceShipsToGameBoard AI',()=>{
    test('Test 1',()=>{
        expect(PlaceShipsToGameBoard(5)).not.toBe([]);
    });
});