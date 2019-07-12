import { get, createParser } from '@styled-system/core';
import css from '@styled-system/css';

// @ts-ignore
const getValue = (n, scale) => get(scale, n);

export const variant = (config: any) => (props: any) => {
  return Object.keys(config).map(prop => {
    // @ts-ignore
    getValue.defaults = config[prop];
    return css(
      createParser({
        [prop]: getValue,
      })(props)
    );
  });
};
