import { Box, HStack, StatusBar } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "./CustomText";
import { colors } from "../utils";

type MainHeaderProps = {
  label: string;
  showAvailableAmount?: string;
  signOutFunction?: () => void;
};

const MainHeader: React.FC<MainHeaderProps> = ({ label, showAvailableAmount, signOutFunction }) => {
    return (
        <>
            <SafeAreaView style={{ zIndex: -1 }}>
                <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
                <Box safeAreaTop bg={colors.primary} />
                <HStack  bg={colors.primary} px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" >
                    <HStack alignItems="center">
                        <CustomText h3 color="white" bold w='100%' textAlign='center'>
                            {label}
                        </CustomText>
                    </HStack>
                </HStack>
            </SafeAreaView>
        </>
    );}

export default MainHeader;
