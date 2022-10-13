import Task from 'models/Task';
import { dbConnection } from 'utils/mongoose';

dbConnection();

export default async function getTask(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const task = await Task.findById(id);

        if (!task) return res.status(404).json({ msg: 'No se encontró ninguna tarea' });

        return res.status(200).json(task);
      } catch (error) {
        return res.status(500).json({
          error: error.message,
        });
      }

    case 'PUT':
      try {
        const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });

        if (!updatedTask) return res.status(404).json({ msg: 'No se encontró ninguna tarea' });

        return res.status(200).json(updatedTask);
      } catch (error) {
        return res.status(500).json({
          error: error.message,
        });
      }

    case 'DELETE':
      try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) return res.status(404).json({ msg: 'No se encontró ninguna tarea' });

        return res.status(200).json(deletedTask);
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
