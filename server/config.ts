import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
export const config = {
    openAiKey: process.env.OPENAI_API_KEY as string,
} as const; 