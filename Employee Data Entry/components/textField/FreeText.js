import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FreeText(props) {

  const [valor, setvalor] = React.useState(""); //Valor de el defval

  React.useEffect( async () => {
    if(props.defval !== undefined && props.defval !== null) {
      setvalor(props.defval);
    }
    else {
      setvalor("");
    }
  }, [props.defval]);
  
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
          placeholder={props.placeh}
          onChange={handleChange}
          value={valor}
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
