export type InputData<T> = {
  value: T;
  isError: boolean;
  errorMessage: string;
};

export type InputDataSet<K extends string, T> = {
  [key in K]: InputData<T>;
};
