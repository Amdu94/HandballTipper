import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import matchService from "../services/matchService.js";

import { describe, it, expect, vi } from 'vitest';


vi.mock('@prisma/client', () => ({
    PrismaClient: vi.fn().mockImplementation(() => ({
        matches: {
            findMany: vi.fn().mockResolvedValue([{ id: '1', date: new Date(), home: 'Team A', away: 'Team B' }]),
        },
    })),
}));

describe('Match Service Tests', () => {
    it('getAllMatches returns an array of matches', async () => {
        const matches = await matchService.getAllMatches();
        expect(matches).toBeInstanceOf(Array);
        expect(matches).toHaveLength(1);
    });

});

