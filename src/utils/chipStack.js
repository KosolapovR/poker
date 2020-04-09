export default function getChipsStack(value) {
    const arr = [];
    const chips = [100, 50, 25, 10, 5, 2, 1];
    for (let i = 0; i < chips.length; i++) {
        if (value >= chips[i]) {
            let count = Math.floor(value / chips[i]);
            for (let j = 0; j < count; j++) {
                arr.push(chips[i]);
            }

            value -= Math.floor(value / chips[i]) * chips[i];
        }
    }
    return arr;
}