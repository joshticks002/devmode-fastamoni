/* eslint-disable no-promise-executor-return */
/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import { ScrollView } from "react-native";

import { Box } from "@/components/";
import TitleComponent from "@/components/TitleComponent/TitleComponent";

import { FrequentTransactionList } from "../home/component/FrequentTransactionList";
import { frequentTransactionList } from "../home/data/data";

const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const HistoryScreen = ({ navigation }) => {
  // const [triggerTransaction, result] = useLazyTransactionsQuery();
  // const { isLoading, data: transactions, isFetching } = result;
  const [showPullDownToRefresh, setShowPullDownToRefresh] = useState(false);

  // const onRefresh = React.useCallback(() => {
  //   triggerTransaction();
  //   wait(4000).then(() => setShowPullDownToRefresh(false));
  // }, [triggerTransaction]);
  // useEffect(() => {
  //   triggerTransaction();
  // }, [triggerTransaction]);

  return (
    <Box flex={1}>
      <Box marginTop="Ml" paddingHorizontal="lg">
        <TitleComponent
          handleBackPress={() => navigation.goBack()}
          title="Transaction History"
        />
        <Box backgroundColor="white" borderRadius="sl" height="90%">
          <ScrollView
            onScroll={({ nativeEvent }) => {
              const {
                contentOffset: { y },
              } = nativeEvent;
              if (y < 60) {
                setShowPullDownToRefresh(true);
                return;
              }
              if (y > 100 && showPullDownToRefresh) {
                setShowPullDownToRefresh(false);
              }
            }}
            scrollEventThrottle={20}
            showsVerticalScrollIndicator={false}
          >
            <Box marginHorizontal="md" marginTop="sm">
              <Box marginBottom="lg">
                {frequentTransactionList.map((item, index) => (
                  <FrequentTransactionList item={item} key={index} />
                ))}
              </Box>
            </Box>
          </ScrollView>
        </Box>
      </Box>
      <Box height={100} />
    </Box>
  );
};

export default HistoryScreen;
