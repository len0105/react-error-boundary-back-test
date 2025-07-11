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

export const hogeQueryOptions = () => {
  return {
    queryKey: ['hoge'],
    queryFn: () =>
      // 適当なAPIを取得
      fetch('https://jsonplaceholder.typicode.com/posts/3')
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
  };
};
