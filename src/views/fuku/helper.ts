import { KuroData } from "@/contexts/KuroContext";
import { formatEther } from "ethers";

export const colors = [
  "#4DFFFF", // Blue neon (từ #33CCFF)
  "#FF4DFF", // Magenta neon (từ #FF00FF)
  "#4DFF4D", // Green neon (từ #00FF00)
  "#FF4DB3", // Ruby neon (từ #FF0077)
  "#FF80FF", // Bright magenta (từ #FF33FF)
  "#80FFFF", // Aqua neon (từ #33FFCC)
  "#FF4DE6", // Deep pink (từ #FF0099)
  "#4DFFE6", // Mint neon (từ #00FF99)
  "#FF99FF", // Light magenta (từ #FF66FF)
  "#99FFFF", // Sky cyan (từ #66FFFF)
  "#FF4DCC", // Vivid pink (từ #FF0088 // Purple neon (từ #CC00FF)
  "#4DFF99", // Lime neon (từ #00FF66)
  "#FF80CC", // Rose neon (từ #FF3399 // Candy pink (từ #FF00AA)
  "#4DFF80", // Acid green (từ #00FF33)
  "#FFAAFF", // Pastel magenta (từ #FF55FF)
  "#AAFFFF", // Pale cyan (từ #55FFFF)
  "#FF4D99", // Pink neon (từ #FF0066 // Violet neon (từ #AA00FF)
  "#4DFFAA", // Spring green (từ #00FF55) // Ice cyan (từ #22FFFF)
  "#FF4D80", // Crimson neon (từ #FF0044)
  "#4DFFD4", // Jade neon (từ #00FF88)
  "#FFB3FF", // Lilac neon (từ #FF77FF)
  "#B3FFFF", // Crystal cyan (từ #77FFFF // Hot pink (từ #FF00CC)
  "#FF4D80", // Scarlet neon (từ #FF0033) // Turquoise neon (từ #00FFBB)
  "#FFE6FF", // Bubblegum pink (từ #FF99FF)
  "#E6FFFF", // Frost cyan (từ #99FFFF)
  "#FF4D66", // Cherry neon (từ #FF0022) // Lagoon neon (từ #00FFDD)
  "#FFF0FF", // Lavender neon (từ #FFBBFF)
  "#F0FFFF", // Mist cyan (từ #BBFFFF)
  "#FF4D4D", // Blood neon (từ #FF0011) // Ocean neon (từ #00FFEE)
  "#FFF0FF", // Orchid neon (từ #FFDDFF)
  "#E6FFE6", // Pale mint (từ #CCFFCC)
  "#FF4D4D", // Pure red neon (từ #FF0000)
  "#4DFF66", // Forest neon (từ #00FF11)
  "#FFF0FF", // Blush neon (từ #FFEEFF)
  "#F0FFF0", // Ghost mint (từ #EEFFEE)
  "#FF80AA", // Coral neon (từ #FF0055)
  "#66FF4D", // Toxic green (từ #11FF00) // Blue neon (từ #33CCFF // Magenta neon (từ #FF00FF) // Bright magenta (từ #FF33FF) // Aqua neon (từ #33FFCC)
  "#FF4D99", // Pink neon (từ #FF0066 // Violet neon (từ #AA00FF)
  "#4DFFAA", // Spring green (từ #00FF55) // Flamingo pink (từ #FF22AA) // Cyan neon (từ #00FFFF) // Ice cyan (từ #22FFFF)
  "#FF4D80", // Crimson neon (từ #FF0044)
  "#4DFFD4", // Jade neon (từ #00FF88)
  "#FFB3FF", // Lilac neon (từ #FF77FF)
  "#B3FFFF", // Crystal cyan (từ #77FFFF // Hot pink (từ #FF00CC)
  "#FF4D80", // Scarlet neon (từ #FF0033) // Turquoise neon (từ #00FFBB)
  "#FFE6FF", // Bubblegum pink (từ #FF99FF)
  "#E6FFFF", // Frost cyan (từ #99FFFF)
  "#FF4D66", // Cherry neon (từ #FF0022) // Lagoon neon (từ #00FFDD)
  "#FFF0FF", // Lavender neon (từ #FFBBFF)
  "#F0FFFF", // Mist cyan (từ #BBFFFF)
  "#FF4D4D", // Blood neon (từ #FF0011) // Ocean neon (từ #00FFEE)
  "#FFF0FF", // Orchid neon (từ #FFDDFF)
  "#E6FFE6", // Pale mint (từ #CCFFCC)
  "#FF4D4D", // Pure red neon (từ #FF0000)
  "#4DFF66", // Forest neon (từ #00FF11)
  "#FFF0FF", // Blush neon (từ #FFEEFF)
  "#F0FFF0", // Ghost mint (từ #EEFFEE)
  "#FF80AA", // Coral neon (từ #FF0055)
  "#66FF4D", // Toxic green (từ #11FF00)
];

export const getUserEntries = (address: string, kuroData: KuroData | null) => {
  if (!kuroData || !kuroData.participants || !address) return 0;
  const user = kuroData.participants.find(
    (p) => p.address.toLowerCase() === address.toLowerCase()
  );

  if (!user) return 0;
  const deposit = user.deposits.reduce((sum, deposit) => {
    return sum + Number(deposit.amount);
  }, 0);

  return Number(formatEther(BigInt(deposit)));
};

export const getTotalEntriesByTokenAddress = (
  kuroData: KuroData | null
): Map<string, number> => {
  const mapToken = new Map<string, number>();
  if (!kuroData || !kuroData.participants) return mapToken;

  kuroData.participants.forEach((player) => {
    player.deposits.forEach((deposit) => {
      if (mapToken.has(deposit.tokenAddress)) {
        mapToken.set(
          deposit.tokenAddress,
          (mapToken.get(deposit.tokenAddress) || 0) +
            Number(formatEther(deposit.amount))
        );
      } else {
        mapToken.set(deposit.tokenAddress, Number(formatEther(deposit.amount)));
      }
    });
  });

  return mapToken;
};

export const mapToData = (
  map: Map<string, number>
): { label: string; value: number; color: string }[] => {
  const data: { label: string; value: number; color: string }[] = [];

  let index = 0;
  map.forEach((value, label) => {
    data.push({
      label,
      value,
      color: colors[index % colors.length], // Lấy màu theo index, vòng lại nếu vượt quá độ dài mảng colors
    });
    index++;
  });

  return data;
};
