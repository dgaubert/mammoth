exports.list = function(req, res){

  // Fake summaries database
  var summaries = [
      {  
        title: 'TinyOS 2.x',
        author: 'Daniel Gaubert',
        created: '10/10/2010',
        slug: 'tinyos-2',
        category: 'development',
        abstract: 'Macros are a powerful feature of LispyScript. They are much more powerful than C  define macros. While C #define macros do string substitution, LispyScript macros are code generators Functions take values as arguments and return a value. Macros take code as arguments, and then return ode. Understanding this difference and its ramifications is the key to writing proper macros. Functions get evaluated at runtime. Macros get evaluated at compile time, or pre-compile time to be more precise.',
        tags: ['wsn','tinyos','sensor'],
        comments: '6'
      }
    , {
        title: 'Git model branching', 
        author: 'Daniel Gaubert',
        created: '09/12/2010',
        slug: 'git-model-branching',
        category: 'development',
        abstract: 'Macros are a powerful feature of LispyScript. They are much more powerful than C  define macros. While C define macros do string substitution, LispyScript macros are code generators take values as arguments and a value. Macros take code as arguments, and then code. Understanding  difference and its ramifications is the key to writing proper macros.Functions get evaluated at runtime. Macros get evaluated at compile time, or pre-compile time to be more precise.',
        tags: ['workflow','git'],
        comments: '2'
      }
    , {
        title: 'LispyScript Macros',
        author: 'Daniel Gaubert',
        created: '21/11/2010',
        slug: 'lispyscript-macros',
        category: 'development',
        abstract: 'We cannot use a function to reuse this code pattern, because the parts that change are parts of the code. Functions are about reusing code patterns, where it is only the data that changes. Macros are about reusing code patterns, where the code can also change. In LispyScript, we can write a macro to reuse this code pattern. The macro needs a name, let’s call it template as it happens to be a template compiler',
        tags: ['macros','script'],
        comments: '12'
      }
  ];
  
  // Fake pagination
  var pagination = {
    selected: '1-10 de 34',
    pages: ['11-20','21-30','31-34']
  };
  res.render('blog', { title: 'Blog de Daniel García Aubert', section: 'blog', summaries: summaries, pagination: pagination });
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

exports.tags = function(req, res){
  var tags = [
    'git',
    'wsn',
    'tinyos',
    'sensor',
    'workflow',
    'macros',
    'script'
  ];
  var body = JSON.stringify(tags);
  res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': body.length, 'Access-Control-Allow-Origin': '*'});
  res.end(body);
};

exports.categories = function(req, res){
  var categories = [
    'desarrollo',
    'miscelanea'
  ];
  var body = JSON.stringify(categories);
  res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': body.length, 'Access-Control-Allow-Origin': '*'});
  res.end(body);
};


exports.view = function(req, res){
  // Fake post database
  var post = {  
        title: 'TinyOS 2.x',
        author: 'Daniel Gaubert',
        created: '10/10/2010',
        slug: 'tinyos-2',
        category: 'development',
        content: 'Macros are a powerful feature of LispyScript. They are much more powerful than C  define macros. While C #define macros do string substitution, LispyScript macros are code generators Functions take values as arguments and return a value. Macros take code as arguments, and then return ode. Understanding this difference and its ramifications is the key to writing proper macros. Functions get evaluated at runtime. Macros get evaluated at compile time, or pre-compile time to be more precise.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?',
        tags: ['wsn','tinyos','sensor'],
        comments: '6'
      };
  res.render('post', { title: post.title, section: 'blog', post: post });
};
