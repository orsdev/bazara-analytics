import { generateColors } from '../generate-colors';

describe('generate-colors', () => {
  describe('generateColors', () => {
    it('generates HSL color string', () => {
      const result = generateColors(0);
      expect(result).toMatch(/^hsl\(\d+(\.\d+)?, \d+%, \d+%\)$/);
    });

    it('generates different colors for different indices', () => {
      const color1 = generateColors(0);
      const color2 = generateColors(1);
      const color3 = generateColors(2);

      expect(color1).not.toBe(color2);
      expect(color2).not.toBe(color3);
      expect(color1).not.toBe(color3);
    });

    it('generates consistent color for same index', () => {
      const color1 = generateColors(5);
      const color2 = generateColors(5);

      expect(color1).toBe(color2);
    });

    it('generates color with hue between 0 and 360', () => {
      const result = generateColors(10);
      const hueMatch = result.match(/hsl\((\d+(\.\d+)?),/);
      const hue = parseFloat(hueMatch![1]);

      expect(hue).toBeGreaterThanOrEqual(0);
      expect(hue).toBeLessThan(360);
    });

    it('generates color with saturation between 60 and 90', () => {
      const result = generateColors(5);
      const satMatch = result.match(/hsl\(\d+(\.\d+)?, (\d+)%,/);
      const saturation = parseInt(satMatch![2]);

      expect(saturation).toBeGreaterThanOrEqual(60);
      expect(saturation).toBeLessThan(90);
    });

    it('generates color with lightness between 40 and 70', () => {
      const result = generateColors(5);
      const lightMatch = result.match(/hsl\(\d+(\.\d+)?, \d+%, (\d+)%\)/);
      const lightness = parseInt(lightMatch![2]);

      expect(lightness).toBeGreaterThanOrEqual(40);
      expect(lightness).toBeLessThan(70);
    });

    it('handles index 0', () => {
      const result = generateColors(0);
      expect(result).toMatch(/^hsl\(/);
    });

    it('handles large indices', () => {
      const result = generateColors(1000);
      expect(result).toMatch(/^hsl\(/);
    });

    it('generates evenly distributed hues using golden angle', () => {
      const colors = Array.from({ length: 10 }, (_, i) => generateColors(i));
      const hues = colors.map((color) => {
        const match = color.match(/hsl\((\d+(\.\d+)?),/);
        return parseFloat(match![1]);
      });

      // Check that hues are distributed
      const uniqueHues = new Set(hues.map((h) => Math.floor(h)));
      expect(uniqueHues.size).toBeGreaterThan(5);
    });

    it('varies saturation based on index', () => {
      const color1 = generateColors(0);
      const color2 = generateColors(10);

      const sat1 = parseInt(color1.match(/hsl\(\d+(\.\d+)?, (\d+)%,/)![2]);
      const sat2 = parseInt(color2.match(/hsl\(\d+(\.\d+)?, (\d+)%,/)![2]);

      // Saturations should be different
      expect(sat1).not.toBe(sat2);
    });

    it('varies lightness based on index', () => {
      const color1 = generateColors(0);
      const color2 = generateColors(10);

      const light1 = parseInt(
        color1.match(/hsl\(\d+(\.\d+)?, \d+%, (\d+)%\)/)![2]
      );
      const light2 = parseInt(
        color2.match(/hsl\(\d+(\.\d+)?, \d+%, (\d+)%\)/)![2]
      );

      // Lightness values should be different
      expect(light1).not.toBe(light2);
    });

    it('generates valid CSS HSL color', () => {
      const result = generateColors(3);
      // Should be parseable as CSS color
      expect(result).toMatch(/^hsl\(\d+(\.\d+)?, \d+%, \d+%\)$/);
    });
  });
});
