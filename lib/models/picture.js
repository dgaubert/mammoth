var GridFS = require('GridFS').GridFS,
    myFS = new GridFS('mammoth');

module.exports.readImage = function () {
  myFS.get('Hello World!', function(err, data) {
    if (err) {
      next(new Error(err));
    } else {
      return data;
    }
  });

};

module.exports.newImage = function () {
  // Functions are performed in the order they are queued
  myFS.put(text, 'Hello World!', 'w', function(err){
      if(err) console.log(err);
  });
};


 
// var fs = require('fs'),
//     db = 
//     mongo = require('mongodb'),
//     fileId = new mongo.ObjectID(),
//     gridStore = new mongo.GridStore(db, fileId, 'w'),
//     filepath = req.files.image.path;




  // this.newImage = function (req, res, next) {

  //   fs.readFile(filepath, function (err, file) {
  //     console.log(file);
  //     if (err) {
  //       next(new Error('Can\'t read the image'));
  //     } else {
  //       gridStore.open(function (err, gs) {
  //         console.log('opened');
  //         if (err) {
  //           next(new Error('Can\'t open grid'));
  //         } else {
  //           gs.writeFile(file, function (err, info) {
  //             console.log('writed');
  //             if (err) {
  //               next(new Error('Can\'t write the image'));
  //             } else {
  //               res.redirect('/blog/admin/articles/' + req.params.slug);
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  //   *
  //   var fs      = require('fs');
  //   var mongo   = require('mongodb');
  //   var Grid    = require('gridfs-stream');
  //   var db      = require('mongoose').connection;

  //   var gfs = Grid(db, mongo);

  //   var tempfile    = req.files.image.path;
  //   var origname    = req.files.image.name;
  //   var writestream = gfs.createWriteStream({ filename: origname });
  //   // open a stream to the temporary file created by Express...
  //   fs.createReadStream(tempfile)
  //     .on('end', function() {
  //       res.redirect('/blog/admin/articles/' + req.params.slug);
  //     })
  //     .on('error', function() {
  //       next(new Error('Can\'t write the image'));
  //     })
  //     // and pipe it to gfs
  //     .pipe(writestream);
      

  // };




  // this.getImage = function (req, res, next) {
  //   var fileId = req.param.fileId,
  //       db = require('mongoose').connection,
  //       gs = new GridStore(db, fileId, 'w'),
  //       filepath = req.files.image.path + '/' +  req.files.image.name;

  //   GridStore.read(db, fileId, function(err, image) {
  //     if (err) {
  //       next('Can\'t get image');
  //     } else {
  //       res.set('Content-Type', 'image/png');
  //       res.sendFile(image);
  //     }
  //   });
  // };
