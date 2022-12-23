import { ICategory } from '~/utils/Category/CategoryDTOS';
import { IOrder } from '~/utils/Order/OrderDTOS';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface RequestWithPagination {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface IGetAllOrdersDTO extends RequestWithPagination {
  results: IOrder[];
}

export interface IGetAllCategoriesDTO extends RequestWithPagination {
  results: ICategory[];
}

export interface IOpenNewOrderDTO {
  category: number;
  contact: string;
  agency: string;
  company: string;
  deadline: string;
  description: string;
}
