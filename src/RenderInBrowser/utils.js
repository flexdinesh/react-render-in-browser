export function isSSR() {
  return typeof window !== 'object';
}

// ie 11 support
export function arrayIncludes(array, value) {
  return array.indexOf(value) !== -1;
}