require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Serve static files
app.use(express.static('public'));

// Move current files to public directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `Portfolio Contact from ${name}`,
            text: `
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Projects API Endpoint
const projects = [
    {
        id: 1,
        title: 'مشروع 1',
        description: 'تطوير موقع إلكتروني',
        image: 'images/project1.jpg',
        technologies: ['React', 'Node.js', 'MongoDB'],
        link: '#'
    },
    {
        id: 2,
        title: 'مشروع 2',
        description: 'تطبيق موبايل',
        image: 'images/project2.jpg',
        technologies: ['React Native', 'Firebase'],
        link: '#'
    },
    {
        id: 3,
        title: 'مشروع 3',
        description: 'منصة تعليمية',
        image: 'images/project3.jpg',
        technologies: ['Vue.js', 'Laravel', 'MySQL'],
        link: '#'
    }
];

app.get('/api/projects', (req, res) => {
    res.json(projects);
});

// Fallback route for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
