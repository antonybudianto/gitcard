export const firstUpper = str => str[0].toUpperCase() + str.substring(1);

export const transformDevData = data => {
  return data.map(d => {
    d.node = d.dev.node;
    d.node.avatarUrl = d.avatarUrl;
    return d;
  });
};
