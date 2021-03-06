const Book = require("../model/Book");
const Arrival = require("../model/Arrivals")
const userSchema = require("../model/userSchema");
const arrivalSchema = require("../model/Arrivals");
const User = require('../model/userSchema');

const getAllBooks = async (req, res) => {
    const books = await Book.find();

    if (!books) {
        return res.status(404).json({ message: "No products found" })
    }
    return res.status(200).json({ books })
}

const getById = async (req, res) => {
    const id = req.params.id;
    let book;
    try {
        book = await Book.findById(id);
    } catch (err) {
        console.log(err)
    }
    if (!book) {
        return res.status(404).json({ message: "No products found" })
    }
    return res.status(200).json({ book })
}

const addBook = async (req, res, next) => {
    const { image, name, author, price, available, ratings } = req.body;
    const book = new Book({
        image,
        name,
        author,
        price,
        available,
        ratings
    });
    await book.save();
    if (!book) {
        return res.status(500).json * { message: "unable to add" }
    }
    return res.status(201).json({ book })
}

const addArrival = async (req, res, next) => {
    const { image, name, author, price, available, ratings } = req.body;
    const arrival = new Arrival({
        image,
        name,
        author,
        price,
        available,
        ratings
    });
    await arrival.save();
    if (!arrival) {
        return res.status(500).json * { message: "unable to add" }
    }
    return res.status(201).json({ arrival })
}

const updateBook = async (req, res) => {
    const id = req.params.id;
    const { image, name, author, price, available, ratings } = req.body;
    let book;
    try {
        book = await Book.findByIdAndUpdate(id, {
            image,
            name,
            author,
            price,
            available,
            ratings
        });
        book = await book.save();
    } catch (err) {
        console.log(err);
    }
    if (!book) {
        return res.status(500).json({ message: "Unable to update" });
    }
    return res.status(200).json({ book });
}

const deleteBook = async (req, res) => {
    const id = req.params.id;
    let book;
    try {
        book = await Book.findByIdAndRemove(id);
    } catch (err) {
        console.log(err);
    }
    if (!book) {
        return res.status(404).json({ message: "Unable to delete" });
    }
    return res.status(200).json({ message: "Product deleted Successfully" });
}

const addtoCart = async (req, res) => {
    const id = req.params.id;
    const books = await Book.findById(id);
    const userData = await User.findOne({ email: req.body.email });
    console.log(userData)
    if (!userData) {
        return res.status(400).json("Email not exist");
    }
    if (!books) {
        return res.status(404).json({ message: "Books not found" })
    }
    const user = await User.updateOne({ email: req.body.email }, {
        $push: (
            { email: req.body.email }, { cart: books }
        )
    })

    return res.status(200).json(user);
}

const showCart = async (req, res) => {

    const myCart = await User.findOne({ email: req.body.email }, { cart: 1 });
    if (myCart === null) {
        return res.status(400).json("myCart is null")
    }

    return res.status(200).json(myCart);
}

const deleteCart = async (req, res) => {
    const id = req.params.id;
    const books = await Book.findById(id);
    const userData = await User.findOne({ email: req.body.email });

    if (!userData) {
        return res.status(400).json("Email not exist");
    }
    if (!books) {
        return res.status(404).json({ message: "Books not found" })
    }
    const user = await User.updateOne({ email: req.body.email }, {
        $pull: (
            { email: req.body.email }, { cart: books }
        )
    })
    return res.status(200).json(user);
}

const OrderedBooks = async (req, res) => {
    const id = req.params.id;
    const books = await Book.findById(id);
    const userData = await User.findOne({ email: req.body.email });
    console.log(userData)
    if (!userData) {
        return res.status(400).json("Email not exist");
    }
    if (!books) {
        return res.status(404).json({ message: "Books not found" })
    }
    const user = await User.updateOne({ email: req.body.email }, {
        $push: (
            { email: req.body.email }, { orders: books }
        ),
   
        $pull: (
            { email: req.body.email }, { cart: books }
        )
    })
    return res.status(200).json(user);
}

const showOrders = async (req, res) => {

    const myOrders = await User.findOne({ email: req.body.email }, { orders: 1 });
    if (myOrders === null) {
        return res.status(400).json("Order is null")
    }

    return res.status(200).json(myOrders);
}

const deleteOrders = async (req, res) => {
    const id = req.params.id;
    const books = await Book.findById(id);
    const userData = await User.findOne({ email: req.body.email });

    if (!userData) {
        return res.status(400).json("Email not exist");
    }
    if (!books) {
        return res.status(404).json({ message: "Books not found" })
    }
    const user = await User.updateOne({ email: req.body.email }, {
        $pull: (
            { email: req.body.email }, { orders: books }
        )
    })
    return res.status(200).json(user);
}

const searchBar = async(req, res) => {
    const regex = new RegExp(req.params.name, 'i');
    Book.find({ name: regex }).then((result) => {
        res.status(200).json(result);
    })
}

exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
exports.addtoCart = addtoCart;
exports.showCart = showCart;
exports.deleteCart = deleteCart;
exports.OrderedBooks = OrderedBooks;
exports.showOrders = showOrders;
exports.deleteOrders = deleteOrders;
exports.searchBar = searchBar;
exports.addArrival = addArrival;