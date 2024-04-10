const { calculatePoints } = require('../services/pointsCalculator');

describe('Points Calculator', () => {
    test('Should calculate points correctly for correct result', () => {
        const guess = { homeScore: 2, awayScore: 1 };
        const actual = { homeScore: 2, awayScore: 1 };
        expect(calculatePoints(guess, actual)).toBe(5);
    });

    test('Should calculate points correctly for correct goal difference', () => {
        const guess = { homeScore: 3, awayScore: 1 };
        const actual = { homeScore: 2, awayScore: 0 };
        expect(calculatePoints(guess, actual)).toBe(3);
    });

    test('Should calculate points correctly for guessed winner', () => {
        const guess = { homeScore: 2, awayScore: 0 };
        const actual = { homeScore: 2, awayScore: 1 };
        expect(calculatePoints(guess, actual)).toBe(1);
    });

    test('Should return 0 points for incorrect guess', () => {
        const guess = { homeScore: 1, awayScore: 1 };
        const actual = { homeScore: 2, awayScore: 1 };
        expect(calculatePoints(guess, actual)).toBe(0);
    });

});
