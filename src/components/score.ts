export type ScoreComp = {
    setScore(c: number): void;
    getScore(): number;
};

export default function score() {

    let score: number = 0;

    return {
        setScore(currentScore: number) {
            score = currentScore;
        },
        getScore(): number {
            return score;
        }
    }
}