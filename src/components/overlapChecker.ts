export default function overlapChecker(bodyList: any[]) {
    return {
        isOverLappingWithBody() {
            let result = false;
            bodyList.forEach(element => {
                if(this.isOverlapping(element))
                {
                    this.overLappedBody = element;
                    result = true;
                }
            });
            return result;
        },
        overLappedBody: {}
    }
}