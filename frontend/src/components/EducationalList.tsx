import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  Paper,
} from "@mui/material";
import type { EducationalItem } from "../types";
import { ChevronRight, People, PlayArrow } from "@mui/icons-material";

interface EducationalListProps {
  data: EducationalItem[];
  onItemClick: (item: EducationalItem) => void;
}

const EducationalList: React.FC<EducationalListProps> = ({
  data,
  onItemClick,
}) => {
  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 3, fontWeight: "bold" }}
      >
        Materiais Educacionais Disponíveis
      </Typography>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Card
            sx={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
              background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
              border: "1px solid",
              borderColor: "primary.light",
            }}
            onClick={() => onItemClick(item)}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontWeight: "bold" }}
                >
                  {item.name}
                </Typography>
                <ChevronRight color="action" />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {item.description}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <People sx={{ fontSize: 16, color: "success.main" }} />
                    <Typography
                      variant="caption"
                      color="success.main"
                      sx={{ fontWeight: "medium" }}
                    >
                      {item.subjects.length} disciplinas
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <PlayArrow sx={{ fontSize: 16, color: "warning.main" }} />
                    <Typography
                      variant="caption"
                      color="warning.main"
                      sx={{ fontWeight: "medium" }}
                    >
                      {item.videos.length} vídeos
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={`ID: ${item.id}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Paper>
  );
};

export default EducationalList;
