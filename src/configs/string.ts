const isEmpty = (obj: any): boolean => {
  let json: Record<string, any> = {};
  let arr: any[] = [];
  return (
    obj === null ||
    obj === "" ||
    JSON.stringify(obj) === JSON.stringify(json) ||
    obj === undefined ||
    ((json.constructor === obj.constructor ||
      arr.constructor === obj.constructor) &&
      Object.keys(obj).length === 0) ||
    (Array.isArray(obj) && obj.length === 0)
  );
};

export default isEmpty;
