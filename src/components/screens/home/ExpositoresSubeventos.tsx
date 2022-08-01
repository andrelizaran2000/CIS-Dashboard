// Modules
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

// Components
import CustomSelect from "../../forms/CustomSelect";
import PaperFormContainer from "../../forms/PaperFormContainer";

// Styles
import { allWidth } from "../../containers/ColorContainer";

// Hooks
import useForm from "../../../hooks/useForm";
import useSelectors from "../../../hooks/useSelectors";

// Types
import { ExpositoresSubeventosBody } from "../../../types/expositoresSubeventos";

const initialStateBlank:ExpositoresSubeventosBody = {
  eventId:0,
  expositorId:0
}

export default function ExpositoresSubeventos() {

  // Selectors
  const { register } = useSelectors();
  const { expositores, subeventos } = register;

  // Options
  const [subeventosMapped, setSubEventos] = useState<{ value: number; label: string;}[]>([]);
  const [expositoresMapped, setExpositores] = useState<{ value: number; label: string;}[]>([]);

  useEffect(() => {
    mapValues();
  }, []);

  function mapValues () {
    const expositoresOptions = expositores.map(({ id, firstName, lastName }) => ({ value:Number(id), label:`${firstName} ${lastName}` }));
    setExpositores(expositoresOptions); 
    const subeventosOptions = subeventos.map(({ id, name }) => ({ value:Number(id), label:name }));
    setSubEventos(subeventosOptions);     
  }

  const { 
    formValues, 
    handleSelect 
  } = useForm(initialStateBlank);
  const expositoresSubeventosFormValues = formValues as ExpositoresSubeventosBody;

  return (
    <Grid item xs={12} lg={6} sx={allWidth}>
      <PaperFormContainer 
        isLoading={false}
        primaryButtonText='Agregar' 
        title='Agregar exponente a subevento'
        onSubmit={() => {}}
        cleanForm={() => {}}
      >
        <CustomSelect
          options={subeventosMapped}
          label='Subevento a agregar ponente'
          inputName='eventId'
          value={expositoresSubeventosFormValues.eventId}
          handleSelect={handleSelect}
        />
        <CustomSelect
          options={expositoresMapped}
          label='Tipo de expositores'
          inputName='expositorId'
          value={expositoresSubeventosFormValues.expositorId}
          handleSelect={handleSelect}
        />
      </PaperFormContainer>
    </Grid>
  )
}
