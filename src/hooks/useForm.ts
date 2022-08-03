// Modules
import React, { useState } from 'react';

export default function useForm (initialState:any) {

  const [formValues, setFormValues] = useState(initialState);

  function handleFormValues (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void {
    setFormValues({ ...formValues, [e.target.name]:e.target.value });
  }

  function handleSwitch (inputName:string, value:boolean) {
    setFormValues({ ...formValues, [inputName]:value });
  }

  function handleImageSelector (inputName:string, value:boolean) {
    setFormValues({ ...formValues, [inputName]:value });
  }

  function handleSelect (inputName:string, value:string) {
    setFormValues({ ...formValues, [inputName]:value });
  }

  return {
    formValues,
    setFormValues, 
    handleFormValues,
    handleSwitch,
    handleImageSelector,
    handleSelect,
  }

}
