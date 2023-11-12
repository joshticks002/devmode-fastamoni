import React from "react";

import { Box, Text } from "@/components/";
import formatDate from "@/utils/dateFormatter";
import { FormatAmount } from "@/utils/formatAmount";

import { IFrequentTransaction } from "../data/data";

interface IFrequentTransactionProps {
  item: IFrequentTransaction;
}

export const FrequentTransactionList = ({
  item,
}: IFrequentTransactionProps) => (
  <Box
    alignItems="center"
    alignSelf="center"
    backgroundColor="white"
    borderColor="grey"
    borderRadius="sm"
    borderWidth={0.5}
    flexDirection="row"
    key={item.id}
    marginBottom="md"
    padding="md"
    width="100%"
  >
    <Box>
      <Text color="black" opacity={0.9} variant="subHeading">
        {item.name || item.accountNumber}
      </Text>
      <Text color="black" marginTop="sm" opacity={0.5}>
        {formatDate(item.createdAt)}
      </Text>
    </Box>
    <Box flex={1} justifyContent="flex-end">
      <Text
        color={
          (item.type === "debit" && "negativeColor") || "bankReceivedGreen"
        }
        opacity={0.9}
        textAlign="right"
      >
        {(item.type === "debit" && `- N${FormatAmount(item.amount)}`) ||
          (item.type === "credit" && `+ N${FormatAmount(item.amount)}`)}
      </Text>
      <Text color="black" marginTop="sm" opacity={0.9} textAlign="right">
        {item.option}
      </Text>
    </Box>
  </Box>
);
