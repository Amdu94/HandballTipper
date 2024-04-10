const { calculatePoints } = require('../services/pointsCalculator');

describe('Points Calculator', () => {
    test('Should calculate points correctly for a correct result', () => {
        const guess = { homeScore: 2, awayScore: 1 };
        const actual = { homeScore: 2, awayScore: 1 };
        expect(calculatePoints(guess, actual)).toBe(5);
    });

});
