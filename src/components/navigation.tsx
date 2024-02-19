import { Button, Flex, H2, Icon, P } from "@northlight/ui";
import React, { useState } from "react";
import { buttonData } from "../../lib/data";
import { BrightnessSolid } from "@northlight/icons";

interface NavigationProps {
  onButtonClick: (buttonName: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onButtonClick }) => {
  const [activeButton, setActiveButton] = useState<string>("leaderboard");

  return (
    <Flex
      direction={"column"}
      gap={1}
      bgColor={"white"}
      w={"xs"}
      rounded={15}
      h="100%"
      padding={5}
      alignItems={"center"}>
      <Flex
        justify={"start"}
        alignItems={"center"}
        marginBottom={10}
        width="100%">
        <H2 sx={{ color: "#282828" }}>
          <span>
            <Icon
              as={BrightnessSolid}
              sx={{ color: "blue.500" }}
              marginRight={3}></Icon>
          </span>
          Ranking App
        </H2>
      </Flex>
      {buttonData.map((button) => (
        <Button
          onClick={() => {
            setActiveButton(button.name);
            onButtonClick(button.name);
          }}
          bg={activeButton === button.name ? "blue.50" : "transparent"}
          display="flex"
          justifyContent="flex-start"
          w="100%"
          leftIcon={
            <Icon
              as={button.icon}
              sx={{
                color: activeButton === button.name ? "blue.500" : "#282828",
              }}
            />
          }>
          <P
            variant="14"
            sx={{
              color: activeButton === button.name ? "blue.500" : "#282828",
            }}>
            {button.label}
          </P>
        </Button>
      ))}
    </Flex>
  );
};

export default Navigation;
