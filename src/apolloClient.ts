import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
    uri: 'https://simplicityhw.cotunnel.com/graphql',
});

const authLink = setContext(async (_, { header }) => {
    const token = await getToken();
    return {
        headers: {
            ...Headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})
const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {
            return value;
        }
    } catch (e) {
    }
}



export default client;