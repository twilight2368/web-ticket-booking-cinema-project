const mongoose = require("mongoose");
const connectMongo = require("../../connections/connectMongo");

const { SeatType, Seat } = require("../../database/Seat");
const RoomModel = require("../../database/Room");

const generateSeatType = async () => {
  try {
    const seatTypes = [
      { name: "Vip", price: 60000 },
      { name: "Normal", price: 50000 },
    ];

    const createdSeatTypes = [];
    for (const type of seatTypes) {
      const existingType = await SeatType.findOne({ name: type.name });
      if (!existingType) {
        const newSeatType = new SeatType(type);
        const savedSeatType = await newSeatType.save();
        createdSeatTypes.push(savedSeatType);
        console.log(`SeatType created:`, savedSeatType);
      } else {
        console.log(`SeatType '${type.name}' already exists.`);
        createdSeatTypes.push(existingType);
      }
    }

    return createdSeatTypes;
  } catch (error) {
    console.error("Error creating seat types:", error.message);
    throw error;
  }
};

const generateRoom = async (
  rows,
  cols,
  name,
  row_vip_start,
  col_vip_start,
  row_vip_end,
  col_vip_end
) => {
  try {
    // Validate SeatTypes exist
    const vipSeatType = await SeatType.findOne({ name: "Vip" });
    const normalSeatType = await SeatType.findOne({ name: "Normal" });

    if (!vipSeatType || !normalSeatType) {
      throw new Error("Seat types 'Vip' and 'Normal' must exist.");
    }

    // Calculate total seats
    const totalSeats = rows * cols;

    // Create Room
    const newRoom = new RoomModel({
      name,
      total_seats: totalSeats,
      num_of_rows: rows,
      num_of_cols: cols,
    });

    const savedRoom = await newRoom.save();
    console.log("Room created:", savedRoom);

    // Generate Seats
    const seats = [];
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= cols; col++) {
        // Determine seat type (Vip or Normal)
        const isVip =
          row >= row_vip_start &&
          row <= row_vip_end &&
          col >= col_vip_start &&
          col <= col_vip_end;
        const seatType = isVip ? vipSeatType._id : normalSeatType._id;

        // Create seat object
        const seat = {
          room_id: savedRoom._id,
          seat_row: row,
          seat_column: col,
          seat_type: seatType,
        };
        seats.push(seat);
      }
    }

    // Save all seats to the database
    await Seat.insertMany(seats);
    console.log("Seats created:", seats.length);

    return { room: savedRoom, seats };
  } catch (error) {
    console.error("Error generating room:", error.message);
    throw error;
  }
};

async function main() {
  try {
    console.log("====================================");
    console.log("Connecting to MongoDB ...");
    console.log("====================================");
    await connectMongo();
    console.log("====================================");
    console.log("Connected to MongoDB ...");
    console.log("====================================");

    console.log("====================================");
    console.log("Starting generate seat type ...");
    console.log("====================================");
    await generateSeatType();
    console.log("====================================");
    console.log("Generated seat types successfully.");
    console.log("====================================");

    console.log("====================================");
    console.log("Starting generate cinema room ...");
    console.log("====================================");

    const roomsToGenerate = [
      {
        rows: 5,
        cols: 10,
        name: "num-1",
        row_vip_start: 2,
        row_vip_end: 4,
        col_vip_start: 2,
        col_vip_end: 9,
      },
      {
        rows: 5,
        cols: 10,
        name: "num-2",
        row_vip_start: 2,
        row_vip_end: 4,
        col_vip_start: 2,
        col_vip_end: 9,
      },
      {
        rows: 5,
        cols: 6,
        name: "num-3",
        row_vip_start: 2,
        row_vip_end: 4,
        col_vip_start: 2,
        col_vip_end: 5,
      },
      {
        rows: 5,
        cols: 6,
        name: "num-4",
        row_vip_start: 2,
        row_vip_end: 4,
        col_vip_start: 2,
        col_vip_end: 5,
      },
      {
        rows: 5,
        cols: 6,
        name: "num-5",
        row_vip_start: 2,
        row_vip_end: 4,
        col_vip_start: 2,
        col_vip_end: 5,
      },
    ];

    for (const roomParams of roomsToGenerate) {
      await generateRoom(
        roomParams.rows,
        roomParams.cols,
        roomParams.name,
        roomParams.row_vip_start,
        roomParams.col_vip_start,
        roomParams.row_vip_end,
        roomParams.col_vip_end
      );
    }

    console.log("====================================");
    console.log("Generated all cinema rooms successfully.");
    console.log("====================================");
  } catch (error) {
    console.error("An error occurred:", error.message);
  } finally {
    console.log("====================================");
    console.log("Closing MongoDB connection...");
    console.log("====================================");
    await mongoose.connection.close(); // Explicitly close the connection
    console.log("====================================");
    console.log("MongoDB connection closed.");
    console.log("====================================");
  }
}

main();
