import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Paper, Box, Button, TextField, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Stepper, Step, StepLabel, Card,
  CardContent, LinearProgress, Snackbar, Alert, Chip, Divider
} from '@mui/material';
import { styled } from '@mui/system';
import DOMPurify from 'dompurify';

const ContentContainer = styled('div')({
  '& pre': {
    backgroundColor: '#f5f5f5',
    padding: '15px',
    borderRadius: '4px',
    overflowX: 'auto',
  },
  '& code': {
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  }
});

function LearningModule({ courses, onComplete, userProgress }) {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [course, setCourse] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [practicalAnswer, setPracticalAnswer] = useState('');
  const [practicalSubmitted, setPracticalSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const foundCourse = courses.find(c => c.id === parseInt(courseId));
    if (foundCourse) {
      setCourse(foundCourse);
      const foundModule = foundCourse.modules.find(m => m.id === parseInt(moduleId));
      if (foundModule) {
        setModule(foundModule);
        // Initialize quizAnswers with null values for each question
        const initialQuizAnswers = {};
        foundModule.quiz.forEach((_, index) => {
          initialQuizAnswers[index] = null;
        });
        setQuizAnswers(initialQuizAnswers);
      }
    }
  }, [courses, courseId, moduleId]);

  const handleQuizChange = (event, questionIndex) => {
    setQuizAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: parseInt(event.target.value)
    }));
  };

  const submitQuiz = () => {
    const score = module.quiz.reduce((acc, question, index) => {
      return acc + (quizAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
    const percentage = (score / module.quiz.length) * 100;
    setQuizScore(percentage);
    setQuizSubmitted(true);
    setQuizAttempts(prevAttempts => prevAttempts + 1);
    setSnackbarMessage(`Quiz submitted! Your score: ${percentage.toFixed(1)}%`);
    setSnackbarSeverity(percentage >= 70 ? 'success' : 'warning');
    setSnackbarOpen(true);
    if (percentage >= 70) {
      setActiveStep(2);  // Move to practical exercise if score is 70% or higher
    }
  };

  const retryQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const handlePracticalSubmit = () => {
    setPracticalSubmitted(true);
    setSnackbarMessage('Practical exercise submitted for review!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleComplete = () => {
    onComplete(parseInt(courseId), parseInt(moduleId));
    setSnackbarMessage('Module completed!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    navigate('/courses');
  };

  const steps = ['Content', 'Quiz', 'Practical Exercise'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (!module || !course) return <Typography>Module not found</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">{module.title}</Typography>
        <Chip label={`${course.title} - Module ${moduleId}`} color="primary" />
      </Box>

      <LinearProgress
        variant="determinate"
        value={(activeStep / (steps.length - 1)) * 100}
        sx={{ mb: 2 }}
      />

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 3, mb: 3 }}>
        {activeStep === 0 && (
          <ContentContainer dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(module.content) }} />
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>Quiz</Typography>
            {module.quiz.map((q, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">{q.question}</FormLabel>
                    <RadioGroup
                      value={quizAnswers[index] !== null ? quizAnswers[index].toString() : ''}
                      onChange={(e) => handleQuizChange(e, index)}
                    >
                      {q.options.map((option, optionIndex) => (
                        <FormControlLabel
                          key={optionIndex}
                          value={optionIndex.toString()}
                          control={<Radio />}
                          label={option}
                          disabled={quizSubmitted}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  {quizSubmitted && (
                    <Typography
                      color={quizAnswers[index] === q.correctAnswer ? 'success.main' : 'error.main'}
                      sx={{ mt: 1 }}
                    >
                      {quizAnswers[index] === q.correctAnswer ? 'Correct!' : `Incorrect. The correct answer is: ${q.options[q.correctAnswer]}`}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
            {!quizSubmitted ? (
              <Button
                variant="contained"
                onClick={submitQuiz}
                disabled={Object.values(quizAnswers).some(answer => answer === null)}
              >
                Submit Quiz
              </Button>
            ) : quizScore < 70 ? (
              <Box>
                <Typography color="error" sx={{ mt: 2, mb: 2 }}>
                  You need a score of at least 70% to proceed. Please review the content and try again.
                </Typography>
                <Button
                  variant="contained"
                  onClick={retryQuiz}
                  sx={{ mr: 2 }}
                >
                  Retry Quiz
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setActiveStep(0)}
                >
                  Review Content
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                onClick={() => setActiveStep(2)}
              >
                Continue to Practical Exercise
              </Button>
            )}
            {quizSubmitted && (
              <Typography sx={{ mt: 2 }}>
                Quiz Attempts: {quizAttempts}
              </Typography>
            )}
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h5" gutterBottom>Practical Exercise</Typography>
            <Typography variant="h6">{module.practicalExercise.title}</Typography>
            <Typography variant="body1" paragraph>{module.practicalExercise.description}</Typography>
            <Card sx={{ mb: 2, bgcolor: '#f5f5f5' }}>
              <CardContent>
                <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                  {module.practicalExercise.content}
                </Typography>
              </CardContent>
            </Card>
            <Typography variant="body1" paragraph>{module.practicalExercise.task}</Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={practicalAnswer}
              onChange={(e) => setPracticalAnswer(e.target.value)}
              disabled={practicalSubmitted}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Button
                variant="contained"
                onClick={handlePracticalSubmit}
                disabled={practicalSubmitted || practicalAnswer.trim() === ''}
              >
                Submit Practical Exercise
              </Button>
              <Button
                variant="outlined"
                onClick={() => setShowHint(!showHint)}
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
            </Box>
            {showHint && (
              <Card sx={{ mb: 2, bgcolor: '#e3f2fd' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Hints:</Typography>
                  <ul>
                    {module.practicalExercise.hints.map((hint, index) => (
                      <li key={index}>{hint}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </Box>
        )}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={activeStep === steps.length - 1 ? handleComplete : handleNext}
          disabled={(activeStep === 1 && (!quizSubmitted || quizScore < 70)) || (activeStep === 2 && !practicalSubmitted)}
        >
          {activeStep === steps.length - 1 ? 'Complete Module' : 'Next'}
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default LearningModule;