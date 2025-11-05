// components/Timeline.js
const events = [
  { id: 1, date: "2025-01-01", title: "Sự kiện 1", description: "Mô tả sự kiện 1" },
  { id: 2, date: "2025-02-15", title: "Sự kiện 2", description: "Mô tả sự kiện 2" },
  { id: 3, date: "2025-03-20", title: "Sự kiện 3", description: "Mô tả sự kiện 3" },
  { id: 4, date: "2025-04-25", title: "Sự kiện 4", description: "Mô tả sự kiện 4" },
  { id: 5, date: "2025-05-25", title: "Sự kiện 5", description: "Mô tả sự kiện 5" },
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
