import React from 'react'
import {useState , useEffect} from 'react'
import Card from './Card'
import { Container } from '@material-ui/core'
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';

export default function Cards(props) {

    const [cardArray, setCardArray] = useState([]);
    useEffect(() => {
    const cache = new InMemoryCache();
    const link = new HttpLink({
        uri: 'https://nuhaprismadb-e9e96b51e5.herokuapp.com/nuha-graphql/dev',
    })
    const client = new ApolloClient({
        cache,
        link,
        connectToDevTools: true
    })

    const SEARCH_CARD_TEMPLATES = gql`
    query searchCardTemplates
    (   
        $searchTag : String
    )
    {
	  cardTemplates(where : {
      SearchTags_contains : $searchTag
    })
        {
            CardId
            CardName
            Price
            Size
            Category    
            SearchTags
        }
    }
    `
    client.query(
        {
            query : SEARCH_CARD_TEMPLATES,
            variables : {
                searchTag : props.searchText
            }
        }
    ).then(
        (data) => 
        {
            setCardArray(data.data.cardTemplates)
            console.log(data)
        }
    ).catch(
        (err) => {
            console.log(err)
        }
    )

        console.log(props.searchText)
      }, [props.searchText]);
    //Creating Client
      
    const myCards = cardArray.map(
        (card) => {
            return <Card key = {card.CardId}
                        cardName = {card.CardName}
                        category = {card.Category}
                        price = {card.Price}
                        size = {card.Size}
                        cardId = {card.CardId}
                        searchTags = {card.SearchTags}
                    />
        }
    )
    

    return (
        <>
            {
                myCards
            }
            
        </>
    )
}
