import React from "react";
import { User, Score } from "../../models/index";
import { AccordionIcon, Box, Container, Flex } from "@chakra-ui/react";
import { AccordionButton, AccordionPanel, H1, H2, P } from "@northlight/ui";
import { Accordion, AccordionItem } from "@northlight/ui";
import PageContainer from "../page-container";

interface LeaderBoardComponentProps {
  users: User[];
  scores: Score[];
}

const LeaderboardComponent: React.FC<LeaderBoardComponentProps> = ({
  users,
  scores,
}) => {
  const scoresMap = scores.reduce((acc, score) => {
    if (!acc[score.userId]) {
      acc[score.userId] = [];
    }
    acc[score.userId].push(score.score);
    return acc;
  }, {} as Record<number, number[]>);

  const usersWithHighestScore = users.map((user) => {
    const userScores = scoresMap[user._id] || [];
    const highestScore = Math.max(...userScores, 0);
    return { ...user, highestScore };
  });

  const sortedUsers = usersWithHighestScore.sort(
    (a, b) => b.highestScore - a.highestScore
  );

  return (
    <PageContainer title="Leaderboard">
      <Accordion allowMultiple w={"100%"}>
        <Flex
          paddingX={5}
          paddingY={2}
          direction="row"
          justifyContent="space-between"
          rounded={5}
          marginBottom={2}>
          <P sx={{ color: "#282828" }} variant="14">
            User
          </P>
          <P sx={{ color: "#282828" }} variant="14">
            Score
          </P>
        </Flex>

        {sortedUsers.map((user) => (
          <AccordionItem key={user._id}>
            <H2>
              <AccordionButton>
                <Box as="span" flex="1">
                  <Flex justifyContent={"space-between"}>
                    <P sx={{ color: "blue.500" }}>{user.name}</P>
                    <P fontWeight="bold">{user.highestScore}</P>
                  </Flex>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </H2>
            <AccordionPanel pb={4}>
              <Flex
                direction="column"
                justifyContent="flex-end"
                alignItems="end"
                paddingX={5}>
                {scores
                  .filter(
                    (score) =>
                      user._id === score.userId &&
                      user.highestScore !== score.score
                  )
                  .sort((a, b) => b.score - a.score)
                  .map((score) => (
                    <P key={score.userId + score.score} variant="14">
                      {score.score}
                    </P>
                  ))}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </PageContainer>
  );
};

export default LeaderboardComponent;
