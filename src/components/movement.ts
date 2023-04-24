import { GameObj } from "kaboom";
import k from "../kaboom";

export default function movement() {
    const {
        go,
        dt,
        vec2
    } = k;

    const direction = vec2(0, 0);
    const speed: number = 16;
    let accumulatedTime = 0;

    return {
        add() {
            this.movement.right();
        },
        update() {
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
            left() {
                if(direction.x != 1)
                {
                    direction.x = -1;
                    direction.y = 0;
                }
            },
            right() {
                if(direction.x != -1)
                {
                    direction.x = 1;
                    direction.y = 0;
                }
            },
            up() {
                if(direction.y != 1)
                {
                    direction.x = 0;
                    direction.y = -1;
                }
            },
            down() {
                if(direction.y != -1)
                {
                    direction.x = 0;
                    direction.y = 1;
                }
            }
        }
    }
}