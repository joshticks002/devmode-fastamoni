import React from "react";

import { Box } from "@/components/";
import Tile from "@/components/Tile";
import TitleComponent from "@/components/TitleComponent/TitleComponent";

const SettingsScreen = ({ navigation }) => (
  <Box backgroundColor="white" flex={1}>
    <Box marginTop="Ml" paddingHorizontal="lg">
      <TitleComponent
        handleBackPress={() => navigation.goBack()}
        title="Settings Screen"
      />

      <Tile
        icon="right_arrow"
        onProceed={() => {}}
        text="Set transaction PIN"
      />
      <Tile
        icon="right_arrow"
        onProceed={() => {}}
        text="Change Account Password"
      />
      <Tile icon="right_arrow" onProceed={() => {}} text="Set Account Limit" />
      <Tile
        icon="right_arrow"
        onProceed={() => {}}
        text="Lock Account Balance"
      />
    </Box>
  </Box>
);

export default SettingsScreen;
