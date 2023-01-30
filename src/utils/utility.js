function imagePathGenerator(path) {
  return `${process.env.PUBLIC_URL}/assets/images/${path}`;
}

export function copy(item) {
  navigator.clipboard.writeText(item);
}

export const utility = {
  imagePathGenerator,
  copy,
};
