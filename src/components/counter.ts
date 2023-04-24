export default function counter() {

    let counter: number = 0;

    return {
        setCounter(c: number) {
            counter = c;
        },
        getCounter() {
            return counter;
        }
    }
}