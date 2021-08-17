import Ship from './Ship';

describe('Ship use',()=>{
    let ship;
    let ship2;
    beforeEach(()=>{
        ship = Ship(["00","10","20"]);
        ship2 = Ship(["11"]); 
    });
    test('Test 1: check for hit function',()=>
        expect(ship.hit("00")).toBe()
    );
    test('Test 2: check for isSunk function',()=>
        expect(ship.isSunk()).toBe(false)
    );
    test('Test 3: check for is Sunk function',()=>{
        expect(ship.hit("00")).toBe();
        expect(ship.hit("10")).toBe();
        expect(ship.hit("20")).toBe();
        expect(ship.isSunk()).toBe(true);
        expect(ship2.isSunk()).toBe(false);
    });
}); 