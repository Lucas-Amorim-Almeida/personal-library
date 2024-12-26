export type UserParamsType = {
  username: string;
  password: string;
  personal_data?: object;
  contact?: object;
  adress?: object;
  created_at?: Date;
  updated_at?: Date;
};

export type AdressParamsType = {
  street: string;
  number: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  created_at?: Date;
  updated_at?: Date;
};
