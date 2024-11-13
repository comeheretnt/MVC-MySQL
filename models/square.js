class Square {
    constructor(sideLength) {
        this.sideLength = sideLength;
    }

    getPerimeter() {
        return 4 * this.sideLength; // Chu vi hình vuông
    }

    getArea() {
        return this.sideLength * this.sideLength; // Diện tích hình vuông
    }
}

// Kết nối cơ sở dữ liệu MySQL
const mysql = require('mysql2');

// Tạo kết nối đến cơ sở dữ liệu MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Hàm để lưu thông tin hình vuông vào MySQL
const saveSquareData = (sideLength, perimeter, area) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO squares (sideLength, perimeter, area) VALUES (?, ?, ?)';
        pool.query(sql, [sideLength, perimeter, area], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    Square,
    saveSquareData
};
