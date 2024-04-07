import React, { useState } from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import { Box, Button, Container, Paper, Typography } from "@mui/material";

interface DragAndDropProps {
  location: "video" | "pics" | "image/gif";
  addFn: (location: string, file: string) => void;
  deleteFn: (location: string) => void;
  withoutButtonAll?: boolean;
  withoutButtonSpecific?: boolean;
  sectionName: string;
  sx?: object;
}

export const DragAndDrop = ({
  location,
  addFn,
  deleteFn,
  withoutButtonAll,
  withoutButtonSpecific,
  sectionName,
  sx,
}: DragAndDropProps) => {
  const [preview, setPreview] = useState("");

  const handleRemoveButton = () => {
    setPreview("");
    deleteFn(sectionName);
  };

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (file && reader.result) {
        setPreview(reader.result.toString());
        addFn(location, reader.result.toString());
      }
    };
    if (file) {
      if (file.type.startsWith("image")) {
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("video")) {
        reader.readAsDataURL(file);
      }
    }
  };

  let acceptTypes: { [key: string]: string[] } = {};
  if (location === "video") {
    acceptTypes = { "video/*": [] };
  } else if (location === "pics") {
    acceptTypes = { "image/*": [] };
  } else if (location === "image/gif") {
    acceptTypes = { "image/gif": [] };
  }

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    multiple: false,
    accept: acceptTypes,
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        padding: "10px",
        ...sx,
      }}
    >
      <Box sx={{ borderBottom: "1px solid #1976d2" }}>
        <Typography sx={{ marginBottom: "5px", fontSize: "18px" }}>
          {sectionName}
        </Typography>
      </Box>
      <Container
        {...getRootProps()}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px dashed grey",
          borderRadius: "10px",
          borderColor: isDragActive ? "primary.main" : "text.secondary",
          textAlign: "center",
          cursor: "pointer",
          margin: "10px 0",
          height: "100%",
        }}
      >
        <input {...getInputProps()} />
        {preview ? (
          <>
            {preview.startsWith("data:image") ? (
              <img
                src={preview}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : (
              preview.startsWith("data:video") && (
                <video controls style={{ maxWidth: "100%", maxHeight: "100%" }}>
                  <source
                    src={preview}
                    type={location === "image/gif" ? "image/gif" : "video/mp4"}
                  />
                  Your browser does not support the video tag.
                </video>
              )
            )}
          </>
        ) : (
          <Typography variant="h5">
            {isDragActive
              ? `Drop the ${location} here`
              : `Drag & Drop ${location} Here or Click to Browse`}
          </Typography>
        )}
      </Container>
      <Box
        sx={{
          borderTop: "1px solid #1976d2",
          marginTop: "auto",
          pt: 1,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {!withoutButtonSpecific && (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleRemoveButton()}
          >
            Remove Selected
          </Button>
        )}
        {!withoutButtonAll && (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleRemoveButton()}
            sx={{ marginLeft: "10px" }}
          >
            Remove All
          </Button>
        )}
      </Box>
    </Paper>
  );
};
