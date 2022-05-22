import { Box, Card, Grid } from "@mui/material";
import React, { useState } from "react";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ConfirmationDialog from "../utilsComponents/ConfirmationDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import ProtectedComponent from "../utilsComponents/ProtectedComponent";
import { Typography } from "antd";
import { ROLES } from "../../constants/roles";
const { Paragraph } = Typography;

const CourseNoteCard = (props) => {
  const { note } = props;
  const dataAndTime = new Date(note.date);
  const [isDownloadConfirmationDialogOpen, setDownloadConfirmationDialogOpen] =
    useState(false);
  const [isDeleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState(false);
  const [isEllipsis, toggleEllipsis] = useState(true);

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
    setDeleteConfirmationDialogOpen(true);
  };

  const handleOnDeleteAccept = () => {
    setDeleteConfirmationDialogOpen(false);
  };

  const handleOnDeleteCancel = () => {
    setDeleteConfirmationDialogOpen(false);
  };

  const handleOnClickMore = () => {
    toggleEllipsis(!isEllipsis);
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
            boxShadow: "10px 10px #ffc252",
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
                style={{margin: 3}}
              >
                {note.file_name}
              </Typography>
              <Typography
                style={{marginLeft: 5, marginTop: 3}}
              >
                {dataAndTime.toLocaleDateString()}
              </Typography>
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
              <DeleteIcon onClick={handleOnDelete} sx={{ cursor: "pointer" }} />
            </Grid>
          </ProtectedComponent>
        </Grid>

        <Box
          sx={{
            marginTop: 1,
          }}
        >
          <Paragraph
            ellipsis={isEllipsis ? { rows: 2 } : false}
            className="note-paragraph"
          >
            {note.description}
          </Paragraph>
          <Paragraph onClick={handleOnClickMore} className="paragraph-more">
            {isEllipsis ? "Expand" : "Collapse"}
          </Paragraph>
        </Box>
      </Card>
    </>
  );
};

export default CourseNoteCard;
