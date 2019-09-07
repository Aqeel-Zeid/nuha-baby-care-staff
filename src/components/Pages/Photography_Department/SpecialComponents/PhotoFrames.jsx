import React from 'react'
import {useEffect,useState} from 'react'
import PhotoFrame from './PhotoFrame'
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
function PhotoFrames(props) {

    let SearchValue = props.SearchValue;
    const [FrameArray, setFrameArray] = useState([]);
    const [updateUI, setUpdateUI] = useState(false)

    
    const getFrames = 
    {
        
    }


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

            const SEARCH_FRAMES = gql`
                    query PhotoFrameTemplates
                    (
                        $searchTag : String
                    )
                    {
                            photoFrameTemplates(where: { FrameName_contains: $searchTag }) 
                            {
                                FrameID
                                FrameName
                                FrameMaterial
                                PhotoFinish
                                Price
                                Dimensions
                            }
                        }
                                    `
            client.query(
                {
                    query : SEARCH_FRAMES,
                    variables : 
                    {
                        searchTag : props.searchValue
                    }

                }
            ).then
            (
                (data) => 
                {
                    console.log(data)
                    setFrameArray(data.data.photoFrameTemplates)
                    setUpdateUI(true)
                }
            ).catch
            (
                (err) => 
                {
                    console.log(err)
                }
            )
        },
        [props.searchValue]

    )
    
    const myFrames = FrameArray.map
    (
        (frame) =>
        {
            return <PhotoFrame
                        key = {frame.FrameID}
                        FrameName = {frame.FrameName}
                        Dimensions = {frame.Dimensions}
                        FrameMaterial = {frame.FrameMaterial}
                        Price = {frame.Price}
                        PhotoFinish = {frame.PhotoFinish}
                        FrameID = {frame.FrameID}
                    />
        }
    )

    return (
        <>
            {console.log('Frame' , props.searchValue )}
            {
                myFrames
            }
            
            
        </>
    )
}

export default PhotoFrames
