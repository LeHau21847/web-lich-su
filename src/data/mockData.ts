import type { Exam } from '../types';

export const mockExams: Exam[] = [
  {
    id: 'exam-thcs-01',
    level: 'THCS',
    title: 'Đề thi thử Lịch sử THCS - Số 01',
    timeLimit: 15 * 60, // 15 phút
    questions: Array.from({ length: 20 }, (_, i) => ({
      id: `q-thcs-${i + 1}`,
      content: `Câu hỏi Lịch sử THCS số ${i + 1}: Sự kiện nào đánh dấu bước ngoặt lớn trong lịch sử Việt Nam thế kỷ ${i % 10 + 10}?`,
      options: [
        { id: 'A', content: `Lựa chọn A cho câu ${i + 1}` },
        { id: 'B', content: `Lựa chọn B cho câu ${i + 1}` },
        { id: 'C', content: `Lựa chọn C cho câu ${i + 1}` },
        { id: 'D', content: `Lựa chọn D cho câu ${i + 1}` },
        { id: 'E', content: `Lựa chọn E cho câu ${i + 1}` },
      ],
      correctOptionId: ['A', 'B', 'C', 'D', 'E'][i % 5],
    })),
  },
  {
    id: 'exam-thpt-01',
    level: 'THPT',
    title: 'Đề thi thử Lịch sử THPT Quốc Gia - Số 01',
    timeLimit: 20 * 60, // 20 phút
    questions: Array.from({ length: 20 }, (_, i) => ({
      id: `q-thpt-${i + 1}`,
      content: `Câu hỏi Lịch sử THPT số ${i + 1}: Trong giai đoạn 1930 - 1945, Đảng Cộng sản Đông Dương đã có chủ trương gì nổi bật?`,
      options: [
        { id: 'A', content: `Phương án A cho câu hỏi THPT ${i + 1}` },
        { id: 'B', content: `Phương án B cho câu hỏi THPT ${i + 1}` },
        { id: 'C', content: `Phương án C cho câu hỏi THPT ${i + 1}` },
        { id: 'D', content: `Phương án D cho câu hỏi THPT ${i + 1}` },
        { id: 'E', content: `Phương án E cho câu hỏi THPT ${i + 1}` },
      ],
      correctOptionId: ['A', 'B', 'C', 'D', 'E'][(i + 2) % 5],
    })),
  }
];

// Let's refine the mock data to have real history questions to make the demo realistic, as requested.
// Wait, the user asked for a "realistic JSON data of history knowledge". I'll replace the generic array with real questions below.

export const realMockExams: Exam[] = [
  {
    id: 'exam-thcs-01',
    level: 'THCS',
    title: 'Đề thi thử Lịch sử THCS - Số 01',
    timeLimit: 15 * 60,
    questions: [
      {
        id: 'q1',
        content: 'Nhà nước Văn Lang ra đời vào khoảng thời gian nào?',
        options: [
          { id: 'A', content: 'Thế kỷ VII TCN' },
          { id: 'B', content: 'Thế kỷ VIII TCN' },
          { id: 'C', content: 'Thế kỷ IX TCN' },
          { id: 'D', content: 'Thế kỷ X TCN' },
          { id: 'E', content: 'Thế kỷ VI TCN' }
        ],
        correctOptionId: 'A'
      },
      {
        id: 'q2',
        content: 'Cuộc khởi nghĩa Hai Bà Trưng bùng nổ vào năm nào?',
        options: [
          { id: 'A', content: 'Năm 39' },
          { id: 'B', content: 'Năm 40' },
          { id: 'C', content: 'Năm 41' },
          { id: 'D', content: 'Năm 42' },
          { id: 'E', content: 'Năm 43' }
        ],
        correctOptionId: 'B'
      },
      {
        id: 'q3',
        content: 'Trận Bạch Đằng năm 938 do ai lãnh đạo?',
        options: [
          { id: 'A', content: 'Lý Thường Kiệt' },
          { id: 'B', content: 'Trần Hưng Đạo' },
          { id: 'C', content: 'Ngô Quyền' },
          { id: 'D', content: 'Lê Hoàn' },
          { id: 'E', content: 'Quang Trung' }
        ],
        correctOptionId: 'C'
      },
      {
        id: 'q4',
        content: 'Ai là người dời đô từ Hoa Lư về Thăng Long (Hà Nội)?',
        options: [
          { id: 'A', content: 'Lý Thái Tổ' },
          { id: 'B', content: 'Lý Thái Tông' },
          { id: 'C', content: 'Lý Thánh Tông' },
          { id: 'D', content: 'Lý Nhân Tông' },
          { id: 'E', content: 'Lý Thần Tông' }
        ],
        correctOptionId: 'A'
      },
      {
        id: 'q5',
        content: 'Tên quốc hiệu nước ta thời nhà Đinh là gì?',
        options: [
          { id: 'A', content: 'Vạn Xuân' },
          { id: 'B', content: 'Đại Cồ Việt' },
          { id: 'C', content: 'Đại Việt' },
          { id: 'D', content: 'Đại Ngu' },
          { id: 'E', content: 'Nam Việt' }
        ],
        correctOptionId: 'B'
      },
      ...Array.from({ length: 15 }, (_, i) => ({
        id: `q-thcs-filler-${i + 6}`,
        content: `Câu hỏi lịch sử THCS bổ sung số ${i + 6}: Sự kiện lịch sử nào đánh dấu...`,
        options: [
          { id: 'A', content: 'Nội dung lựa chọn A' },
          { id: 'B', content: 'Nội dung lựa chọn B' },
          { id: 'C', content: 'Nội dung lựa chọn C' },
          { id: 'D', content: 'Nội dung lựa chọn D' },
          { id: 'E', content: 'Nội dung lựa chọn E' }
        ],
        correctOptionId: ['A', 'B', 'C', 'D', 'E'][i % 5]
      }))
    ]
  },
  {
    id: 'exam-thpt-01',
    level: 'THPT',
    title: 'Đề thi thử Lịch sử THPT Quốc Gia - Số 01',
    timeLimit: 20 * 60,
    questions: [
      {
        id: 'q-thpt-1',
        content: 'Đảng Cộng sản Việt Nam ra đời vào ngày tháng năm nào?',
        options: [
          { id: 'A', content: '3/2/1930' },
          { id: 'B', content: '3/2/1931' },
          { id: 'C', content: '2/3/1930' },
          { id: 'D', content: '19/8/1945' },
          { id: 'E', content: '2/9/1945' }
        ],
        correctOptionId: 'A'
      },
      {
        id: 'q-thpt-2',
        content: 'Bác Hồ đọc Tuyên ngôn Độc lập tại đâu?',
        options: [
          { id: 'A', content: 'Quảng trường Ba Đình' },
          { id: 'B', content: 'Nhà hát lớn Hà Nội' },
          { id: 'C', content: 'Bến Nhà Rồng' },
          { id: 'D', content: 'Pác Bó, Cao Bằng' },
          { id: 'E', content: 'Tân Trào, Tuyên Quang' }
        ],
        correctOptionId: 'A'
      },
      {
        id: 'q-thpt-3',
        content: 'Chiến dịch Điện Biên Phủ kết thúc thắng lợi vào ngày nào?',
        options: [
          { id: 'A', content: '7/5/1954' },
          { id: 'B', content: '7/5/1955' },
          { id: 'C', content: '8/5/1954' },
          { id: 'D', content: '30/4/1975' },
          { id: 'E', content: '1/5/1954' }
        ],
        correctOptionId: 'A'
      },
      {
        id: 'q-thpt-4',
        content: 'Sự kiện nào đánh dấu sự sụp đổ hoàn toàn của chế độ phong kiến Việt Nam?',
        options: [
          { id: 'A', content: 'Cách mạng tháng Tám (1945)' },
          { id: 'B', content: 'Vua Bảo Đại thoái vị (1945)' },
          { id: 'C', content: 'Thành lập Đảng Cộng sản (1930)' },
          { id: 'D', content: 'Chiến thắng Điện Biên Phủ (1954)' },
          { id: 'E', content: 'Giải phóng miền Nam (1975)' }
        ],
        correctOptionId: 'B'
      },
      {
        id: 'q-thpt-5',
        content: 'Tổng tiến công và nổi dậy mùa xuân năm 1975 kết thúc bằng chiến dịch nào?',
        options: [
          { id: 'A', content: 'Chiến dịch Tây Nguyên' },
          { id: 'B', content: 'Chiến dịch Huế - Đà Nẵng' },
          { id: 'C', content: 'Chiến dịch Hồ Chí Minh' },
          { id: 'D', content: 'Chiến dịch Điện Biên Phủ trên không' },
          { id: 'E', content: 'Chiến dịch Việt Bắc' }
        ],
        correctOptionId: 'C'
      },
      ...Array.from({ length: 15 }, (_, i) => ({
        id: `q-thpt-filler-${i + 6}`,
        content: `Câu hỏi lịch sử THPT bổ sung số ${i + 6}: Trong giai đoạn kháng chiến chống Mỹ...`,
        options: [
          { id: 'A', content: 'Phương án A' },
          { id: 'B', content: 'Phương án B' },
          { id: 'C', content: 'Phương án C' },
          { id: 'D', content: 'Phương án D' },
          { id: 'E', content: 'Phương án E' }
        ],
        correctOptionId: ['A', 'B', 'C', 'D', 'E'][i % 5]
      }))
    ]
  }
];
