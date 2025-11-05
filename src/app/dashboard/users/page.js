'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Modal,
  TextField,
  Stack,
  Paper,
  TableContainer,
  TablePagination,
  CircularProgress
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { toast } from 'react-toastify' // Import Toastify

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [form, setForm] = useState({ name: '', username: '', password: '', role: '' })

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error('Lỗi khi fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleEdit = (user) => {
    setEditUser(user)
    setForm({ ...user, password: '' })
    setOpenModal(true)
  }

  const handleAdd = () => {
    setEditUser(null)
    setForm({ name: '', username: '', password: '', role: '' })
    setOpenModal(true)
  }

  const handleSubmit = async (editUser) => {
    try {
      let response;

      // Nếu có `editUser`, thực hiện cập nhật người dùng (PUT)
      if (editUser) {
        response = await fetch(`/api/users/${editUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, id: editUser.id }),
        })
      } else {
        // Nếu không có `editUser`, thực hiện thêm người dùng mới (POST)
        response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }

      // Kiểm tra xem API có trả về thành công không
      if (!response.ok) {
        throw new Error('Không thể lưu người dùng');
      }

      // Nếu thành công, hiển thị thông báo và tải lại danh sách người dùng
      toast.success(editUser ? 'Cập nhật người dùng thành công!' : 'Thêm mới người dùng thành công!');
      fetchUsers(); // Tải lại dữ liệu sau khi thành công

    } catch (error) {
      // Hiển thị thông báo lỗi nếu có
      toast.error(error.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      // Đảm bảo đóng modal sau khi thực hiện xong
      setOpenModal(false);
    }
  }


  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc muốn xóa user này?')) return
    await fetch(`/api/users?id=${id}`, { method: 'DELETE' })
    fetchUsers()
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box p={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Quản lý Users</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            backgroundColor: '#3CC360',
            color: '#fff',
            '&:hover': { backgroundColor: '#388e3c' },
            textTransform: 'none',
          }}
        >
          Thêm mới
        </Button>
      </Stack>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="users table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#EDF5F8' }}>
                  <TableCell sx={{ color: '#5F6263', fontWeight: 'bold', border: '1px solid #ddd', width: 200 }}></TableCell>
                  <TableCell sx={{ color: '#5F6263', fontWeight: 'bold', border: '1px solid #ddd' }}>ID</TableCell>
                  <TableCell sx={{ color: '#5F6263', fontWeight: 'bold', border: '1px solid #ddd' }}>Tên</TableCell>
                  <TableCell sx={{ color: '#5F6263', fontWeight: 'bold', border: '1px solid #ddd' }}>Username</TableCell>
                  <TableCell sx={{ color: '#5F6263', fontWeight: 'bold', border: '1px solid #ddd' }}>Password (hashed)</TableCell>
                  <TableCell sx={{ color: '#5F6263', fontWeight: 'bold', border: '1px solid #ddd' }}>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map(u => (
                  <TableRow key={u.id} hover>
                    <TableCell sx={{ border: '1px solid #ddd' }} >
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        size="small"
                        sx={{
                          mr: 1,
                          textTransform: 'none',
                        }}
                        onClick={() => handleEdit(u)}
                      >
                        Sửa
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        size="small"
                        sx={{
                          textTransform: 'none',
                        }}
                        onClick={() => handleDelete(u.id)}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #ddd' }} >{u.id}</TableCell>
                    <TableCell sx={{ border: '1px solid #ddd' }} >{u.name}</TableCell>
                    <TableCell sx={{ border: '1px solid #ddd' }} >{u.username}</TableCell>
                    <TableCell sx={{ border: '1px solid #ddd' }} >{u.password}</TableCell>
                    <TableCell sx={{ border: '1px solid #ddd' }}>{u.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={users.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Paper>
      )}

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2
        }}>
          <Typography variant="h6" mb={2}>{editUser ? 'Sửa User' : 'Thêm User'}</Typography>
          <Stack spacing={2}>
            <TextField label="Tên" name="name" value={form.name} onChange={handleChange} fullWidth />
            <TextField label="Username" name="username" value={form.username} onChange={handleChange} fullWidth />
            <TextField label="Password" name="password" value={form.password} onChange={handleChange} fullWidth type="password" />
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select labelId="role-label" id="role" name="role" value={form.role} label="Role" onChange={handleChange}>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              width: '100%',
              justifyContent: 'center',
            }}>
              <Button variant="contained" onClick={() => handleSubmit(editUser ? editUser : null)} sx={{ flex: 1, textTransform: 'none' }}>{editUser ? 'Cập nhật' : 'Thêm mới'}</Button>
              <Button variant="outlined" onClick={() => setOpenModal(false)} sx={{ flex: 1, textTransform: 'none' }} >Đóng</Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </Box>
  )
}
