import React, { useEffect } from "react";

import { Box, Button, Icon, Text } from "@/components/";
import BlurryBottomContainer from "@/components/BlurryBottomContainer";
import { windowWidth } from "@/utils/dimensions";

const PersonalDataSuccess = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("ProfileScreen");
    }, 2000);
  }, []);

  return (
    <BlurryBottomContainer shades="bottomBlur">
      <Box
        alignItems="center"
        flex={1}
        justifyContent="center"
        marginTop="Ml"
        paddingHorizontal="md"
      >
        <Box marginBottom="md">
          <Icon name="success" size={84} />
        </Box>
        <Text marginHorizontal="Ml" textAlign="center" variant="header">
          Update Complete
        </Text>
        <Box height={100} />
        <Button
          label="Okay"
          onPress={() => navigation.navigate("ProfileScreen")}
          width={windowWidth * 0.85}
        />
      </Box>
    </BlurryBottomContainer>
  );
};

export default PersonalDataSuccess;
