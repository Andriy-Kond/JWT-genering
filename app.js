const jwt = require('jsonwebtoken');
require('dotenv').config();

// секретний рядко
const { SECRET_KEY } = process.env;

// id користувача
const payload = {
  id: '647b4930bf825983daba5742',
};

// Формуємо токен:
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
// третій аргумент - об'єкт налаштувань
// expiresIn - час життя. Якщо не вказати, то токен буде працювати вічно
console.log('token:', token);
// token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2I0OTMwYmY4MjU5ODNkYWJhNTc0MiIsImlhdCI6MTY4NTgwMTY0NywiZXhwIjoxNjg1ODg0NDQ3fQ.QpZgwyFF49NI_3pawFIQfbeGf0uHH7r-uGfSHxvrEB0

// Токен можна розкодувати:
const decodeToken = jwt.decode(token);
console.log('decodeToken:', decodeToken);
// decodeToken: { id: '647b4930bf825983daba5742', iat: 1685801778, exp: 1685884578 }
// iat - час коли токен був створений
// exp - час коли токен закінчиться
// Або так:
const verifyToken = jwt.verify(token, SECRET_KEY);
console.log('verifyToken:', verifyToken);
// verifyToken: { id: '647b4930bf825983daba5742', iat: 1687765354, exp: 1687848154 }

// Будь-хто може розкодувати токен, тому у payload персональні дані не зберігаються.

// Коли фронтенд присилає токен ми маємо його валідувати за допомогою методу verify у jwt.
// Цей метод перевіряє чи шифрували ми його за допомогою цього секретного ключа і чи не закінчився у нього термін дії.
// Якщо це невірний токен, то verify кидає помилку. Він не повертає false. Тому ми його загортаємо у try...catch
// Якщо токен вірний, то verify поверне payload, в якому ми можемо деструктуризувати id:

try {
  const { id } = jwt.verify(token, SECRET_KEY);
  console.log('id:', id);
  // id: 647b4930bf825983daba5742

  const fakeToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2I0OTMwYmY4MjU5ODNkYWJhNTc0MiIsImlhdCI6MTY4NTgwMTY0NywiZXhwIjoxNjg1ODg0NDQ3fQ.QpZgwyFF49NI_3pawFIQfbeGf0uHH7r-uGfSHxvrEBo';
  const result = jwt.verify(fakeToken, SECRET_KEY); // error: JsonWebTokenError: invalid signature
} catch (error) {
  console.log('error:', error);
}
