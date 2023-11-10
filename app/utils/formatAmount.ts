export const FormatAmount = (x: string | number) =>
  x.toString().replaceAll(/\B(?=(\d{3})+(?!\d))/g, ",");
