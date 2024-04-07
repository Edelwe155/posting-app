import { Box, Typography } from "@mui/material";
import { MediaSectionWrapper } from "../elements/sectionWrappers/postMediaWrapper";

export const RepositoryPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography sx={{ fontSize: "35px", marginLeft: "15px" }}>
        REPOSITORY
      </Typography>
      <Box
        sx={{
          width: "98%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gridAutoRows: "auto",
          gridGap: "20px",
          padding: "15px",
        }}
      >
        {[...Array(36)].map((_, index) => (
          <MediaSectionWrapper
            key={index}
            sectionName={`Media ${index + 1}`}
            sx={{ height: "200px", width: "240px" }}
          />
        ))}
      </Box>
    </Box>
  );
};
