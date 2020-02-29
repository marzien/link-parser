const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 5000
const ENV = process.env.NODE_ENV || "Development"

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")))

app.use(express.json({ extended: false }))

app.use("/api/parser", require("./backend/routes/parser"))

app.listen(PORT, (err) => {
  if (err) console.error("❌ Unable to connect the server: ", err)
  console.log(`🌍 Server listening on port ${PORT} - ${ENV} environment`)
})
