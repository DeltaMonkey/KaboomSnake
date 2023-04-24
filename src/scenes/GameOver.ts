import k from "../kaboom";

export default function GameOver(data) {
    console.log(data.score);
    const {
        go,
        add,
        pos,
        text,
        color,
        anchor,
        width,
        height,
        onKeyPress
    } = k;

    add([
        pos(width() * 0.5, height() * 0.5),
        text('Game Over', { size: 24 }),
        color(255, 0, 0),
        anchor('center')
    ]);

    onKeyPress('enter', () => {
        go('snake')
    })
}