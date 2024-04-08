import React, { useState } from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import { Box, Button, Container, Paper, Typography } from "@mui/material";

interface DragAndDropProps {
  location: "video" | "pics" | "image/gif";
  addFn: (location: string, file: string) => void;
  deleteFn: (location: string) => void;
  withoutButtonAll?: boolean;
  sectionName: string;
  sx?: object;
}

export const DragAndDrop = ({
  location,
  addFn,
  deleteFn,
  withoutButtonAll,
  sectionName,
  sx,
}: DragAndDropProps) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleRemoveButton = () => {
    setPreviews([]);
    deleteFn(sectionName);
  };

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const files = acceptedFiles.slice(0, 4 - previews.length);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (file && result) {
          setPreviews((prevPreviews) => [...prevPreviews, result.toString()]);
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
    });
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
    multiple: true,
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
      <Box sx={{ borderBottom: "1px solid #1976d2" }} />
      <Container
        sx={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gridTemplateRows: "repeat(auto-fill, minmax(130px, auto))",
          gridAutoRows: "auto",
          gridGap: "10px",
          placeItems: "center",
          padding: "15px",
        }}
      >
        {previews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index + 1}`}
            style={{
              marginBottom: "10px",
              maxHeight: "155px",
            }}
          />
        ))}
        {previews.length < 4 && (
          <Container
            {...getRootProps()}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px dashed grey",
              borderRadius: "10px",
              cursor: "pointer",
              height: "95%",
              marginBottom: "auto",
            }}
          >
            <input {...getInputProps()} />
            <Typography variant="h5">
              {isDragActive
                ? `Drop the ${location} here`
                : `Drag & Drop ${location} Here or Click to Browse`}
            </Typography>
          </Container>
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
        <Typography
          sx={{
            marginBottom: "5px",
            fontSize: "22px",
          }}
        >
          {sectionName.toUpperCase()}
        </Typography>
        {!withoutButtonAll && (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleRemoveButton()}
            sx={{ marginLeft: "auto" }}
          >
            Remove All
          </Button>
        )}
      </Box>
    </Paper>
  );
};
