import React from 'react'
import { Stack, Switch, Typography } from '@mui/material';

type Props = {
  label:string;
  value:boolean;
  handleSwitch:(inputName:string, value:boolean) => void;
  inputName:string;
  disabled:boolean;
}

export default function CustomSwitch ({ label, value, inputName, handleSwitch, disabled }:Props) {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Typography>{label}</Typography>
      <Switch 
        onChange={() => handleSwitch(inputName, !value)} 
        checked={value}
        disabled={disabled}
      />
    </Stack>
  )
}
