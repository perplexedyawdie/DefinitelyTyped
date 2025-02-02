import * as R from 'ramda';

() => {
    function duplicate(n: number) {
        return [n, n];
    }

    function duplicateConst(n: number) {
        return [n, n] as const;
    }

    function duplicateReadonly(n: number): ReadonlyArray<number> {
        return [n, n];
    }

    // $ExpectType (list: readonly number[]) => number[]
    const chainDuplicate = R.chain(duplicate);

    // $ExpectType number[]
    chainDuplicate([1, 2, 3]); // => [1, 1, 2, 2, 3, 3]
    // $ExpectType number[]
    R.chain(duplicate)([1, 2, 3]); // => [1, 1, 2, 2, 3, 3]

    // $ExpectType number[]
    R.chain(duplicateConst, [1, 2, 3] as const); // => [1, 1, 2, 2, 3, 3]
    // $ExpectType number[]
    R.chain(duplicateConst)([1, 2, 3] as const); // => [1, 1, 2, 2, 3, 3]

    // $ExpectType number[]
    R.chain(duplicateReadonly, [1, 2, 3]); // => [1, 1, 2, 2, 3, 3]
    // $ExpectType number[]
    R.chain(duplicateReadonly)([1, 2, 3]); // => [1, 1, 2, 2, 3, 3]

    interface Score {
        maths: number;
        physics: number;
        chemistry: number;
        total?: number;
    }

    const score = {
        maths: 90,
        physics: 80,
        chemistry: 70,
    };

    const calculateTotal = (score: Score): number => {
        const { maths, physics, chemistry } = score;
        return maths + physics + chemistry;
    };

    const assocTotalToScore = (total: number, score: Score): Score => ({ ...score, total });

    // $ExpectType (r: Score) => Score
    const calculateAndAssocTotalToScore = R.chain<number, Score, Score>(assocTotalToScore, calculateTotal);
    // $ExpectType Score
    const scoreWithTotal = calculateAndAssocTotalToScore(score); // => { maths: 90, physics: 80, chemistry: 70, total: 240 }
};
