function RandomNumber(multipliyer){
    return parseInt(Math.random() * multipliyer);
}

export default function PlaceShipsToGameBoard(count = 5){
    let shipsCount = count;
    let rotate = RandomNumber(2);
    let x = RandomNumber(10);
    let y = RandomNumber(10);
    let ships = [];
    let reserervedPlaces = [];
    let currentShipPosition = [];
    for (let i = 0; i < count; i++) {
        if (!!rotate) {
            currentShipPosition.push(`${x+i}${y}`);
            reserervedPlaces.push(`${x+i}${y}`)
        }else{
            currentShipPosition.push(`${x}${y+i}`);
            reserervedPlaces.push(`${x}${y+i}`);
        }
    }
    // TODO : Complete AI With good logic try to randomize only x or y so we get perfect position Try one shipblock at one time
    shipsCount--;
    ships.push(currentShipPosition);
    return ships;
}