import React from 'react'
import Item from './Item'
import {useEffect,useState} from 'react'
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';

export default function Items(props) {

    console.log(props.searchValue)
    const [ItemArray, setItemArray] = useState([]);

    useEffect(
        () => 
        {
            const cache = new InMemoryCache();
            const link = new HttpLink({
            uri: 'https://nuhaprismadb-e9e96b51e5.herokuapp.com/nuha-graphql/dev',
            })
            const client = new ApolloClient({
                cache,
                link,
                connectToDevTools: true
            })
            
            const SEARCH_ITEMS = gql`
                query Items(
                    $search : String
                ){
                        items(where: { ItemName_contains: $search }) {
                            ItemId
                            ItemName
                            Category
                            Price
                            Stock
                            Brand
                        }
                        }
            `

            client.query(
                {
                    query : SEARCH_ITEMS,
                    variables : 
                    {
                        search : props.searchValue
                    }
                }
            ).then
            (
                (data) =>
                {
                    console.log(data.data.items)
                    setItemArray(data.data.items)
                }
            )
        },
        [props.searchValue]
    )


    const myItems = ItemArray.map
    (
        (item) =>
        {
            return (<Item
            ItemName = {item.ItemName}
            Category = {item.Category}
            Price = {item.Price}
            Stock = {item.Stock}
            Brand  = {item.Brand}
            ItemID = {item.ItemId}
            />)
        }
    )

    return (
        <div>
            {
                myItems
            }
        </div>
    )
}
