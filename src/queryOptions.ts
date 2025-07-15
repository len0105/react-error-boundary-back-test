export const indexQueryOptions = () => {
  return {
    queryKey: ['index'],
    queryFn: () =>
      // 適当なAPIを取得
      fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
  };
};

export const aboutQueryOptions = () => {
  return {
    queryKey: ['about'],
    queryFn: () =>
      // 適当なAPIを取得
      fetch('https://jsonplaceholder.typicode.com/posts/2')
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
  };
};

export const errorQueryOptions = () => {
  return {
    queryKey: ['error'],
    queryFn: async () => {
      // 意図的にエラーを発生させる
      throw new Error('This is a test error for error boundary');
    }
  };
};
