import app from "./app.js";
import connectDB from "./db/dbConnection.js";

const PORT = 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`server is running on http://localhost:${PORT}`),
    );
  })
  .catch((err) => {
    console.error(err);
  });
