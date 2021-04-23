export const leanOptions = { autopopulate: true, virtuals: true };
export const round = (value: number, decimals: number): number => {
  return Number(`${Math.ceil(+`${value}e${decimals}`)}e-${decimals}`);
};