import dbClient from '../db/db-client.js';

const cartsCollection = dbClient.db('flavor-loom').collection('carts');

export const getCartByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const foundCart = await cartsCollection.findOne({ email });

    if (foundCart) {
      return res.status(200).json(foundCart);
    }

    res.status(404).json({ message: 'No cart found' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { email } = req.params;
    const { body: products } = req;

    const updateResult = await cartsCollection.updateOne(
      { email },
      { $set: { email, products } },
      { upsert: true }
    );

    if (updateResult.acknowledged) {
      return res.status(201).json({ message: 'Product updated successfully' });
    }

    res.status(400).json({ message: 'Bad request' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
