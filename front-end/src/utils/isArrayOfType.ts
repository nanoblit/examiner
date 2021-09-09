const isArrayOfType = (
  value: any,
  type: string | ((value: Object) => boolean)
) => {
  if (!Array.isArray(value)) {
    return false;
  }
  const array = value as any[];

  if (typeof type === "string") {
    array.forEach((item) => {
      if (typeof item !== type) {
        return false;
      }
    });
  } else {
    array.forEach((item) => {
      if (type(item) === false) {
        return false;
      }
    });
  }
  return true;
};

export default isArrayOfType;