// shipPostions: [11,12]

export default function Ship(shipPositions){
    let _shipPositions = [];
    shipPositions.forEach(pos => {
        _shipPositions.push(
            {
                coordinates: pos,
                hit: false
            }
        );
    });

    function getshipPositions(){
        return _shipPositions;
    }

    function hit(hitCoordinates){
        let x = _shipPositions.findIndex((pos)=>pos.coordinates === hitCoordinates);
        _shipPositions[x].hit = true;
    }

    function isSunk(){
        return _shipPositions.every((coordinate)=>coordinate.hit);
    }
    
    return {hit, isSunk, getshipPositions};
} 
