import Box from "./Box";

type ISeparatorProperty = {
  height?: number;
};
export const Separator = ({ height = 16 }: ISeparatorProperty) => (
  <Box height={height} />
);
