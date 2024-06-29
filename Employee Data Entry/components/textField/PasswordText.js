import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function PasswordText(props) {

  const handleChange = (event) => {
    props.parentCallback(event.target.value);
  };

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
          id="outlined-required"
          label={props.atribute}
          type="password"
          autoComplete="current-password"
          onChange={handleChange}
          placeholder={props.placeh}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& > fieldset": {
                borderColor: "white",
              },
              "& > .MuiOutlinedInput-input": {
                color: "white",
              },
            },
            "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": {
                borderColor: "white"
              }
            },
            "& label": {color: "white"},
            "& multilineColor": {color: "white"},

            color: "rgb(200, 132, 39)",
            backgroundColor: "rgba(0,0,0,0.500)"

          }}
        />
      </div>

    </Box>
  );
}
