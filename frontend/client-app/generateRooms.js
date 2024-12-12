const fs = require("fs");

// Hàm tạo ghế
function generateSeats(rows, columns) {
  const seats = [];
  const types = ["normal", "vip", "couple"];
  const statuses = ["available", "booked"];
  let seatId = 1;

  for (let row = 0; row < rows; row++) {
    // Chuyển row thành ký tự chữ cái, bắt đầu từ 'A'
    const rowLabel = String.fromCharCode(65 + row); // 65 là mã ASCII của 'A'

    for (let col = 0; col < columns; col++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      seats.push({
        id:  `${rowLabel}${col + 1}`, // Tên ghế dạng A1, A2, ...
        type: type,
        status: status,
      });
      seatId++;
    }
  }
  return seats;
}

// Hàm tạo phòng
function generateRooms(numRooms) {
  const rooms = [];
  for (let i = 1; i <= numRooms; i++) {
    const totalSeats = Math.floor(Math.random() * 81) + 100; // Số ghế từ 100 đến 180
    const rows = Math.ceil(totalSeats / 12); // Chia đều hàng
    const columns = Math.ceil(totalSeats / rows);

    rooms.push({
      roomId: i,
      rows: rows,
      columns: columns,
      seats: generateSeats(rows, columns),
      seatPrices: {
        normal: 50000,
        vip: 70000,
        couple: 100000,
      },
    });
  }
  return rooms;
}

// Sinh dữ liệu và ghi vào db.json
const rooms = generateRooms(10);
const data = { rooms };

fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
console.log("Dữ liệu đã được ghi vào db.json");
