// components/Timeline.js
const events = [
  { id: 1, date: "2025-07-08", title: "Tìm thấy nhau 🥰", description: "Ngày mà hai người tìm thấy nhau" },
  { id: 2, date: "2025-08-09", title: "Hai người gặp mặt nhau", description: "Một buổi hẹn gặp sau nhiều ngày trò chuyện" },
  { id: 3, date: "2025-09-07", title: "Tỏ tình 💖", description: "Call nhau tới khuya luôn, xong cái tỏ tình luôn 💕" },
  { id: 4, date: "2025-09-21", title: "Buổi đi chơi đầu tiên", description: "Hai người đi chơi với nhau sau khi chính thức là ngiu" },
  { id: 5, date: "2025-10-18", title: "Buổi đi chơi tiếp theo", description: "Lần này hai người thân nhau nhiều hơn nè, hun em ngiu đã lun" },
];

export default function Timeline() {
  return (
    <div className="relative">
      {/* Đường thẳng timeline */}
      <div className="absolute left top-0 h-full border-l-4 border-gray-300"></div>

      {/* Các chấm sự kiện và thông tin */}
      <div className="space-y-12">
        {events.map((event) => (
          <div key={event.id} className="relative flex items-center">
            {/* Chấm sự kiện nằm trên đường timeline */}
            <div className="absolute left transform -translate-x-1/3 w-3 h-3 rounded-full bg-blue-500 text-white flex">
            </div>

            {/* Thông tin sự kiện nằm sát vào timeline */}
            <div className="pl-5 transition-all hover:text-blue-500 hover:scale-125">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-400 text-sm">Ngày: {event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
