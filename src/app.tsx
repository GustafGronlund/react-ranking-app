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

  const updateUserData = (
    data: { name: string; score: number }[],
    existingUsers: User[],
    existingScores: Score[]
  ) => {
    const updatedUsers = [...existingUsers];
    const updatedScores = [...existingScores];

    data.forEach((item) => {
      const existingUserIndex = updatedUsers.findIndex(
        (user) => user.name === item.name
      );

      if (existingUserIndex !== -1) {
        const newScore: Score = {
          userId: updatedUsers[existingUserIndex]._id,
          score: item.score,
        };

        updatedScores.push(newScore);
      } else {
        const newUser: User = {
          _id: updatedUsers.length + 1,
          name: item.name,
        };

        const newScore: Score = {
          userId: newUser._id,
          score: item.score,
        };

        updatedUsers.push(newUser);
        updatedScores.push(newScore);
      }
    });
    return { updatedUsers, updatedScores };
  };

  const handleData = (
    data: { name: string; score: number }[] | { name: string; score: number }
  ) => {
    let dataArray = Array.isArray(data) ? data : [data];

    const { updatedUsers, updatedScores } = updateUserData(
      dataArray,
      users,
      scores
    );

    setUsers(updatedUsers);
    setScores(updatedScores);
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
          <FormDataComponent addFormDataToState={handleData} />
        )}
        {activeButton === "dragAndDrop" && (
          <DragAndDropComponent onDrop={handleData} />
        )}
      </Flex>
    </Container>
  );
}
