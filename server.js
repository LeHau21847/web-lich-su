import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'db.json');

const app = express();
app.use(cors());
app.use(express.json());

// Khởi tạo DB nếu chưa có
if (!fs.existsSync(dbPath)) {
  const initialData = {
    exams: [
      {
        id: "exam-1",
        level: "THCS",
        title: "Đề thi thử Lịch sử THCS - Số 01",
        timeLimit: 900,
        isShuffled: false,
        questions: [
          {
            id: "q-1-1",
            content: "Nhà nước Văn Lang ra đời vào khoảng thời gian nào?",
            options: [
              { id: "A", content: "Thế kỷ VII TCN" },
              { id: "B", content: "Thế kỷ VIII TCN" },
              { id: "C", content: "Thế kỷ IX TCN" },
              { id: "D", content: "Thế kỷ X TCN" },
              { id: "E", content: "Thế kỷ VI TCN" }
            ],
            correctOptionId: "A"
          }
        ]
      }
    ],
    sessions: []
  };
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
}

const getDb = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const saveDb = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// API cho Exams
app.get('/api/exams', (req, res) => res.json(getDb().exams));
app.post('/api/exams', (req, res) => {
  const db = getDb();
  db.exams = req.body;
  saveDb(db);
  res.json({ success: true });
});

// API cho Sessions
app.get('/api/sessions', (req, res) => res.json(getDb().sessions));
app.post('/api/sessions', (req, res) => {
  const db = getDb();
  db.sessions = req.body;
  saveDb(db);
  res.json({ success: true });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Database server is running on http://localhost:${PORT}`));
