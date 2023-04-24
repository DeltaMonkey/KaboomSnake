import k from '../kaboom';

import movement from '../components/movement';
import controls from '../components/controls';
import spawn from '../components/spawn';
import link from '../components/link';
import getRandomPosition from '../utils/getRandomPosition';

import counter from '../components/counter';
import overlapChecker from '../components/overlapChecker';
import score from '../components/score';
import { GameObj } from 'kaboom';

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

    let head: GameObj;
    let bodyCount = 0;
    let bodyArray: any[] = [];

    const spawner = add([
        spawn()
    ]);

    let end: any = add([
        pos(getRandomPosition()),
        rect(16, 16),
        color(255,255,0),
        anchor('center'),
        area(),
        movement(),
        controls(),
        spawn(),
        link(),
        counter(),
        overlapChecker(bodyArray),
        score(),
        'head'
    ])
    
    end.setCounter(0);
    end.setScore(0);

    head = end;
    
    const scoreText = add([
        pos(2, 2),
        text(`Score: ${head.getScore()}`),
        color(255,255,255)
    ])

    //debug.inspect = true;
    spawner.spawn();

    onCollide('head', 'food', (head, food) => {
        let isOverlapping = food.isOverlapping(head) 
        if(isOverlapping)
        {
            destroy(food);

            shake(1);

            head.setScore(head.getScore() + 1);

            scoreText.text = `Score: ${head.getScore()}`; 

            bodyCount++;

            const newChild = add([
                pos(end.pos.x, end.pos.y),
                rect(16, 16),
                color(bodyCount*20, 255-bodyCount*20, 0),
                anchor('center'),
                area(),
                link(),
                counter(),
                'body'
            ]);

            newChild.setCounter(bodyCount);
            
            bodyArray.push(newChild);

            end.setChild(newChild);
            end = newChild;

            spawner.spawn();
        }
    });
}