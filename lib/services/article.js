module.exports = function (Article) {

  return {

    findAll: function(callback) {
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

    findAllPublished: function (callback) {
      Article
        .find({
          published: true
        })
        .sort({
          created:-1
        })
        .exec(callback);
    },

    findBySlug: function (slug, callback) {
      Article
        .findOne({
          slug: slug
        })
        .exec(callback);
    },

    findPublishedByCategoryOrTag: function (category, tag, page, callback) {
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

    countPublishedByCategoryOrTag: function (category, tag, callback) {
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

    findLastThree: function (callback) {
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

    findByCategory: function (category, callback) {
      Article
        .find({
          published: true,
          category: category
        })
        .exec(callback);
    },

    findLast: function (callback) {
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

    categoriesCount: function (callback) {
      Article.categoriesCount(callback);
    },

    tagsCount: function (callback) {
      Article.tagsCount(callback);
    }
  };
};