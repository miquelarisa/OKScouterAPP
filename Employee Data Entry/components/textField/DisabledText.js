import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function DisabledText(props) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: props.w },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          disabled
          id="outlined-disabled"
          label={props.atribute}
          defaultValue={props.defval}
        />
      </div>

    </Box>
  );
}
