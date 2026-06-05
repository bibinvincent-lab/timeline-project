import data from "@/data/timeline.json";
import { notFound } from "next/navigation";

import {
  Container,
  Typography,
  Paper,
  Chip,
  Stack,
  Divider,
  Grid,
  Box,
  Button,
} from "@mui/material";

export default async function TimelineDetail({
  params,
}) {
  const { id } = await params;

  const event = data.find(
    (item) => item.id.toString() === id
  );

  if (!event) {
    notFound();
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 6 }}
    >
      {/* HERO */}
      <Paper
        sx={{
          p: 5,
          borderRadius: 4,
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
        >
          {event.title}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          {new Date(
            event.date
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            lineHeight: 1.8,
          }}
        >
          {event.longDescription}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          mt={4}
          useFlexGap
                                  sx={{
                          flexWrap:
                            "wrap",
                        }}
        >
          {event.technologies?.map(
            (tech) => (
              <Chip
                key={tech}
                label={tech}
                color="primary"
              />
            )
          )}
        </Stack>
      </Paper>

      <Grid
        container
        spacing={4}
      >
        {/* LEFT COLUMN */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Highlights */}
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              mb={2}
            >
              Highlights
            </Typography>

            {event.highlights?.map(
              (item, index) => (
                <Typography
                  key={index}
                  sx={{ mb: 1 }}
                >
                  • {item}
                </Typography>
              )
            )}
          </Paper>

          {/* Challenges */}
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              mb={2}
            >
              Challenges Faced
            </Typography>

            {event.challenges?.map(
              (item, index) => (
                <Typography
                  key={index}
                  sx={{ mb: 1 }}
                >
                  • {item}
                </Typography>
              )
            )}
          </Paper>

          {/* Lessons */}
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              mb={2}
            >
              Lessons Learned
            </Typography>

            {event.lessonsLearned?.map(
              (item, index) => (
                <Typography
                  key={index}
                  sx={{ mb: 1 }}
                >
                  • {item}
                </Typography>
              )
            )}
          </Paper>
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              position: "sticky",
              top: 100,
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
            >
              Event Details
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box mb={2}>
              <Typography
                color="text.secondary"
              >
                Role
              </Typography>
              <Typography>
                {event.role}
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography
                color="text.secondary"
              >
                Duration
              </Typography>
              <Typography>
                {event.duration}
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography
                color="text.secondary"
              >
                Location
              </Typography>
              <Typography>
                {event.location}
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography
                color="text.secondary"
              >
                Status
              </Typography>

              <Chip
                label={event.status}
                color="success"
              />
            </Box>

            {event.links?.github && (
              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                href={event.links.github}
              >
                View GitHub
              </Button>
            )}

            {event.links?.demo && (
              <Button
                fullWidth
                variant="outlined"
                href={event.links.demo}
              >
                Live Demo
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}