/**
 * 这是我的 jsdoc 注释
 * @param args
 * @returns {number}
 */
export const plus = (...args: number[]) => args.reduce((prev, cur) => prev + cur, 0);

// 这是普通注释
export const minus = (...args: number[]) => args.reduce((prev, cur) => prev - cur, (args[0] || 0) * 2);

/*
 * 这是普通的多行注释
 */
export const multiple = (...args: number[]) => args.reduce((prev, cur) => prev * cur, 1);

/**
 * 伪装成 jsdoc 的普通多行注释
 */
export const divided = (...args: number[]) => args.reduce((prev, cur) => prev / cur, (args[0] || 0) * (args[0] || 0));
