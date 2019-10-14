import { useState } from 'react';

/*
    Custom hook to consolidate form state management.
    Depends on each input having a 'name' prop.
*/

export const useForm = (intialState: any) => {
  const [values, setValues] = useState<any>(intialState);

  return [values, (e: any) => setValues({ ...values, [e.target.name]: e.target.value })];
};
