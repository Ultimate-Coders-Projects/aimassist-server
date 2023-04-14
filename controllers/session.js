const Session = require("../models/Session");

module.exports.startsession = async (req, res) => {
    let response = {
      success: false,
      message: "",
      errMessage: "",
      data: [],
    };
    try {
      let id;
      const { userid, distance, device } = req.body;
  
      if (device === 1) {
        id = "6439867fc5286f255c5e72c2";
      } else if (device === 2) {
        id = "64398681c5286f255c5e72c4";
      } else {
        id = "64398682c5286f255c5e72c6";
      }
  
      await Session.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            userid,
            distance,
            session_started: true,
          },
        },
        { new: true }
      );
    } catch (err) {
      response.errMessage = err.message;
      res.status(500).json(response);
    }
  };
  
  module.exports.endsession = async (req, res) => {
    let response = {
      success: false,
      message: "",
      errMessage: "",
    };
    try {
      const { sessionId } = req.body;
      await Session.findOneAndUpdate(
        { _id: sessionId },
        {
          $set: {
            userid: null,
            distance: null,
            session_started: false,
          },
        }
      );
    } catch (err) {
      response.errMessage = err.message;
      res.status(500).json(response);
    }
  };
  
  module.exports.getsession = async (req, res) => {
    let response = {
      success: false,
      message: "",
      errMessage: "",
      data: [],
    }
    try{
      const device = req.params.device;
      let id;
  
      if (device === "1") {
        id = "6439867fc5286f255c5e72c2";
      } else if (device === "2") {
        id = "64398681c5286f255c5e72c4";
      } else {
        id = "64398682c5286f255c5e72c6";
      }
      const sessionData = await Session.findOne({ _id: id });
      response.success = true;
      response.message = "Session data fetched successfully";
      response.data = sessionData;
      res.status(200).json(response);
    } catch (err) {
      response.errMessage = err.message;
      res.status(500).json(response);
    }
  }

module.exports.createSession = async (req, res) => {
    let response = {
        success: false,
        message: "",
        errMessage: "",
        data: [],
    };
    try {
        const { userid, distance } = req.body;
        const newSession = new Session({
        userid,
        distance,
        });
        await newSession.save();
        response.success = true;
        response.message = "Session data saved successfully";
        res.status(200).json(response);
    } catch (err) {
        response.errMessage = err.message;
        res.status(500).json(response);
    }
}