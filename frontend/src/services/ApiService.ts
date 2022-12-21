import { AxiosInstance } from 'axios';
import api from './api';
import { ICreateUserDTO, IGetAllOrdersDTO, IGetAllCategoriesDTO } from './dtos';

interface QueryParams {
  [key: string]: string | number | boolean;
}

export class ApiService {
  private api: AxiosInstance = api;

  public async createUser(user: ICreateUserDTO): Promise<void> {
    await this.api.post('/user', user);
  }

  public async getOrders(params?: QueryParams): Promise<IGetAllOrdersDTO> {
    const { data } = await this.api.get(
      `/orders/${params && Object.keys(params).length > 0 ? '?' : ''}${
        params &&
        Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join('&')
      }`,
    );
    return data;
  }

  public async getCategories(params?: QueryParams): Promise<IGetAllCategoriesDTO> {
    const { data } = await this.api.get(
      `/categories/${params && Object.keys(params).length > 0 ? '?' : ''}${
        params &&
        Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join('&')
      }`,
    );
    return data;
  }
}