import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParams';
import { useUserQuery } from '../../generated/graphql';
import Avatar from '../../assets/images/image.png';
import {
    Container,
    Image,
    Title,
    Description,
    ContentText,
    Button,
    TextButton,
    ContentButton,
    Sign,
} from './styles';

type mainScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;

const MainScreen: FC = () => {
    const navigation = useNavigation<mainScreenProp>();
    const { data, error, loading } = useUserQuery();

    if (loading) <Title>loading...{loading}</Title>
    if (error) <Title>{error}</Title>

    const toRestaurants = () => navigation.navigate('Restaurants');
    
    return (
        < Container >
            <Image source={Avatar} />
            <ContentText>
                <Title>Hi, {data?.user?.firstName}</Title>
                <Description>
                    {data?.user?.mobileNumber}
                </Description>
                <Description>
                    {data?.user?.email}
                </Description>
            </ContentText>
            <ContentButton>
                <Button onPress={toRestaurants}>
                    <TextButton>Restaurants</TextButton>
                </Button>
            </ContentButton>
        </Container >
    );
}

export default MainScreen;