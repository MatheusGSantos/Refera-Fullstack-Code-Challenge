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
import { ApiService } from '~/services/ApiService';
import { toast } from 'react-toastify';
import { IOrder } from '~/utils/Order/OrderDTOS';

interface OpenNewOrderModalProps {
  open: boolean;
  onClose: () => void;
}

interface DetailsModalProps extends OpenNewOrderModalProps {
  order: IOrder;
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
    contactName: yup.string().required("Contact Name can't be empty"),
    contactPhone: yup
      .string()
      .matches(phoneRegExp, 'Phone pattern: (99)99999-9999')
      .required('Contact Phone required'),
    realStateAgency: yup.string().required('Agency required'),
    orderDescription: yup.string(),
    company: yup.string().required('Company required'),
    category: yup.string().required('Category required'),
    deadline: yup.date().nullable().required('Deadline required'),
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
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const { categories } = useCategories();
  const api = new ApiService();

  const onSubmit = (data: IFormInputs) => {
    console.log({
      agency: data.realStateAgency,
      category: categories.find((category) => category.name === data.category)?.id ?? 0,
      company: data.company,
      contact: `${data.contactName} ${data.contactPhone}`,
      description: data.orderDescription,
      deadline: moment(data.deadline).format('DD/MM/YYYY'),
    });
    // post info to backend
    toast.promise(
      api.openNewOrder({
        agency: data.realStateAgency,
        category: categories.find((category) => category.name === data.category)?.id ?? 0,
        company: data.company,
        contact: `${data.contactName} ${data.contactPhone}`,
        description: data.orderDescription,
        deadline: moment(data.deadline).format('YYYY-MM-DD'),
      }),
      {
        pending: 'Opening new order...',
        success: 'Order opened successfully',
        error: {
          render({ data: error }: any) {
            console.info(error);
            return `Error: ${error?.response?.data?.message}`;
          },
        },
      },
    );
  };

  return (
    <Modal
      {...props}
      onClose={() => {
        reset();
        props.onClose();
      }}
      keepMounted={false}
    >
      <Box sx={boxStyles}>
        <Typography
          id='modal-modal-title'
          variant='h4'
          component='h1'
          fontWeight={700}
          sx={{ mb: 5 }}
        >
          New Order Details
        </Typography>
        <form className='_form-root' onSubmit={handleSubmit(onSubmit)} noValidate>
          <p style={{ fontSize: '10px' }}>{JSON.stringify(errors.contactPhone?.message)}</p>
          <Grid2 container spacing={2}>
            <Grid2 xs={12} sm={3}>
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
            <Grid2 xs={12} sm={3}>
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
                id='Agency'
                required
                label='Real State Agency'
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('realStateAgency')}
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
                  defaultValue={''}
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

export function OrderDetailsModal({ onClose, open, order }: DetailsModalProps) {
  return (
    <Modal onClose={onClose} open={open} keepMounted={false}>
      <Box sx={boxStyles}>
        <Typography
          id='modal-modal-title'
          variant='h4'
          component='h1'
          fontWeight={700}
          sx={{ mb: 3 }}
        >
          Order Details
        </Typography>

        <Grid2 container spacing={4}>
          <Grid2 xs={12} sm={3}>
            <Typography variant='h6' component='h3' color={'#3e3e3e'}>
              Contact Name
            </Typography>
            <Typography variant='body1' component='p' color={'#727272'}>
              {order.contact ? order.contact.split(' ')[0] : 'No name'}
            </Typography>
          </Grid2>
          <Grid2 xs={12} sm={3}>
            <Typography variant='h6' component='h3' color={'#3e3e3e'}>
              Contact Phone
            </Typography>
            <Typography variant='body1' component='p' color={'#727272'}>
              {order.contact ? order.contact.split(' ')[1] : 'No phone'}
            </Typography>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Typography variant='h6' component='h3' color={'#3e3e3e'}>
              Real State Agency
            </Typography>
            <Typography variant='body1' component='p' color={'#727272'}>
              {order.agency}
            </Typography>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Typography variant='h6' component='h3' color={'#3e3e3e'}>
              Order Description
            </Typography>
            <Typography variant='body1' component='p' color={'#727272'}>
              {order?.description?.length > 0 ? order.description : 'No description'}
            </Typography>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Typography variant='h6' component='h3' color={'#3e3e3e'}>
              Company
            </Typography>
            <Typography variant='body1' component='p' color={'#727272'}>
              {order.company}
            </Typography>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Typography variant='h6' component='h3' color={'#3e3e3e'}>
              Category
            </Typography>
            <Typography variant='body1' component='p' color={'#727272'}>
              {order.category}
            </Typography>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Typography variant='h6' component='h3' color={'#3e3e3e'}>
              Deadline
            </Typography>
            <Typography variant='body1' component='p' color={'#727272'}>
              {order.deadline}
            </Typography>
          </Grid2>
        </Grid2>
      </Box>
    </Modal>
  );
}
