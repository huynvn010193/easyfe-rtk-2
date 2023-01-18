import { Box, Button, CircularProgress } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import { selectCityOption } from 'features/city/citySlice';
import { Student } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Alert from '@material-ui/lab/Alert';
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

const schema = yup
  .object({
    name: yup
      .string()
      .required('Please enter name')
      .test('two-words', 'Please enter at least two words', (value) => {
        if (!value) return true;
        // Cắt chuỗi thành mảng
        const parts = value?.split(' ') || [];
        // Filter để khác các giá trị empty, undefined ... ko tính, CHỉ tính chỗ rỗng
        return parts.filter((x) => !!x).length >= 2;
      }),
    age: yup
      .number()
      .positive('Please enter a positive number')
      .min(18, 'Min is 18')
      .max(60, 'Max is 60')
      .integer('Please enter an integer')
      .required('Please enter age')
      .typeError('Please enter valid number'),
    mark: yup
      .number()
      .positive('Please enter a positive number')
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required('Please enter mark')
      .typeError('Please enter valid number'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male or fenale')
      .required('Please select gender'),
    city: yup.string().required('Please select city'),
  })
  .required();

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOption);
  const [error, setError] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (formValues: Student) => {
    // Nếu trong quá trình lỗi thì sẽ hiển thị ở đây
    try {
      // Clear previous submission error
      setError('');
      await onSubmit?.(formValues);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <Box maxWidth={350}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField name="gender" control={control} label="Gender" options={genderArr} />

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}

        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />

        {/* Handle error BE */}
        {error && <Alert severity="error">{error}</Alert>}
        <Box>
          <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
