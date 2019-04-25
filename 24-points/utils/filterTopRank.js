const isEmpty = require('lodash/isEmpty');
const pick = require('lodash/pick');

const filterTopRank = (list, top = 100) => {
  const res = [];
  const helper = [];

  for (let item of list) {
    if (helper.indexOf(item.openid) === -1) {
      if (item.userInfo.avatarUrl && !isEmpty(item.userInfo.nickName.trim())) {
        res.push(
          pick(item, ['userInfo', 'openid', 'rank', 'record', 'gameplay']),
        );
      }
      helper.push(item.openid);
      if (res.length === top) return res;
    }
  }
  return res;
};

module.exports = { filterTopRank };
