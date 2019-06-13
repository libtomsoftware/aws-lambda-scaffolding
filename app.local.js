const app = require("./app");
const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`App is listening on port ${port}.`));
