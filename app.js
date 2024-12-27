const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 3000;
const host = "http://" + process.env.HOST + ":" + PORT;

const app = express();
app.use(cors({ origin: "*" }));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.set("io", io);

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Importer et monter les routes
const auth = require('./routes/auth')
const utilisateureRoutes = require("./routes/utilisateur");
const paiementRoutes = require("./routes/paiment");
const coursRoutes = require('./routes/cours');
const examenRoutes = require('./routes/examen');
const inscriptionRoutes = require('./routes/inscription');
const participationRoutes = require('./routes/participation')
const quizRoutes = require('./routes/quiz')
const livreRoutes = require('./routes/livre')
const videoRoutes = require('./routes/video')
const supportRoutes = require('./routes/support')
const panierRoutes = require('./routes/panier')

app.use('/auth', auth)
app.use("/utilisateur", utilisateureRoutes);
app.use("/paiement", paiementRoutes);
app.use("/cours", coursRoutes);
app.use("/examen", examenRoutes);
app.use("/inscription", inscriptionRoutes);
app.use("/participation", participationRoutes);
app.use("/quiz", quizRoutes);
app.use("/livre", livreRoutes);
app.use("/video", videoRoutes);
app.use("/support", supportRoutes);
app.use("/panier", panierRoutes);


io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté");
  socket.on("message", (data) => {
    console.log("Message reçu:", data);
    socket.emit("message", "Message reçu");
  });
  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(host);
});