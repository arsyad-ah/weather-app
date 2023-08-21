import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface ContainedButtonsProps {
    onClick: () => void;
  }

const ContainedButtons: React.FC<ContainedButtonsProps> = ({onClick}) => {
  return (
    <Stack direction="row" spacing={4} justifyContent="center">
      <Button variant="contained" onClick={onClick}>
        Search
      </Button>
    </Stack>
  );
}

export default ContainedButtons