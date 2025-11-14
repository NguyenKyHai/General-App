'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    IconButton,
    Divider,
    Backdrop,
    CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { toast } from 'react-toastify'

export default function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [contentBlocks, setContentBlocks] = useState([
        { type: 'text', content: '' },
    ]);

    const handleAddText = () => {
        setContentBlocks([...contentBlocks, { type: 'text', content: '' }]);
    };

    const handleAddImage = () => {
        setContentBlocks([
            ...contentBlocks,
            { type: 'image', media: [{ alt: '', note: '', src: null }] },
        ]);
    };

    const handleDeleteBlock = index => {
        const updated = [...contentBlocks];
        updated.splice(index, 1);
        setContentBlocks(updated);
    };

    const handleDeleteMedia = (blockIndex, mediaIndex) => {
        const updated = [...contentBlocks];
        updated[blockIndex].media.splice(mediaIndex, 1);
        setContentBlocks(updated);
    };

    const handleAddMedia = blockIndex => {
        const updated = [...contentBlocks];
        updated[blockIndex].media.push({ alt: '', note: '', src: null });
        setContentBlocks(updated);
    };

    const handleImageClick = (image) => {
        // Mở cửa sổ mới
        const newWindow = window.open();

        // Tạo HTML cơ bản để hiển thị ảnh
        const imgElement = `<img src="${image}" style="width: 100%; height: auto;"/>`;

        // Thêm ảnh vào cửa sổ mới
        newWindow.document.body.innerHTML = imgElement;

        // Nếu bạn muốn thêm các style, có thể dùng style trực tiếp trong thẻ <style> của document.
        const style = `
                body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f0f0f0;
                }
                img {
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                }
            `;
        const styleElement = newWindow.document.createElement("style");
        styleElement.innerHTML = style;
        newWindow.document.head.appendChild(styleElement);
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            toast.error('❌ Vui lòng nhập tiêu đề bài viết');
            return
        }
        if (contentBlocks.length === 0) {
            toast.error('❌ Bài viết cần ít nhất một nội dung');
            return;
        }
        for (let i = 0; i < contentBlocks.length; i++) {
            const block = contentBlocks[i];

            if (block.type === 'text' && !block.content.trim()) {
                toast.error(`❌ Văn bản #${i + 1} không được để trống`);
                return;
            }

            if (block.type === 'image') {
                if (!block.media || block.media.length === 0) {
                    toast.error(`❌ Hình ảnh #${i + 1} cần ít nhất một ảnh`);
                    return;
                }

                for (let j = 0; j < block.media.length; j++) {
                    if (!block.media[j].src) {
                        toast.error(`❌ Ảnh #${j + 1} trong block #${i + 1} chưa được chọn`);
                        return;
                    }
                }
            }
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', title);

            contentBlocks.forEach((block, i) => {
                formData.append(`content[${i}][type]`, block.type);
                if (block.type === 'text') {
                    formData.append(`content[${i}][content]`, block.content);
                }
                if (block.type === 'image') {
                    block.media.forEach((media, j) => {
                        formData.append(`content[${i}][media][${j}][alt]`, media.alt);
                        formData.append(`content[${i}][media][${j}][note]`, media.note);
                        if (media.src) {
                            formData.append(`content[${i}][media][${j}][src]`, media.src);
                        }
                    });
                }
            });

            const res = await fetch('/api/post', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Gửi bài viết thất bại');

            const result = await res.json();
            toast.success('🎉 Bài viết đã được tạo thành công!');
            console.log(result);
            router.push(`/system/post/${result.post.id}`);
        } catch (err) {
            console.error(err);
            toast.error('❌ Có lỗi xảy ra khi gửi bài viết');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4, backgroundColor: 'white', minHeight: '100vh', }}>
            <Typography variant="h4" gutterBottom>
                Tạo bài viết mới
            </Typography>
            <Stack spacing={2}>
                <TextField
                    label="Tiêu đề"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    fullWidth
                />

                {contentBlocks.map((block, i) => (
                    <Box key={i} sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle1">
                                {block.type === 'text' ? 'Văn bản' : 'Hình ảnh'} #{i + 1}
                            </Typography>

                            {/* Nhóm nút bên phải */}
                            <Stack direction="row" spacing={1}>
                                {/* Nút thêm ảnh */}
                                {block.type === 'image' && (
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        sx={{
                                            backgroundColor: '#3CC360',
                                            color: '#fff',
                                            '&:hover': { backgroundColor: '#388e3c' },
                                        }}
                                        onClick={() => handleAddMedia(i)}
                                    >
                                        Thêm ảnh
                                    </Button>

                                )}
                                {block.type === 'image' && (
                                    <Button
                                        variant="contained"
                                        startIcon={<DeleteIcon />}
                                        sx={{
                                            backgroundColor: 'red',
                                        }}
                                        onClick={() => handleDeleteBlock(i)}
                                    >
                                        Xóa ảnh
                                    </Button>

                                )}
                            </Stack>
                        </Stack>


                        {block.type === 'text' ? (
                            <TextField
                                label="Nội dung văn bản"
                                multiline
                                fullWidth
                                value={block.content}
                                onChange={e => {
                                    const updated = [...contentBlocks];
                                    updated[i].content = e.target.value;
                                    setContentBlocks(updated);
                                }}
                            />
                        ) : (
                            <>
                                {block.media.map((media, j) => (
                                    <Box key={j} sx={{ mt: 2 }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Typography variant="body2">Ảnh #{j + 1}</Typography>
                                            <IconButton color="error" onClick={() => handleDeleteMedia(i, j)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                        <Stack spacing={1}>
                                            <Button
                                                variant="outlined"
                                                component="label"
                                                startIcon={<ImageIcon />}
                                                sx={{
                                                    width: 'fit-content',
                                                    borderRadius: '12px',
                                                    filter: 'grayscale(0.1) brightness(1.1) contrast(1.2)',
                                                    transition: '0.3s',
                                                    '&:hover': {
                                                        filter: 'none',
                                                    },
                                                }}
                                            >
                                                Tải ảnh lên
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    onChange={e => {
                                                        const file = e.target.files[0];
                                                        if (!file) return;

                                                        const updated = [...contentBlocks];
                                                        updated[i].media[j].src = file;
                                                        updated[i].media[j].alt = file.name;
                                                        setContentBlocks(updated);
                                                    }}
                                                />
                                            </Button>

                                            {/* Preview ảnh */}
                                            {media.src && (
                                                <>
                                                    <Box
                                                        component="img"
                                                        src={URL.createObjectURL(media.src)}
                                                        alt={media.alt}
                                                        onClick={() => handleImageClick(URL.createObjectURL(media.src))}
                                                        sx={{
                                                            maxWidth: '100%',
                                                            borderRadius: 2,
                                                            cursor: 'pointer',
                                                            filter: 'brightness(1.05) contrast(1.1)',
                                                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                                            transition: '0.3s',
                                                            '&:hover': {
                                                                filter: 'none',
                                                            },
                                                        }}
                                                    />
                                                    <TextField
                                                        label="Ghi chú"
                                                        value={media.note}
                                                        onChange={e => {
                                                            const updated = [...contentBlocks];
                                                            updated[i].media[j].note = e.target.value;
                                                            setContentBlocks(updated);
                                                        }}
                                                        fullWidth
                                                        multiline
                                                        sx={{ mt: 1 }}
                                                        size="small"
                                                    />
                                                </>
                                            )}
                                        </Stack>
                                    </Box>
                                ))}
                            </>
                        )}
                    </Box>
                ))}

                <Divider />
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        startIcon={<TextFieldsIcon sx={{ color: '#1976d2' }} />}
                        onClick={handleAddText}
                    >
                        Thêm văn bản
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<PhotoLibraryIcon sx={{ color: '#d32f2f' }} />}
                        onClick={handleAddImage}
                    >
                        Thêm hình ảnh
                    </Button>
                </Stack>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Gửi bài viết
                </Button>
            </Stack>
            <Backdrop
                open={loading}
                sx={{
                    zIndex: theme => theme.zIndex.drawer + 1,
                    color: '#fff',
                    backdropFilter: 'blur(2px)',
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    );
}
