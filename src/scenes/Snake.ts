import k from '../kaboom';

import movement from '../components/movement';
import controls from '../components/controls';
import spawn from '../components/spawn';
import link from '../components/link';

export default function Snake() {
    const {
        add,
        pos,
        rect,
        area,
        color,
        anchor,
        onCollide,
        destroy,
        shake
    } = k;

    const spawner = add([
        spawn()
    ]);

    let end: any = add([
        pos(8, 8),
        rect(16, 16),
        color(0,255,0),
        anchor('center'),
        area(),
        movement(),
        controls(),
        spawn(),
        link(),
        'head'
    ])

    spawner.spawn();

    onCollide('head', 'food', (head, food) => {
        destroy(food);

        shake(1);

        const newChild = add([
            pos(end.pos.x, end.pos.y),
            rect(16, 16),
            color(0, 255, 0),
            anchor('center'),
            area(),
            link()
        ]);

        end.setChild(newChild);
        end = newChild;

        spawner.spawn();
    });
}