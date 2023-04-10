import { useEffect, useMemo, useState } from "react";

export const useForm = (initialValue = {}, formValidations = {}) => {
  
    const [formState, setFormState] = useState(initialValue);
    const [formValidaton, setformValidaton] = useState({});

    useEffect(() => {
      createValidators();
   
    }, [formState]);

    useEffect(() => {
      setFormState(initialValue)

    }, [initialValue])
    

    const isFormValid = useMemo(() => {
      

      for (const formValue of Object.keys(formValidaton)) {
        
        if(formValidaton[formValue] !== null) return false;

      }

      return true;

    }
    , [formValidaton]);
    

    const onInputChange = ({target}) => {
        
        const {name,value} = target;

        setFormState({
            //!Desestructuramos el formstate para mantener todos los valores del form
            ...formState,
            //!Propiedades computadas en los objetos ( [elegimos el dato] y en el value le cambiamos el valor a ese dato )
            //*Coge el valor del nombre y lo reemplaza por el nuevo
            [name]: value

        });


    }

    const onResetForm = () => {
        setFormState(initialValue);
    }


    const createValidators = () => {

      const formCheckedValues = {};
      
      //Esto sirve para coger todos los nombres de ese objeto //! Object.keys
      for (const formField of Object.keys(formValidations)) {
        
        //Poner variables a las 2 posiciones del array //![fn, errorMessage] 
        const [fn, errorMessage] = formValidations[formField];
        //Compruebo que se cumple las funciones que hemos definido anteriormente y asignamos el nombre +Valid a cada funcion
        formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
      }

      setformValidaton(formCheckedValues);

    }


  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidaton,
    isFormValid

  }
}
