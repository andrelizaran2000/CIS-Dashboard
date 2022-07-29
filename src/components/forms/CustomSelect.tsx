// Modules
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type Props = {
  options:{ label:string; value:number }[];
  label:string;
  inputName:string;
  value:number;
  handleSelect:(inputName:string, value:number) => void;
}

export default function CustomSelect ({ label, options, inputName, value, handleSelect}:Props) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select 
        label={label} 
        value={value} 
        name={inputName} 
        onChange={(e) => handleSelect(inputName, Number(e.target.value))}
      >
        {options.map(({ label, value }, index) => <MenuItem value={value} key={index}>{label}</MenuItem>)}
      </Select>
    </FormControl>
  )
}
