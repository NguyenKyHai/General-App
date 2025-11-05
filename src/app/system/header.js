'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react'
import {
  Logout as LogoutIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useEffect, useState, useRef } from 'react';
import useMobileDetect from '@/hooks/useMobileDetect';

const Header = () => {
  const { data: session } = useSession();
  const isMobile = useMobileDetect();  // Kiểm tra nếu là thiết bị di động
  const [menuOpen, setMenuOpen] = useState(false);  // Quản lý trạng thái mở menu

  const menuRef = useRef(null);  // Tham chiếu đến menu
  const closeMenu = () => setMenuOpen(false);  // Hàm đóng menu

  // Đóng menu khi click ngoài menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();  // Đóng menu khi click ngoài menu
      }
    };

    if (menuOpen) {
      // Lắng nghe sự kiện click trên toàn bộ trang khi menu mở
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Xóa sự kiện khi menu đóng
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);  // Clean up
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(prev => !prev);  // Toggle trạng thái mở menu

  const handleLinkClick = () => {
    if (isMobile) {
      closeMenu();  // Đóng menu khi click vào liên kết nếu trên mobile
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link href="/system" className="text-white hover:text-gray-300">
              My Blog
            </Link>
          </div>
          {/* Phần chào người dùng - nằm ngoài menu */}
          <div className="flex items-center ml-auto space-x-15">
            <span className="mr-4">👤 Xin chào, {session?.user?.name || session?.user?.username}</span>
          </div>
          {/* Mobile Menu Button */}
          {isMobile && (
            <button onClick={toggleMenu} className={`lg:hidden ${menuOpen ? 'text-black' : 'text-white'}`}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />} {/* Hiển thị ký hiệu menu */}
            </button>
          )}

          {/* Menu */}
          <nav className={`lg:flex ${isMobile && !menuOpen ? 'hidden' : 'block'} transition-all duration-300`}>
            <ul ref={menuRef} className=
              {
                `flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 
                  ${isMobile ? 'fixed top-0 right-0 w-2/3 h-full bg-white p-4 z-50 shadow-lg' : ''} 
                  ${isMobile && menuOpen ? 'text-black' : ''}`
              }>
              {session?.user?.role === "Admin" &&
                <li>
                  <Link href="/dashboard" className="hover:text-gray-300" onClick={handleLinkClick}>
                    Dashboard
                  </Link>
                </li>
              }
              <li>
                <Link href="/system" className="hover:text-gray-300" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/system/about" className="hover:text-gray-300" onClick={handleLinkClick}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/system/contact" className="hover:text-gray-300" onClick={handleLinkClick}>
                  Contact
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="hover:text-gray-300"
                >
                  <LogoutIcon />
                  <span className="ml-2">Đăng xuất</span>
                </button>
              </li>

              {isMobile && menuOpen &&
                <li>
                  <button
                    onClick={handleLinkClick}
                    className="hover:text-gray-300"
                  >
                    <CloseIcon />
                    <span className="ml-2">Đóng menu</span>
                  </button>
                </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
