import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ReadOnlyText(props) {

  const [valor, setvalor] = React.useState(""); //Valor de el defval
  const [color, setcolor] = React.useState("rgba(0,0,0,0.500)");

  React.useEffect(() => {
    if(props.defval !== undefined && props.defval !== null) {
      setvalor(props.defval);
    }
    else {
      setvalor("");
    }

  }, [props.defval]);

  React.useEffect(() => {
    if(props.color !== undefined && props.color !== null) {
      setcolor(props.color);
    }
    else {
      setcolor('rgba(0,0,0,0.500)');
    }

  }, [props.color]);

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
          id="outlined-read-only-input"
          label={props.atribute}
          value= {props.defval}
          InputProps={{
            readOnly: true,
          }}

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
            backgroundColor: color

          }}
        />
      </div>

    </Box>
  );
}
