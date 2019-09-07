import React from 'react'
import CakeItem from './CakeItem'
import {useEffect,useState} from 'react'
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';

function CakeItems(props) 
{
    const [cakeItemArray,setCakeItemArray] = useState([])
    
    useEffect(
        ()=>{
            if(props.searchValue != '')
            {
                console.log(props.searchValue)

                const SEARCH_CAKEITEM = gql`
                    query SearchItem(
                        $search : String
                    ){
                          cakeItems(where: { CakeItemName_contains: $search }) {
                          CakeItemID
                          CakeItemName
                          Price
                          Category
                          SoldItems
                            }
                }

            `
                //Creating Client
                const cache = new InMemoryCache();
                const link = new HttpLink({
                    uri: 'https://nuhaprismadb-e9e96b51e5.herokuapp.com/nuha-graphql/dev',
                })
                const client = new ApolloClient({
                    cache,
                    link,
                    connectToDevTools: true
                })

                client.query(
                    {
                        query : SEARCH_CAKEITEM,
                        variables :
                        {
                            search : props.searchValue
                        }
                    }
                ).then
                (
                    (data) =>
                    {
                        console.log(data)
                        setCakeItemArray(data.data.cakeItems)
                    }

                ).catch
                (
                    (err) => 
                    {
                        console.log(err)
                    }
                )
                
            }

        },
        [props.searchValue]
    )

    const myCakeItems = cakeItemArray.map
    (
        (cakeItem) =>
        {
            return(
                <CakeItem
                    CakeItemID = {cakeItem.CakeItemID}
                    CakeItemName = {cakeItem.CakeItemName}
                    Price = { cakeItem.Price}
                    Category = { cakeItem.Category}
                    key = {cakeItem.CakeItemID}
                    SoldItems = {cakeItem.SoldItems}
                />
            )
        }
    )

    return (
        <>
          {
              myCakeItems
          }  
        </>
    )
}

export default CakeItems
