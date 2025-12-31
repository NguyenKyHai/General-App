'use client';

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  QrCodeScanner as QrIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Print as PrintIcon,
  LibraryBooks as PostIcon ,
  AccountCircle as UserIcon,
  Logout as LogoutIcon,
  Storage as SystemIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import useMobileDetect from '@/hooks/useMobileDetect';

const drawerWidth = 240;
const collapsedWidth = 60;
const headerHeight = 64;

const navItems = [
  { label: 'Tổng quan', icon: <DashboardIcon />, href: '/dashboard' },
  { label: 'Users', icon: <UserIcon />, href: '/dashboard/users' },
  { label: 'In', icon: <PrintIcon />, href: '/print' },
  { label: 'Quét QR', icon: <QrIcon />, href: '/dashboard/qr' },
  { label: 'Post', icon: <PostIcon />, href: '/dashboard/post' },
  { label: 'Cài đặt', icon: <SettingsIcon />, href: '/dashboard/settings' },
];

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const isMobile = useMobileDetect() || false;  // Kiểm tra thiết bị di động
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);
  const { data: session } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);  // Quản lý trạng thái mở menu
  const menuRef = useRef(null);  // Tham chiếu đến menu

  const toggleMenu = () => setMenuOpen((prev) => !prev);  // Toggle trạng thái mở menu

  const closeMenu = () => setMenuOpen(false);  // Hàm đóng menu

  // Đóng menu khi click ngoài menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();  // Đóng menu khi click ngoài menu
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);  // Clean up
    };
  }, [menuOpen]);

  return (
    <>
      {/* Header cố định */}
      <AppBar position="fixed" elevation={1} sx={{ height: `${headerHeight}px`, zIndex: 1300, backgroundColor: '#3F677E' }}>
        <Toolbar sx={{ height: `${headerHeight}px`, justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" color="white">Trang quản trị</Typography>
          </Box>

          {/* Nhóm bên phải (Chào người dùng và menu mobile) */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="text">👤 Xin chào, {session?.user?.name || session?.user?.username}</Typography>
            {/* Hiển thị Menu Icon khi là Mobile */}
            {isMobile && (
              <IconButton onClick={toggleMenu} sx={{ color: 'white' }}>
                {menuOpen ? <CloseIcon /> : <MenuIcon />} {/* Hiển thị Close hoặc Menu icon */}
              </IconButton>
            )}

            {/* Menu (dành cho mobile) */}
            <Menu
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={menuOpen}
              onClose={closeMenu}
              ref={menuRef}
            >
              {/* Liên kết System */}
              <MenuItem onClick={closeMenu}>
                <Link href="/system" passHref>
                  <SystemIcon sx={{ fontSize: 20, marginRight: 1 }} /> System
                </Link>
              </MenuItem>

              {/* Đăng xuất */}
              <MenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
                <LogoutIcon sx={{ fontSize: 20, marginRight: 1 }} /> Đăng xuất
              </MenuItem>
              {/* Button để đóng menu */}
              {isMobile && menuOpen && (
                <MenuItem onClick={closeMenu}>
                  <CloseIcon sx={{ fontSize: 20, marginRight: 1}}/>
                  Đóng menu
                </MenuItem>
              )}
            </Menu>

            {/* Nếu là desktop sẽ không hiển thị Menu Icon */}
            {!isMobile && (
              <>
                <Link href="/system" passHref>
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1, // Khoảng cách giữa icon và chữ
                      textDecoration: 'none', // Xóa gạch chân của link
                      color: 'inherit', // Giữ màu chữ mặc định
                      fontSize: '16px',
                      '&:hover': {
                        color: '#ebe4e4ff', // Màu chữ khi hover
                        cursor: 'pointer', // Thêm hiệu ứng cursor khi hover
                      },
                    }}
                  >
                    <SystemIcon sx={{ fontSize: 20 }} /> {/* Icon hệ thống */}
                    System
                  </Typography>
                </Link>
                <Button
                  variant="text"
                  color="#fff"
                  startIcon={<LogoutIcon />}
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  sx={{
                    textTransform: 'none',
                    fontSize: '16px',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)', // Hover effect cho button
                    },
                  }}
                >
                  Đăng xuất
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar cố định dưới header */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedWidth,
            boxSizing: 'border-box',
            transition: 'width 0.5s',
            top: `${headerHeight}px`,
            height: `calc(100vh - ${headerHeight}px)`,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: '#1B1E24',
            color: '#fff'
          },
        }}
      >
        {/* Toggle nằm ở đầu sidebar */}
        <Box sx={{ display: 'flex', justifyContent: open ? 'flex-end' : 'center', p: 1 }}>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon sx={{ color: '#fff' }} /> : <MenuIcon sx={{ color: '#fff' }} />}
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: '#5B5E74' }} />

        <List>
          {navItems.map((item) => (
            <ListItem key={item.href} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={pathname === item.href}
              >
                <Tooltip title={open ? '' : item.label} placement="right">
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 1 : 'auto', color: '#fff', }}>
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                {open && <ListItemText primary={item.label} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Nội dung chính */}
      <Box
        component="main"
        sx={{
          pt: `${headerHeight}px`,
          pl: open ? `${drawerWidth}px` : `${collapsedWidth}px`,
          transition: 'padding-left 0.5s',
        }}
      >
        <Box sx={{ p: 1 }}>{children}</Box>
      </Box>
    </>
  );
}
