import React from "react";
import { ExcelDropzone, ExcelRow } from "../../excel-dropzone.jsx";
import { Container } from "@chakra-ui/react";
import { H1, P } from "@northlight/ui";
import { useToast } from "@chakra-ui/react";
import PageContainer from "../page-container.js";

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
    <PageContainer title="Drag and Drop">
      <P variant="14" sx={{ color: "#282828" }} marginBottom={5}>
        Have an Excel sheet full of achievements? Drag and drop it here to
        update your scores instantly! Your success stories contribute to the
        leaderboard. Let the competition begin!
      </P>
      <ExcelDropzone
        onSheetDrop={handleSheetData}
        label="Import excel file here"
      />
    </PageContainer>
  );
};

export default DragAndDropComponent;
