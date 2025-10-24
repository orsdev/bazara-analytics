export const generateColors = (index: number) => {
  const goldenAngle = 137.508; // ensures even hue distribution
  const hue = (index * goldenAngle) % 360;

  // Change saturation & lightness based on index to make colors less similar
  const saturation = 60 + ((index * 13) % 30); // varies between 60–90%
  const lightness = 40 + ((index * 17) % 30); // varies between 40–70%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
