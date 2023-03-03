const ErrorHandler = require("./errorHandler");

class Models {
  constructor(model, req, res, next) {
    this.model = model;
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async add() {
    try {
      await this.model.create(this.req.body);
      this.res.status(201).send("added successfully");
    } catch (err) {
      return this.next(err);
    }
  }

  async update() {
    try {
      const updateData = await this.model.findByIdAndUpdate(
        this.req.params.id,
        this.req.body
      );
      if (!updateData) return this.next(ErrorHandler.notFound());
      this.res.status(200).send("updated successfully");
    } catch (err) {
      return this.next(err);
    }
  }

  async delete() {
    try {
      const data = await this.model.findByIdAndDelete(this.req.params.id);
      if (!data) return this.next(ErrorHandler.notFound());
      this.res.status(200).send("deleted successfully");
    } catch (err) {
      return this.next(err);
    }
  }

  async getSingle() {
    try {
      const data = await this.model.findById(this.req.params.id);
      if (!data) return this.next(ErrorHandler.notFound());
      this.res.status(200).send(data);
    } catch (err) {
      return this.next(err);
    }
  }

  async getMany() {
    try {
      const { page = 1, limit = 15, category, title, dec } = this.req.query;

      // Build filter object based on provided query params
      const filter = {};
      if (category) filter.category = category;
      if (title) filter.title = new RegExp(title, "i");
      if (dec) filter.dec = new RegExp(dec, "i");

      // Get total number of documents that match the filter
      const totalData = await this.model.countDocuments(filter);

      // Calculate total number of pages based on the limit value
      const totalPages = Math.ceil(totalData / limit);

      // Calculate the skip value based on the provided page and limit values
      const skip = (page - 1) * limit;

      // Find documents that match the filter and limit/skip values
      const data = await this.model
        .find(filter)
        .limit(limit)
        .skip(skip)
        .populate("category")
        .sort({ createdAt: -1 });

      // if no data found
      if (!data?.length) return this.next(ErrorHandler.notFound());

      // Return the data along with metadata
      this.res.status(200).send({
        data,
        totalPages,
        currentPage: parseInt(page, 10),
        totalData,
      });
    } catch (err) {
      return this.next(err);
    }
  }

  async like() {
    try {
      // Find the post by ID
      const data = await this.model.findById(this.req.params.id);
      if (!data) return this.next(ErrorHandler.notFound());

      // Check if the user has already liked the post
      const alreadyLiked = data.likes.some((like) =>
        like.userId.equals(this.req.user._id)
      );

      let message
      if (alreadyLiked) {
        data.likes = data.likes.filter((item) => {
          return !(item.userId.equals(this.req.user._id))
        })
        data.totalLikes = data.totalLikes < 1 ? 0 : data.totalLikes - 1
        message = "undo liked"
      } else {
        data.likes.push({ userId: this.req.user._id });
        data.totalLikes = data.totalLikes ? data.totalLikes + 1 : 1;
        message = "liked"
      }

      // Save the updated post to the database
      await data.save();
      this.res.status(200).send(message);
    } catch (err) {
      return this.next(err);
    }
  }

  async rating() {
    try {
      const { rating } = this.req.query;

      // Find the post by ID
      const data = await this.model.findById(this.req.params.id);
      if (!data) return this.next(ErrorHandler.notFound());

      // Check if the user has already rated the post
      const alreadyRated = data.ratings.some((rating) =>
        rating.userId.equals(this.req.user._id)
      );


      // Update the post's ratings and average rating
      const numRatings = data.ratings.length;
      const sumRatings = data.ratings.reduce(
        (total, rating) => total + rating.rating,
        0
      );
      const newRating = {
        userId: this.req.user._id,
        rating: rating,
      };
      const ratings = data.ratings.filter((item) => {
        return !(item.userId.equals(this.req.user._id))
      })
      const newRatings = [...ratings, newRating];
      const newTotalRatings = numRatings + 1;
      const newAvgRating = (sumRatings + rating) / newTotalRatings;
      data.ratings = newRatings;
      data.totalRating = newTotalRatings;
      data.avgRating = newAvgRating;

      // Save the updated post to the database
      await data.save();
      this.res.status(200).send(data);
    } catch (err) {
      return this.next(err);
    }
  }
}

module.exports = Models;
