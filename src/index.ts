import app from "server";
import logger from "shared/Logger";
import "./pre-start"; // Must be the first import

// Start the server
const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
    logger.info("Express server started on port: " + port);
});
