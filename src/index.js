// Import required modules
const express = require("express");
const fs = require("fs").promises;
const path = require("path");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

const dDriveDir = "D://files//data.json";
const filesDir = path.join(__dirname, "files");

// Endpoint to create a new file with JSON data
app.post("/files", async (req, res) => {
  try {
    const { filename, data } = req.body;
    // Check if filename and data are provided
    if (!filename || !data) {
      return res.status(400).send("Filename and data are required");
    }

    // Create the file path
    const filePath = path.join(filesDir, `${filename}.json`);

    // Write the JSON data to the file
    await fs.writeFile(dDriveDir, JSON.stringify(data));

    // Send a success response
    res.status(201).send("File created successfully");
  } catch (error) {
    console.log("File read failed:", err);
    return;
    // res.status(500).send("Internal Server Error");
  }
});

// Endpoint to retrieve a list of all files
app.get("/files", async (req, res) => {
  try {
    const files = await fs.readdir(dDriveDir);
    // const files = await fs.readdir("./files");
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to retrieve a single file and its content
app.get("/files/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    // const filePath = path.join(filesDir, `${filename}.json`);
    const data = await fs.readFile(dDriveDir, "utf8");
    // const data = await fs.readFile(`./files/${filename}.json`, "utf8");
    res.status(200).json(JSON.parse(data));
  } catch (error) {
    console.error(error);
    res.status(404).send("File not found");
  }
});

// Endpoint to update a file JSON data
app.put("/files/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const { data } = req.body;
    // const filePath = path.join(filesDir, `${filename}.json`);
    await fs.writeFile(dDriveDir, JSON.stringify(data));
    // await fs.writeFile(`./files/${filename}.json`, JSON.stringify(data));
    res.status(200).send("File updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to delete a file
app.delete("/files/:filename", async (req, res) => {
  try {
    // Check if the file exists before deleting
    const fileExists = await fs
      .access(dDriveDir)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      return res.status(404).send("File not found");
    }

    // Delete file
    await fs.unlink(dDriveDir);

    res.status(200).send("File deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(404).send("Internal Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
