import Reading from '../models/Reading';

class ReadingController {
  /**
   * Register a new sensor node reading in the database.
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    console.log(req.body);

    const readingCreated = await Reading.create(req.body);

    return res.json(readingCreated);
  }

  // TODO:needs to be implemented
  async index(req, res) {}

  // TODO:needs to be implemented
  async show(req, res) {}

  // TODO:needs to be implemented
  async update(req, res) {}

  // TODO:needs to be implemented
  async delete(req, res) {}
}

export default new ReadingController();
