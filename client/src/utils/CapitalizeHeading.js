export default function CapitalizeHeading(word) {
  const capitalizeWord = word.charAt(0).toUpperCase() + word.slice(1);
  return capitalizeWord;
}
