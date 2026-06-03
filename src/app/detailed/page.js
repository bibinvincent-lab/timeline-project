"use client";

import { useMemo, useState } from "react";

import data from "@/data/timeline.json";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

import {
  Container,
  Typography,
  Paper,
  Chip,
  Stack,
  TextField,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TerminalIcon from "@mui/icons-material/Terminal";

export default function TimelinePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [search, setSearch] = useState("");

  const categoryIcons = {
    education: <SchoolIcon />,
    project: <CodeIcon />,
    career: <WorkIcon />,
    promotion: <TrendingUpIcon />,
  };

  const categoryColors = {
    education: "primary",
    project: "success",
    career: "secondary",
    promotion: "warning",
  };

  const filteredEvents = useMemo(() => {
    return [...data]
      .sort(
        (a, b) =>
          Date.parse(a.date) - Date.parse(b.date)
      )
      .filter(
        (event) =>
          event.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          event.description
            .toLowerCase()
            .includes(search.toLowerCase())
      );
  }, [search]);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h3"
        fontWeight={700}
        gutterBottom
      >
        My Timeline
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        A chronological overview of my learning,
        projects, and career milestones.
      </Typography>

      <TextField
        fullWidth
        label="Search timeline..."
        variant="outlined"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        sx={{ mb: 5 }}
      />

      {filteredEvents.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">
            No timeline events found.
          </Typography>
        </Paper>
      ) : (
        <Timeline
          position={
            isMobile ? "right" : "alternate"
          }
        >
          {filteredEvents.map(
            (event, index) => (
              <TimelineItem key={event.id}>
                <TimelineSeparator>
                  <TimelineDot
                    color={
                      categoryColors[
                        event.category
                      ] || "grey"
                    }
                  >
                    {categoryIcons[
                      event.category
                    ] || <TerminalIcon />}
                  </TimelineDot>

                  {index <
                    filteredEvents.length - 1 && (
                    <TimelineConnector />
                  )}
                </TimelineSeparator>

                <TimelineContent>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 3,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      transition:
                        "all 0.3s ease",

                      "&:hover": {
                        transform:
                          "translateY(-4px)",
                        boxShadow: 4,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >
                      {event.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {formatDate(event.date)}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{ mb: 2 }}
                    >
                      {event.description}
                    </Typography>

                    {event.technologies && (
                      <Box mt={2}>
                        {/* <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          useFlexGap
                        > */}

                        <Stack
  direction="row"
  spacing={1}
  useFlexGap
  sx={{ flexWrap: "wrap" }}
>
                          {event.technologies.map(
                            (tech) => (
                              <Chip
                                key={tech}
                                label={tech}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            )
                          )}
                        </Stack>
                      </Box>
                    )}
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            )
          )}
        </Timeline>
      )}
    </Container>
  );
}