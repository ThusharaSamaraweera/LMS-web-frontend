import { Box, Card, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ConfirmationDialog from "./utilsComponents/ConfirmationDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import ProtectedComponent from "./utilsComponents/ProtectedComponent";
import {ROLES} from '../constants/roles'

const CourseNoteCard = () => {
  const [isDownloadConfirmationDialogOpen, setDownloadConfirmationDialogOpen] = useState(false);
  const [isDeleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =  useState(false)

  const handleOnDownloadBtn = () => {
    setDownloadConfirmationDialogOpen(true);
    console.log("downloading");
  };

  const handleOnDownloadAccept = () => {
    setDownloadConfirmationDialogOpen(false);
  };

  const handleOnDownloadCancel = () => {
    setDownloadConfirmationDialogOpen(false);
  };

  const handleOnDelete = () => {
    setDeleteConfirmationDialogOpen(true)
  }

  const handleOnDeleteAccept = () => {
    setDeleteConfirmationDialogOpen(false);
  };

  const handleOnDeleteCancel = () => {
    setDeleteConfirmationDialogOpen(false);
  };

  return (
    <>
      {isDownloadConfirmationDialogOpen && (
        <ConfirmationDialog
          title="Want to download ?"
          handleOnAccept={handleOnDownloadAccept}
          handleOnCancel={handleOnDownloadCancel}
        />
      )}
      {isDeleteConfirmationDialogOpen && (
        <ConfirmationDialog
          title="Want to delete ?"
          handleOnAccept={handleOnDeleteAccept}
          handleOnCancel={handleOnDeleteCancel}
        />
      )}
      <Card
        sx={{
          padding: 0.8,
          marginY: 1,
          "&:hover": {
            boxShadow: '10px 10px #ffc252'
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={10}>
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

          <ProtectedComponent allowedRoles={[ROLES.LECTURER]}>
            <Grid
              item
              xs={1}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <DeleteIcon
                onClick={handleOnDelete}
                sx={{ cursor: "pointer" }}
              />
            </Grid>
          </ProtectedComponent>
        </Grid>
      </Card>
    </>
  );
};

export default CourseNoteCard;
