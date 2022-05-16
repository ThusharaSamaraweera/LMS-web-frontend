import { Box, Card, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ConfirmationDialog from "./utilsComponents/ConfirmationDialog";

const CourseNoteCard = () => {
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleOnDownloadBtn = () => {
    setConfirmationDialogOpen(true);
    console.log("downloading");
  };

  const handleOnAccept = () => {
    setConfirmationDialogOpen(false);
  };

  const handleOnCancel = () => {
    setConfirmationDialogOpen(false);
  };

  return (
    <>
      {isConfirmationDialogOpen && (
        <ConfirmationDialog
          title="Want to download ?"
          handleOnAccept={handleOnAccept}
          handleOnCancel={handleOnCancel}
        />
      )}
      <Card
        sx={{
          padding: 0.8,
          marginY: 1,
          "&:hover": {
            boxShadow: '10px 10px #d6d6d6'
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Box
              sx={{
                display: "flex",
                marginY: 1,
              }}
            >
              <FilePresentIcon />
              <Typography
                sx={{
                  marginX: 1,
                }}
              >
                file name
              </Typography>
              <Typography>upload date</Typography>
            </Box>
            <Box
              sx={{
                color: "brown",
              }}
            >
              your vacation is start on 2020/09/7. also 2020/09/14 you have come
              to the university
            </Box>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <FileDownloadIcon
              onClick={handleOnDownloadBtn}
              sx={{ cursor: "pointer" }}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default CourseNoteCard;
