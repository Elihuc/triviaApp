import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QuestionItem from './QuestionItem';

export default function App() {

  let tempQuestionsArr = [];

  const [questions, setQuestions] = useState([]);
  const [nextQuestion, setNextQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(async () => {
    const url = 'https://opentdb.com/api.php?amount=20&category=18';
    const response = await fetch(url, { method: 'get' });
    const response_data = await response.json();

    let questionId = 0;

    response_data.results.forEach(question => {

      let answers = [];

      //CORRECT
      const correct_answer = { title: question.correct_answer, isCorrect: true };
      answers.push(correct_answer);
      //INCORRECT
      question.incorrect_answers.forEach(item => {
        const incorrect_answer = { title: item, isCorrect: false };
        answers.push(incorrect_answer);
      })

      const formatted_question = {
        id: questionId++,
        title: question.question,
        type: question.type,
        category: question.category,
        difficulty: question.difficulty,
        answers: shuffle(answers)
      }
      tempQuestionsArr.push(formatted_question);
    })
    // console.log(JSON.stringify(tempQuestionsArr));
    setQuestions(tempQuestionsArr);
  }, [])

  const shuffle = (arr) => {
    let currentIndex = arr.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex],arr[currentIndex]];
    }
    return arr;
  }




  const onNextQuestion = () => {
    let number = currentQuestion;
    number++;
    setCurrentQuestion(number);
    let nextQuest = questions[currentQuestion].id;
    setNextQuestion(nextQuest);
  }

  const onAnswer = (answer) => {
    console.log(JSON.stringify(answer));
  }

  const questionsUI = questions.map((question, index) => {
    if (nextQuestion == question.id) {
      return <QuestionItem 
        key={index} 
        questionItem={question}
        onNextQuestion={onNextQuestion}
        onAnswer={onAnswer}
      />
    }
  })


  return (
    <View style={styles.container}>
      {
        questions.length > 0 ? (questionsUI) : (<Text>No Data</Text>)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddf0f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding:50
  },
});
