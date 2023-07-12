import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
  Box,
  Center,
  Heading,
  Textarea,
  Flex,
  Text,
} from '@chakra-ui/react';
import Button from '@/components/Buttons';
import AuthWrapper from '@/components/auth/AuthWrapper';
import axios from 'axios';
import { useState, useEffect } from 'react';
import theme from '@/styles/theme';

// Main Interview Page - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default function PracticeInterview() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(''); // ['correct', 'incorrect'
  const [isLoading, setIsLoading] = useState(false);

  const [interviewInProgress, setInterviewInProgress] = useState(false);
  const [interviewOver, setInterviewOver] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [interviewHistory, updateInterviewHistory]: any = useState([]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    continueToNextQuestion();
  };

  useEffect(() => {
    updateInterviewHistory([]);
    getQuestions().then((questions) => {
      setQuestions(questions);
    });
  }, []);

  const continueToNextQuestion = () => {
    updateInterviewHistory([
      ...interviewHistory,
      { question: questions[currentQuestion], answer: answer },
    ]);
    setAnswer('');

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Interview is over - show stats
      setInterviewOver(true);
    }
  };

  useEffect(() => {
    console.log('interviewOver:', interviewOver);
    const postRequest = async () => {
      if (interviewOver) {
        setIsLoading(true);
        const inFeedback = await getFeedback(interviewHistory);
        setFeedback(inFeedback);
      }
    };
    postRequest();
  }, [interviewOver]);

  useEffect(() => {
    if (feedback !== '') {
      setIsLoading(false);
    }
  }, [feedback]);

  // Interview Start button
  if (!interviewInProgress) {
    return (
      <AuthWrapper>
        <Flex align='center' h='full'>
          <Button
            onClick={() => setInterviewInProgress(true)}
            variant='action'
            block
          >
            START INTERVIEW
          </Button>
        </Flex>
      </AuthWrapper>
    );
  }

  if (isLoading)
    return (
      <Box
        position='fixed'
        top={0}
        left={0}
        width='100%'
        height='100%'
        backgroundColor='rgba(0, 0, 0, 0.5)' // Overlay background color
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Center>
          <Spinner size='xl' color='blueStart' />
        </Center>
      </Box>
    );

  // Interview end & feedback
  if (interviewOver && feedback) {
    return (
      <AuthWrapper>
        <Flex as='section' flexDir='column' gap={4} overflowY='auto' h='full'>
          <Heading size='lg'>Your Results</Heading>
          <Flex flexDir='column' gap={4}>
            <Accordion defaultIndex={[0]} allowMultiple>
              {interviewHistory.map(
                (interviewQuestionResult: any, index: number) => (
                  <AccordionItem key={index}>
                    <h2>
                      <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                          {`${index + 1}. `}
                          {interviewQuestionResult.question}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      <Text as='h3' fontSize='md'>
                        You Answered:
                      </Text>
                      <Text>{interviewQuestionResult.answer}</Text>
                    </AccordionPanel>
                  </AccordionItem>
                )
              )}
            </Accordion>
            <Heading as='h3' size='md'>
              My Feedback:
            </Heading>
            {feedback && (
              <Text lineHeight='base' mr='2'>
                {feedback}
              </Text>
            )}
          </Flex>
        </Flex>
      </AuthWrapper>
    );
  }

  //* Main Interview Process
  return (
    <AuthWrapper>
      <Flex
        as='form'
        onSubmit={handleSubmit}
        flexDir='column'
        h={['full', '60%']}
        gap={4}
      >
        <Flex flexDirection='row' justifyContent='space-between'>
          <Heading as='h3' size='md'>
            {questions[currentQuestion]}
          </Heading>
          <Text>{`${currentQuestion + 1}/${questions.length}`}</Text>
        </Flex>
        <Textarea
          resize='none'
          flexGrow='1'
          name='answer'
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder='Type here'
          isRequired
        />
        <Button type='submit' variant='primary'>
          Submit and go to next question
        </Button>
      </Flex>
    </AuthWrapper>
  );
}

// Backend Callback Functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function getQuestions() {
  const { questions } = await get('interviews/question/random?n=2');
  return questions as string[];
}

async function get(path: string) {
  const { data } = await axios.get([SERVER_URI, path].join('/'), {
    headers: { 'Content-Type': 'application/json' },
  });

  return data;
}

// POST entire conversation array and return the "interviewer" feedback
async function getFeedback(pairs: Record<string, string>[]) {
  const { feedback } = await post('interviews/answer/feedback', {
    pairs,
  });

  return feedback as string;
}

async function post(path: string, body: Record<string, unknown>) {
  const { data } = await axios.post([SERVER_URI, path].join('/'), body, {
    headers: { 'Content-Type': 'application/json' },
  });

  return data;
}

const SERVER_URI = 'http://localhost:4000';
