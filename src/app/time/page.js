"use client";

import {
  useMemo,
  useState,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const theme = useTheme();

  const isMobile =
    useMediaQuery(
      theme.breakpoints.down("sm")
    );

  const [search, setSearch] =
    useState("");

  const [events, setEvents] =
    useState([]);

  useEffect(() => {
    const loadTimeline =
      async () => {
        try {
          const response =
            await fetch(
              "/api/timeline"
            );

          const payload =
            await response.json();

          setEvents(payload);
        } catch (error) {
          console.error(error);
        }
      };

    loadTimeline();
  }, []);

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

  const filteredEvents =
    useMemo(() => {
      return [...events]
        .sort(
          (a, b) =>
            Date.parse(a.date) -
            Date.parse(b.date)
        )
        .filter(
          (event) =>
            event.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            event.description
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );
    }, [events, search]);

  const formatDate = (date) =>
    new Intl.DateTimeFormat(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    ).format(new Date(date));

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 6 }}
    >
      <Typography
        variant="h3"
        fontWeight={700}
        gutterBottom
      >
        My Timeline
      </Typography>

      <TextField
        fullWidth
        label="Search timeline..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        sx={{ mb: 5 }}
      />

      <Timeline
        position={
          isMobile
            ? "right"
            : "alternate"
        }
      >
        {filteredEvents.map(
          (event, index) => (
            <TimelineItem
              key={event.id}
            >
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
                  ] || (
                    <TerminalIcon />
                  )}
                </TimelineDot>

                {index <
                  filteredEvents.length -
                    1 && (
                  <TimelineConnector />
                )}
              </TimelineSeparator>

              <TimelineContent>
                <Paper
                  onClick={() =>
                    router.push(
                      `/time/${event.id}`
                    )
                  }
                  sx={{
                    p: 3,
                    mb: 3,
                    cursor:
                      "pointer",
                  }}
                >
                  <Typography
                    variant="h6"
                  >
                    {event.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    {formatDate(
                      event.date
                    )}
                  </Typography>

                  <Typography>
                    {
                      event.description
                    }
                  </Typography>

                  <Box mt={2}>
                    <Stack
                      direction="row"
                      spacing={1}
                    >
                      {event.technologies?.map(
                        (tech) => (
                          <Chip
                            key={
                              tech
                            }
                            label={
                              tech
                            }
                            size="small"
                          />
                        )
                      )}
                    </Stack>
                  </Box>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          )
        )}
      </Timeline>
    </Container>
  );
}