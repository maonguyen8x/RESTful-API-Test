// Import required modules
const express = require("express");
const fs = require("fs").promises;
const path = require("path");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const filesDir = path.join(__dirname, "files");

// Middleware for JSON parsing
app.use(express.json());

// Endpoint to create a new file with JSON data
app.post("/files", async (req, res) => {
  try {
    const { filename, data } = req.body;
    // Check if filename and data are provided
    if (!filename || !data) {
      return res.status(400).send("Filename and data are required");
    }

    // Construct the file path
    const filePath = path.join(filesDir, `${filename}.json`);

    await fs.writeFile(filePath, JSON.stringify(data));
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
    const files = await fs.readdir(filesDir);
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
    const filePath = path.join(filesDir, `${filename}.json`);
    const data = await fs.readFile(filePath, "utf8");
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
    const filePath = path.join(filesDir, `${filename}.json`);
    await fs.writeFile(filePath, JSON.stringify(data));
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
    const { filename } = req.params;
    const filePath = path.join(filesDir, `${filename}.json`);
    await fs.unlink(filePath);
    // await fs.unlink(`./files/${filename}.json`);
    res.status(200).send("File deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(404).send("File not found");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
