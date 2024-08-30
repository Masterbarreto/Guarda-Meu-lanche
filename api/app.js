import { server } from './server/server.js'
const PORT = process.env.PORT


server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});