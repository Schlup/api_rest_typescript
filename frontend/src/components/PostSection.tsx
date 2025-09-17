import React from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import type { PostData } from "../types";

interface PostSectionProps {
  postData: PostData;
  onPostDataChange: (data: PostData) => void;
  onPostSubmit: () => void;
}

const PostSection: React.FC<PostSectionProps> = ({
  postData,
  onPostDataChange,
  onPostSubmit,
}) => {
  const handleSubjectIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value) || 0;
    onPostDataChange({ subject_id: value });
  };

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 3, fontWeight: "bold" }}
      >
        Demonstração POST Request
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Payload JSON:</strong>
        </Typography>
        <Box
          component="pre"
          sx={{
            mt: 1,
            p: 2,
            bgcolor: "grey.50",
            borderRadius: 1,
            fontSize: "0.875rem",
            fontFamily: "monospace",
            overflow: "auto",
          }}
        >
          {JSON.stringify(postData, null, 2)}
        </Box>
      </Alert>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Subject ID"
          type="number"
          value={postData.subject_id}
          onChange={handleSubjectIdChange}
          fullWidth
          variant="outlined"
          InputProps={{
            inputProps: { min: 0 },
          }}
        />
      </Box>

      <Button
        variant="contained"
        color="success"
        onClick={onPostSubmit}
        fullWidth
        size="large"
        sx={{ py: 1.5, fontWeight: "bold" }}
      >
        Executar POST Request
      </Button>
    </Paper>
  );
};

export default PostSection;
