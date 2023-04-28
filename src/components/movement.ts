import { GameObj } from "kaboom";
import k from "../kaboom";
import { CounterComp } from "./counter";
import { LinkComp } from "./link";
import { OverlapCheckerComp } from "./overlapChecker";
import { ScoreComp } from "./score";

export type MovementComp = {
    add(): void;
    update(): number;
    movement: MovementObjComp;
};

export type MovementObjComp = {
    left(): void;
    right(): void;
    up(): void;
    down(): void;
};

export default function movement() {
    const {
        go,
        dt,
        vec2
    } = k;

    const direction = vec2(0, 0);
    const speed: number = 16;
    let accumulatedTime: number = 0;

    return {
        add() {
            this.movement.right();
        },
        update(this: GameObj & LinkComp & OverlapCheckerComp & CounterComp & ScoreComp) {
            accumulatedTime += dt();

            if(accumulatedTime < 0.25) return;

            accumulatedTime = 0;

            if(!this.pos) {
                console.log("Missing pos component.");
                return;
            }

            this.pos.x += direction.x * speed;
            this.pos.y += direction.y * speed;

            const child = this.getChild();
            if(!child) {
                return;
            }

            console.log(this.isOverLappingWithBody())
            if(this.isOverLappingWithBody()){
                //if head touching to the previous one ignore it
                if(this.overLappedBody.getCounter()-1 != this.getCounter()){
                    var score = this.getScore();
                    go('gameOver',  { score });
                }
            }

            child.moveUpdate(this.pos.x, this.pos.y);
        },
        movement: {
            left(): void {
                if(direction.x != 1)
                {
                    direction.x = -1;
                    direction.y = 0;
                }
            },
            right(): void {
                if(direction.x != -1)
                {
                    direction.x = 1;
                    direction.y = 0;
                }
            },
            up(): void {
                if(direction.y != 1)
                {
                    direction.x = 0;
                    direction.y = -1;
                }
            },
            down(): void {
                if(direction.y != -1)
                {
                    direction.x = 0;
                    direction.y = 1;
                }
            }
        } 
    } as MovementComp;
}