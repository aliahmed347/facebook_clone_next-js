const setStorage = async (key: string, value: any) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

const getStorage = async (key: string) => {
  try {
    const data: any = localStorage.getItem(key);
    const serializedValue = JSON.parse(data);
    return serializedValue;
  } catch (error) {
    console.error("Error getting data:", error);
  }
};
const removeStorage = async (key: string) => {
  try {
    localStorage.removeItem(key);
    console.log("Data remove successfully");
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

export { setStorage, getStorage, removeStorage };
