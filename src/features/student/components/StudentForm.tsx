import { Box, Button } from '@material-ui/core';
import { InputField, RadioGroupField } from 'components/FormFields';
import { Student } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const genderArr = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
];

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const { control, handleSubmit } = useForm<Student>({
    defaultValues: initialValues,
  });

  const handleSubmitForm = (formValues: Student) => {
    console.log('Submit', formValues);
  };

  return (
    <Box maxWidth={350}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField name="gender" control={control} label="Gender" options={genderArr} />

        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        <InputField name="city" control={control} label="City" />
        <Box>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
