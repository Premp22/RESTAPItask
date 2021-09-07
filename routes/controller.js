const { error } = require("console");
var express = require("express");
var path = require("path");
var router = express.Router();
const users = require("../db/schema");

let begin = (req, res, next) => {
	res.render("index", { title: "express" });
};
let CreateUser = (req, res, next) => {
	const user = new users({
		id: req.body.id,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password,
	});
	user
		.save()
		.then(() => {
			res.send(user);
		})
		.catch((err) => {
			res.send(err);
		});
};

let listAllUsers = async (req, res, next) => {
	try {
		const usersdata = await users.find();
		res.send(usersdata);
	} catch (error) {
		res.send(error);
	}
};
let listOneUser = async (req, res, next) => {
	try {
		const id = req.params.userId;
		const usersdata = await users.findOne({ id: id });

		if (!usersdata) {
			return res.status(404).send();
		} else {
			res.send(usersdata);
		}
	} catch (error) {
		res.status(404).send(error);
	}
};

let updateUser = async (req, res, next) => {
	try {
		const id = req.params.userId;
		const updatedata = await users.findOneAndUpdate(
			{ id: id },
			{
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				password: req.body.password,
			},
			{
				new: true,
			}
		);

		if (!updatedata) {
			return res.status(404).send();
		} else {
			res.send(updatedata);
		}
	} catch (error) {
		res.send(error);
	}
};

let deleteUser = async (req, res, next) => {
	try {
		const id = req.params.userId;
		const deletedata = await users.findOneAndDelete({ id: id });
		console.log(deletedata);
		if (!id) {
			return res.status(404).send(error);
		} else {
			res.send(deletedata);
		}
	} catch (error) {
		res.status(404).send(error);
	}
};

module.exports = {
	begin,
	CreateUser,
	listAllUsers,
	listOneUser,
	updateUser,
	deleteUser,
};