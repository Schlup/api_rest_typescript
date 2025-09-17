import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import type { EducationalItem } from "../types";
import { People, PlayArrow, RoomServiceOutlined } from "@mui/icons-material";

interface DetailsSectionProps {
  selectedItem: EducationalItem;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ selectedItem }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Room Data */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <RoomServiceOutlined color="primary" />
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            Room Data
          </Typography>
        </Box>
        <Card
          sx={{
            bgcolor: "primary.50",
            border: "1px solid",
            borderColor: "primary.light",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "primary.dark", fontWeight: "bold", mb: 1 }}
            >
              {selectedItem.name}
            </Typography>
            <Typography variant="body1" sx={{ color: "primary.dark" }}>
              {selectedItem.description}
            </Typography>
          </CardContent>
        </Card>
      </Paper>

      {/* Subjects */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <People color="success" />
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            Subjects
          </Typography>
        </Box>
        {selectedItem.subjects.length > 0 ? (
          <Grid container spacing={2}>
            {selectedItem.subjects.map((subject) => (
              <Card
                sx={{
                  bgcolor: "success.50",
                  border: "1px solid",
                  borderColor: "success.light",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "success.dark", fontWeight: "bold", mb: 1 }}
                  >
                    {subject.name}
                  </Typography>
                  <Chip
                    label={`ID: ${subject.id}`}
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Nenhuma disciplina disponível
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Videos */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <PlayArrow color="warning" />
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            Vídeos
          </Typography>
        </Box>
        {selectedItem.videos.length > 0 ? (
          <Grid container spacing={2}>
            {selectedItem.videos.map((video) => (
              <Card
                sx={{
                  bgcolor: "warning.50",
                  border: "1px solid",
                  borderColor: "warning.light",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "warning.dark", fontWeight: "bold", mb: 2 }}
                  >
                    {video.title}
                  </Typography>
                  <Link
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "block",
                      mb: 2,
                      wordBreak: "break-all",
                      color: "primary.main",
                    }}
                  >
                    {video.url}
                  </Link>
                  <Chip
                    label={`ID: ${video.id}`}
                    size="small"
                    color="warning"
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Nenhum vídeo disponível
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default DetailsSection;
