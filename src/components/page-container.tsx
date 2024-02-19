import { Container, H1 } from "@northlight/ui";
import React from "react";

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  return (
    <Container
      bgColor={"white"}
      rounded={15}
      w="100%"
      margin={0}
      padding={5}
      overflowY="scroll"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}>
      <H1 marginBottom={10} sx={{ color: "#282828" }}>
        {title}
      </H1>
      {children}
    </Container>
  );
};

export default PageContainer;
