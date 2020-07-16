import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {CHOICES} from './Data/Choices';
import {Button} from './Component/Button';
import {ChoiceCard} from './Component/ChoiceCard';

export default function App() {
  const [gamePrompt, setGamePrompt] = useState('Fire!');
  const [userChoice, setUserChoice] = useState({});
  const [computerChoice, setComputerChoice] = useState({});

  const onPress = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);

    const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICES.find(
      choice => choice.name === compChoice,
    );

    setGamePrompt(result);
    setUserChoice(newUserChoice);
    setComputerChoice(newComputerChoice);
  };
  const getRoundOutcome = userChoice => {
    const computerChoice = randomComputerChoice().name;
    let result;

    if (userChoice === 'rock') {
      result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'paper') {
      result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'scissors') {
      result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
    }

    if (userChoice === computerChoice) {
      result = 'Tie game!';
    }
    return [result, computerChoice];
  };
  const randomComputerChoice = () =>
    CHOICES[Math.floor(Math.random() * CHOICES.length)];
  const getResultColor = () => {
    if (gamePrompt === 'Victory!') {
      return 'green';
    }
    if (gamePrompt === 'Defeat!') {
      return 'red';
    }
    return null;
  };
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: getResultColor()}}>{gamePrompt}</Text>
      <View style={styles.choicesContainer}>
        <ChoiceCard player="Player" choice={userChoice} />
        <Text style={{color: '#250902'}}>vs</Text>
        <ChoiceCard player="Computer" choice={computerChoice} />
      </View>
      {CHOICES.map(choice => {
        return (
          <Button key={choice.name} name={choice.name} onPress={onPress} />
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e9ebee',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingTop: 50,
    shadowRadius: 5,
    paddingBottom: 50,
    borderColor: 'grey',
    shadowOpacity: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {height: 5, width: 5},
  },
});
