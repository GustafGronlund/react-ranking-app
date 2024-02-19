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
        {activeButton === "form" && <FormDataComponent />}
        {activeButton === "dragAndDrop" && <DragAndDropComponent />}
      </Flex>
    </Container>
  );
}
