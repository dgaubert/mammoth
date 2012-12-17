exports.view = function(req, res){
  // Fake posts database
  var summary = {
    title: 'TinyOS 2.x',
    author: 'Daniel Gaubert',
    created: '10/10/2010',
    slug: 'tinyos-2',
    category: 'development',
    abstract: 'Macros are a powerful feature of LispyScript. They are much more powerful than C  define macros. While C #define macros do string substitution, LispyScript macros are code generators Functions take values as arguments and return a value. Macros take code as arguments, and then return ode. Understanding this difference and its ramifications is the key to writing proper macros. Functions get evaluated at runtime. Macros get evaluated at compile time, or pre-compile time to be more precise.',
    tags: ['wsn','tinyos','sensor'],
    comments: '6'
  }
  var categories = [
    {
      name: 'desarrollo',
      count: '25'
    },
    {
      name: 'miscelanea',
      count: '14'
    },
    {
      name: 'marketing',
      count: '2'
    },
    {
      name: 'diseño',
      count: '45'
    },
    {
      name: 'otros',
      count: '2'
    }
  ];
  res.render('home', { title: 'Daniel Garcia Aubert', section: 'home', summary: summary, categories: categories});
};
