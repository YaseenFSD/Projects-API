"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const port = process.env.PORT || 3000;
    const app = express_1.default();
    app.use(express_1.default.json());
    // console.log(process.env.JWT_SIGNATURE)
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@projects-db.iksy4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    const db = mongoose_1.default.connection;
    yield mongoose_1.default.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    app.get("/projects", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield db.collection("projects").find().toArray();
        res.send(data);
    }));
    app.listen(port, () => {
        console.log(`Serving on port ${port}`);
    });
});
exports.startServer = startServer;
