import React from "react";
import { ExcelDropzone, ExcelRow } from "../../excel-dropzone.jsx";
import { Container } from "@chakra-ui/react";

const DragAndDropComponent = () => {
  function handleSheetData(data: ExcelRow[]) {
    // replace this log with actual handling of the data
    console.log(data);
  }

  return (
    <Container>
      <ExcelDropzone
        onSheetDrop={handleSheetData}
        label="Import excel file here"
      />
    </Container>
  );
};

export default DragAndDropComponent;
