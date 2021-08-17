import Player from './Player';

describe('Player',()=>{
    let p;
    beforeEach(()=>p = new Player("Player 1"));
    test('check for increament Player Turn',()=>
        expect(p.increamentPlayerTurn()).toBe(1)
    );

});