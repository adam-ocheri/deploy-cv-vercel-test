import { describe, it, expect, ArgumentsType } from 'vitest';
import { setupMongoConnection } from '.';
import { Interview } from '../../interview/models/interviewModel';

describe('interview/mongodb', async () => {
    const { createId, isValidId } = await setupMongoConnection();

    it('should add a new interview into the database', async () => {
        const interview = {
            userId: createId(),
        } satisfies ArgumentsType<typeof Interview.startInterview>[0];

        const interviewId = await Interview.startInterview(interview);

        expect(isValidId(interviewId)).toBe(true);
    });
}, { timeout: 30_000 });
