import k from '../kaboom';

import getRandomPosition from '../utils/getRandomPosition';

export default function spawn() {
    const {
        wait,
        add,
        pos,
        rect,
        area,
        color,
        anchor
    } = k;

    return {
        spawn(): void {
            wait(1, () => {
                add([
                    pos(getRandomPosition()),
                    rect(14,14),
                    color(0,0,255),
                    anchor('center'),
                    area(),
                    'food'
                ]);
            });
        }
    }
}