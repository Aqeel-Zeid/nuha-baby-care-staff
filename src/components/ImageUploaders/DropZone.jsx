import React, {useEffect, useState , useMemo, useGlobal} from 'reactn';
import {useDropzone} from 'react-dropzone';
import { Button , Container} from '@material-ui/core';

import S3FileUpload from 'react-s3';
 
//Optional Import
import { uploadFile } from 'react-s3';





const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#9D8DF1',
    borderStyle: 'dashed',
    backgroundColor: '#EDEAFC',
    color: '#9D8DF1',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#BC2B37',
    backgroundColor: '#DA8B91',
  };

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 8
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 4,
  marginRight: 4,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


function Previews(props) {
    const [uploadEnable, setUploadEnable] = useState(false)
  const [files, setFiles] = useState([]);
  const {getRootProps, 
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
        } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
        console.log(acceptedFiles[0])
        setUploadableFile(acceptedFiles[0])
        setUploadEnable(true)
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
        
      })));
    }
  });
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  const [ uploadableFile , setUploadableFile] = useGlobal('uploadableFile')  

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Container>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <aside style={thumbsContainer}>
        {thumbs}
        </aside>
        
      </div>
      </Container>
  );
}

export default Previews