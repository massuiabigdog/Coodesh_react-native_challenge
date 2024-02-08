import React, { useContext, useState } from 'react';
import { Pressable } from 'react-native';
import { AuthContext } from '../context';
import { BottomContent, CustomButton, CustomInput, CustomLink, CustomText, MainContainer, MainHeader } from '../components';
import { Box, ScrollView } from 'native-base';

import LoginItem from '../assets/LoginIcon';
import EyeIcon from '../assets/EyeIcon';
import { emailIsValid } from '../utils';

function Login({ navigation }: { navigation: any }) {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const formIsValid = () => {
    return email.length > 0 && password.length > 7 && emailIsValid(email);
  }
  const allowedToLogin = formIsValid();

  const handleSignIn = (event: any) => {
    event.persist();

    signIn(email, password);
  };
  return (
    <>
      <ScrollView bg='white'>
      <MainHeader label='Log in' />
      <MainContainer>
        <>
          <CustomText h1 primary bold >Welcome Back</CustomText>
          <CustomText>Log in to continue</CustomText>
          <Box marginTop={12} margin='auto' marginBottom={12}>
            <LoginItem />
          </Box>
          <CustomInput label="Email" onChange={(e) => setEmail(e)} value={email} />
          <CustomInput isPassword={!isPasswordVisible} label="Password" rightElement={<Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Box opacity={!isPasswordVisible ? 1 : .5}>
              <EyeIcon />
            </Box>
          </Pressable>} onChange={(e) => setPassword(e)} value={password} />
          <Box marginLeft='auto' marginTop={3} >
            <CustomLink  onPress={() => alert('toDo')}>Forgot your password ?</CustomLink>
          </Box>
        </>
      </MainContainer>
      </ScrollView>

      <BottomContent >
        <CustomButton primary disabled={!allowedToLogin} onPress={(e) => handleSignIn(e)}>Log in</CustomButton>
        <Box marginTop={8} marginBottom={8} margin='auto' flexDir='row'>
          <CustomText>{'Dont have an account? '}</CustomText>
          <CustomLink primary onPress={() => navigation.navigate('SignUp')}>Sign Up</CustomLink>
        </Box>
      </BottomContent>

    </>


  );
};

export default Login;
