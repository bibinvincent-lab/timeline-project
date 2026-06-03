// import data from "@/data/timeline.json";

// export default function TimelinePage() {
//   const sorted = [...data].sort(
//     (a, b) => new Date(a.date) - new Date(b.date)
//   );

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Timeline</h1>

//       <ul>
//         {sorted.map((item) => (
//           <li key={item.id}>
//             <b>{item.title}</b> — {item.date}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

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
  Typography,
  Paper,
  Container,
} from "@mui/material";

export default function TimelinePage() {
  const sorted = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Timeline
      </Typography>

      <Timeline position="right">
        {sorted.map((event, index) => (
          <TimelineItem key={event.id}>
            <TimelineSeparator>
              <TimelineDot color="primary" />

              {index < sorted.length - 1 && (
                <TimelineConnector />
              )}
            </TimelineSeparator>

            <TimelineContent>
              <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6">
                  {event.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {event.date}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
}