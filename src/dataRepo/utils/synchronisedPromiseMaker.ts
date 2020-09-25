import generateUniqueId from "./generateUniqueId";

type runType<T> = (...args: unknown[]) => Promise<T>;

const synchronisedPromiseMaker = <T>(
  run: runType<T>
): ((...argS: unknown[]) => Promise<T>) => {
  const subscribers: Record<
    string,
    {
      resolve: (v: T) => void;
      reject: (e: Error) => void;
    }[]
  > = {};

  return async (...args: unknown[]): Promise<T> => {
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
