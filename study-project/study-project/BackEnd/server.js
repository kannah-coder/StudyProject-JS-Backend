import express from "express";
import cors from "cors";
import connectDB from "./db.js";     // ✅ DB connection
import Topic from "./models/Topic.js";
import LearningList from "./models/LearningList.js";

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Connect to MongoDB
connectDB();

const PORT = 3000;

// ===============================
// 🧠 ROUTES
// ===============================

// ✅ GET all topics
app.get("/api/topics", async (req, res) => {
  try {
    // TODO: Fetch all topics from Topic model and return as JSON
    const topics=await Topic.find({});
    res.json(topics);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch topics" });
  }
});

// ✅ GET all learning list items
app.get("/api/learning", async (req, res) => {
  try {
    // TODO: Fetch all learning list items from LearningList model and return as JSON
     const learninglist=await LearningList.find({});
    res.json(learninglist);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch learning list" });
  }
});

// ✅ POST /api/learning/add → add or increment topic
app.post("/api/learning/add", async (req, res) => {
  try {
    // TODO:
    // 1. Get name, difficulty, image, language from req.body
    // 2. Check if topic already exists in LearningList
    // 3. If exists → increment quantity and recalculate totalDifficulty
    // 4. If not exists → create new LearningList item with quantity = 1
    // 5. Save to DB and return JSON response

    const {name,difficulty,image,language}=req.body;
    let topic=await LearningList.findOne({name});
    if(topic){
      topic.quantity++;
      topic.totalDifficulty=topic.quantity*topic.difficulty;
      await topic.save();
    }
    else{
      const newList=new LearningList({
        name,
        difficulty,
        image,
        language,
        quantity:1,
        totalDifficulty:difficulty
      });
      await newList.save();
    }

      const updatedtopics=await LearningList.find({});
      res.json(updatedtopics);

  } catch (err) {
    res.status(500).json({ error: "Failed to add topic" });
  }
});


// ✅ POST /api/seed → reset and insert topics
app.post("/api/seed", async (req, res) => {
  try {
    await Topic.deleteMany({});
    await LearningList.deleteMany({});
    const data = [
      // 🐍 Python
      { name: "List Comprehension", difficulty: 10, language: "Python", category: "Data Structures", image: "images/python_list_comprehension.png" },
      { name: "Decorators", difficulty: 15, language: "Python", category: "Functions", image: "images/python_decorators.png" },
      { name: "Generators", difficulty: 12, language: "Python", category: "Iterators", image: "images/python_generators.png" },

      // ☕ Java
      { name: "Inheritance", difficulty: 20, language: "Java", category: "OOP", image: "images/java_inheritance.png" },
      { name: "Interfaces", difficulty: 18, language: "Java", category: "OOP", image: "images/java_interfaces.png" },
      { name: "Streams API", difficulty: 25, language: "Java", category: "Collections", image: "images/java_streams_api.png" },

      // 🌐 JavaScript
      { name: "Promises", difficulty: 10, language: "JavaScript", category: "Asynchronous", image: "images/js_promises.png" },
      { name: "Arrow Functions", difficulty: 8, language: "JavaScript", category: "Functions", image: "images/js_arrow_functions.png" },
      { name: "Event Loop", difficulty: 14, language: "JavaScript", category: "Runtime", image: "images/js_event_loop.png" }
    ];
    const seeded = await Topic.insertMany(data);
    res.json({ message: "✅ Seeded successfully", count: seeded.length });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to seed topics" });
  }
});

// Root
app.get("/", (req, res) => {
  res.send("✅ Programming Topics API (TODO version) is running.");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
