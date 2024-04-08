import React from "react";
import { Box, TextField } from "@mui/material";

interface PostDescriptionInputFormProps {
  initial: any;
  onChange: (location: string, value: string) => void;
}

export const PostDescriptionInputForm = ({
  initial,
  onChange,
}: PostDescriptionInputFormProps) => {
  const { name, description, tags, links } = initial;
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        label="Name"
        value={name}
        fullWidth
        onChange={(e) => onChange("name", e.target.value)}
        sx={{ height: "55px", marginTop: "10px" }}
      />
      <TextField
        label="Description"
        value={description}
        fullWidth
        multiline
        maxRows={4}
        onChange={(e) => onChange("description", e.target.value)}
        sx={{ height: "140px", marginTop: "10px" }}
      />
      <TextField
        label="Tags"
        value={tags}
        fullWidth
        onChange={(e) => onChange("tags", e.target.value)}
        sx={{ height: "55px", marginTop: "10px" }}
      />
      <TextField
        label="Links"
        value={links}
        fullWidth
        multiline
        maxRows={3}
        onChange={(e) => onChange("links", e.target.value)}
        sx={{ height: "120px", marginTop: "10px" }}
      />
    </Box>
  );
};
