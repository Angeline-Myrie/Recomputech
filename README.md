# Recomputech - Sustainable Technology Platform

A modern web platform for refurbished technology and professional technical services.

## 🚀 Features

- **Refurbished Products Marketplace**: Browse and purchase certified refurbished devices
- **Professional Services**: Technical support, repairs, and optimization services
- **User Authentication**: Secure login/register system with role-based access
- **Dashboard**: User and technician dashboards with analytics
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes for better user experience

## 🛠️ Development Setup

### Prerequisites
- A modern web browser
- Live Server extension (VS Code) or any local server

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/yourusername/Recomputech.git
cd Recomputech
```

2. Open with Live Server:
   - Install Live Server extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"
   - Or use any local server of your choice

3. The site will be available at `http://localhost:5500` (or your server's port)

## 🌐 GitHub Pages Deployment

### Automatic Deployment
1. Push your changes to the main branch
2. Go to your repository settings on GitHub
3. Navigate to "Pages" in the sidebar
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

### Manual Deployment
1. Ensure all files are committed to the main branch
2. GitHub Pages will automatically build and deploy your site
3. Your site will be available at: `https://yourusername.github.io/Recomputech/`

## 📁 Project Structure

```
Recomputech/
├── index.html                 # Homepage
├── assets/                    # Images, logos, and media files
│   ├── images/
│   └── logos/
├── css/                       # Stylesheets
│   ├── styles.css            # Global styles
│   ├── homepage.css          # Homepage specific styles
│   └── ...
├── js/                        # JavaScript files
│   ├── config.js             # Configuration for paths
│   ├── path-fixer.js         # Path fixing for GitHub Pages
│   └── ...
├── components/                # Web Components
│   ├── header-component.js
│   ├── footer-component.js
│   └── ...
├── pages/                     # Additional pages
│   ├── marketplace.html
│   ├── contact.html
│   └── ...
├── dashboard/                 # Dashboard pages
│   ├── RegularUser/
│   └── Technician/
└── auth/                      # Authentication pages
```

## 🔧 Configuration

### Path Management
The project automatically handles path differences between local development and GitHub Pages:

- **Local Development**: Uses relative paths
- **GitHub Pages**: Uses absolute paths with `/Recomputech/` prefix

### Key Configuration Files
- `js/config.js`: Main configuration for paths and environment detection
- `js/path-fixer.js`: Automatically fixes paths for different environments
- `components/*.js`: Web components with built-in path handling

## 🎨 Customization

### Colors
The brand colors are defined in CSS variables:
- Primary: `#218DA6`
- Secondary: `#1b6e82`

### Adding New Pages
1. Create your HTML file in the appropriate directory
2. Include the necessary scripts:
   ```html
   <script src="../js/config.js"></script>
   <script src="../js/path-fixer.js"></script>
   ```
3. Use the web components for consistent header/footer

## 🐛 Troubleshooting

### Common Issues

**Images not loading on GitHub Pages:**
- Ensure all image paths are relative to the root
- Check that `path-fixer.js` is included in your pages

**Links not working:**
- Use relative paths for internal links
- The path-fixer will automatically adjust them for GitHub Pages

**Scripts not loading:**
- Make sure `config.js` is loaded before other scripts
- Check browser console for path-related errors

### Debug Mode
Open browser console to see path resolution logs:
- Local: Shows relative path resolution
- GitHub Pages: Shows absolute path resolution

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally and on GitHub Pages
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

---

**Note**: This project is configured to work seamlessly between local development (Live Server) and GitHub Pages deployment. All paths are automatically adjusted based on the environment.