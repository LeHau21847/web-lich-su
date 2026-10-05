const https = require('https');

const FIREBASE_URL = 'https://web-lich-su-8710d-default-rtdb.asia-southeast1.firebasedatabase.app';

const examData = [
  {
    "id": "exam_1",
    "title": "Việt Nam trong năm đầu sau Cách mạng tháng Tám 1945",
    "level": "THPT",
    "timeLimit": 2700,
    "questions": [
      {
        "id": "q1",
        "content": "Khó khăn lớn nhất đe dọa sự tồn vong của chính quyền cách mạng nước ta sau năm 1945 là",
        "options": [
          { "id": "A", "content": "nạn mù chữ tràn lan." },
          { "id": "B", "content": "tài chính quốc gia khánh kiệt." },
          { "id": "C", "content": "đê điều vỡ gây lũ lụt lớn." },
          { "id": "D", "content": "nạn ngoại xâm và nội phản." }
        ],
        "correctOptionId": "D"
      },
      {
        "id": "q2",
        "content": "Quân đội các nước đế quốc có mặt trên lãnh thổ Việt Nam sau tháng 8 – 1945 dưới danh nghĩa",
        "options": [
          { "id": "A", "content": "hỗ trợ kinh tế nhân đạo." },
          { "id": "B", "content": "quân Đồng minh giải giáp Nhật." },
          { "id": "C", "content": "bảo vệ chính phủ hợp hiến." },
          { "id": "D", "content": "gìn giữ hoà bình quốc tế." }
        ],
        "correctOptionId": "B"
      },
      {
        "id": "q3",
        "content": "Ngày 06 – 01 – 1946, sự kiện chính trị trọng đại đầu tiên của nước ta là",
        "options": [
          { "id": "A", "content": "Tổng tuyển cử bầu Quốc hội khoá I." },
          { "id": "B", "content": "ban hành bản Hiến pháp đầu tiên." },
          { "id": "C", "content": "thành lập Chính phủ liên hiệp chính thức." },
          { "id": "D", "content": "công bố lệnh Toàn quốc kháng chiến." }
        ],
        "correctOptionId": "A"
      },
      {
        "id": "q4",
        "content": "Bản Hiến pháp đầu tiên của nước Việt Nam Dân chủ Cộng hòa được Quốc hội thông qua vào",
        "options": [
          { "id": "A", "content": "tháng 3 năm 1946." },
          { "id": "B", "content": "tháng 8 năm 1946." },
          { "id": "C", "content": "tháng 11 năm 1946." },
          { "id": "D", "content": "tháng 12 năm 1946." }
        ],
        "correctOptionId": "C"
      },
      {
        "id": "q5",
        "content": "Cơ quan được Chủ tịch Hồ Chí Minh kí sắc lệnh thành lập ngày 08 – 9 – 1945 để diệt giặc dốt là",
        "options": [
          { "id": "A", "content": "Bộ Giáo dục quốc dân." },
          { "id": "B", "content": "Nha Bình dân học vụ." },
          { "id": "C", "content": "Hội đồng chống mù chữ." },
          { "id": "D", "content": "Ban Huấn luyện trung ương." }
        ],
        "correctOptionId": "B"
      },
      {
        "id": "q6",
        "content": "Phong trào nào được phát động nhằm huy động nguồn tài chính đóng góp cho quốc phòng năm 1945?",
        "options": [
          { "id": "A", "content": "Phong trào “Tuần lễ vàng”." },
          { "id": "B", "content": "Phong trào “Tăng gia sản xuất”." },
          { "id": "C", "content": "Phong trào “Hũ gạo cứu đói”." },
          { "id": "D", "content": "Phong trào “Áo mùa đông binh”." }
        ],
        "correctOptionId": "A"
      },
      {
        "id": "q7",
        "content": "Thực dân Pháp chính thức nổ súng đánh úp Sài Gòn, mở đầu cuộc chiến tranh xâm lược lần hai vào",
        "options": [
          { "id": "A", "content": "ngày 02 – 9 – 1945." },
          { "id": "B", "content": "ngày 15 – 9 – 1945." },
          { "id": "C", "content": "ngày 20 – 9 – 1945." },
          { "id": "D", "content": "ngày 23 – 9 – 1945." }
        ],
        "correctOptionId": "D"
      },
      {
        "id": "q8",
        "content": "Danh hiệu cao quý mà Chủ tịch Hồ Chí Minh trao tặng cho đồng bào Nam Bộ tháng 2 – 1946 là",
        "options": [
          { "id": "A", "content": "Vành đai thép cách mạng." },
          { "id": "B", "content": "Tiền tuyến anh dũng bất khuất." },
          { "id": "C", "content": "Thành đồng Tổ quốc kiên cường." },
          { "id": "D", "content": "Pháo đài thép miền sông nước." }
        ],
        "correctOptionId": "C"
      },
      {
        "id": "q9",
        "content": "Hiệp ước Hoa – Pháp được kí kết giữa chính phủ Pháp và quân Tưởng vào ngày",
        "options": [
          { "id": "A", "content": "15 – 01 – 1946." },
          { "id": "B", "content": "28 – 02 – 1946." },
          { "id": "C", "content": "06 – 03 – 1946." },
          { "id": "D", "content": "14 – 09 – 1946." }
        ],
        "correctOptionId": "B"
      },
      {
        "id": "q10",
        "content": "Hiệp định Sơ bộ ngày 06 – 3 – 1946 được Chủ tịch Hồ Chí Minh kí kết với đại diện của Pháp là",
        "options": [
          { "id": "A", "content": "Xanh-tơ-ni." },
          { "id": "B", "content": "Đơ Gôn." },
          { "id": "C", "content": "Mác-bi-ê." },
          { "id": "D", "content": "Lơ-clec." }
        ],
        "correctOptionId": "A"
      },
      {
        "id": "q11",
        "content": "Văn bản ngoại giao cuối cùng Đảng ta kí với Pháp trước khi chiến tranh toàn quốc bùng nổ là",
        "options": [
          { "id": "A", "content": "Hiệp ước Giơ-ne-vơ." },
          { "id": "B", "content": "Hiệp định Sơ bộ tháng 3." },
          { "id": "C", "content": "Hoà ước Phòng-ten-nơ-blô." },
          { "id": "D", "content": "Tạm ước ngày 14 – 9 – 1946." }
        ],
        "correctOptionId": "D"
      },
      {
        "id": "q12",
        "content": "Biện pháp cấp bách trước mắt nhằm giải quyết nạn đói được Hồ Chủ tịch kêu gọi là",
        "options": [
          { "id": "A", "content": "tịch thu ruộng của địa chủ." },
          { "id": "B", "content": "lập “hũ gạo cứu đói”, nhường cơm." },
          { "id": "C", "content": "nhập khẩu gạo từ nước láng giềng." },
          { "id": "D", "content": "di dân khai hoang vùng đồi núi." }
        ],
        "correctOptionId": "B"
      },
      {
        "id": "q13",
        "content": "Biện pháp chiến lược căn bản và lâu dài nhất để giải quyết triệt để nạn đói năm 1945 là",
        "options": [
          { "id": "A", "content": "đẩy mạnh việc tăng gia sản xuất." },
          { "id": "B", "content": "kêu gọi sự cứu trợ của thế giới." },
          { "id": "C", "content": "thực hiện giảm thuế ruộng đất ngay." },
          { "id": "D", "content": "phân chia lại công điền công thổ." }
        ],
        "correctOptionId": "A"
      },
      {
        "id": "q14",
        "content": "Quốc hội khoá I đã đồng ý nhường cho tay sai của Tưởng bao nhiêu ghế không qua bầu cử?",
        "options": [
          { "id": "A", "content": "Đúng 50 ghế." },
          { "id": "B", "content": "Đúng 60 ghế." },
          { "id": "C", "content": "Đúng 70 ghế." },
          { "id": "D", "content": "Đúng 80 ghế." }
        ],
        "correctOptionId": "C"
      },
      {
        "id": "q15",
        "content": "Tháng 11 năm 1946, sự kiện tài chính quan trọng khẳng định nền độc lập của đất nước là",
        "options": [
          { "id": "A", "content": "thành lập Ngân hàng Quốc gia." },
          { "id": "B", "content": "phát động phong trào góp vốn." },
          { "id": "C", "content": "bãi bỏ lưu hành tiền nhân dân tệ." },
          { "id": "D", "content": "lưu hành tiền giấy Việt Nam." }
        ],
        "correctOptionId": "D"
      },
      {
        "id": "q16",
        "content": "Sau một tuần phát động “Tuần lễ vàng”, nhân dân ta đã quyên góp được số lượng vàng là",
        "options": [
          { "id": "A", "content": "350 ki-lô-gam." },
          { "id": "B", "content": "370 ki-lô-gam." },
          { "id": "C", "content": "400 ki-lô-gam." },
          { "id": "D", "content": "420 ki-lô-gam." }
        ],
        "correctOptionId": "B"
      },
      {
        "id": "q17",
        "content": "Sau ngày 02 – 9 – 1945, quân đội Trung Hoa Dân quốc tiến vào miền Bắc nước ta đóng tại",
        "options": [
          { "id": "A", "content": "từ vĩ tuyến 16 trở ra bắc." },
          { "id": "B", "content": "từ vĩ tuyến 16 trở vào nam." },
          { "id": "C", "content": "dọc các tỉnh biên giới phía tây." },
          { "id": "D", "content": "tập trung quanh các cảng biển lớn." }
        ],
        "correctOptionId": "A"
      },
      {
        "id": "q18",
        "content": "Lực lượng quân sự mở đường trực tiếp cho thực dân Pháp quay lại xâm lược Nam Bộ là",
        "options": [
          { "id": "A", "content": "quân đội Mỹ viện trợ." },
          { "id": "B", "content": "quân đội Quốc dân đảng." },
          { "id": "C", "content": "quân đội đế quốc Anh." },
          { "id": "D", "content": "tàn quân Nhật Bản ở lại." }
        ],
        "correctOptionId": "C"
      },
      {
        "id": "q19",
        "content": "Đoàn quân chi viện sức người, sức của từ hậu phương cho chiến trường miền Nam năm 1945 gọi là",
        "options": [
          { "id": "A", "content": "phong trào Ba sẵn sàng." },
          { "id": "B", "content": "phong trào Thanh niên cứu quốc." },
          { "id": "C", "content": "các đội Tuyên truyền võ trang." },
          { "id": "D", "content": "các đoàn quân Nam tiến." }
        ],
        "correctOptionId": "D"
      },
      {
        "id": "q20",
        "content": "Thái độ chính trị nhất quán của Đảng ta đối với quân Tưởng trước ngày 06 – 3 – 1946 là",
        "options": [
          { "id": "A", "content": "kiên quyết dùng vũ lực tiêu diệt." },
          { "id": "B", "content": "nhân nhượng, hoà hoãn có nguyên tắc." },
          { "id": "C", "content": "đầu hàng hoàn toàn các điều kiện." },
          { "id": "D", "content": "liên minh chặt chẽ đánh thực dân Pháp." }
        ],
        "correctOptionId": "B"
      },
      {
        "id": "q21",
        "content": "Bản chất của sách lược hoà hoãn với Pháp sau ngày 06 – 3 – 1946 được khái quát bằng khẩu hiệu",
        "options": [
          { "id": "A", "content": "“Hoà để tiến”." },
          { "id": "B", "content": "“Độc lập hay là chết”." },
          { "id": "C", "content": "“Kháng chiến kiến quốc”." },
          { "id": "D", "content": "“Toàn dân kháng chiến”." }
        ],
        "correctOptionId": "A"
      },
      {
        "id": "q22",
        "content": "Việc kí kết Hiệp định Sơ bộ ngày 06 – 3 – 1946 đã giúp ta tránh được nguy cơ nguy hiểm nào?",
        "options": [
          { "id": "A", "content": "Nạn đói tiếp tục bùng phát dữ dội." },
          { "id": "B", "content": "Chính phủ cách mạng mất tính hợp pháp." },
          { "id": "C", "content": "Phải cùng lúc đối đầu nhiều kẻ thù." },
          { "id": "D", "content": "Quân đội ta bị phong toả đường biển." }
        ],
        "correctOptionId": "C"
      },
      {
        "id": "q23",
        "content": "Thắng lợi to lớn nhất của cuộc Tổng tuyển cử ngày 06 – 01 – 1946 là",
        "options": [
          { "id": "A", "content": "đánh đuổi hoàn toàn giặc ngoại xâm." },
          { "id": "B", "content": "giúp ta nhận được viện trợ quốc tế." },
          { "id": "C", "content": "xoá sạch bộ máy tay sai phản động." },
          { "id": "D", "content": "khẳng định tính hợp pháp của Nhà nước." }
        ],
        "correctOptionId": "D"
      },
      {
        "id": "q24",
        "content": "Trong năm đầu sau thắng lợi của Cách mạng tháng Tám, tình thế của nước ta được ví như",
        "options": [
          { "id": "A", "content": "nước sôi lửa bỏng hiểm nghèo." },
          { "id": "B", "content": "ngàn cân treo sợi tóc mỏng manh." },
          { "id": "C", "content": "đứng trước bước ngoặt sống còn." },
          { "id": "D", "content": "khủng hoảng toàn diện không lối." }
        ],
        "correctOptionId": "B"
      },
      {
        "id": "q25",
        "content": "Nguyên tắc bất di bất dịch của Chủ tịch Hồ Chí Minh trong đàm phán ngoại giao với thực dân Pháp là",
        "options": [
          { "id": "A", "content": "độc lập và chủ quyền dân tộc." },
          { "id": "B", "content": "giữ vững quan hệ thương mại." },
          { "id": "C", "content": "bảo vệ toàn bộ lợi ích của Pháp." },
          { "id": "D", "content": "chia sẻ quyền kiểm soát quân sự." }
        ],
        "correctOptionId": "A"
      },
      {
        "id": "q26",
        "content": "Ý nghĩa then chốt của bản Tạm ước ngày 14 – 9 – 1946 đối với cách mạng Việt Nam là",
        "options": [
          { "id": "A", "content": "chấm dứt vĩnh viễn nguy cơ chiến tranh." },
          { "id": "B", "content": "buộc quân đội Pháp rút lui về nước." },
          { "id": "C", "content": "kéo dài thời gian hoà hoãn để chuẩn bị." },
          { "id": "D", "content": "giúp ta mua thêm nhiều vũ khí hạng nặng." }
        ],
        "correctOptionId": "C"
      },
      {
        "id": "q27",
        "content": "Điểm sáng tạo của Đảng ta trong việc phân hoá kẻ thù ở năm đầu sau Cách mạng tháng Tám là",
        "options": [
          { "id": "A", "content": "sử dụng vũ lực trấn áp mọi đối thủ." },
          { "id": "B", "content": "dựa hẳn vào sự trợ giúp của Liên Xô." },
          { "id": "C", "content": "nhượng bộ toàn bộ yêu sách kinh tế." },
          { "id": "D", "content": "lợi dụng mâu thuẫn giữa Pháp và Tưởng." }
        ],
        "correctOptionId": "D"
      },
      {
        "id": "q28",
        "content": "Thành quả lớn nhất đạt được từ cuộc chiến đấu giam chân địch của quân dân Nam Bộ cuối 1945 là",
        "options": [
          { "id": "A", "content": "giải phóng hoàn toàn các tỉnh miền Tây." },
          { "id": "B", "content": "tạo thời gian cho hậu phương chuẩn bị." },
          { "id": "C", "content": "tiêu diệt hoàn toàn quân viễn chinh Pháp." },
          { "id": "D", "content": "buộc đối phương ngồi vào bàn đàm phán." }
        ],
        "correctOptionId": "B"
      },
      {
        "id": "q29",
        "content": "Bài học lịch sử sâu sắc rút ra từ sách lược ngoại giao của Đảng giai đoạn 1945 – 1946 là",
        "options": [
          { "id": "A", "content": "dĩ bất biến, ứng vạn biến linh hoạt." },
          { "id": "B", "content": "kiên quyết không nhượng bộ về mọi mặt." },
          { "id": "C", "content": "dựa vào sức mạnh các cường quốc ngoài." },
          { "id": "D", "content": "tập trung đàm phán hơn củng cố nội lực." }
        ],
        "correctOptionId": "A"
      },
      {
        "id": "q30",
        "content": "Phong trào xoá mù chữ thông qua Nha Bình dân học vụ (1945) đã thể hiện bản chất nào của chế độ mới?",
        "options": [
          { "id": "A", "content": "Coi trọng ngoại thương hơn quốc phòng." },
          { "id": "B", "content": "Chăm lo nâng cao dân trí cho quần chúng." },
          { "id": "C", "content": "Tuyệt đối ưu tiên phát triển văn học cổ." },
          { "id": "D", "content": "Tập trung đào tạo cho cán bộ cấp cao." }
        ],
        "correctOptionId": "B"
      }
    ]
  }
];

function putData(path, data) {
  return new Promise((resolve, reject) => {
    const dataString = JSON.stringify(data);
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataString)
      }
    };
    
    const req = https.request(FIREBASE_URL + path, options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(responseBody);
        } else {
          reject(new Error("HTTP " + res.statusCode + ": " + responseBody));
        }
      });
    });
    
    req.on('error', (e) => reject(e));
    req.write(dataString);
    req.end();
  });
}

async function run() {
  console.log("Resetting database...");
  await putData('/exams.json', examData);
  await putData('/sessions.json', []);
  console.log("Database reset complete.");
}

run();
