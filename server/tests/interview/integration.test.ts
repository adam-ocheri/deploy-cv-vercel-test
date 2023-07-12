import { describe, it, expect } from 'vitest';
import { createServer } from ".";

describe('interview/integration', () => {
    const httpClient = createServer();

    it('should return 204', async () => {
        const response = await httpClient.get('/ping');

        expect(response.status).toBe(204);
    });

}, { timeout: 30_000 });