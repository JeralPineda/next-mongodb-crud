import Task from 'models/Task';
import { dbConnection } from 'utils/mongoose';

dbConnection();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const tasks = await Task.find();

        return res.status(200).json(tasks);
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({
          error: error.message,
        });
      }

    case 'POST':
      try {
        const newTask = new Task(body);

        // Guardar en la base de datos
        const savedTask = await newTask.save();

        return res.status(201).json(savedTask);
      } catch (error) {
        return res.status(500).json({
          error: error.message,
        });
      }

    default:
      return res.status(400).json({
        msg: 'Este método no esta soportado',
      });
  }
}
