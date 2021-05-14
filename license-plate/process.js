/**
 *
 * @param str {string}
 * @returns {import('./struct').NumberCollect}
 */
exports.mapNreduce = function mapNreduce(str) {
  return str.split('\n').filter(Boolean).reduce((map, cur) => {
    const [from, to] = cur.split(' ~ ');
    if (from && to) {
      const fromSlot = from.replace(/\d/g, '0');
      const toSlot = to.replace(/\d/g, '0');
      if (fromSlot !== toSlot) {
        console.warn('not match 2', cur);
      } else {
        if (!map[fromSlot]) {
          map[fromSlot] = [];
        }
        map[fromSlot].push([from, to]);
      }
    } else {
      console.warn('not match', cur);
    }
    return map;
  }, {});
}

const SHOULD_LOG = false;

function log(...args) {
  if (SHOULD_LOG) {
    console.log(...args);
  }
}

/**
 *
 * @param target {number[][]}
 * @param insertion {number[]}
 */
function mergeInto(target, insertion) {
  log('before:', target, insertion);
  const [iFrom, iTo] = insertion;

  for (let i = 0; i < target.length; ++i) {
    const [from, to] = target[i];

    if (iFrom >= from && iTo <= to) {
      // 被已有段包含了, 直接结束
      log('contains!');
      return;
    } else if (iFrom <= from && iTo >= to) {
      // 包含已有段, 替换
      target[i] = [iFrom, iTo];
      log('replace contains!', target);
      return;
    } else if (iFrom > to + 1) {
      // 完全不匹配, 继续
    } else if (iTo < from - 1) {
      // 完全不匹配, 继续
    } else if (iFrom === to + 1) {
      // 为后补集
      target[i][1] = iTo;
      log('attach back:', target);
      return;
    } else if (iTo === from - 1) {
      // 为前补集
      target[i][0] = iFrom;
      log('pretach before:', target);
      return;
    }
  }

  // 到最后都没插进去或者修改, 说明是新号段, 插
  target.push([iFrom, iTo]);
  log('after:', target);
}

/**
 *
 * @param target {number[][]}
 */
function mergeAll(target) {
  for (let i = target.length - 1; i > 0; --i) {
    mergeInto(target, target.splice(i, 1)[0]);
  }
  target.sort(([aFrom], [bFrom]) => aFrom - bFrom);
}

/**
 *
 * @param info {import('./struct').NumberCollect}
 * @returns {import('./struct).NumberCalc}
 */
exports.statistics = function statistics(info) {
  const result = {};
  for (const [key, secs] of Object.entries(info)) {
    const nums = [];
    for (const [from, to] of secs) {
      const fromNumber = +from.replace(/\D/g, '');
      const toNumber = +to.replace(/\D/g, '');
      mergeInto(nums, [fromNumber, toNumber]);
      mergeAll(nums);
    }
    if (nums.length === 1 && nums[0][0] === 0 && nums[0][1] === 999) {
      result[key] = {
        whole: true,
      };
    } else {
      result[key] = {
        available: nums,
      };
    }
  }
  const sorted = {};
  const keys = Object.keys(result).sort((a, b) => a < b);
  for (const key of keys) {
    sorted[key] = result[key];
  }
  return sorted;
}

/**
 *
 * @param calced {import('./struct').NumberCalc}
 */
exports.buckety = function buckety(calced) {}

const regCases = {
  B0000$: /^B0000[A-Z]$/,
  B000$0: /^B000[A-Z]0$/,
  B00$00: /^B00[A-Z]00$/,
  B0$000: /^B0[A-Z]000$/,
  B$0000: /^B[A-Z]0000$/,
  B000$$: /^B000[A-Z][A-Z]$/,
  B00$0$: /^B00[A-Z]0[A-Z]$/,
  B0$00$: /^B0[A-Z]00[A-Z]$/,
  B$000$: /^B[A-Z]000[A-Z]$/,
  B00$$0: /^B00[A-Z][A-Z]0$/,
  B0$0$0: /^B0[A-Z]0[A-Z]0$/,
  B$00$0: /^B[A-Z]00[A-Z]0$/,
  B0$$00: /^B0[A-Z][A-Z]00$/,
  B$0$00: /^B[A-Z]0[A-Z]00$/,
  B$$000: /^B[A-Z][A-Z]000$/,
  B00$$$: /^B00[A-Z][A-Z][A-Z]$/,
  B0$0$$: /^B0[A-Z]0[A-Z][A-Z]$/,
  B0$$0$: /^B0[A-Z][A-Z]0[A-Z]$/,
  B0$$$0: /^B0[A-Z][A-Z][A-Z]0$/,
  B$00$$: /^B[A-Z]00[A-Z][A-Z]$/,
  B$0$0$: /^B[A-Z]0[A-Z]0[A-Z]$/,
  B$0$$0: /^B[A-Z]0[A-Z][A-Z]0$/,
  B$$00$: /^B[A-Z][A-Z]00[A-Z]$/,
  B$$0$0: /^B[A-Z][A-Z]0[A-Z]0$/,
  B$$$00: /^B[A-Z][A-Z][A-Z]00$/,
};
