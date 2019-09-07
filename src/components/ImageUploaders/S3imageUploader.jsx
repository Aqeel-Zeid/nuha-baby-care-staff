import React , {useGlobal} from 'reactn'
import DropZone from './DropZone'
import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Container} from '@material-ui/core'

import AWS from 'aws-sdk'

const s3 = new AWS.S3()
    s3.config.update({
        accessKeyId: 'AKIAWQV6NCFFWPXBZJ2N',
        secretAccessKey: '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',
        region: 'eu-central-1',
        signatureVersion: 'v4',
    })

    const signedUrlExpireSeconds = 60 * 5

    const url = s3.getSignedUrl('putObject', {
        Bucket: 'nuhatestbucket2563',
        Key: 'TestImage.jpg',   
        Expires: signedUrlExpireSeconds,
        
    }, (err,iurl) => {
            console.log(iurl)
        })


const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));


/*
const config = {
    bucketName: 'nuhatestbucket2563',
    dirName: 'photos', /* optional 
    region: 'eu-central-1',
    accessKeyId: 'AKIAWQV6NCFFWPXBZJ2N',
    secretAccessKey: '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',
    signatureVersion: 'v4'
}
*/


const S3imageUploader = (props) => {

    const classes = useStyles();

    const [ uploadableFile , setUploadableFile] = useGlobal('uploadableFile');
    
    const uploadFileToS3 = () => {
        // console.log('Upload.....')
        if (typeof uploadFile === 'undefined') {
            console.log("Nothing To Upload");

        } else {
            const url = s3.getSignedUrl('putObject', {
                Bucket: 'nuhatestbucket2563',
                Key: `${props.imageName}.png`,
                Expires: signedUrlExpireSeconds,
                ContentType: 'image/png'
            }, (err, iurl) => {
                console.log(iurl)
                    
                fetch(iurl, {
                    method: 'PUT',
                    headers:{'content-type': 'image/png'},
                    body: uploadableFile 
                })
                    .then(response => console.log(response))
                    .catch(error => console.error('Error:', error))
                    .then(response => console.log('Success:', response));


            })
        }
        /*
        */
    }

    return (
        <>
           
            <Container>
                    <DropZone/>
                    {
                        uploadableFile != null  && 
                        <Button variant="outlined" 
                            className={classes.button} 
                            onClick = {uploadFileToS3} 
                            fullWidth= {true}>
                         Upload
                        </Button>
                    }
                    
            </Container>
          </>
    )
}

export default S3imageUploader
