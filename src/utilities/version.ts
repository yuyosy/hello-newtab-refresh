export type ShortVersionString = `${number}.${number}`;
export type VersionString = `${number}.${number}.${number}`;

export const compareVersions = <T extends VersionString | ShortVersionString>(
  version1: T,
  version2: T,
): -1 | 0 | 1 => {
  const parts1 = version1.split('.').map(Number);
  const parts2 = version2.split('.').map(Number);

  for (let i = 0; i < Math.min(parts1.length, parts2.length); i++) {
    const part1 = parts1[i];
    const part2 = parts2[i];

    if (part1 < part2) {
      return -1;
    } else if (part1 > part2) {
      return 1;
    }
  }
  return 0;
};
