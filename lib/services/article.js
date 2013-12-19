function ArticleService(Article) {

  // public

  function find(callback) {
    Article
      .find()
      .select()
      .sort({
        created:-1
      })
      .exec(callback);
  }

  function findPublished(callback) {
    Article
      .find({
        published: true
      })
      .sort({
        created:-1
      })
      .exec(callback);
  }

  function findBySlug(slug, callback) {
    Article
      .findOne({
        slug: slug
      })
      .exec(callback);
  }

  function findPublishedByCategoryOrTag(category, tag, page, callback) {
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
  }

  function countPublishedByCategoryOrTag(category, tag, callback) {
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
  }

  function findLastThree(callback) {
    Article
      .find({
        published: true
      })
      .sort({
        created: -1
      })
      .limit(3)
      .exec(callback);
  }

  function findByCategory(category, callback) {
    Article
      .find({
        published: true,
        category: category
      })
      .exec(callback);
  }

  function findLast(callback) {
    Article
      .find({
        published: true
      })
      .sort({
        created: -1
      })
      .limit(1)
      .exec(callback);
  }

  function countCategories(callback) {
    Article.countCategories(callback);
  }

  function countTags(callback) {
    Article.countTags(callback);
  }

  // expose

  return {
    'find': find,
    'findPublished': findPublished,
    'findBySlug': findBySlug,
    'findPublishedByCategoryOrTag': findPublishedByCategoryOrTag,
    'countPublishedByCategoryOrTag': countPublishedByCategoryOrTag,
    'findLastThree': findLastThree,
    'findByCategory': findByCategory,
    'findLast': findLast,
    'countCategories': countCategories,
    'countTags': countTags
  };
}

module.exports = ArticleService;
