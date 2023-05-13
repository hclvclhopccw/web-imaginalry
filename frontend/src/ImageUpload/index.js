import React, { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";

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
  width: 100,
  height: 100,
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
      <aside style={thumbsContainer}>{thumbs}</aside>
      {uploaded && !requesting && (
        <div>
          <button onClick={() => uploadFile("3d")}>3D Style</button>
          <button onClick={() => uploadFile("anime")}>Anime Style</button>
          <button onClick={() => uploadFile("pixel")}>Pixel Style</button>
          <button onClick={() => uploadFile("smile")}>Make me smile</button>
          <button onClick={() => uploadFile("old")}>Make me older</button>
        </div>
      )}
      {uploaded && requesting && <div>Loading</div>}
      {finished && !requesting && (
        <div>
          <img src={imgResultUrl}></img>
        </div>
      )}
    </section>
  );
}
export default ImageUpload;
