const hasOnlySpaces = str => !str.trim().length;
const empty = str => !str;

const isEmpty = str => !empty(str) && !hasOnlySpaces(str);

export default isEmpty;
