export default {
  getItem: (key) => {
    let value;
    try {
      value = localStorage.getItem(key);
    } catch (err) {
      console.log(err.message);
    } finally {
      return value
    }
  },
  setItem: (key, value) => {
    try {
      // ios safari 无痕模式报错
      localStorage.setItem(key, value);
    } catch (err) {
      console.log(err.message);
    }
  }
}