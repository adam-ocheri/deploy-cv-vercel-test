import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Configuration, OpenAIApi } from 'openai';
import { config } from '../../config';

const aiConfig = new Configuration({
    apiKey: config.openAiKey,
});

const openai = new OpenAIApi(aiConfig);

export const getDescription = expressAsyncHandler(async (req: Request, res: Response) => {
    const { prompt } = req.body;
    console.log(prompt);
    try {
        console.log('B-E CALLBACK: AI ROUTE Prompt IS:', prompt);
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            max_tokens: 2048,
            prompt,
            n: 1, // only return one response
        });
        console.log(response.data.choices[0].text);
        res.json({ feedback: response.data.choices[0].text });
    } catch (error) {
        console.log(error);
    }
});
