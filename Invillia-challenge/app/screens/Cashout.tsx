import { Avatar, Box, Checkbox, HStack, ScrollView } from "native-base";
import React, { useContext } from "react";
import { StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import {
  CustomButton,
  CustomInput,
  CustomText,
  MainContainer,
} from "../components";

import BackArrowIcon from "../assets/BackArrowIcon";
import BankIcon from "../assets/BankIcon";
import UserIcon from "../assets/UserIcon";
import AddIcon from "../assets/AddIcon";
import ArrowInput from "../assets/ArrowInput";
import { UserContext } from "../context";
import { colors, isIos } from "../utils";

function Cashout({ navigation }: { navigation: any }) {
  const { availableAmount, sendMoney } = useContext(UserContext);
  const contacts = [
    {
      name: "Kitty",
      image: "https://randomuser.me/api/portraits/women/56.jpg",
    },
    {
      name: "Joy",
      image: "https://randomuser.me/api/portraits/women/86.jpg",
    },
    {
      name: "Jacqueline",
      image: "https://randomuser.me/api/portraits/women/16.jpg",
    },
  ];
  const transactionTypes = [
    {
      name: "Transfer via\ncard number",
      icon: <BankIcon />,
    },
    {
      name: "Transfer to\nthe same bank",
      icon: <UserIcon />,
    },
    {
      name: "Transfer to\nanother bank",
      icon: <BankIcon />,
    },
  ];

  const [selectedTransactionType, setSelectedTransactionType] = React.useState(
    transactionTypes[2].name
  );
  const [selectedContact, setSelectedContact] = React.useState(
    contacts[0].name
  );
  const [amount, setAmount] = React.useState("");
  const [saveDetails, setSaveDetails] = React.useState(false);
  const handleConfirm = () => {
    sendMoney(Number(amount), selectedContact);
    navigation.navigate("Dashboard");
  };
  return (
    <>
      <Box safeAreaTop bg="white" />
      <StatusBar backgroundColor="violet.800" barStyle="dark-content" />
      <HStack
        h={20}
        bg="white"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <HStack alignItems="center">
          <TouchableOpacity
            style={{ height: 20, width: 20, marginLeft: 14 }}
            onPress={() => navigation.goBack()}
          >
            <BackArrowIcon />
          </TouchableOpacity>
          <CustomText h2 bold marginLeft={2} marginBottom={1}>
            Send Money
          </CustomText>
        </HStack>
      </HStack>
      <ScrollView marginTop={-4}>
        <MainContainer isInternalScreen>
          <CustomInput
            label="Choose account/ card"
            onChange={(e) => {}}
            value="VISA **** **** **** 1234"
          />
          <CustomText primary bold marginLeft={2} marginTop={2}>
            Available balance : ${availableAmount}
          </CustomText>
          <CustomText gray bold marginTop={4}>
            Choose transaction
          </CustomText>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row" }}
          >
            {transactionTypes.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedTransactionType(item.name)}
                style={{
                  backgroundColor:
                    selectedTransactionType === item.name
                      ? "#FFAF2A"
                      : "#E0E0E0",
                  padding: 10,
                  borderRadius: 15,
                  width: 120,
                  height: 100,
                  alignItems: "center",
                  margin: 10,
                }}
              >
                <Box>
                  {item.icon}
                  <CustomText marginTop={2} white small>
                    {item.name}
                  </CustomText>
                </Box>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Box flexDir="row" marginTop={4} justifyContent="space-between">
            <CustomText gray bold>
              Choose payee
            </CustomText>
            <CustomText primary bold>
              Search payee
            </CustomText>
          </Box>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row" }}
          >
            <TouchableOpacity>
              <Box bg={"white"} style={styles.contactBox}>
                <Box
                  bg="#F2F1F9"
                  w="60px"
                  h="60px"
                  margin="auto"
                  borderRadius={30}
                >
                  <Box m="auto">
                    <AddIcon />
                  </Box>
                </Box>
              </Box>
            </TouchableOpacity>
            {contacts.map((item, index) => {
              const isSelect = item.name === selectedContact;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedContact(item.name)}
                >
                  <Box
                    style={styles.contactBox}
                    bg={isSelect ? colors.primary : "white"}
                  >
                    <Box m="auto" textAlign="center">
                      <Avatar
                        size="60px"
                        source={{
                          uri: item.image,
                        }}
                      />
                      <CustomText
                        marginTop={4}
                        margin="auto"
                        small
                        white={isSelect}
                      >
                        {item.name}
                      </CustomText>
                    </Box>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <Box style={styles.sendMoneyFormContainer} padding={4}>
            <CustomInput
              rightElement={<ArrowInput />}
              label="Choose bank"
              onChange={(e) => null}
              value="Citibank"
            />
            <CustomInput
              rightElement={<ArrowInput />}
              label="Choose branch"
              onChange={(e) => null}
              value="New York"
            />
            <CustomInput
              label="Payee name"
              onChange={(e) => setSelectedContact(e)}
              value={selectedContact}
            />
            <CustomInput
              label="Card number"
              onChange={() => null}
              value="1235 6478 990"
            />
            <CustomInput
              numeric
              label="Amount"
              onChange={(e: string) => setAmount(e)}
              value={amount}
            />
            <CustomInput
              label="Reference"
              onChange={() => null}
              value="Cinema Tickets"
            />
            <Box flexDir="row" marginTop={6}>
              <Checkbox
                size="md"
                borderColor={colors.primary}
                backgroundColor={"white"}
                _icon={{ color: colors.primary }}
                isChecked={saveDetails}
                value=""
                onChange={setSaveDetails}
              >
                <CustomText primary>
                  Save Payee details
                </CustomText>
              </Checkbox>
            </Box>
            <CustomButton disabled={!amount} primary onPress={() => handleConfirm()}>
              Confirm
            </CustomButton>
          </Box>
        </MainContainer>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sendMoneyFormContainer: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    elevation: 3,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 30,
  },
  contactBox: {
    shadowColor: "#000",
    elevation: 3,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4.62,
    padding: 10,
    borderRadius: 15,
    width: 100,
    height: 120,
    alignItems: "center",
    margin: 10,
    marginLeft: 4,
  },
});

export default Cashout;
