import k from '../kaboom';

import movement from '../components/movement';
import controls from '../components/controls';
import spawn from '../components/spawn';
import link from '../components/link';
import getRandomPosition from '../utils/getRandomPosition';

export default function Snake() {
    const {
        debug,
        go,
        add,
        pos,
        rect,
        area,
        color,
        anchor,
        onCollide,
        destroy,
        shake,
        text
    } = k;

    let score: number = 0;

    const spawner = add([
        spawn()
    ]);

    let end: any = add([
        pos(getRandomPosition()),
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

    const scoreText = add([
        pos(2, 2),
        text(`Score: ${score}`),
        color(255,255,255)
    ])

    debug.inspect = true;
    spawner.spawn();

    onCollide('head', 'food', (head, food) => {
        let isOverlapping = food.isOverlapping(head) 
        if(isOverlapping)
        {
            destroy(food);

            shake(1);

            score = score + 1;

            scoreText.text = `Score: ${score}`; 

            const newChild = add([
                pos(end.pos.x, end.pos.y),
                rect(16, 16),
                color(0, 255, 0),
                anchor('center'),
                area(),
                link(),
                'body'
            ]);

            end.setChild(newChild);
            end = newChild;

            spawner.spawn();
        }
    });

    onCollide('head', 'body', (head, body) => {
        if(body.isNew()){
            console.log("is new")
            return;
        }
        
        let isOverlapping = body.isOverlapping(head) ;
        if(isOverlapping)
        {
            go('gameOver',  { score });
        }
    });
}