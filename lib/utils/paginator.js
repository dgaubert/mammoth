// retrieve a pagination
var paginator = function paginator(page, count) {
  var start = (page * 10) + 1;
  var end =((page * 10) + 10) > count ? count : ((page * 10) + 10);
  var pagesCount;

  // calculate total pages
  if ((count/10) % 1 !== 0) {
    pagesCount = Math.floor(count/10) + 1;
  } else {
    pagesCount = Math.floor(count/10);
  }
  
  // returns pagination structure
  var pagination = {
    pages: (function calculatePages() {
      var pages = [];
      
      // Build pages with its start & end item number
      var i;
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

  return pagination;
  
};

module.exports = paginator;
