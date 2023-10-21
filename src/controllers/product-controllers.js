import { ObjectId } from 'mongodb';
import dbClient from '../db/db-client.js';

const productsCollection = dbClient.db('flavor-loom').collection('products');

export const createNewProduct = async (req, res) => {
  try {
    const { body } = req;

    const newProduct = await productsCollection.insertOne(body);

    if (newProduct.acknowledged) {
      return res.status(201).json(newProduct);
    }

    res.status(400).json({ message: 'Bad request' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productsCollection.find({}).toArray();

    if (products) {
      return res.status(201).json(products);
    }

    res.status(404).json({ message: 'No products found' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getProductsByBrand = async (req, res) => {
  try {
    const { brandName } = req.query;

    const products = await productsCollection.find({ brandName }).toArray();

    if (products) {
      return res.status(201).json(products);
    }

    res.status(404).json({ message: 'No products found' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await productsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (products) {
      return res.status(201).json(products);
    }

    res.status(404).json({ message: 'No products found' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, ...updatedProduct } = req.body;

    const updateResult = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updatedProduct } },
      { upsert: true }
    );

    if (updateResult.modifiedCount > 0) {
      return res.status(203).json(updateResult);
    }

    res.status(404).json({ message: 'Bad request' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
