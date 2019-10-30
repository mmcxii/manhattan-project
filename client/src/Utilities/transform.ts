const transform = <T>(method: (input: T) => string, value: T): string => {
  return `transform: ${method(value)};`;
};

const scale = (factor: number): string => `scale(${factor})`;

export const expand = (factor = 1.1) => transform(scale, factor);
export const shrink = (factor = 0.9) => transform(scale, factor);

export default { expand, shrink };
