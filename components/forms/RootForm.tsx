import * as React from 'react';
import { Formik, FormikActions, FormikProps, Form, Field, FieldProps } from 'formik';

interface MyFormValues {
  firstName: string;
}

const RootForm: React.FunctionComponent<{formSceleton:HTMLFormElement}> = () => {
  return (
    <div>
      <h1>My Example</h1>
      <Formik
        initialValues={{ firstName: '' }}
        onSubmit={(values: MyFormValues, actions: FormikActions<MyFormValues>) => {
            console.log({ values, actions });
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false)
         }}
        render={(formikBag: FormikProps<MyFormValues>) => (

        )}
      />
    </div>
  );
};

export default RootForm