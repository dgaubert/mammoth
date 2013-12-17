var articleService = function articleService(Article) {

  var service = {

    //
    findAll: function findAll(callback) {
      Article
        .find()
        .select({
          title: 1,
          slug: 1,
          created: 1
        })
        .sort({
          created:-1
        })
        .exec(callback);
    },

    //
    findAllPublished: function findAllPublished(callback) {
      Article
        .find({
          published: true
        })
        .sort({
          created:-1
        })
        .exec(callback);
    },

    //
    findBySlug: function findBySlug(slug, callback) {
      Article
        .findOne({
          slug: slug
        })
        .exec(callback);
    },

    //
    findPublishedByCategoryOrTag: function findPublishedByCategoryOrTag(category, tag, page, callback) {
      var filter = {
        'published': true
      };

      if (category) {
        filter.category = category;
      } else if (tag) {
        filter.tags = {$in: tag};
      }

      Article
        .find(filter)
        .sort({
          created: -1
        })
        .skip(page * 10)
        .limit((page * 10) + 10)
        .exec(callback);
    },

    //
    countPublishedByCategoryOrTag: function countPublishedByCategoryOrTag(category, tag, callback) {
      var filter = {
        'published': true
      };

      if (category) {
        filter.category = category;
      } else if (tag) {
        filter.tags = {$in: tag};
      }

      Article
        .find(filter)
        .count(callback);
    },

    //
    findLastThree: function findLastThree(callback) {
      Article
        .find({
          published: true
        })
        .sort({
          created: -1
        })
        .limit(3)
        .exec(callback);
    },

    //
    findByCategory: function findByCategory(category, callback) {
      Article
        .find({
          published: true,
          category: category
        })
        .exec(callback);
    },

    //
    findLast: function findLast(callback) {
      Article
        .find({
          published: true
        })
        .sort({
          created: -1
        })
        .limit(1)
        .exec(callback);
    },

    //
    countCategories: function countCategories(callback) {
      Article.countCategories(callback);
    },

    //
    countTags: function countTags(callback) {
      Article.countTags(callback);
    }
  };

  return service;
};

module.exports = articleService;
