import k from '../kaboom';

import movement, { MovementComp } from '../components/movement';
import controls, { ControlsComp } from '../components/controls';
import spawn, { SpawnComp } from '../components/spawn';
import link, { LinkComp } from '../components/link';
import getRandomPosition from '../utils/getRandomPosition';

import counter, { CounterComp } from '../components/counter';
import overlapChecker, { OverlapCheckerComp } from '../components/overlapChecker';
import score, { ScoreComp } from '../components/score';
import { AnchorComp, AreaComp, ColorComp, GameObj, PosComp, RectComp } from 'kaboom';

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
        shake,
        text
    } = k;

    let head: GameObj & 
              AreaComp &
              AnchorComp &
              MovementComp & 
              ControlsComp & 
              PosComp & 
              SpawnComp & 
              ColorComp & 
              RectComp & 
              LinkComp & 
              CounterComp & 
              CounterComp & 
              ScoreComp & 
              OverlapCheckerComp;
    let bodyCount = 0;
    let bodyArray: GameObj[] = [];

    const spawner = add([
        spawn()
    ]);

    let end = add([
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
    ]) as GameObj & 
          AreaComp &
          AnchorComp &
          MovementComp & 
          ControlsComp & 
          PosComp & 
          SpawnComp & 
          ColorComp & 
          RectComp & 
          LinkComp & 
          CounterComp & 
          CounterComp & 
          ScoreComp & 
          OverlapCheckerComp;
    
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
            ]) as GameObj & 
                  AreaComp &
                  AnchorComp &
                  MovementComp & 
                  ControlsComp & 
                  PosComp & 
                  SpawnComp & 
                  ColorComp & 
                  RectComp & 
                  LinkComp & 
                  CounterComp & 
                  CounterComp & 
                  ScoreComp & 
                  OverlapCheckerComp;;

            newChild.setCounter(bodyCount);
            
            bodyArray.push(newChild);

            end.setChild(newChild);
            end = newChild;

            spawner.spawn();
        }
    });
}