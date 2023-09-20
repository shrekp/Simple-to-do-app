const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// Connect to MongoDB (make sure you have MongoDB running)
mongoose.connect('mongodb://localhost:27017/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  description: String,
  priority: Number,
});

const Task = mongoose.model('Task', taskSchema);

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to create a new task
app.post('/tasks', async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'Task description is required.' });
  }

  try {
    const task = new Task({ description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Unable to create task.' });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort('priority');
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Unable to fetch tasks.' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndRemove(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.json(deletedTask);
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Unable to delete task.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
