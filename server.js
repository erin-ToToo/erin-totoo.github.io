const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const simpleGit = require("simple-git");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
const port = 5500;
const uploadFolder = "./data";
const git = simpleGit(uploadFolder);
const wss = new WebSocket.Server({ port: 3001 }); // WebSocket 監聽 3001 端口

app.use(cors());
app.use(express.json());
app.use(express.static("data"));

// 設定 Multer 儲存檔案
const storage = multer.diskStorage({
    destination: uploadFolder,
    filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// WebSocket 連線
wss.on("connection", (ws) => {
    console.log("前端連線成功");
    ws.send(JSON.stringify({ status: "connected" }));
});

// 1️⃣ 圖片上傳 API
app.post("/upload", upload.single("file"), (req, res) => {
    res.json({ message: "圖片上傳成功", filename: req.file.filename });
});

// 2️⃣ 儲存 JSON API
app.post("/save", async (req, res) => {
    const { filename, content } = req.body;
    await fs.writeFile(`${uploadFolder}/${filename}`, JSON.stringify(content, null, 2));
    res.json({ message: "JSON 儲存成功" });
});

// 3️⃣ Git 推送 API
app.post("/push", async (req, res) => {
    try {
        broadcast({ status: "開始 Git 操作..." });

        await git.add("./*");
        broadcast({ status: "檔案已加入 Git 暫存區" });

        await git.commit("更新資料");
        broadcast({ status: "已提交到 Git 本地倉庫" });

        await git.push("origin", "main"); // 確保 GitHub Pages 部署的是 main 分支
        broadcast({ status: "成功推送到 GitHub" });

        res.json({ message: "Git 操作完成" });
    } catch (error) {
        broadcast({ status: `Git 錯誤: ${error.message}` });
        res.status(500).json({ error: error.message });
    }
});

// WebSocket 廣播訊息
function broadcast(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

app.listen(port, () => console.log(`伺服器運行於 http://localhost:${port}`));
