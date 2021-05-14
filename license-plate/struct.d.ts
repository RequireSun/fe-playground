export type NumberCollect = {
  [withoutNumber: string]: [string, string][];
};

export type NumberCalc = {
  [withoutNumber: string]: {
    whole?: boolean;
    available?: [number, number][];
  };
};
