import generateUniqueId from "./generateUniqueId";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type runType<T> = (...args: any[]) => Promise<T>;

const synchronisedPromiseMaker = <T>(
  run: runType<T>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ((...argS: any[]) => Promise<T>) => {
  const subscribers: Record<
    string,
    {
      resolve: (v: T) => void;
      reject: (e: Error) => void;
    }[]
  > = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (...args: any[]): Promise<T> => {
    const key = generateUniqueId(args);
    if (subscribers[key]) {
      return new Promise((resolve, reject) => {
        subscribers[key].push({
          resolve,
          reject,
        });
      });
    }

    subscribers[key] = [];

    try {
      const result = await run(...args);
      subscribers[key].forEach((s) => {
        s.resolve(result);
      });

      return result;
    } catch (error) {
      subscribers[key].forEach((s) => {
        s.reject(error);
      });

      throw error;
    } finally {
      delete subscribers[key];
    }
  };
};

export default synchronisedPromiseMaker;
