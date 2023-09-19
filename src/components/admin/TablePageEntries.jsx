import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

const buttons = [
  { value: 'left', label: '10' },
  { value: 'center', label: '20' },
  { value: 'right', label: '50' },
];

export default function ToggleButtonSizes() {
  const [alignment, setAlignment] = React.useState('left');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <Stack spacing={2} alignItems="center">
      <ToggleButtonGroup size="small" {...control} aria-label="Small sizes">
        {buttons.map((button) => (
          <ToggleButton
            key={button.value}
            value={button.value}
            style={{
              backgroundColor: alignment === button.value ? '#2C8AD3' : 'transparent',
              borderRadius: 3,
              overflow: 'hidden',
              border: 'none',
              marginLeft: '5px',
              marginRight: '5px',
            }}
          >
            <Typography
              style={{
                color: alignment === button.value ? 'white' : '#848484',
                fontSize: 14,
                fontFamily: 'Inter',
                fontWeight: '500',
                wordWrap: 'break-word',
              }}
            >
              {button.label}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
