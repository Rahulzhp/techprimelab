const express = require("express");
const projectRoute = express.Router();
const { ProjectModel } = require("../model/project");

const PAGE_SIZE = 5; // Number of items per page

projectRoute.get("/", async (req, res) => {
    const { search, page = 1 } = req.query;
    const skip = (page - 1) * PAGE_SIZE;

    try {
        const filter = {}; // Create an empty filter object

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filter.$or = [
                { project_theme: searchRegex },
                { reason: searchRegex },
                { type: searchRegex },
                { division: searchRegex },
                { category: searchRegex },
                { priority: searchRegex },
                { department: searchRegex },
                { start_date: searchRegex },
                { end_date: searchRegex },

                { location: searchRegex },
                { status: searchRegex },
            ];
            // Add a search filter to match any of the fields using a case-insensitive regular expression
        }

        const count = await ProjectModel.find(filter).countDocuments();
        const totalPages = Math.ceil(count / PAGE_SIZE);

        const data = await ProjectModel.aggregate([
            {
                $match: filter,
            }
        ])
            .skip(skip)
            .limit(PAGE_SIZE);

        res.send({ data, totalPages });
    } catch (err) {
        res.send(err);
    }
});

projectRoute.get("/sort/high", async (req, res) => {
    const { page = 1, search } = req.query;
    const skip = (page - 1) * PAGE_SIZE;
    try {
        const filter = {}; // Create an empty filter object

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filter.$or = [
                { project_theme: searchRegex },
                { reason: searchRegex },
                { type: searchRegex },
                { division: searchRegex },
                { category: searchRegex },
                { priority: searchRegex },
                { department: searchRegex },
                { start_date: searchRegex },
                { end_date: searchRegex },

                { location: searchRegex },
                { status: searchRegex },
            ];
            // Add a search filter to match any of the fields using a case-insensitive regular expression
        }

        const count = await ProjectModel.find(filter).countDocuments();
        const totalPages = Math.ceil(count / PAGE_SIZE);

        const data = await ProjectModel.aggregate([
            {
                $match: filter,
            },
            {
                $addFields: {
                    priorityOrder: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$priority", "High"] }, then: 0 },
                                { case: { $eq: ["$priority", "Medium"] }, then: 1 },
                                { case: { $eq: ["$priority", "Low"] }, then: 2 },
                            ],
                            default: 3,
                        },
                    },
                },
            },
            { $sort: { priorityOrder: 1 } },
        ])
            .skip(skip)
            .limit(PAGE_SIZE);

        res.send({ data, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});



projectRoute.get("/sort/low", async (req, res) => {

    const { page = 1, search } = req.query;
    const skip = (page - 1) * PAGE_SIZE;
    try {
        const filter = {}; // Create an empty filter object

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filter.$or = [
                { project_theme: searchRegex },
                { reason: searchRegex },
                { type: searchRegex },
                { division: searchRegex },
                { category: searchRegex },
                { priority: searchRegex },
                { department: searchRegex },
                { start_date: searchRegex },
                { end_date: searchRegex },
                { location: searchRegex },
                { status: searchRegex },
            ];
            // Add a search filter to match any of the fields using a case-insensitive regular expression
        }

        const count = await ProjectModel.find(filter).countDocuments();
        const totalPages = Math.ceil(count / PAGE_SIZE);

        const data = await ProjectModel.aggregate([
            {
                $match: filter,
            },
            {
                $addFields: {
                    priorityOrder: {
                        $switch: {
                            branches: [
                                { case: { $eq: ['$priority', 'Low'] }, then: 0 },
                                { case: { $eq: ['$priority', 'Medium'] }, then: 1 },
                                { case: { $eq: ['$priority', 'High'] }, then: 2 }
                            ],
                            default: 3
                        }
                    }
                }
            },
            { $sort: { priorityOrder: 1 } },
        ])
            .skip(skip)
            .limit(PAGE_SIZE);
        res.send({ data, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});


projectRoute.get("/sort/project", async (req, res) => {
    const { page = 1, search } = req.query;
    const skip = (page - 1) * PAGE_SIZE;
    try {
        const filter = {}; // Create an empty filter object

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filter.$or = [
                { project_theme: searchRegex },
                { reason: searchRegex },
                { type: searchRegex },
                { division: searchRegex },
                { category: searchRegex },
                { priority: searchRegex },
                { department: searchRegex },
                { start_date: searchRegex },
                { end_date: searchRegex },
                { location: searchRegex },
                { status: searchRegex },
            ];
            // Add a search filter to match any of the fields using a case-insensitive regular expression
        }

        const count = await ProjectModel.find(filter).countDocuments();
        const totalPages = Math.ceil(count / PAGE_SIZE);

        const data = await ProjectModel.aggregate([
            {
                $match: filter,
            },
            {
                $sort: { project_theme: 1 } // Sort project_theme in ascending alphabetical order
            }


        ]).skip(skip)
            .limit(PAGE_SIZE);
        res.send({ data, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});


projectRoute.get("/status/running", async (req, res) => {
    const { page = 1, search } = req.query;
    const skip = (page - 1) * PAGE_SIZE;
    try {
        const filter = {}; // Create an empty filter object

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filter.$or = [
                { project_theme: searchRegex },
                { reason: searchRegex },
                { type: searchRegex },
                { division: searchRegex },
                { category: searchRegex },
                { priority: searchRegex },
                { department: searchRegex },
                { start_date: searchRegex },
                { end_date: searchRegex },
                { location: searchRegex },
                { status: searchRegex },
            ];
            // Add a search filter to match any of the fields using a case-insensitive regular expression
        }

        const count = await ProjectModel.find(filter).countDocuments();
        const totalPages = Math.ceil(count / PAGE_SIZE);

        const data = await ProjectModel.aggregate([
            {
                $match: filter,
            },
            {
                $addFields: {
                    priorityOrder: {
                        $switch: {
                            branches: [
                                { case: { $eq: ['$status', 'Running'] }, then: 0 },
                                { case: { $eq: ['$status', 'Closed'] }, then: 1 },
                                { case: { $eq: ['$status', 'Cancelled'] }, then: 2 }
                            ],
                            default: 3
                        }
                    }
                }
            },
            { $sort: { priorityOrder: 1 } }
        ]).skip(skip)
            .limit(PAGE_SIZE);
        res.send({ data, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});


projectRoute.get("/status/close", async (req, res) => {
    const { page = 1, search } = req.query;
    const skip = (page - 1) * PAGE_SIZE;
    try {
        const filter = {}; // Create an empty filter object

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filter.$or = [
                { project_theme: searchRegex },
                { reason: searchRegex },
                { type: searchRegex },
                { division: searchRegex },
                { category: searchRegex },
                { priority: searchRegex },
                { department: searchRegex },
                { start_date: searchRegex },
                { end_date: searchRegex },
                { location: searchRegex },
                { status: searchRegex },
            ];
            // Add a search filter to match any of the fields using a case-insensitive regular expression
        }

        const count = await ProjectModel.find(filter).countDocuments();
        const totalPages = Math.ceil(count / PAGE_SIZE);

        const data = await ProjectModel.aggregate([
            {
                $match: filter,
            },
            {
                $addFields: {
                    priorityOrder: {
                        $switch: {
                            branches: [
                                { case: { $eq: ['$status', 'Closed'] }, then: 0 },
                                { case: { $eq: ['$status', 'Running'] }, then: 1 },
                                { case: { $eq: ['$status', 'Cancelled'] }, then: 2 }
                            ],
                            default: 3
                        }
                    }
                }
            },
            { $sort: { priorityOrder: 1 } }
        ]).skip(skip)
            .limit(PAGE_SIZE);
        res.send({ data, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

projectRoute.get("/status/cancel", async (req, res) => {
    const { page = 1, search } = req.query;
    const skip = (page - 1) * PAGE_SIZE;
    try {
        const filter = {}; // Create an empty filter object

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filter.$or = [
                { project_theme: searchRegex },
                { reason: searchRegex },
                { type: searchRegex },
                { division: searchRegex },
                { category: searchRegex },
                { priority: searchRegex },
                { department: searchRegex },
                { start_date: searchRegex },
                { end_date: searchRegex },
                { location: searchRegex },
                { status: searchRegex },
            ];
            // Add a search filter to match any of the fields using a case-insensitive regular expression
        }

        const count = await ProjectModel.find(filter).countDocuments();
        const totalPages = Math.ceil(count / PAGE_SIZE);

        const data = await ProjectModel.aggregate([
            {
                $match: filter,
            },
            {
                $addFields: {
                    priorityOrder: {
                        $switch: {
                            branches: [
                                { case: { $eq: ['$status', 'Cancelled'] }, then: 0 },
                                { case: { $eq: ['$status', 'Closed'] }, then: 1 },
                                { case: { $eq: ['$status', 'Running'] }, then: 2 }
                            ],
                            default: 3
                        }
                    }
                }
            },
            { $sort: { priorityOrder: 1 } }
        ]).skip(skip)
            .limit(PAGE_SIZE);
        res.send({ data, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

projectRoute.get("/start/date", async (req, res) => {
    const { page = 1, search } = req.query;
    const skip = (page - 1) * PAGE_SIZE;
    try {
        const filter = {}; // Create an empty filter object

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filter.$or = [
                { project_theme: searchRegex },
                { reason: searchRegex },
                { type: searchRegex },
                { division: searchRegex },
                { category: searchRegex },
                { priority: searchRegex },
                { department: searchRegex },
                { start_date: searchRegex },
                { end_date: searchRegex },
                { location: searchRegex },
                { status: searchRegex },
            ];
            // Add a search filter to match any of the fields using a case-insensitive regular expression
        }

        const count = await ProjectModel.find(filter).countDocuments();
        const totalPages = Math.ceil(count / PAGE_SIZE);

        const data = await ProjectModel.aggregate([
            {
                $match: filter,
            },
            {
                $sort: {
                    start_date: 1, // Sort by start date in ascending order
                    // If start dates are the same, sort by end date in ascending order
                },
            },
        ]).skip(skip)
            .limit(PAGE_SIZE);
        res.send({ data, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

projectRoute.get("/end/date", async (req, res) => {
    const { page = 1, search } = req.query;
    const skip = (page - 1) * PAGE_SIZE;
    try {
        const filter = {}; // Create an empty filter object

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filter.$or = [
                { project_theme: searchRegex },
                { reason: searchRegex },
                { type: searchRegex },
                { division: searchRegex },
                { category: searchRegex },
                { priority: searchRegex },
                { department: searchRegex },
                { start_date: searchRegex },
                { end_date: searchRegex },
                { location: searchRegex },
                { status: searchRegex },
            ];
            // Add a search filter to match any of the fields using a case-insensitive regular expression
        }

        const count = await ProjectModel.find(filter).countDocuments();
        const totalPages = Math.ceil(count / PAGE_SIZE);

        const data = await ProjectModel.aggregate([
            {
                $match: filter,
            },
            {
                $sort: {
                    // Sort by start date in ascending order
                    end_date: 1// If start dates are the same, sort by end date in ascending order
                },
            },
        ]).skip(skip)
            .limit(PAGE_SIZE);
        res.send({ data, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});
projectRoute.get("/dashboard", async (req, res) => {
    try {
        const Total = await ProjectModel.find();
        const Total_STR = await ProjectModel.find({ department: "Startegy" });
        const Total_STR_Closed = await ProjectModel.find({
            department: "Startegy",
            status: "Closed",
        });
        const Total_FIN = await ProjectModel.find({ department: "Finance" });
        const Total_FIN_Closed = await ProjectModel.find({
            department: "Finance",
            status: "Closed",
        });
        const Total_QLT = await ProjectModel.find({ department: "Quality" });
        const Total_QLT_Closed = await ProjectModel.find({
            department: "Quality",
            status: "Closed",
        });
        const Total_MAN = await ProjectModel.find({ department: "Maintenance" });
        const Total_MAN_Closed = await ProjectModel.find({
            department: "Maintenance",
            status: "Closed",
        });
        const Total_STO = await ProjectModel.find({ department: "Stores" });
        const Total_STO_Closed = await ProjectModel.find({
            department: "Stores",
            status: "Closed",
        });
        const Total_HR = await ProjectModel.find({ department: "Hr" });
        const Total_HR_Closed = await ProjectModel.find({
            department: "Hr",
            status: "Closed",
        });

        const currentDate = new Date();
        const closureDelayProjects = Total.filter((project) => {
            const endDate = new Date(project.end_date); // Convert endDate string to Date object
            return endDate < currentDate && project.status === "Running";
        });
        const closureDelayCount = closureDelayProjects.length;
        const Running = await ProjectModel.find({ status: "Running" });
        const Registered = await ProjectModel.find({ status: "Registered" });
        const Canceled = await ProjectModel.find({ status: "Cancelled" });
        const Closed = await ProjectModel.find({ status: "Closed" });
        res.send({
            Running: Running.length,
            Registered: Registered.length,
            Canceled: Canceled.length,
            Closed: Closed.length,
            closureDelay: closureDelayCount,
            Total: Total.length,
            Total_FIN: Total_FIN.length,
            Total_FIN_Closed: Total_FIN_Closed.length,
            Total_STR: Total_STR.length,
            Total_STR_Closed: Total_STR_Closed.length,
            Total_QLT: Total_QLT.length,
            Total_QLT_Closed: Total_QLT_Closed.length,
            Total_MAN: Total_MAN.length,
            Total_MAN_Closed: Total_MAN_Closed.length,
            Total_STO: Total_STO.length,
            Total_STO_Closed: Total_STO_Closed.length,
            Total_HR: Total_HR.length,
            Total_HR_Closed: Total_HR_Closed.length
        });
    } catch (err) {
        res.send(err);
    }
});

projectRoute.post("/", async (req, res) => {
    const payload = req.body;
    try {
        const data = new ProjectModel(payload);
        await data.save();
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});
projectRoute.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        const data = await ProjectModel.findByIdAndUpdate({ _id: id }, payload);
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

module.exports = {
    projectRoute
};