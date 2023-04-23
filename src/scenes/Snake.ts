import k from '../kaboom';

import movement from '../components/movement';
import controls from '../components/controls';
import spawn from '../components/spawn';

export default function Snake() {
    const {
        add,
        pos,
        rect,
        color,
        anchor,
    } = k;

    const spawner = add([
        spawn()
    ]);

    add([
        pos(8, 8),
        rect(16, 16),
        color(0,255,0),
        anchor('center'),
        movement(),
        controls(),
        spawn()
    ])

    spawner.spawn();
}