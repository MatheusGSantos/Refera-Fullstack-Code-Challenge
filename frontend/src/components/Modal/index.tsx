import { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from 'moment';
import './styles.css';
import { useCategories } from '~/hooks/categories';

interface OpenNewOrderModalProps {
  open: boolean;
  onClose: () => void;
}

interface IFormInputs {
  contactName: string;
  contactPhone: string;
  realStateAgency: string;
  orderDescription: string;
  company: string;
  category: string;
  deadline: Date | null;
}

const phoneRegExp = /^\(\d{2}\)\d{5}-\d{4}$/;

const schema = yup
  .object({
    contactName: yup.string().required(),
    contactPhone: yup.string().matches(phoneRegExp).required(),
    realStateAgency: yup.string().required(),
    orderDescription: yup.string(),
    company: yup.string().required(),
    category: yup.string().required(),
    deadline: yup.date().nullable().required(),
  })
  .required();

const boxStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '94%',
  maxWidth: 900,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export function OpenNewOrderModal(props: OpenNewOrderModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const { categories } = useCategories();

  const formData = watch();

  console.info(formData);
  console.info(moment().format('DD/MM/YYYY'));

  const onSubmit = (data: IFormInputs) => console.log(data);

  return (
    <Modal {...props}>
      <Box sx={boxStyles}>
        <Typography id='modal-modal-title' variant='h6' component='h1' sx={{ mb: 2 }}>
          Order Details
        </Typography>
        <form className='_form-root' onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid2 container spacing={2}>
            <Grid2 xs={12} sm={6}>
              <TextField
                id='Contact Name'
                required
                label='Contact Name'
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('contactName')}
              />
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <TextField
                id='Contact Phone'
                required
                label='Contact Phone'
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('contactPhone')}
              />
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <TextField
                id='Order Description'
                label='Order Description'
                defaultValue={''}
                multiline
                minRows={3}
                maxRows={5}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('orderDescription')}
              />
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <TextField
                id='Company'
                label='Company'
                required
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('company')}
              />
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='category-label' required>
                  Category
                </InputLabel>
                <Select
                  id='Category'
                  labelId='category-label'
                  label='Category'
                  required
                  fullWidth
                  {...register('category')}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <TextField
                id='Deadline'
                label='Deadline'
                type='date'
                required
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { min: moment().format('YYYY-MM-DD') },
                }}
                {...register('deadline')}
              />
            </Grid2>
            <Grid2 xs={12} display='flex' justifyContent='flex-end'>
              <Button variant='contained' size='large' type='submit' sx={{ p: '8px 48px' }}>
                Save
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Modal>
  );
}
