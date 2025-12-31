"use client";

import PrintWrapper from "@/components/PrintWrapper";
import { Box, Grid, Typography, Divider, List, ListItem } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";

export default function CVContent() {
  return (
    <PrintWrapper>
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Box display="flex" alignItems="flex-start" mb={1}>
          {/* Hình bên trái */}
          <Box
            component="img"
            src="/images/image.png" // thay bằng ảnh thật
            alt="Profile Photo"
            sx={{
              width: 180,
              height: 180,
              borderRadius: "50%",
              objectFit: "cover",
              mr: 4, // tạo khoảng cách giữa ảnh và text
            }}
          />

          {/* Thông tin bên phải */}
          <Box flex={1}>
            <Grid container spacing={7}>
              {/* Cột trái */}
              <Grid item xs={6}>
                <Typography variant="h5" fontWeight="bold">NGUYỄN KỲ HẢI</Typography>
              </Grid>

              {/* Cột phải */}
              <Grid item xs={6}>
                <Typography variant="h5" fontWeight="bold">WEB DEVELOPER</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={5} mt={1}>
              {/* Cột trái */}
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" mb={1}>
                  <EventIcon sx={{ color: "black", fontSize: 18, mr: 1 }} />
                  <Typography variant="subtitle1">08/01/2001</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <PhoneIcon sx={{ color: "black", fontSize: 18, mr: 1 }} />
                  <Typography variant="subtitle1">038 605 8778</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <HomeIcon sx={{ color: "black", fontSize: 18, mr: 1 }} />
                  <Typography variant="subtitle1">Thu Duc Ward, HCMC</Typography>
                </Box>
              </Grid>

              {/* Cột phải */}
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" mb={1}>
                  <PersonIcon sx={{ color: "black", fontSize: 18, mr: 1 }} />
                  <Typography variant="subtitle1">Male</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <EmailIcon sx={{ color: "black", fontSize: 18, mr: 1 }} />
                  <Typography variant="subtitle1">nguyenkyhai0801@gmail.com</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <GitHubIcon sx={{ color: "black", fontSize: 18, mr: 1 }} />
                  <Typography variant="subtitle1">github.com/NguyenKyHai</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box mt={1}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            SUMMARY
          </Typography>

          <Typography variant="subtitle1">
            Web Developer with 3+ years of experience working on outsourcing projects, participating in multiple web applications using ASP.NET Core, React, and Next.js.
            Experienced in implementing features, integrating APIs, and maintaining existing systems.
            Comfortable working in team-based development environments.
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box mt={1}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
            TECHNICAL SKILLS
          </Typography>

          {/* Backend & Database */}
          <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
            Backend & Database
          </Typography>
          <List dense sx={{ mb: 1, padding: 0 }}>
            {[
              "C#, ASP.NET Core 6, Web API, WinForm, DataSpider",
              "Entity Framework Core, LINQ, ADO.NET",
              "SQL Server, MariaDB - T-SQL queries, stored procedures",
              "Authentication & Authorization (JWT)",
            ].map((text) => (
              <ListItem key={text} sx={{ py: 0 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                  • {text}
                </Typography>
              </ListItem>
            ))}
          </List>

          {/* Programming Concepts */}
          <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
            Programming Concepts
          </Typography>
          <List dense sx={{ mb: 1, padding: 0 }}>
            {["Object-Oriented Programming (OOP)", "SOLID principles", "Repository & Dependency Injection patterns"].map((text) => (
              <ListItem key={text} sx={{ py: 0 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                  • {text}
                </Typography>
              </ListItem>
            ))}
          </List>

          {/* Frontend */}
          <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
            Frontend
          </Typography>
          <List dense sx={{ mb: 1, padding: 0 }}>
            {["ReactJS, Next.js (basic to intermediate)", "JavaScript (ES6+), TypeScript (Kintone projects)", "HTML5, CSS3, Tailwind CSS"].map((text) => (
              <ListItem key={text} sx={{ py: 0 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                  • {text}
                </Typography>
              </ListItem>
            ))}
          </List>

          {/* DevOps & Tools */}
          <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
            Others
          </Typography>
          <List dense sx={{ mb: 1, padding: 0 }}>
            {["Docker", "GitHub & SVN", "AI-assisted development (ChatGPT, GitHub Copilot)"].map((text) => (
              <ListItem key={text} sx={{ py: 0 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                  • {text}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* WORK EXPERIENCE */}
        <Box mb={1}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>WORK EXPERIENCE</Typography>

          {/* Capgemini */}
          <Box mt={1}>
            <Typography variant="body1" fontWeight="bold">Intern & Developer | 08/2022 - 01/2023 </Typography>
            <Typography variant="body1">Capgemini Vietnam (French IT Outsourcing - Banking Sector)</Typography>
          </Box>

          {/* ISV Vietnam */}
          <Box mt={1}>
            <Typography variant="body1" fontWeight="bold">Web Developer | 06/2023 - Present </Typography>
            <Typography variant="body1">ISV Vietnam (Software Development for Japanese Market)</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />
        {/* Kinh nghiệm */}
        <Box mb={1}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            PROJECTS
          </Typography>

          {/* HSBC FX Nova Banking */}
          <Box mt={1}>
            <Typography variant="subtitle1">
              HSBC FX NOVA Banking | 09/2022 - 01/2023 | Developer | Team: 50+ | Customer: HSBC Bank
            </Typography>

            <List dense sx={{ mb: 1, padding: 0 }}>
              {[
                "Migrated code to Java Spring Boot and enhanced API security.",
                "Configured deployments on AWS/IKP/GCP and assisted unit testing.",
              ].map((text, idx) => (
                <ListItem key={idx} sx={{ py: 0, minHeight: 0 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                    • {text}
                  </Typography>
                </ListItem>
              ))}

              {/* Technologies */}
              <ListItem sx={{ py: 0, minHeight: 0 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                  - Technologies: Microservices, Java Spring Boot, AWS, CI/CD, Jenkins, Mule App
                </Typography>
              </ListItem>
            </List>
          </Box>

          {/* KDDI OZO3 - KENMARI */}
          <Box mt={1}>
            <Typography variant="subtitle1" >
              KDDI OZO3 - KENMARI | Fullstack Developer | Team: 5 | Customer: COEL (ITCS)
            </Typography>

            <List dense sx={{ mb: 1, padding: 0 }}>
              {/* Phase 1 */}
              <ListItem sx={{ py: 0, minHeight: 0 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                  ► 08/2023 - 05/2024
                </Typography>
              </ListItem>
              {[
                "Expanded employee onboarding workflows: new hires, equipment allocation/return, and offboarding.",
                "Maintained and enhanced other system functionalities.",
              ].map((text, idx) => (
                <ListItem key={"phase1-" + idx} sx={{ py: 0, minHeight: 0 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                    • {text}
                  </Typography>
                </ListItem>
              ))}

              {/* Phase 2 */}
              <ListItem sx={{ py: 0, minHeight: 0 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                  ► 08/2024 - 10/2024
                </Typography>
              </ListItem>
              {[
                "Implemented automated password updates and user info management using LDAP and Active Directory.",
                "Implemented batch processing for bulk employee updates and deliveries.",
              ].map((text, idx) => (
                <ListItem key={"phase2-" + idx} sx={{ py: 0, minHeight: 0 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                    • {text}
                  </Typography>
                </ListItem>
              ))}

              {/* Technologies */}
              <ListItem sx={{ py: 0, minHeight: 0 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                  - Technologies: .NET Framework 4.5, DataSpider, Adobe ColdFusion, JavaScript, ADO.NET, SQL Server, Windows Server 2012, LDAP, Active Directory
                </Typography>
              </ListItem>
            </List>
          </Box>

          {/* Mixsol */}
          <Box mt={1}>
            <Typography variant="subtitle1">
              MIXSOL | 12/2023 - Present | Developer | Team: 3 | Customer: COEL (ITCS)
            </Typography>

            <List dense sx={{ mb: 1, padding: 0 }}>
              {[
                "Built Kintone UI for data import/export from Bugyo Cloud.",
                "Developed and maintained DataSpider scripts to automate data integration.",
                "Implemented TypeScript plugins to extend Kintone functionalities."
              ].map((text, idx) => (
                <ListItem key={idx} sx={{ py: 0, minHeight: 0 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                    • {text}
                  </Typography>
                </ListItem>
              ))}

              {/* Technologies */}
              <ListItem sx={{ py: 0, minHeight: 0 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                  - Technologies: DataSpider, Kintone, TypeScript, SQL Server, Bugyo Cloud
                </Typography>
              </ListItem>
            </List>
          </Box>

          {/* Internal Company Projects */}
          <Box mt={1}>
            <Typography variant="subtitle1">
              INTERNAL COMPANY PROJECTS | 02/2025 - 08/2025 | Fullstack Developer | Team: 3-8
            </Typography>

            <List dense sx={{ mb: 1, padding: 0 }}>
              {[
                "Designed and developed UI for general management system; refactored legacy code to improve maintainability and performance.",
                "Maintained VB.NET Windows Form application and SQL Server stored procedures.",
                "Developed API for scheduling application and dynamic front-end components using React TypeScript.",
                "Collaborated with QA to conduct extensive testing before deployment."
              ].map((text, idx) => (
                <ListItem key={idx} sx={{ py: 0, minHeight: 0 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                    • {text}
                  </Typography>
                </ListItem>
              ))}

              {/* Technologies */}
              <ListItem sx={{ py: 0, minHeight: 0 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                  - Technologies: ASP.NET Core 6 Web API, VB.NET Windows Form, React, Redux, JavaScript, SQL Server
                </Typography>
              </ListItem>
            </List>
          </Box>

          {/* USJ - Truck Rental */}
          <Box mt={1}>
            <Typography variant="subtitle1" >
              USJ - Truck Rental | 08/2025 - Present | Fullstack Developer | Team: 8 | Customer: TCS
            </Typography>

            <List dense sx={{ mb: 1, padding: 0 }}>
              {[
                "Developed and maintained web application for truck rental and sales management.",
                "Implemented features for contract creation, tracking, and reporting.",
              ].map((text, idx) => (
                <ListItem key={idx} sx={{ py: 0, minHeight: 0 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                    • {text}
                  </Typography>
                </ListItem>
              ))}

              {/* Technologies */}
              <ListItem sx={{ py: 0, minHeight: 0 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                  - Technologies: NextJS, Prisma, MariaDB
                </Typography>
              </ListItem>
            </List>
          </Box>

        </Box>

        <Divider sx={{ my: 1 }} />
        {/* Học vấn */}
        <Box mt={1}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
            EDUCATION
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
            Bachelor of Engineering in Infomation Technology <br />
            Ho Chi Minh University of Technology and Education, Vietnam <br />
            Graduated: 2023 | GPA: 3.35/4.0
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
            Certifications:
          </Typography>
          <List dense sx={{ mb: 1, padding: 0 }}>
            <ListItem>
              <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                TOEIC: 645 (2021)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                AWS Academy Graduate - AWS Academy Cloud Foundations (2022)
              </Typography>
            </ListItem>
          </List>
        </Box>

      </Box>
    </PrintWrapper >
  );
}
