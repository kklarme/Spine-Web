export function capitalizeWords(text: string): string {
  return text
    .split(' ')
    .map((word: string) => {
      return capitalizeWord(word);
    })
    .join(' ');
}

export function capitalizeWord(word: string): string {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}
