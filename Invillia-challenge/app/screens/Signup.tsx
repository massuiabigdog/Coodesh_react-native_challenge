import React, { useContext, useState } from "react";
import { AuthContext } from "../context";
import {
  BottomContent,
  CustomButton,
  CustomInput,
  CustomLink,
  CustomText,
  MainContainer,
  MainHeader,
} from "../components";
import { Box, Checkbox, ScrollView } from "native-base";
import { colors, emailIsValid } from "../utils";

function SignUp({ navigation }: { navigation: any }) {
  const { signUp } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agreeWithTerms, setAgreeWithTerms] = useState(false);

  const formIsValid = () => {
    return (
      firstName.length > 0 &&
      email.length > 0 &&
      password.length > 7 &&
      emailIsValid(email) &&
      agreeWithTerms
    );
  };
  const allowedToLogin = formIsValid();

  const handleSignup = (user: any) => {
    signUp(user);
    navigation.navigate("Login");
  };

  return (
    <>
    <ScrollView bg='white'>
      <MainHeader label="Sign up" />
      <MainContainer>
        <>
          <CustomText h1 primary bold>
            Create an account
          </CustomText>
          <CustomText marginBottom={15}>
            Add your personal details below
          </CustomText>
          <CustomInput
            label="First Name"
            onChange={(e) => setFirstName(e)}
            value={firstName}
          />
          <CustomInput
            label="Last Name"
            onChange={(e) => setLastName(e)}
            value={lastName}
          />
          <CustomInput
            label="Email"
            onChange={(e) => setEmail(e)}
            value={email}
          />
          <CustomInput
            isPassword={true}
            label="Password"
            placeholder="Password (Min. 8 characters)"
            onChange={(e) => setPassword(e)}
            value={password}
          />
          <Box flexDir="row">
            <Checkbox
              size="md"
              borderColor={colors.primary}
              backgroundColor={"white"}
              _icon={{ color: colors.primary }}
              isChecked={agreeWithTerms}
              value=""
              onChange={setAgreeWithTerms}
            >
              <CustomText>
                By creating an account your agree to our{" "}
                <CustomLink primary onPress={() => alert("Todo")}>
                  Term and Conditions{" "}
                </CustomLink>
              </CustomText>
            </Checkbox>
          </Box>
        </>
      </MainContainer>
    </ScrollView>

      <BottomContent>
        <CustomButton
          primary
          disabled={!allowedToLogin}
          onPress={() => handleSignup({ email, password, firstName, lastName })}
        >
          Sign Up
        </CustomButton>
        <Box marginTop={8} marginBottom={8} margin="auto" flexDir="row">
          <CustomText>{"Already have an account?  "}</CustomText>
          <CustomLink primary onPress={() => navigation.navigate("Login")}>
            Log in
          </CustomLink>
        </Box>
      </BottomContent>
      </>
  );
}

export default SignUp;
