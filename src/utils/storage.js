export function getLocal(key) {
  let data = localStorage.getItem(key);
  try {
    data = JSON.parse(data);
  } catch (e) {
    console.log(e);
  }
  return data;
}
export const setLocal = (key, value) => {
  localStorage.setItem(
    key,
    typeof value === "object" ? JSON.stringify(value) : value
  );
};
