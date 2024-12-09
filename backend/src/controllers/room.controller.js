const ShowModel = require("../models/database/Show");
const BookingModel = require("../models/database/Booking");
const RoomModel = require("../models/database/Room");
const { Seat, SeatType } = require("../models/database/Seat");

//TODO: Get cinema room information
const getAllRoomInformation = async (req, res, next) => {
  try {
    // Fetch all rooms
    const rooms = await RoomModel.find();

    // Fetch seats for each room
    const roomsWithSeats = await Promise.all(
      rooms.map(async (room) => {
        const seats = await Seat.find({ room_id: room._id }).populate(
          "seat_type"
        );
        return {
          ...room.toObject(),
          seats: seats.map((seat) => ({
            seat_id: seat._id,
            seat_row: seat.seat_row,
            seat_column: seat.seat_column,
            seat_type: seat.seat_type,
          })),
        };
      })
    );

    res.status(200).json(roomsWithSeats);
  } catch (error) {
    next(error);
  }
};

//TODO: Get cinema room information with the status of specific shows
const getRoomInformationByShow = async (req, res, next) => {
  try {
    const { show_id } = req.params;

    // Validate `show_id` parameter
    if (!show_id) {
      return res.status(400).json({ error: "Show ID is required" });
    }

    // Fetch show details
    const show = await ShowModel.findById(show_id).populate("room_id");
    if (!show) {
      return res.status(404).json({ error: "Show not found" });
    }

    const roomId = show.room_id._id;

    // Fetch room details
    const room = await RoomModel.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Fetch all seats for the room
    const seats = await Seat.find({ room_id: roomId }).populate("seat_type");

    // Fetch all bookings for the show
    const bookings = await BookingModel.find({ show_id });

    // Map booked seats for quick lookup
    const bookedSeats = new Set(bookings.flatMap((booking) => booking.seats));

    // Map seat details with booking status
    const seatsWithStatus = seats.map((seat) => ({
      seat_id: seat._id,
      seat_row: seat.seat_row,
      seat_column: seat.seat_column,
      seat_type: {
        name: seat.seat_type.name,
        price: seat.seat_type.price,
      },
      is_booked: bookedSeats.has(seat._id), // Check if seat is booked
    }));

    res.status(200).json({
      room: {
        ...room.toObject(),
        seats: seatsWithStatus,
      },
      show_details: {
        show_id: show._id,
        date_show: show.date_show,
        time_start: show.time_start,
        time_end: show.time_end,
      },
    });
  } catch (error) {
    next(error);
  }
};

//TODO: Create room
const generateRoom = async (req, res, next) => {
  try {
    const {
      name,
      rows,
      cols,
      row_vip_start,
      row_vip_end,
      col_vip_start,
      col_vip_end,
    } = req.body;

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

    return res.json({ room: savedRoom, seats: seats });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRoomInformation,
  getRoomInformationByShow,
  generateRoom,
};
