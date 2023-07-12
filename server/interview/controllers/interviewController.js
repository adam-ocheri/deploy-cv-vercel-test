"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.giveFeedback = exports.getRandomQuestion = void 0;
var openai_1 = require("openai");
var zod_1 = require("zod");
var config_1 = require("../../config");
var aiConfig = new openai_1.Configuration({
    apiKey: config_1.config.openAiKey
});
var openai = new openai_1.OpenAIApi(aiConfig);
var getRandomQuestion = function () {
    // search param that gives a length of 1-x
    var validate = zod_1.z.object({
        n: zod_1.z
            .string()
            .regex(/^[1-9][0-9]*$/)["default"]('5')
            .transform(function (val) { return parseInt(val, 10); })
    });
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var n, questions;
        return __generator(this, function (_a) {
            try {
                n = validate.parse(req.query).n;
                questions = processRandomQuestions(n);
                res.json({ questions: questions });
            }
            catch (err) {
                res.status(500).json({
                    // @ts-ignore
                    message: err.message
                });
            }
            return [2 /*return*/];
        });
    }); };
};
exports.getRandomQuestion = getRandomQuestion;
var giveFeedback = function () {
    var validate = zod_1.z.object({
        pairs: zod_1.z.object({
            question: zod_1.z.string(),
            answer: zod_1.z.string()
        }).array().max(6)
    });
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var pairs, prompt_1, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    pairs = validate.parse(req.body).pairs;
                    prompt_1 = "\n            You are an interviewer for a company. You are interviewing a candidate for a position. You ask the candidate this questions & they respond with answers. \n            You should give the candidate feedback on how they responded to the question(s). The feedback should be constructive and helpful. The feedback should \n            be a maximum of 100 words long. The feedback should be written in a professional.\n\n            Here is the log of the conversation:\n            ".concat(pairs.reduce(function (acc, _a) {
                        var question = _a.question, answer = _a.answer;
                        return "".concat(acc, "\nQ: ").concat(question, "\nA: ").concat(answer, "\n");
                    }, ''));
                    return [4 /*yield*/, openai.createCompletion({
                            model: "text-davinci-003",
                            max_tokens: 2048,
                            prompt: prompt_1,
                            n: 1
                        })];
                case 1:
                    response = _a.sent();
                    res.json({
                        feedback: response.data.choices[0].text
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    res.status(500).json({
                        // @ts-ignore
                        message: err_1.message
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
};
exports.giveFeedback = giveFeedback;
// Generate Random Questions
var processRandomQuestions = function (n) {
    var questions = [];
    // Get random background questions
    for (var i = 0; i < n; i++) {
        var randomQuestionBackground = VALID_QUESTIONS.background[Math.floor(Math.random() * VALID_QUESTIONS.background.length)];
        n = verifyQuestion(questions, n, randomQuestionBackground);
    }
    // Get random situational questions
    for (var i = 0; i < n; i++) {
        var randomQuestionSituational = VALID_QUESTIONS.situational[Math.floor(Math.random() * VALID_QUESTIONS.situational.length)];
        n = verifyQuestion(questions, n, randomQuestionSituational);
    }
    // Get random behavioral questions
    for (var i = 0; i < n; i++) {
        var randomQuestionBehavioural = VALID_QUESTIONS.behavioural[Math.floor(Math.random() * VALID_QUESTIONS.behavioural.length)];
        n = verifyQuestion(questions, n, randomQuestionBehavioural);
    }
    return questions;
};
// Verify the question doesn't already exist in the array, and push it if so
var verifyQuestion = function (questions, n, randomQuestion) {
    var questionExists = questions.filter(function (question) { return question === randomQuestion; })[0];
    if (!questionExists) {
        questions.push(randomQuestion);
        return n;
    }
    else {
        n -= 1;
        return n;
    }
};
var VALID_QUESTIONS = {
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
};
