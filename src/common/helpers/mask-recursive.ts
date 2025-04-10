const sensitiveFields = ['password', 'accessToken', 'refreshToken', 'token'];

export const maskRecursive = <T = any>(data: T): T => {
  if (Array.isArray(data)) {
    return data.map(maskRecursive) as unknown as T;
  }

  if (typeof data !== 'object') {
    return data;
  }

  const newData: any = {};

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (sensitiveFields.includes(key)) {
        newData[key] = '********';
      } else {
        newData[key] = maskRecursive(data[key]);
      }
    }
  }

  return newData;
};
