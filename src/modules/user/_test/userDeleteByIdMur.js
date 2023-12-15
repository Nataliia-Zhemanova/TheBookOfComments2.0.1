const { requestGql } = require ('../../helper')
// Импортируем функцию `expect` из библиотеки `chai`, которая используется для проверки результатов HTTP-запросов
const { expect } = require('chai');
const { userCreateM, userDeleteById, userDeleteByIdM} = require('./queries')
const {userInput} = require('./data')
const User = require ('../User')
const generateId = require('../../../utils/generateId')


// Начинаем тестовый набор `USER DELETE BY ID`
describe('USER DELETE BY ID', () => {

    // Начинаем тестовый набор `USER GET BY ID - POSITIVE`
    describe('USER DELETE BY ID - POSITIVE', () => {

        before('user delete all', (done) => {
            User.deleteMany({});
            return done();
        });

        // Объявляем переменную: `userId`
        let userId = null;
        // Начинаем тест `user create`
        it('user create', (done) => {
            // Определяем POST-данные для создания пользователя
            const postData = {
                query: userCreateM,
                variables: userInput,
            };
            // Выполняем POST-запрос к конечной точке GraphQL для создания пользователя
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    // Обрабатываем ошибки
                    if (err) {
                        return done(err);
                    }
                    // Сохраняем ID созданного пользователя
                    userId = res.body.data.userCreate._id;
                    // Выводим в консоль тело ответа и ID пользователя
                    console.log('RESP BODY ===', res.body);
                    console.log('USER ID ===', userId);
                    // Завершаем тест
                    done();
                });
        });

        // Начинаем тест `user delete by id`
        it('user delete by id', (done) => {
            // Определяем POST-данные для удаления пользователя по ID
            const userDelete = {
                userId,
            };
            const postData = {
                query: userDeleteByIdM,
                variables: userDelete,
            };

            // Выполняем POST-запрос к конечной точке GraphQL для получения пользователя по ID
            requestGql(postData)
                .expect(200)
                .end((err, res) => {

                    // Обрабатываем ошибки
                    if (err) {
                        return done(err);
                    }

                    const respData = res.body.data;
                    // Выводим в консоль тело ответа
                    console.log('RESP BODY USER DELETE BY ID ===', res.body);

                    // Проверяем, что результат совпадает с ожидаемым
                    expect(res.body.data.userDeleteById).eq(true);

                    // Завершаем тест
                    done();
                });
        });
    });

    // Начинаем тестовый набор `USER GET BY ID - NEGATIVE`
    describe('USER GET BY ID - NEGATIVE', () => {

        before('user delete all', (done) => {
            User.deleteMany({});
            return done();
        });

        // Объявляем переменную: `userId`
        let userId = null;
        // Начинаем тест `user create`
        it('user create', (done) => {
            // Определяем POST-данные для создания пользователя
            const postData = {
                query: userCreateM,
                variables: userInput,
            };
            // Выполняем POST-запрос к конечной точке GraphQL для создания пользователя
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    // Обрабатываем ошибки
                    if (err) {
                        return done(err);
                    }
                    // Сохраняем ID созданного пользователя
                    userId = res.body.data.userCreate._id;
                    // Выводим в консоль тело ответа и ID пользователя
                    console.log('RESP BODY ===', res.body);
                    console.log('USER ID ===', userId);
                    // Завершаем тест
                    done();
                });
        });

        // Начинаем тест `user delete by id`
        it('user delete by wrong id (one symbol less)', (done) => {
            // Определяем POST-данные для удаления пользователя по ID
            const userDelete = {
                userId,
            };
            console.log(userDelete);
            userDelete.userId = userDelete.userId.slice(0, -1);
            console.log(userDelete);
            const postData = {
                query: userDeleteByIdM,
                variables: userDelete,
            };

            // Выполняем POST-запрос к конечной точке GraphQL для получения пользователя по ID
            requestGql(postData)
                .expect(200)
                .end((err, res) => {

                    // Обрабатываем ошибки
                    if (err) {
                        return done(err);
                    }

                    const respData = res.body.errors[0];
                    // Выводим в консоль тело ответа
                    console.log('RESP BODY USER DELETE BY ID ===', respData);

                    // Проверяем, что результат совпадает с ожидаемым
                    expect(respData.message).eq('Cast to ObjectId failed for value "' + userDelete.userId + '" (type string) at path "_id" for model "User"');

                    // Завершаем тест
                    done();
                });
        });
    });


});