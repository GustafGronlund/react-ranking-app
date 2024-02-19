import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { Container } from "@northlight/ui";
import LeaderboardComponent from "./components/leaderboard/leaderboard-component";
import FormDataComponent from "./components/formdata/form-data-component";
import DragAndDropComponent from "./components/draganddrop/drag-and-drop-component";
import { User, Score } from "./models/index";
import usersData from "./users";
import scoresData from "./scores";
import Navigation from "./components/navigation";

export default function App() {
  const [activeButton, setActiveButton] = useState<string>("leaderboard");
  const [users, setUsers] = useState<User[]>([]);
  const [scores, setScores] = useState<Score[]>([]);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const updateUserAndScore = (newUser: User, newScore: Score) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setScores((prevScores) => [...prevScores, newScore]);
  };

  const updateScore = (newScore: Score) => {
    setScores((prevScores) => [...prevScores, newScore]);
  };

  const addFormDataToState = (formData: { name: string; score: number }) => {
    const checkIfExistingUser = users.find(
      (user) => user.name === formData.name
    );

    const newUser: User = {
      _id: checkIfExistingUser ? checkIfExistingUser._id : users.length + 1,
      name: formData.name,
    };

    const newScore: Score = {
      userId: newUser._id,
      score: formData.score,
    };

    setUsers((prevUsers) =>
      checkIfExistingUser ? prevUsers : [...prevUsers, newUser]
    );

    setScores((prevScores) => [...prevScores, newScore]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUsers(usersData);
        setScores(scoresData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container minW="100%" height="100vh" padding="5" bg={"blue.50"}>
      <Flex direction="row" h="100%" gap={5}>
        <Navigation onButtonClick={handleButtonClick} />
        {activeButton === "leaderboard" && (
          <LeaderboardComponent users={users} scores={scores} />
        )}
        {activeButton === "form" && (
          <FormDataComponent addFormDataToState={addFormDataToState} />
        )}
        {activeButton === "dragAndDrop" && <DragAndDropComponent />}
      </Flex>
    </Container>
  );
}
