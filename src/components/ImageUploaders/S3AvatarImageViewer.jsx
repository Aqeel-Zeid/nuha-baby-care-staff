import React from 'react'
import  {useState} from 'react'
import AWS from 'aws-sdk'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    avatar: {
      margin: 10,
    },
    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60,
    },
  });


export default function S3AvatarImageViewer(props) {
    
    const classes = useStyles();
    
    const [myurl, setMyurl ] = useState(''); 
    //console.log('image Name' , props.imageName)
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
        Key: `${props.imageName}.png`,
        Expires: signedUrlExpireSeconds,
        
    }, (err,iurl) => {
            console.log(iurl)
            let imageUrl = iurl
            setMyurl(iurl)
        })

  
   
    return (
        <>
            
            <Avatar alt="Remy Sharp" src={myurl} className={classes.avatar} />
        </>
    )
}
