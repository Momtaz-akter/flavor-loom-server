import dbClient from '../db/db-client.js';

const brandsCollection = dbClient.db('flavor-loom').collection('brands');

export const getAllBrands = async (req, res) => {
  try {
    const brands = await brandsCollection.find({}).toArray();

    if (brands) {
      return res.status(200).json(brands);
    }

    res.status(404).json({ message: 'No brands found' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
