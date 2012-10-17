exports.view = function(req, res){

  // Fake posts database

  var posts = [
      {  
        title: 'TinyOS 2.x',
        author: 'Daniel Gaubert',
        created: '10/10/2010',
        slug: 'tinyos-2',
        abstract: 'Macros are a powerful feature of LispyScript. They are much more powerful than C  define macros. While C #define macros do string substitution, LispyScript macros are code generators Functions take values as arguments and return a value. Macros take code as arguments, and then return ode. Understanding this difference and its ramifications is the key to writing proper macros. Functions get evaluated at runtime. Macros get evaluated at compile time, or pre-compile time to be more precise.',
        tags: ['wsn','tinyos','sensor']
      }
    , {
        title: 'Git model branching', 
        author: 'Daniel Gaubert',
        created: '09/12/2010',
        slug: 'git-model-branching',
        abstract: 'Macros are a powerful feature of LispyScript. They are much more powerful than C  define macros. While C define macros do string substitution, LispyScript macros are code generators take values as arguments and a value. Macros take code as arguments, and then code. Understanding  difference and its ramifications is the key to writing proper macros.Functions get evaluated at runtime. Macros get evaluated at compile time, or pre-compile time to be more precise.',
        tags: ['workflow','git']
      }
    , {
        title: 'LispyScript Macros',
        author: 'Daniel Gaubert',
        created: '21/11/2010',
        slug: 'lispyscript-macros',
        abstract: 'We cannot use a function to reuse this code pattern, because the parts that change are parts of the code. Functions are about reusing code patterns, where it is only the data that changes. Macros are about reusing code patterns, where the code can also change. In LispyScript, we can write a macro to reuse this code pattern. The macro needs a name, let’s call it template as it happens to be a template compiler',
        tags: ['macros','script']
      }
  ];
  
  // Fake pagination
  var pagination = {
    selected: '1-10 de 34',
    pages: ['11-20','21-30','31-34']
  };
  res.render('blog', { title: 'Blog de Daniel García Aubert', posts: posts, pagination: pagination });
};

exports.titles = function(req, res){
  var titles = [
    'Git model branching',
    'LispyScript Macros',
    'TinyOS 2.x'
  ];
  var body = JSON.stringify(titles);
  res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': body.length, 'Access-Control-Allow-Origin': '*'});
  res.end(body);
};
