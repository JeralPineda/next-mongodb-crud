import { connect, connection } from 'mongoose';

//Constante para validar si existe una conexión y asi evitar generar otra cada vez que se importe
const conn = {
  isConected: false,
};

export const dbConnection = async () => {
  try {
    if (conn.isConected) return;

    const db = await connect(process.env.MONGODB_URL);

    conn.isConected = db.connection.readyState;

    console.log(`Conectado a la DB "${db.connection.name}" ✅`);
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la base de datos ❌');
  }
};
