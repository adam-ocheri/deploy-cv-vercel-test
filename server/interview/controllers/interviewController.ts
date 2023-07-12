import { Configuration, OpenAIApi } from 'openai';
import { Handler } from 'express';
import { z } from 'zod';
import { config } from '../../config';

const aiConfig = new Configuration({
    apiKey: config.openAiKey,
});

const openai = new OpenAIApi(aiConfig);

export const getRandomQuestion: () => Handler = () => {
    // search param that gives a length of 1-x
    const validate = z.object({
        n: z
            .string()
            .regex(/^[1-9][0-9]*$/)
            .default('5')
            .transform((val) => parseInt(val, 10))
    });

    return async (req, res) => {
        try {
            const { n } = validate.parse(req.query);
            
            // add n number of questions for each category type, and verify no duplicates
            const questions = processRandomQuestions(n);    // return n-questions from each category

            res.json({ questions });
        } catch (err) {
            res.status(500).json({
                // @ts-ignore
                message: err.message
            });
        }
    };
};

export const giveFeedback: () => Handler = () => {
    const validate = z.object({
        pairs: z.object({
            question: z.string(),
            answer: z.string(),
        }).array().max(6),
    }); 

    return async (req, res) => {
        try {
            const { pairs } = validate.parse(req.body);
            const prompt = `
            You are an interviewer for a company. You are interviewing a candidate for a position. You ask the candidate this questions & they respond with answers. 
            You should give the candidate feedback on how they responded to the question(s). The feedback should be constructive and helpful. The feedback should 
            be a maximum of 100 words long. The feedback should be written in a professional.

            Here is the log of the conversation:
            ${pairs.reduce((acc, { question, answer }) => `${acc}\nQ: ${question}\nA: ${answer}\n`, '')}`;

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                max_tokens: 2048,
                prompt,
                n: 1, // only return one response
            });

            res.json({
                feedback: response.data.choices[0].text,
            });
        } catch (err) {
            res.status(500).json({
                // @ts-ignore
                message: err.message
            });
        }
    };
};

// Generate Random Questions
const processRandomQuestions = (n : number) => {

    const questions = [] as string[];

    // Get random background questions
    for (let i = 0; i < n; i++) {   
        const randomQuestionBackground = VALID_QUESTIONS.background[Math.floor(Math.random() * VALID_QUESTIONS.background.length)];
        n = verifyQuestion(questions, n, randomQuestionBackground);
    }

    // Get random situational questions
    for (let i = 0; i < n; i++) {
        const randomQuestionSituational = VALID_QUESTIONS.situational[Math.floor(Math.random() * VALID_QUESTIONS.situational.length)];
        n = verifyQuestion(questions, n, randomQuestionSituational);
    }

    // Get random behavioral questions
    for (let i = 0; i < n; i++) {
        const randomQuestionBehavioural = VALID_QUESTIONS.behavioural[Math.floor(Math.random() * VALID_QUESTIONS.behavioural.length)];
        n = verifyQuestion(questions, n, randomQuestionBehavioural);
    }

    return questions;
}

// Verify the question doesn't already exist in the array, and push it if so
const verifyQuestion = (questions : string[], n : number, randomQuestion : string) => {
    
        const [questionExists] = questions.filter((question) => question === randomQuestion);

        if(!questionExists){
            questions.push(randomQuestion);
            return n;
        }
        else{
            n -= 1;
            return n;
        }
    
}

const VALID_QUESTIONS = {
    background: [
        'What inspired you to pursue your current career path?',
        'What were your previous job positions and responsibilities?',
        'How did you hear about this job opportunity?',
        'What do you know about our company and our products/services.',
        'Can you tell me about your educational background and how it has prepared you for this role?',
        'What inspired you to pursue a career in this field?',
        'How have your previous work experiences shaped your approach to problem-solving?',
        'What are some of the most valuable skills you developed in your previous roles?',
        'How have you continued to develop your skills and knowledge in this field?',
        'What motivated you to apply for this position specifically?',
        'How do you see your previous experiences aligning with the goals and values of this organization?',
        'What do you consider to be your greatest strengths, and how do they relate to this role?',
        'How do you handle stress or pressure in the workplace?',
        'How do you see your past experiences and background contributing to your success in this role?',
        'What are your career goals over the course of the next five years?',
        'Tell me something interesting about you that\'s not listed on your resume.',
        'What motivates you in your work?',
        'Why did you leave your last job?',
        'Describe yourself in three to five words?',
        'Tell me about yourself.',
        'What do you believe are your top 3 character traits that make you successful? How do they fit with our company?'
    ],
    behavioural: [
        'How do you approach collaboration and teamwork in the workplace?',
        'How have you demonstrated your ability to learn quickly and adapt to new situations?',
        'Can you tell me about a time when you had to take initiative to solve a problem?',
        'How do you handle conflicts in the workplace?',
        'Can you tell me about a project you worked on that you\'re particularly proud of?',
        'How do you prioritize and manage your tasks?',
        'How do you handle stress and tight deadlines?',
        'Can you give an example of how you\'ve dealt with a difficult customer or client?',
        'How do you handle feedback and criticism?',
        'How do you stay up-to-date with industry trends and developments?',
        'How do you approach problem-solving and decision-making?',
        'Can you tell me about a time when you went above and beyond for a customer or client?',
        'How do you balance multiple priorities and deadlines?',
        'Can you tell me about a time when you had to adapt to a new situation or process?',
        'How do you collaborate with team members and colleagues?',
        'Can you give an example of a successful project you led?',
        'How do you handle change and uncertainty in the workplace?',
        'How do you manage your time and prioritize your tasks?',
        'Can you tell me about a time when you took a risk and it paid off?',
        'How do you handle confidential or sensitive information?',
        'Can you give an example of how you\'ve implemented feedback from a colleague or supervisor?',
        'What do you do when you encounter a problem you don\'t know how to solve?',
        'Can you tell me about a time when you had to make a difficult decision?',
        'How do you handle a situation where you disagree with a colleague or supervisor?',
        'Can you give an example of how you\'ve improved a process or system in your work?',
        'Can you tell me about a time when you overcame a significant challenge in your career?',
        'Talk about a time you had a disagreement with your manager.',
        'Tell me about the time you failed in your efforts to achieve something.',
        'Tell me about a time when you had to make a compromise',
        'Please share an experience when you took a risk.',
    ],
    situational: [
        'Tell me about a time when you had to deal with a difficult customer or client.',
        'Tell me about a time when you had to work with a difficult coworker or team member.',
        'Tell me about a time when you had to meet a tight deadline.',
        'Tell me about a time when you had to make a difficult decision.',
        'Can you describe an experience where you had to work on a project that was not within your area of expertise?',
        'Describe a situation where you had to manage or resolve a conflict with a colleague or team member in the workplace.',
        'Can you give me an example of a new system you had to adapt to and how you overcame any challenges?',
        'Tell me about a time when you had to handle confidential or sensitive information.',
        'Can you describe a situation where you identified a problem at work and took the initiative to solve it?',
        'Can you describe a situation where you faced a significant challenge at work and how you overcame it?',
        'Have you ever had to work on a project with a limited budget? Can you describe that experience and how you managed the resources?',
        'Can you recall a time when you had to negotiate a difficult situation with a colleague, customer, or stakeholder? What was the situation, and how did you resolve it?',
        'Have you ever worked with a tight-knit team? Can you describe that experience and how you contributed to the team\'s success?',
    ]
} as const;