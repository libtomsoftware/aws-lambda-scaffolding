const app = require("../app");
const CONFIG = require("../app/config");
const port = CONFIG.APP.ADDRESS.HTTP_PORT;

app.listen(port, () => console.log(`App is listening on port ${port}.`));
