import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { MediaSectionWrapper } from "../elements/sectionWrappers/postMediaWrapper";
import { useEffect, useRef, useState } from "react";
import { PostDescriptionInputForm } from "../elements/inpuForms/PostDescriptionInputForm";
import { DragAndDrop } from "../elements/inpuForms/DragAndDropInputs";
import axios from "axios";
import toast from "react-hot-toast";
import { splitString } from "../utils/helpers";
import { DragAndDropVideo } from "../elements/inpuForms/DragAndDropVideo";

//reusable constants
const wrapperSx = { height: "420px", width: "620px" };
const mediaContainers = ["video", "pics", "gifs", "text"];
const initialTextMediaState = {
  name: "",
  description: "",
  tags: "",
  links: "",
};

interface MediaCheckboxProps {
  mediaName: string;
  isChecked: boolean;
  onChange: (mediaName: string) => void;
}

const MediaCheckbox: React.FC<MediaCheckboxProps> = ({
  mediaName,
  isChecked,
  onChange,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox checked={isChecked} onChange={() => onChange(mediaName)} />
      }
      label={mediaName.toUpperCase()}
    />
  );
};

export const PostPage = () => {
  //form data
  const [textMedia, setTextMedia] = useState<Record<string, string>>(
    initialTextMediaState
  );

  const handleChangeTextFields = (location: string, value: string) => {
    setTextMedia((prevState) => ({
      ...prevState,
      [location]: value,
    }));
  };

  const addedVideoRef = useRef<string | null>(null);
  const addedPicturesRef = useRef<string | null>(null);
  const addedGifsRef = useRef<string | null>(null);

  useEffect(() => {
    console.log(addedPicturesRef.current);
  }, [addedPicturesRef.current]);

  const addFile = (location: string, file: string) => {
    switch (location) {
      case "video":
        addedVideoRef.current = file;
        break;
      case "pics":
        addedPicturesRef.current = file;
        break;
      case "gifs":
        addedGifsRef.current = file;
        break;
      default:
        break;
    }
  };

  const removeFile = (location: string) => {
    switch (location) {
      case "video":
        addedVideoRef.current = null;
        break;
      case "pics":
        addedPicturesRef.current = null;
        break;
      case "gifs":
        addedGifsRef.current = null;
        break;
      default:
        break;
    }
  };

  const resetPostPage = () => {
    setTextMedia(initialTextMediaState);
    addedVideoRef.current = null;
    addedPicturesRef.current = null;
    addedGifsRef.current = null;
  };

  //posting
  const [selectedBranchToPost, setSelectedBranchToPost] = useState("");
  const [chosenMediaToPost, setChosenMediaToPost] = useState<
    Record<string, boolean>
  >({
    video: false,
    pics: false,
    gifs: false,
    text: false,
  });

  const handleChangeChosenMedia = (mediaName: string) => {
    if (Object.keys(chosenMediaToPost).includes(mediaName)) {
      setChosenMediaToPost((prevState) => ({
        ...prevState,
        [mediaName]: !prevState[mediaName],
      }));
    }
  };

  //submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/post-media", {
        video: addedVideoRef.current,
        pics: addedPicturesRef.current && splitString(addedPicturesRef.current),
        gifs: addedGifsRef.current && splitString(addedGifsRef.current),
        text: {
          ...textMedia,
          tags: splitString(textMedia.tags),
          links: splitString(textMedia.links),
        },
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        // resetPostPage();
        toast.success("Posted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex", padding: "10px" }}>
      <Box
        sx={{
          width: "80%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(620px, 1fr))",
          gridAutoRows: "auto",
          gridGap: "20px",
        }}
      >
        <DragAndDropVideo
          sectionName={"video"}
          sx={{ ...wrapperSx }}
          deleteFn={removeFile}
          addFn={addFile}
          location="video"
        />

        <DragAndDrop
          sectionName={"pics"}
          sx={{ ...wrapperSx }}
          deleteFn={removeFile}
          addFn={addFile}
          location="pics"
        />

        <DragAndDrop
          sectionName={"gifs"}
          sx={{ ...wrapperSx }}
          deleteFn={removeFile}
          addFn={addFile}
          location="image/gif"
        />
        <MediaSectionWrapper sx={{ ...wrapperSx }}>
          <PostDescriptionInputForm
            onChange={handleChangeTextFields}
            initial={textMedia}
          />
        </MediaSectionWrapper>
      </Box>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "300px",
          marginLeft: "25px",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            border: "1px solid #1976d2",
            borderRadius: "6px",
            padding: "10px",
            minHeight: "380px",
            minWidth: "200px",
          }}
        >
          PREVIEW CONTENT
        </Box>
        <FormGroup sx={{ padding: "15px 0" }}>
          {mediaContainers.map((value, index) => {
            return (
              <MediaCheckbox
                key={`${value}${index}`}
                mediaName={value}
                isChecked={chosenMediaToPost[value]}
                onChange={handleChangeChosenMedia}
              />
            );
          })}
        </FormGroup>
        <FormControl sx={{ minWidth: "220px" }}>
          <InputLabel>Post Branch</InputLabel>
          <Select
            value={selectedBranchToPost}
            onChange={(event) => setSelectedBranchToPost(event.target.value)}
            label="Post Branch"
          >
            <MenuItem value="free">Free</MenuItem>
            <MenuItem value="premium">Premium</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ marginTop: "auto" }}
          onClick={handleSubmit}
        >
          Post
        </Button>
      </Paper>
    </Box>
  );
};
