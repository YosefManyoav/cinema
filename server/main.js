const express = require('express')
const cors = require('cors')
const userRouter = require('./Router/userRouter')
const movieRouter = require("./Router/movieRouter")
const membersRouter = require("./Router/membersRouter")
const subRouter = require ('./Router/subRouter')
require('./config/connect')

const app = express();
app.use(cors());
app.use(express.json());

//Routes
const PORT = 5000
app.use("/connect", userRouter);
app.use("/movies", movieRouter)
app.use("/members", membersRouter)
app.use("/subscriptions", subRouter)

app.listen(PORT, () => {
    console.log(`BE started at port http://localhost:${PORT}`);
})