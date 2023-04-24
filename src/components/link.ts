import { Vec2 } from "kaboom";
import k from "../kaboom";

export default function link() {
    const {
        vec2
    } = k

    let child: any;
    const previousPosition = vec2(0,0);
    let isNew: boolean = true;

    return {
        add() {
            previousPosition.x = this.pos.x;
            previousPosition.y = this.pos.y;
        },
        getChild() {
            return child;
        },
        setChild(c: any) {
            child = c
        },
        moveUpdate(x: number, y: number) {
            const pos: Vec2 = previousPosition.clone();

            previousPosition.x = x;
            previousPosition.y = y;

            this.pos.x = pos.x;
            this.pos.y = pos.y;

            isNew = false;

            if(!child) {
                return;
            }

            child.moveUpdate(pos.x, pos.y);
        },
        isNew(): boolean {
            return isNew;
        }
    }
}