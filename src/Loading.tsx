import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
  return (
    <Box sx={{ paddingTop: '120px', textAlign: 'center' }}>
      <CircularProgress data-testid={'progressbar'} />
    </Box>
  );
}

export default Loading;
