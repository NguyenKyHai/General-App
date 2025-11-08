"use client";

import { Box, Button, Container } from "@mui/material";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { usePathname } from "next/navigation";
import PrintIcon from "@mui/icons-material/Print";
import RefreshIcon from "@mui/icons-material/Refresh";
import { generatePrintDate } from "@/utils/utils";

export default function Layout({ children }) {
    const contentRef = useRef(null);
    const pathname = usePathname();

    // 👉 Tạo tên file tự động theo định dạng
    const fileName = generatePrintDate("HD");

    const reactToPrintFn = useReactToPrint({
        contentRef,
        documentTitle: fileName,
        pageStyle: `
      @page { size: A4; margin: 10mm; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    `,
    });

    const handleRefresh = () => location.reload();

    return (
        <Container
            disableGutters
            sx={{
                py: 2,
                width: "210mm",
                maxWidth: "100%",
                mx: "auto",
            }}
        >
            {/* Thanh công cụ */}
            {pathname !== "/print" && (
                <Box
                    className="no-print"
                    sx={{
                        mb: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "210mm",
                        mx: "auto",
                    }}
                >
                    {/* Nút trái */}
                    <Button href="/print" variant="outlined">
                        ← Quay lại
                    </Button>

                    {/* Nút giữa */}
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PrintIcon />}
                        onClick={reactToPrintFn}
                    >
                        In trang này
                    </Button>

                    {/* Nút phải */}
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<RefreshIcon />}
                        onClick={handleRefresh}
                    >
                        Refresh
                    </Button>
                </Box>
            )}

            {/* Nội dung in */}
            <Box ref={contentRef}>{children}</Box>
        </Container>
    );
}
