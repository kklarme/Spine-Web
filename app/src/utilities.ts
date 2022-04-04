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

export function detectScrollbarWidth(): number {
    const scrollDiv = document.createElement('div');
    scrollDiv.setAttribute(
        'style',
        'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;',
    );
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
}
