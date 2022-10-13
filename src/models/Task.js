import { Schema, model, models } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
      trim: true,
      maxlength: [40, 'Title must be less than 40 characters'],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'Description must be less than 200 characters'],
    },
  },
  {
    timestamps: true, //created
    versionKey: false, // No __v
  }
);

// Configuración para que se muestre solo la información que necesito ver
taskSchema.methods.toJSON = function () {
  const { _id, ...object } = this.toObject(); //Referencia a todo el objeto
  object.id = _id; // Remplazo en el object

  return object;
};

// models ayuda a que si existe lo use si no lo crea
export default models.Task || model('Task', taskSchema);
