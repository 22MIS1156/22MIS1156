'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, List, ListItem, Typography,
  CircularProgress, ToggleButton,
  ToggleButtonGroup
} from '@mui/material';

const TOKEN = "PASTE_YOUR_ACCESS_TOKEN_HERE";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    )
    .then(res => {
      setData(res.data.notifications);
      setFiltered(res.data.notifications);
    })
    .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!filter) setFiltered(data);
    else setFiltered(data.filter(n => n.Type === filter));
  }, [filter, data]);

  if (loading) return <CircularProgress />;

  return (
    <Box p={3}>
      <Typography variant="h4">Campus Notifications</Typography>

      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, v) => setFilter(v)}
        sx={{ my: 2 }}
      >
        <ToggleButton value={null}>All</ToggleButton>
        <ToggleButton value="Placement">Placement</ToggleButton>
        <ToggleButton value="Result">Result</ToggleButton>
        <ToggleButton value="Event">Event</ToggleButton>
      </ToggleButtonGroup>

      <List>
        {filtered.map(n => (
          <ListItem key={n.ID} divider>
            <b>[{n.Type}]</b>&nbsp;{n.Message}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}