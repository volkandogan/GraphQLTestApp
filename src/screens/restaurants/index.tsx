import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParams';
import { useRestaurantsQuery } from '../../generated/graphql';
import {
    Container,
    Title,
    Description,
    ContentText,
    Button,
    TextButton,
    ContentButton,
    StyledFlatList,
} from './styles';

type mainScreenProp = StackNavigationProp<RootStackParamList, 'Restaurants'>;

const MainScreen: FC = () => {
    const navigation = useNavigation<mainScreenProp>();
    const { data, error, loading } = useRestaurantsQuery();

    if (loading) <Title>loading...{loading}</Title>
    if (error) <Title>{error}</Title>

    const toMain = () => navigation.navigate('Main');
    
    return (
        < Container >
            <ContentText>
                <Title>Restaurant List</Title>
                <StyledFlatList<any>
                    data={data?.restaurants}
                    renderItem={({ item, index }) => (
                        <Description key={index}>{item.name}</Description>
                    )}
                    keyExtractor={(item) => item.uid}
                />
            </ContentText>
            <ContentButton>
                <Button onPress={toMain}>
                    <TextButton>Home</TextButton>
                </Button>
            </ContentButton>
        </Container >
    );
}

export default MainScreen;