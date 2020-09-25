import { v5 as uuidv5 } from "uuid";

const CHECKSUM_KEY = "19452356-b478-11ea-b3de-0242ac130004";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateUniqArr = (obj: any): string[] => {
  if (obj === null || obj === undefined) return [`${obj}`];

  let strArr: string[] = [];
  switch (obj.constructor.name) {
    case "Object":
      Object.keys(obj)
        .sort()
        .forEach((k) => {
          strArr = strArr.concat(generateUniqArr(obj[k]));
        });
      break;
    case "Array":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      obj.forEach((val: any) => {
        strArr = strArr.concat(generateUniqArr(val));
      });
      break;
    default:
      strArr.push(`${obj}`);
  }

  return strArr;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateUniqueId = (params: any, namespace = "dummy"): string => {
  const strArr = generateUniqArr(params);
  strArr.push(namespace); // To protect from empty value
  return uuidv5(strArr.join(":"), CHECKSUM_KEY);
};

export default generateUniqueId;
