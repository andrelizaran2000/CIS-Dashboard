import React from 'react'
import { Stack, Switch, Typography } from '@mui/material';

type Props = {
  label:string;
  value:boolean;
  handleSwitch:(inputName:string, value:boolean) => void;
  inputName:string;
}

export default function CustomSwitch ({ label, value, inputName, handleSwitch }:Props) {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Typography>{label}</Typography>
      <Switch 
        onChange={() => handleSwitch(inputName, !value)} 
        checked={value}
      />
    </Stack>
  )
}
