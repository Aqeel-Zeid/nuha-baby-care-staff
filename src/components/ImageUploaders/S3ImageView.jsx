import React , {useState} from 'react'
import AWS from 'aws-sdk'


const S3ImageView = () => {

    const [myurl, setMyurl ] = useState(''); 
    
    const s3 = new AWS.S3()
    s3.config.update({
        accessKeyId: 'AKIAWQV6NCFFWPXBZJ2N',
        secretAccessKey: '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',
        region: 'eu-central-1',
        signatureVersion: 'v4',
    })

    const myBucket = 'bucket-name'
    const myKey = 'file-name.pdf'
    const signedUrlExpireSeconds = 60 * 5
    
   

    const url = s3.getSignedUrl('getObject', {
        Bucket: 'nuhatestbucket2563',
        Key: 'IMG-20180505-WA0010.jpg',
        Expires: signedUrlExpireSeconds,
        
    }, (err,iurl) => {
            console.log(iurl)
            let imageUrl = iurl
            setMyurl(iurl)
        })

  
   
    return (
        <>
            <img src={myurl}></img>
        </>
    )
}

export default S3ImageView
