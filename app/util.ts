import * as camelcase from 'camelcase';

export function camelcaseAll(target: { [key: string]: any } | null): any {
  if (target === null || typeof target === 'undefined') return;
  const temp: { [key: string]: any } = {};
  for (const key in target) {
    temp[camelcase(key)] = target[key];
  }
}


