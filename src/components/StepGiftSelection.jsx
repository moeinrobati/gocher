import { Box, Typography, TextField, Button } from "@mui/material";

export default function StepGiftSelection({ gift, setGift, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <Typography sx={{ mb: 2 }}>Enter the gift name:</Typography>
      <TextField
        variant="outlined"
        size="small"
        value={gift}
        onChange={(e) => setGift(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        inputProps={{ style: { color: "white" } }}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Gift
      </Button>
    </form>
  );
}
