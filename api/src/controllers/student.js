const User = require("../models/User");
const Test = require("../models/Test");

module.exports = {
	async getActiveTests(req, res) {
		// Получение активных тестов (не пройденных)
		try {
			let student = await User.findOne({
				_id: req.userData.id
			});
			let activeTests = await Test.find({
				_id: {
					$in: student.tests
				}
			});

			res.send({
				tests: activeTests
			});
		} catch (err) {
			console.log("\x1b[31m", err);
			res.status(400).send({
				error: "Students test get error"
			});
		}
	},
	async getPassedTests(req, res) {
		// Получение пройденных тестов
		try {
			let student = await User.findOne({
				_id: req.userData.id
			});
			res.send({
				tests: student.testResults
			});
		} catch (err) {
			console.log("\x1b[31m", err);
			res.status(400).send({
				error: "Students test get error"
			});
		}
	},
	async passTest(req, res) {
		try {
			let test = await Test.findOne({
				_id: req.body.test
			});
			// Получаем пройденный тест
			let passedTest = req.body.passedTest;

			// Кол-во правильных ответов
			let isAnswerCount = 0;
			let correctAnswer = 0;
			for (let i = 0; i < test.questions.length; i++) {
				let answerCount = 0;
				for (let j = 0; j < test.questions[i].answers.length; j++) {
					// Выбранный и правильный ответ
					let isSelected = passedTest[i].answers[j].isSelected;
					let isAnswer = test.questions[i].answers[j].isAnswer;

					// Общее кол-во ответов для вычесления 100%
					if (isAnswer) {
						isAnswerCount++;
					}
					// Добавление правильных отмеченных ответов
					if (isSelected && isAnswer) {
						answerCount++;
					}
				}
				// Кол-во правильных отмеченных ответов
				correctAnswer += answerCount;
			}
			// Вычесление общего балла в %
			let testResultPercent = Math.round(
				(100 / isAnswerCount) * correctAnswer
			);

			let date = new Date(); //Дата для записи рещультата
			
			let testResult = {};

			// Изначальный тест (который составил учитель)
			let oldTest = test.questions;
			
			let testAnswers = [];
			for(let i = 0; i < passedTest.length; i++){
				let answers = [];
				let result = passedTest[i]; // Пройденный тест
				for(let j = 0; j < passedTest[i].answers.length; j++){
					// Деструктуризация ответов для получения выбранного и правильного в одном
					let answer = {
						...passedTest[i].answers[j],
						...oldTest[i].answers[j]
					}
					answers.push(answer);
				}
				// Замена старых ответов на деструктуризированные 
				result.answers = answers;
				testAnswers.push(result);
			}

			// Собранный, пройденный тест для отправки в базу
			testResult = {
				id: `${test._id}`,
				name: test.name,
				time: test.time,
				questions: testAnswers,
				result: testResultPercent,
				date: `${date.getDate()}.${date.getUTCMonth() +
					1}.${date.getUTCFullYear()}`
			};
			// Добавление теста в базу к студенту
			await User.updateOne(
				{
					_id: req.userData.id
				},
				{
					$push: {
						testResults: testResult
					},
					$pull: {
						tests: test._id
					}
				}
			);
			// Удаление студента из базы теста
			await Test.updateOne(
				{
					_id: test._id
				},
				{
					$pull: {
						students: req.userData.id
					}
				}
			);
			
			// Отправка сообщения об успешном выполнении
			res.send({
				message: "Тест отправлен"
			});
		} catch (err) {
			console.log("\x1b[31m", err);
			res.status(400).send({
				error: "PassTest error"
			});
		}
	},
};