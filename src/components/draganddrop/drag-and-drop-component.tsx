import React from "react";
import { ExcelDropzone, ExcelRow } from "../../excel-dropzone.jsx";
import { Container } from "@chakra-ui/react";
import { H1 } from "@northlight/ui";
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
      <ExcelDropzone
        onSheetDrop={handleSheetData}
        label="Import excel file here"
      />
    </PageContainer>
  );
};

export default DragAndDropComponent;
