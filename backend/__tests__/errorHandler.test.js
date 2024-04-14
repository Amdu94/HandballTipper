import errorHandler from '../middleware/errorHandler';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Error Handling Middleware', () => {
    let mockRequest, mockResponse, mockNext;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: vi.fn(() => mockResponse),
            json: vi.fn(),
        };
        mockNext = vi.fn();
    });

    it('Should handle internal server errors with status code 500', async () => {
        // Simulate an internal server error
        const error = new Error('Test internal server error');

        errorHandler(error, mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
});

