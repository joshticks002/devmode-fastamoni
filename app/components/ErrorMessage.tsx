import React from "react";

import { Box, Text } from "@/components/";

import ExclamationIcon from "../assets/svg/exclamation.svg";

interface ErrorMessageProps {
  text: string;
}

function ErrorMessage({ text }: ErrorMessageProps) {
  return (
    <Box alignItems="center" flexDirection="row">
      <ExclamationIcon height={20} width={20} />
      <Text color="error" marginLeft="xs" variant="medium">
        {text}
      </Text>
    </Box>
  );
}

export { ErrorMessage };
