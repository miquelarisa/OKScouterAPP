import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import styled from '@emotion/styled';
import { FormatColorText } from '@mui/icons-material';


export default function SelectText(props) {

  const currencies = props.options;

  const [currency, setCurrency] = React.useState(props.defval);

  React.useEffect(() => {
    
    setCurrency(props.defval)

  }, [props.defval]);

  const handleChange = (event) => {
    setCurrency(event.target.value);
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
          id="outlined-select-currency"
          select
          label={props.atribute}
          value={currency}
          onChange={handleChange}
          //helperText="Please select your currency"

          sx={{
            "& .MuiOutlinedInput-root": {
              "& > fieldset": {
                borderColor: "white",
              },
              "& > .MuiOutlinedInput-input": {
                color: "white",
              },
              "& > .MuiSvgIcon-root": {
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
        
          variant="outlined"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

    </Box>
  );
}