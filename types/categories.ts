export type Category = {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
};
