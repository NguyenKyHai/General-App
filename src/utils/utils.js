// 📁 src/lib/utils.js

/**
 * Tạo tên file in theo định dạng:
 * DDMMYY_HHMMSS
 *
 * @param {string} prefix - Tiền tố
 * @returns {string} - Ví dụ: HD_271025_143609
 */
export function generatePrintDate(prefix) {
  const now = new Date();

  const pad = (num) => String(num).padStart(2, "0");

  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = String(now.getFullYear()).slice(-2);
  const hour = pad(now.getHours());
  const minute = pad(now.getMinutes());
  const second = pad(now.getSeconds());

  return `${prefix}_${day}${month}${year}_${hour}${minute}${second}`;
}