"use client";

import { useMemo, useState } from "react";
import data from "@/data/timeline.json";

import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Stack,
  Chip,
  TextField,
} from "@mui/material";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

import { motion } from "framer-motion";

export default function TimelinePage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return data
      .filter((item) => {
        const matchType =
          filter === "all" ? true : item.type === filter;

        const matchSearch =
          item.title.toLowerCase().includes(search.toLowerCase());

        return matchType && matchSearch;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [filter, search]);

  const getColor = (type) => {
    switch (type) {
      case "learning":
        return "primary";
      case "project":
        return "secondary";
      case "work":
        return "success";
      default:
        return "grey";
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        My Timeline
      </Typography>

      {/* SEARCH */}
      <TextField
        fullWidth
        label="Search timeline"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* FILTERS */}
      <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
        {["all", "learning", "project", "work"].map((type) => (
          <Button
            key={type}
            variant={filter === type ? "contained" : "outlined"}
            onClick={() => setFilter(type)}
          >
            {type}
          </Button>
        ))}
      </Stack>

      {/* TIMELINE */}
      <Timeline position="right">
        {filteredData.map((event, index) => (
          <TimelineItem key={event.id}>
            <TimelineSeparator>
              <TimelineDot color={getColor(event.type)} />
              {index !== filteredData.length - 1 && (
                <TimelineConnector />
              )}
            </TimelineSeparator>

            <TimelineContent>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderLeft: "4px solid #1976d2",
                  }}
                >
                  <Typography variant="h6">
                    {event.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {event.date}
                  </Typography>

                  {event.description && (
                    <Typography sx={{ mt: 1 }}>
                      {event.description}
                    </Typography>
                  )}

                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={event.type}
                      size="small"
                      color={getColor(event.type)}
                    />
                  </Box>
                </Paper>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
}