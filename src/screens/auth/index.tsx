import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParams';
import {
    Container,
    Title,
    Description,
    ContentText,
    Button,
    TextButton,
    ContentInput,
    InputUsername,
    InputPassword,
    TextSocial,
    TextRegister,
    TextRegisterSpan,
    ContentRegister,
    Image,
    ContentIcons,
} from './styles';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/query';
import AsyncStorage from '@react-native-async-storage/async-storage';

type authScreenProp = StackNavigationProp<RootStackParamList, 'Auth'>;


function AuthScreen() {
    const navigation = useNavigation<authScreenProp>();
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: username,
            password: password,
        },
        async onCompleted(data) {
            try {
                await AsyncStorage.setItem('token', data.loginWithEmail.token)
                navigation.navigate('Main')

            } catch (e) {
                // saving error
            }
        }
    });

    if (loading) <Title>loading...{loading}</Title>
    if (error) <Title>{error}</Title>

    const submit = () => {
        login();
    };

    return (
        <Container>
            <ContentText>
                <Title>Hello Again!</Title>
                <Description>Wellcome back you've been missed!</Description>
            </ContentText>
            <ContentInput>
                <InputUsername
                    placeholder="Enter username"
                    onChangeText={setusername}
                    value={username}
                />
                <InputPassword
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                />

                <Button onPress={submit}>
                    <TextButton>Sign In</TextButton>
                </Button>

                <TextSocial>or continue with</TextSocial>
            </ContentInput>

            <ContentRegister>
                <TextRegister>Not a member? </TextRegister>
            </ContentRegister>
        </Container>
    );
}

export default AuthScreen;