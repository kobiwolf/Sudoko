export default function deepClone(obj) {
  const copy = JSON.parse(JSON.stringify(obj));
  return copy;
}
