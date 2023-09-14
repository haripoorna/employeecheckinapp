// export  const officeLocation = {
//   latitude: 16.997495323648657,
//   longitude: 81.7708057165146,
//   latitudeDelta: 0.0922,
//   longitudeDelta: 0.0421,
// };
export  const officeLocation = {
  latitude: 18.10343934555502,
  longitude: 83.4005718460291,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// 28.628861, 77.350444
export const dateConverter = (timestamp) => {
  const dateObj = new Date(timestamp);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  const formattedDateTime = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return formattedDateTime;
};
