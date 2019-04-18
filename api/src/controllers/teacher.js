const User = require("../models/User");
const Test = require("../models/Test");

module.exports = {
	async getAllStudents(req, res) {
		// Получение всех пользователей с ролью студент
		try {
			let students = await User.find({ role: "student" });
			let filterStudents = [];
			for (let el of students) {
				filterStudents.push({
					name: el.name,
					email: el.email,
					testResults: el.testResults,
					id: el._id
				});
			}
			res.send({
				students: filterStudents
			});
		} catch (err) {
			console.log("\x1b[31m", err);
			res.status(404).send({
				error: "Students test get error"
			});
		}
	},
	async getTeacherStudents(req, res) {
		// Получение студентов которые есть у учителя
		try {
			let teacher = await User.findOne({ _id: req.userData.id });
			let students = [];
			for (let student of teacher.students) {
				let val = await User.findOne({ _id: student });
				students.push({
					name: val.name,
					email: val.email,
					testResults: val.testResults,
					id: val._id
				});
			}
			res.send({
				students: students
			});
		} catch (err) {
			console.log("\x1b[31m", err);
			console.log("\x1b[37m");
			res.status(404).send({
				error: err
			});
		}
	},
	async addStudents(req, res) {
		// Добавить студента к учителю
		try {
			for (let student of req.body.students) {
				await User.updateOne(
					{ _id: req.userData.id },
					{ $addToSet: { students: student } }
				);
			}
			res.send({
				message: "students added"
			});
		} catch (err) {
			console.log("\x1b[31m", err);
			console.log("\x1b[37m");
			res.status(400).send({
				error: err
			});
		}
	},
	async createTest(req, res) {
		// Создать тест
		try {
			// Проверку на повторение имен
			let test = await Test.findOne({ name: req.body.name });
			if (test) {
				res.send({
					error: "Тест уже создан"
				});
			} else {
				let date = new Date(); 
				let newTest = new Test({
					name: req.body.name, // Название теста
					questions: req.body.questions, // Вопросы для теста
					time: req.body.time, // Время на прохождение теста
					results: {
						pass: 0, // Прошли тест
 						flooded: 0 // Провалили тест
					},
					date: `${date.getDate()}.${date.getUTCMonth() +
						1}.${date.getUTCFullYear()}` // Дата создания теста
				});
				// Сохрание теста в бд
				let saveTest = await newTest.save();
				// Добавление id теста к учителю
				await User.updateOne(
					{ _id: req.userData.id },
					{ $addToSet: { tests: saveTest._id } }
				);
				res.send({
					message: "Тест создан"
				});
			}
		} catch (err) {
			console.log("\x1b[31m", err);
			console.log("\x1b[37m");
			res.status(405).send({
				error: err
			});
		}
	},
	async deleteTests(req, res) {
		try {
			// Получение всех тестов переданных в запросе
			let tests = await Test.find({ _id: { $in: req.body.tests } });
			// Прохождение по тестам
			for (let test of tests) {
				// Удаление id теста у студентов
				await User.updateMany(
					{ _id: { $in: test.students } },
					{ $pull: { tests: { $in: req.body.tests } } }
				);
			}
			// Удаление id теста у учителя
			await User.updateOne(
				{ _id: req.userData.id },
				{ $pull: { tests: { $in: req.body.tests } } }
			);
			// Удалить всех тесты переданных в запросе
			await Test.deleteMany({ _id: { $in: req.body.tests } });

			res.send({
				message: "Test deleted"
			});
		} catch (err) {
			console.log("\x1b[31m", err);
			res.status(400).send({
				error: err
			});
		}
	},
	async deleteTeacherStudents(req, res) {
		// Удалить студентов которые есть у учителя
		try {
			await User.updateOne(
				{ _id: req.userData.id },
				{ $pull: { students: { $in: req.body.students } } }
			);
			res.send({
				message: "Students deleted"
			});
		} catch (err) {
			console.log("\x1b[31m", err);
			res.status(400).send({
				error: err
			});
		}
	},
	async getTeacherTests(req, res) {
		// Получить тесты созданные учителем
		try {
			let teacher = await User.findOne({ _id: req.userData.id });
			let tests = await Test.find({ _id: { $in: teacher.tests } });
			res.send({
				tests: tests
			});
		} catch (err) {
			console.log("\x1b[31m", err);
			res.status(404).send({
				error: err
			});
		}
	},
	async sendTestToStudents(req, res) {
		// Отправить выбранные тесты, выбранным студентам
		try {
			// Отправить выбранные тесты
			for (let test of req.body.tests) {
				await User.updateMany(
					{ _id: { $in: req.body.students } },
					{ $addToSet: { tests: test } }
				);
			}
			// Выбранным студентам
			for (let student of req.body.students) {
				await Test.updateMany(
					{ _id: { $in: req.body.tests } },
					{ $addToSet: { students: student } }
				);
			}
			res.send({
				message: "Update student test"
			});
		} catch (err) {
			console.log("\x1b[31m", err);
			res.status(400).send({
				error: err
			});
		}
	},
	async getStudentsResults(req, res){
		try{
			let teacher = await User.findOne({ _id: req.userData.id });
			let results = [];
			for (let item of teacher.students) {
				let student = await User.findOne({ _id: item });
				results.push({
					id: student.id,
					name: student.name,
					testResults: student.testResults
				});
			}
			res.send({
				results: results
			});
		}catch(err){
			console.log("\x1b[31m", err);
			res.status(400).send({
				error: err
			});
		}
	}
};
