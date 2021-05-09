function mapNreduce(str) {
  return str.split('\n').filter(Boolean).reduce((map, cur) => {
    const [from, to] = cur.split(' ~ ');
    if (from && to) {
      const fromSlot = from.replace(/\d/g, '0');
      const toSlot = from.replace(/\d/g, '0');
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

function statistics(info) {
  const result = {};
  for (const [key, secs] of Object.entries(info)) {
    const nums = [];
    for (const [from, to] of secs) {
    }
    result[key] = {};
  }
  return result;
}
