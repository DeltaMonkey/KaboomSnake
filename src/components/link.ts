import { GameObj, PosComp, Vec2 } from "kaboom";
import k from "../kaboom";

export type LinkComp = {
    add(): void;
    getChild(): GameObj;
    setChild(c: GameObj): void;
    moveUpdate(x: number, y: number): void;
};

export default function link() {
    const {
        vec2
    } = k

    let child: GameObj & LinkComp;
    const previousPosition = vec2(0,0);
    //let isNew: boolean = true;

    return {
        add() {
            previousPosition.x = this.pos.x;
            previousPosition.y = this.pos.y;
        },
        getChild() {
            return child;
        },
        setChild(c: GameObj & LinkComp) {
            child = c
        },
        moveUpdate(this: GameObj & PosComp, x: number, y: number) {
            const pos: Vec2 = previousPosition.clone();

            previousPosition.x = x;
            previousPosition.y = y;

            this.pos.x = pos.x;
            this.pos.y = pos.y;

            //isNew = false;

            if(!child) {
                return;
            }

            child.moveUpdate(pos.x, pos.y);
        }
    } as LinkComp
}