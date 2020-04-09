export default function generateViewBox(data) {
    const cardMapDiamonds = {
        A: {x: 900, y: 65}, //+217 height
        K: {x: 900, y: 499},
        Q: {x: 900, y: 282},
        J: {x: 900, y: 716},
        T: {x: 900, y: 933},
        9: {x: 900, y: 1150},
        8: {x: 900, y: 1367},
        7: {x: 1525, y: 65},
        6: {x: 1525, y: 282},
        5: {x: 1525, y: 499},
        4: {x: 1525, y: 716},
        3: {x: 1525, y: 933},
        2: {x: 1525, y: 1150}
    };

    let
        viewBox,
        start_x,
        start_y,
        width,
        height;

    if (data.type === 'card') {
        width = 70;
        height = 165;
        switch (data.suit) {
            case 'diamonds': {
                start_x = cardMapDiamonds[data.value].x;
                start_y = cardMapDiamonds[data.value].y;
                break;
            }
            case 'hearts': {
                start_x = cardMapDiamonds[data.value].x + 155;
                start_y = cardMapDiamonds[data.value].y;
                break;
            }
            case 'spades': {
                start_x = cardMapDiamonds[data.value].x + 310;
                start_y = cardMapDiamonds[data.value].y;
                break;
            }
            case 'clubs': {
                start_x = cardMapDiamonds[data.value].x + 465;
                start_y = cardMapDiamonds[data.value].y;
                break;
            }
            default: {
                break;
            }
        }

        return `${start_x} ${start_y} ${width} ${height}`;
    }
    else if(data.type === 'card shirt'){
        start_x = 1525;
        start_y = 1370;
        width = 70;
        height = 165;
        return `${start_x} ${start_y} ${width} ${height}`;
    }else if(data.type === 'chips'){
        return getChipsViewBox(data.value);
    }
}

function  getChipsViewBox(value) {
    const width = 90;
    const height = 80;
    switch (value) {
        case 1:{
            return `423 340 ${width} ${height}`;
        }
        case 2:{
            return `295 340 ${width} ${height}`;
        }
        case 5:{
            return `163 340 ${width} ${height}`;
        }
        case 10:{
            return `33 340 ${width} ${height}`;
        }
        case 25:{
            return `33 414 ${width} ${height}`;
        }
        case 50:{
            return `163 414 ${width} ${height}`;
        }
        case 100:{
            return `295 414 ${width} ${height}`;
        }
        default: return false;
    }



}
