const { Square, saveSquareData } = require('../models/square');

// Controller để hiển thị form
exports.showForm = (req, res) => {
    res.render('index', { perimeter: null, area: null });
};

// Controller để tính chu vi và diện tích của hình vuông và lưu vào MySQL
exports.calculateSquare = async (req, res) => {
    const { sideLength } = req.body;
    console.log('Received side length:', sideLength);

    const square = new Square(Number(sideLength)); // Tạo đối tượng Square với chiều dài cạnh
    const perimeter = square.getPerimeter(); // Tính chu vi
    const area = square.getArea(); // Tính diện tích

    console.log('Calculated perimeter:', perimeter);
    console.log('Calculated area:', area);

    try {
        await saveSquareData(sideLength, perimeter, area); // Lưu vào cơ sở dữ liệu
        res.render('index', { perimeter, area }); // Hiển thị kết quả lên form
    } catch (error) {
        console.error("Error saving square data:", error);
        res.render('index', { perimeter: null, area: null }); // Nếu có lỗi, trả về kết quả null
    }
};
