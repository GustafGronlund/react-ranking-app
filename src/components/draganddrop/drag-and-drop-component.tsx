import React from "react";
import { ExcelDropzone, ExcelRow } from "../../excel-dropzone.jsx";
import { Container } from "@chakra-ui/react";
import { H1 } from "@northlight/ui";
import { useToast } from "@chakra-ui/react";

interface DragAndDropDataItem {
  name: string;
  score: number;
}

interface DragAndDropComponentProps {
  onDrop: (data: DragAndDropDataItem[]) => void;
}

const DragAndDropComponent: React.FC<DragAndDropComponentProps> = ({
  onDrop,
}) => {
  const toast = useToast();
  function handleSheetData(data: ExcelRow[]) {
    toast({
      title: "Document submitted",
      description: "Your document has been uploaded!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    onDrop(data);
  }

  return (
    <Container bgColor={"white"} rounded={15} w="100%" margin={0} padding={5}>
      <H1 marginBottom={10} sx={{ color: "#282828" }}>
        Leaderboard
      </H1>
      <ExcelDropzone
        onSheetDrop={handleSheetData}
        label="Import excel file here"
      />
    </Container>
  );
};

export default DragAndDropComponent;
