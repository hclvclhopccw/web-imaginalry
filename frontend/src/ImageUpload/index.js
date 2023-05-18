import React, { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
// import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Spac, Typography, Spin, Divider, Card } from 'antd';

const { Text, Link, Title } = Typography;


const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 300,
  height: 300,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function ImageUpload(props) {
  const [files, setFiles] = useState([]);
  const [finished, setFinished] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [imgResultUrl, setImgResultUrl] = useState(null);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
            setUploaded(true);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  let uploadFile = async (style) => {
    const file = files[0];
    setRequesting(true);
    if (file != null) {
      const data = new FormData();
      data.append("file_from_react", file);

      let response = await fetch("/url_route?style=" + style, {
        method: "post",
        body: data,
      });
      let res = await response.json();
      if (res.status !== 1) {
        alert("Error uploading file");
      } else {
        setFinished(true);
        setImgResultUrl(res.img_url);
        setRequesting(false);
        // alert(res.img_url);
      }
    }
  };

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <Grid container spacing={2}>
        <Grid item>
          <div style={thumbsContainer}>{thumbs}</div>
        </Grid>
        <Grid item >
        {uploaded && !requesting && (
          <Box
            sx={{
              display: 'flex',
              '& > *': {
                m: 1,
              },
            }}
          >
            {/* <ButtonGroup variant="outlined" orientation="vertical" aria-label="outlined button group"> */}
            <Card type="inner" title="Style" bordered={true} >
              {/* <Box><Title level={4} mark>Style</Title></Box> */}
              <p><Button onClick={() => uploadFile("3d")}>3D</Button></p>
              <p><Button onClick={() => uploadFile("anime")}>Anime</Button></p>
              <p><Button onClick={() => uploadFile("pixel")}>Pixel</Button></p>
              </Card>
            {/* </ButtonGroup> */}
            
            {/* <ButtonGroup variant="outlined" orientation="vertical" aria-label="outlined button group">
              <Box><Title level={4} mark>Face Changes</Title></Box> */}
              <Card type="inner" title="Face Changes" bordered={true} >
                <p><Button onClick={() => uploadFile("young")}>Younger</Button></p>
                <p><Button onClick={() => uploadFile("old")}>Older</Button></p>
                <p><Button onClick={() => uploadFile("smile")}>Smile</Button></p>
                <p><Button onClick={() => uploadFile("halloween")}>Halloween</Button></p>
                <p><Button onClick={() => uploadFile("hair-color")}>Hair Color</Button></p>
              </Card>
            {/* </ButtonGroup> */}
          
            {/* <ButtonGroup variant="outlined" orientation="vertical" aria-label="outlined button group">
              <Box><Title level={4} mark>Background changes</Title></Box> */}
              <Card type="inner" title="Background changes" bordered={true} >
                <p><Button onClick={() => uploadFile("bg-beach")}>Beach</Button></p>
                <p><Button onClick={() => uploadFile("extend")}>Extend</Button></p>
                <p><Button onClick={() => uploadFile("firework")}>Firework</Button></p>
                <p><Button onClick={() => uploadFile("christmas")}>Christmas</Button></p>
                <p><Button onClick={() => uploadFile("high-res")}>High Resolution</Button></p>
              </Card>
              <Card type="inner" title="Role Play" bordered={true} >
                <p><Button onClick={() => uploadFile("robot")}>Robot</Button></p>
                <p><Button onClick={() => uploadFile("doctor")}>Doctor</Button></p>
                <p><Button onClick={() => uploadFile("firefighter")}>Firefighter</Button></p>
                <p><Button onClick={() => uploadFile("president")}>President</Button></p>
              </Card>
            {/* </ButtonGroup> */}
            
            {/* <button onClick={() => uploadFile("high-res")}>High Res</button> */}
            {/* <button onClick={() => uploadFile("hair-color")}>hair-color</button> */}

          </Box>
        )}
        </Grid>
      </Grid>
      
     
      {uploaded && requesting && <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>}
      {finished && !requesting && (
        <div>
          <div><Divider orientation="left">Generated Image</Divider></div>
          
          <div><img alt="result" src={imgResultUrl}></img></div>
        </div>
      )}
    </section>
  );
}
export default ImageUpload;
