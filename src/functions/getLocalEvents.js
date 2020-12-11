export const getLocalEvents = () => {
  let data = JSON.parse(localStorage.getItem("events"));
  if (data === null) {
    localStorage.setItem("events", JSON.stringify([]));
    data = [];
  }
  return data;
};
