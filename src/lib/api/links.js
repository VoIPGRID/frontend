const link = /<(.*)>/;
const rel = /rel="(.*)"/;

export function parse(str) {
  return { [rel.exec(str)[1]]: link.exec(str)[1] };
}

export function get(links) {
  return links
    .split(',')
    .reduce((prev, cur) => Object.assign(prev, parse(cur)), {});
}
