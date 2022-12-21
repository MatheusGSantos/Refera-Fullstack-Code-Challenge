import { ICategory } from '~/utils/Category/CategoryDTOS';
import { IOrder } from '~/utils/Order/OrderDTOS';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface IResultInfo {
  id: string;
  ObjectName: string;
  price: number;
  description: string;
  image: string;
  OwnerName: string;
  // eslint-disable-next-line camelcase
  owner_id: string;
  email: string;
  category: string;
}

export interface NewObjectDTO {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export type IResultsFromSearchDTO = IResultInfo[];

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
