import {InferSchemaType, model, Schema} from "mongoose"

const noteSchema = new Schema({
    title: { type: String, required: true},
    text: { type: String},
}, {timestamps: true});

type Note = InferSchemaType<typeof noteSchema>; //typescript stuff

export default model<Note>("Note", noteSchema);