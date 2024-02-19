import {
  Button,
  Container,
  Form,
  H1,
  P,
  TextField,
  VStack,
} from "@northlight/ui";
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";

interface FormDataComponentProps {
  addFormDataToState: (formData: { name: string; score: number }) => void;
}

const FormDataComponent: React.FC<FormDataComponentProps> = ({
  addFormDataToState,
}) => {
  const toast = useToast();
  const [name, setName] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const validation = (values: any) => {
    const errors: any = {};

    if (typeof values.name !== "string" || values.name.length < 2) {
      errors.name = "Name must be a string with at least 2 characters.";
    }

    if (isNaN(values.score)) {
      errors.score = "Score must be a valid number.";
    }

    return errors;
  };

  return (
    <Container bgColor={"white"} rounded={15} w="100%" margin={0} padding={5}>
      <H1 marginBottom={10} sx={{ color: "#282828" }}>
        Formdata
      </H1>
      <P variant="14" sx={{ color: "#282828" }} marginBottom={5}>
        Did you just nail it and score big? Share your success with us! Fill out
        this form and secure your spot on the leaderboard!
      </P>
      <Form
        initialValues={{ name: "", score: 0 }}
        onSubmit={async (values, methods) => {
          try {
            addFormDataToState({ name: values.name, score: values.score });
            toast({
              title: "Form submitted",
              description: "Your score has been submitted!",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            setName("");
            setScore(0);
          } catch (err) {
            toast({
              title: "Error",
              description: "Oops! Something went wrong. Please try again.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        }}
        formSettings={{
          mode: "onSubmit",
        }}
        validate={validation}>
        <VStack alignItems="end" w="100%">
          <TextField
            name="name"
            label="Name"
            isRequired={true}
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          <TextField
            name="score"
            label="Score"
            inputMode="numeric"
            pattern="[0-9]*"
            type="number"
            isRequired={true}
            value={score}
            onChange={(e: any) => setScore(e.target.value)}
          />
          <Button type="submit" variant="success">
            Submit
          </Button>
        </VStack>
      </Form>
    </Container>
  );
};

export default FormDataComponent;
