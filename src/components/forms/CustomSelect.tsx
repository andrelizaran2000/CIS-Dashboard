// Modules
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

type Props = {
  options:{ label:string; value:string }[];
  label:string;
  inputName:string;
  value:string;
  values?:{ value:string, label:string }[];
  inputNameValues?:string;
  handleSelect?: HandleSelect | undefined;
  handleSelectArray?: HandleSelectArray | undefined;
  disabled:boolean;
}

type HandleSelect = (inputName:string, value:string) => void;

type HandleSelectArray = (inputName:string, inputNameValues:string, selectedValueWithAllInformation:{ value:string, label:string }) => void;

export default function CustomSelect ({ label, options, inputName, inputNameValues = '', value, handleSelect, handleSelectArray, disabled }:Props) {

  function handleSelectFunctions (e:SelectChangeEvent<string>) {
    const selectedValue = e.target.value;
    const filteredOptions = options.filter(({ value }) => value === selectedValue);
    const selectedValueWithAllInformation = filteredOptions[0];
    if (handleSelect !== undefined) handleSelect(inputName, selectedValueWithAllInformation.value)
    if (handleSelectArray !== undefined) handleSelectArray(inputName, inputNameValues, selectedValueWithAllInformation);
  }

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select 
        label={label} 
        value={value} 
        name={inputName} 
        onChange={handleSelectFunctions}
        disabled={disabled}
      >
        {options.map(({ label, value }, index) => <MenuItem value={value} key={index}>{label}</MenuItem>)}
      </Select>
    </FormControl>
  )
}

