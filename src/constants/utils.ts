export const getRandomColor = () => {
  // Generate random RGB color values
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Return the color in the format '#RRGGBB'
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};

export const incColor = ({ r, g , b}: {r: number, g: number, b: number}) => {
    // Generate random RGB color values
    // const r = Math.floor(Math.random() * 256);
    // const g = Math.floor(Math.random() * 256);
    // const b = Math.floor(Math.random() * 256);
  
    // Return the color in the format '#RRGGBB'
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  };
