import { GameObj } from "kaboom";

export type OverlapCheckerComp = {
    isOverLappingWithBody(): boolean;
    overLappedBody: GameObj;
};

export default function overlapChecker(bodyList: GameObj[]) {
    return {
        isOverLappingWithBody(): boolean {
            let result = false;
            bodyList.forEach((element:GameObj)  => {
                if(this.isOverlapping(element))
                {
                    this.overLappedBody = element;
                    result = true;
                }
            });
            return result;
        },
        overLappedBody: {}
    } as OverlapCheckerComp
}