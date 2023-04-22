import k from '../kaboom';

export default function Snake() {
    const {
        add,
        pos,
        rect,
        color,
        anchor,
    } = k

    add([
        pos(8, 8),
        rect(16, 16),
        color(0,255,0),
        anchor('center')
    ])
}