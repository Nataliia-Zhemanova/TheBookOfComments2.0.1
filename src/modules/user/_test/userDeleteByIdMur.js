const { requestGql } = require ('../../helper')
// Импортируем функцию `expect` из библиотеки `chai`, которая используется для проверки результатов HTTP-запросов
const { expect } = require('chai');
const { userCreateM, userDeleteById, userDeleteByIdM} = require('./queries')
const {arg} = require('./data')


// Начинаем тестовый набор `USER DELETE BY ID`
describe('USER DELETE BY ID', () => {

    // Начинаем тестовый набор `USER GET BY ID - POSITIVE`
    describe('USER DELETE BY ID - POSITIVE', () => {
        // Объявляем переменную: `userId`
        let userId = null;
        // Начинаем тест `user create`
        it('user create', (done) => {
            // Определяем POST-данные для создания пользователя
            const postData = {
                query: userCreateM,
                variables: arg,
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
    describe('USER GET BY ID - NEGATIVE', () => {});
});