const { expect } = require('chai'); // Импортируем функцию expect из chai для утверждений
const { requestGql } = require ('../../helper')
const { userGetAllQ} = require('./queries')
const {arg} = require('./data')

describe('USERS GET ALL', () => { // Запускаем тестовый набор для получения всех пользователей
    describe('USERS GET ALL - POSITIVE', () => { // Запускаем тестовый сценарий для успешного получения всех пользователей
        it('users get all', (done)  => { // Тестовый сценарий для получения всех пользователей
            const arg = {
            amount: 5};
            const postData = { // Создаем запрос GraphQL для получения всех пользователей
                query: userGetAllQ,
                variables: arg, // объект, содержащий переменные, передаваемые в запрос GraphQL
            };
            requestGql(postData)
                .expect(200) // Ожидаем успешный код состояния HTTP
                .end((err, res) => {
                    if (err) {
                        done(err); // Передаем ошибку в done
                        return;
                    }
                    const respData = res.body.data;
                    expect(respData.usersGetAll.length).not.eq(0);
                    expect(respData.usersGetAll.length).eq(arg.amount);
                    console.log(respData);
                    console.log(respData.usersGetAll.length);
                    done(); // Завершаем тест
                })
        });
        });
    describe('USERS GET ALL - NEGATIVE', () => {});
});