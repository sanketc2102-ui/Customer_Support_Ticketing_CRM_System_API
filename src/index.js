import app from "./app.js";

const PORT = 8000;

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`),
);
