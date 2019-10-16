export default ({ x = 'left', y = 'top' }: { x?: 'left' | 'right'; y?: 'top' | 'bottom' }) => `
  position: absolute;
  ${x}: 0;
  ${y}: 0;
`;
