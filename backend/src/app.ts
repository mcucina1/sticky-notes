import "dotenv/config";
import express, {NextFunction, Request, Response} from "express";
import noteRoutes from "./routes/notes"
import morgan from "morgan"
import createHttpError, { isHttpError } from "http-errors";

const app = express();
app.use(morgan("dev"))

app.use(express.json())

app.use("/api/notes", noteRoutes)

// Unknown Endpoint
app.use((req,res,next) => {
    next(createHttpError(404,"Endpoint not found"))
})

// Unknown Error
app.use((error:unknown, request:Request, response:Response, next:NextFunction) => {
    console.log(error)
    let errorMsg = "An unknown error occurred"
    let statusCode = 500
    if (isHttpError(error)){
        statusCode = error.status
        errorMsg = error.message
    }
    response.status(statusCode).json({error: errorMsg})
})

export default app;