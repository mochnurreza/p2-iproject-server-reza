const Booking = require('../../booking')

module.exports = {
    actionConfirmation: async (req, res) => {
        const { id } = req.params;
        try {
          const booking = await Booking.findOne({ _id: id });
          booking.payments.status = 'Accept';
          await booking.save();
          res.status(200).json({message: "payment cofirm"})
        } catch (error) {
          res.status(400).json(error)
        }
      },

      actionReject: async (req, res) => {
        const { id } = req.params;
        try {
          const booking = await Booking.findOne({ _id: id });
          booking.payments.status = 'Reject';
          await booking.save();
          res.status(200).json({message: "payment reject"})
        } catch (error) {
            res.status(400).json(error)
        }
      }
}