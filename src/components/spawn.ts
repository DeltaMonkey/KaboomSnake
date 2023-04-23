import k from '../kaboom';

export default function spawn() {
    const {
        wait,
        add,
        pos,
        rect,
        color,
        anchor
    } = k;

    return {
        spawn() {
            wait(1, () => {
                add([
                    pos(128, 128),
                    rect(16,16),
                    color(0,0,255),
                    anchor('center')
                ]);
            });
        }
    }
}