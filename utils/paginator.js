exports.create = function (page, count) {
  var start = (page * 10) + 1,
      end =((page * 10) + 10) > count ? count : ((page * 10) + 10),
      pagesCount;
  // Calculates total pages
  if ((count/10) % 1 !== 0) {
    pagesCount = Math.floor(count/10) + 1;
  } else {
    pagesCount = Math.floor(count/10);
  }
  // Returns pagination structure
  return {
    selected: start === end ? start : start + '-' + end + ' de ' + count,
    pages: (function () {
      var pages = [],
          i;
      // Builds pages with its start & end item number
      for (i = 0; i < pagesCount ; i = i + 1) {
        pages.push({
          count: i,
          selected: i === page ? true : false
        });
      }
      return pages;
    })(),
    previousPage: (page - 1) < 0 ? -1 : (page - 1),
    nextPage: (page + 1) > (pagesCount - 1) ? -1 : (page + 1)
  };
};
