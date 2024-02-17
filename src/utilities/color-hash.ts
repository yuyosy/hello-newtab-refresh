export const colorHashString = (input: string): number => {
  //   let hash = 0;
  //   for (let i = 0; i < input.length; i++) {
  //     hash = (hash << 5) - hash + input.charCodeAt(i);
  //     hash |= 0; // Convert to 32-bit integer
  //   }
  //   // Map the hash value to the range 0-16777215 (0x000000-0xFFFFFF)
  //   const mappedHash = Math.abs(hash) % 16777216;
  //   const hexString = mappedHash.toString(16).toUpperCase();
  //   console.log(hexString);
  //   return hexString.padStart(6, '0');

  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  // Map the hash value to the range 0-360 for hue
  const hue = Math.abs(hash) % 361;

  // Set lightness and saturation to constant values
  //   const lightness = 50; // 50% lightness
  //   const saturation = 50; // 50% saturation

  return hue;

  // Convert HLS values to RGB
  //   const rgb = hslToRgb(hue, saturation, lightness);

  //   // Convert RGB values to hexadecimal color code
  //   const hexString = rgbToHexString(rgb[0], rgb[1], rgb[2]);

  //   return hexString;
};
