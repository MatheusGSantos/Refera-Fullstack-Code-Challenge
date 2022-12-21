export interface OrderData {
  id: number;
  category: string;
  contact: string;
  agency: string;
  company: string;
  deadline: Date;
}

interface OrderHeadCell {
  id: keyof OrderData;
  label: string;
  type: 'string' | 'number' | 'date';
  align?: 'right' | 'left' | 'center';
}

export const orderHeadCells: readonly OrderHeadCell[] = [
  {
    id: 'id',
    type: 'number',
    label: 'Id',
  },
  {
    id: 'category',
    type: 'string',
    label: 'Category',
  },
  {
    id: 'contact',
    type: 'string',
    label: 'Contact',
  },
  {
    id: 'agency',
    type: 'string',
    label: 'Agency',
  },
  {
    id: 'company',
    type: 'string',
    label: 'Company',
  },
  {
    id: 'deadline',
    type: 'date',
    label: 'Deadline',
  },
];
