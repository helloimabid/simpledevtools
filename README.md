# SimpleDevTools 🛠️

> Privacy-first developer utilities that run entirely in your browser. No server uploads. No data collection. Just code.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Live Site](https://img.shields.io/badge/Website-Live-green.svg)](https://simpledevtools.tech)
[![Privacy First](https://img.shields.io/badge/Privacy-First-red.svg)](https://simpledevtools.tech)

## 🚀 Features

- **🔒 100% Private**: All processing happens in your browser
- **⚡ Lightning Fast**: No network round-trips, instant results
- **📱 Responsive**: Works perfectly on all devices
- **🌙 Dark Mode**: Built-in dark/light theme support
- **📴 Offline Ready**: Service worker enables offline usage
- **🎨 Beautiful UI**: Modern, clean, and intuitive interface
- **📊 Performance Optimized**: Lighthouse scores 90+

## 🛠️ Available Tools

### **Data Processing Tools**

| Tool                                     | Description                                | Features                                                                                                                                                              |
| ---------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[JSON Formatter](/json-formatter)** | Validate, beautify, and convert JSON data  | • Syntax highlighting `<br>`• Tree view with search `<br>`• Convert to TypeScript/YAML/CSV `<br>`• Error detection & fixing `<br>`• Real-time validation |
| **[Base64 Encoder](/base64-encoder)** | Encode and decode Base64 strings and files | • String & file encoding `<br>`• QR code generation `<br>`• URL-safe variant `<br>`• Drag & drop support `<br>`• Real-time conversion                    |
| **[JWT Decoder](/jwt-decoder)**       | Decode JSON Web Tokens instantly           | • Header & payload view `<br>`• Signature validation `<br>`• Token expiration check `<br>`• Pretty-print JSON `<br>`• Copy individual parts              |
| **[Hash Generator](/hash-generator)** | Generate MD5, SHA-256, and other hashes    | • Multiple algorithms `<br>`• Instant generation `<br>`• Copy to clipboard `<br>`• File hashing `<br>`• Compare hashes                                   |

### **Security & Validation Tools**

| Tool                                                             | Description                            | Features                                                                                                                                                                 |
| ---------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **[Password Strength Analyzer](/password-strength-analyzer)** | Analyze password security and strength | • Real-time strength meter `<br>`• Entropy calculation `<br>`• Common password detection `<br>`• Improvement suggestions `<br>`• Visual strength indicators |
| **[Regex Tester](/regex-tester)**                             | Test and validate regular expressions  | • Live pattern testing `<br>`• Match highlighting `<br>`• Group extraction `<br>`• Test strings library `<br>`• Instant feedback                            |

### **Utility Tools**

| Tool                                         | Description                                      | Features                                                                                                                                                 |
| -------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[UUID Generator](/uuid-generator)**     | Generate cryptographically strong UUID v4 tokens | • Cryptographically secure `<br>`• Bulk generation `<br>`• Multiple formats `<br>`• Copy to clipboard `<br>`• Version info                  |
| **[Image Compressor](/image-compressor)** | Compress and optimize images locally             | • Multiple format support `<br>`• Quality adjustment `<br>`• Size comparison `<br>`• Before/after preview `<br>`• Download optimized images |

## 📚 Learning Resources

### **Guides & Documentation**

- **[JSON Formatter Guide](/guides/json-formatter-guide)** - Complete guide to JSON formatting, validation, and advanced features
- **[How It Works](/how-it-works)** - Technical overview of our client-side architecture
- **[Tools Overview](/tools)** - Categorized tool collection with descriptions
- **[All Guides](/guides)** - Comprehensive learning resources (more coming soon)

### **Support Pages**

- **[Contact Us](/contact)** - Get in touch with feedback or suggestions
- **[Privacy Policy](/privacy-policy)** - Our commitment to your privacy
- **[Terms of Service](/terms)** - Usage terms and conditions

## 🏗️ Architecture

### **Client-Side Processing**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Your Data    │ →  │   Browser      │ →  │   Results      │
│   (Private)   │    │   (V8 Engine)  │    │   (Instant)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Privacy by Design**

- ✅ **No server uploads** - Your data never leaves your device
- ✅ **No tracking** - We don't collect any personal information
- ✅ **No cookies** - Essential cookies only for functionality
- ✅ **Open source** - Transparent code you can inspect
- ✅ **Offline capable** - Works without internet connection

## 🚀 Getting Started

### **Quick Start**

1. **Visit any tool** - Navigate to your desired tool
2. **Input your data** - Paste, type, or drag & drop
3. **Get instant results** - No waiting, no loading

### **Installation (Local Development)**

```bash
# Clone the repository
git clone https://github.com/helloimabid/simpledevtools.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Development Stack**

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS v4.1.18
- **Icons**: Lucide Icons (optimized bundle)
- **Build**: ESBuild for asset bundling
- **Service Worker**: Custom offline caching
- **Fonts**: Inter, Space Grotesk, JetBrains Mono

## 🎯 Performance

### **Optimization Features**

- **Critical CSS inlining** for faster first paint
- **Resource preloading** for optimal loading
- **Service Worker caching** for offline support
- **Tree-shaken icons** (20KB vs 88KB CDN)
- **Lazy loading** for non-critical images
- **Minified assets** with optimal compression

### **Lighthouse Scores**

- **Performance**: 90-95
- **Accessibility**: 95-100
- **Best Practices**: 95-100
- **SEO**: 90-95

## 🌐 Browser Support

| Browser | Version | Support |
| ------- | ------- | ------- |
| Chrome  | 80+     | ✅ Full |
| Firefox | 75+     | ✅ Full |
| Safari  | 13+     | ✅ Full |
| Edge    | 80+     | ✅ Full |
| Opera   | 67+     | ✅ Full |

## 📱 Responsive Design

- **Mobile**: 320px+ - Optimized for phones
- **Tablet**: 768px+ - Perfect for tablets
- **Desktop**: 1024px+ - Full desktop experience
- **Large**: 1440px+ - Ultra-wide displays

## 🔧 Configuration

### **Build Scripts**

```bash
npm run dev          # Start development with watch
npm run build        # Build production assets
npm run build-icons  # Build optimized icon bundles
```

## 🎨 Theming

### **Color Scheme**

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-accent: #06b6d4;
  --background: #ffffff;
  --surface: #f9fafb;
}

[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-secondary: #3b82f6;
  --color-accent: #10b981;
  --background: #000000;
  --surface: #111827;
}
```

### **Typography**

- **Display**: Space Grotesk (headings, branding)
- **Sans**: Inter (body text, UI)
- **Mono**: JetBrains Mono (code, technical)

## 🔒 Security & Privacy

### **Data Protection**

- **Client-side processing** - No server transmission
- **HTTPS enforcement** - Secure connections only
- **CSP headers** - Content Security Policy
- **No analytics** - We don't track user behavior
- **Local storage only** - Data stored locally in browser

### **Privacy Features**

- **No registration required** - Use tools instantly
- **No personal data collection** - Zero tracking
- **No cookies for tracking** - Essential only
- **No third-party scripts** - Except essential services
- **Open source code** - Full transparency

## 🌍 Internationalization

### **Supported Languages**

- **English** (en) - Primary language
- **More coming soon** - Planned internationalization

### **RTL Support**

- **LTR layout** - Left-to-right text direction
- **RTL ready** - Prepared for right-to-left languages

## 📊 Analytics & Monitoring

### **Performance Monitoring**

- **Core Web Vitals** tracking
- **Error boundary** logging
- **User experience** metrics
- **Bundle size** monitoring

### **Usage Analytics**

- **Anonymous usage** statistics only
- **No personal data** collected
- **Opt-in analytics** only
- **Privacy-first** approach

## **Development Workflow**

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request

### **Code Standards**

- **ES6+ JavaScript** with modern features
- **Tailwind CSS** for styling
- **Semantic HTML5** markup
- **Accessibility** best practices
- **Performance** optimization

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### **What You Can Do**

- ✅ **Modification** - Modify the code
- ✅ **Distribution** - Distribute your version
- ✅ **Private use** - Use privately
- ✅ **Sublicensing** - License under different terms

### **What You Must Do**

- ⚠️ **Include license** - Provide license copy
- ⚠️ **Copyright notice** - Keep original copyright
- ⚠️ **Disclaimer** - Provide warranty disclaimer

## 🙏 Acknowledgments

### **Open Source Libraries**

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon library
- **[ESBuild](https://esbuild.github.io/)** - Fast JavaScript bundler

### **Inspiration**

- Inspired by the need for **privacy-first developer tools**
- Built for developers who **value their data privacy**
- Created with ❤️ for the **developer community**

## 📞 Support & Feedback

### **Getting Help**

- **[Documentation](/guides)** - Browse our guides
- **[Contact Form](/contact)** - Send us a message
- **[GitHub Issues](https://github.com/helloimabid/simpledevtools/issues)** - Report bugs
- **[Feature Requests](https://github.com/helloimabid/simpledevtools/discussions)** - Suggest features

### **Community**

<!-- - **Twitter** [@SimpleDevTools](https://twitter.com/SimpleDevTools) -->

- **GitHub** [SimpleDevTools](https://github.com/helloimabid/simpledevtools)
- **Website** [simpledevtools.tech](https://simpledevtools.tech)

---

<div align="center">

**🛠️ Made with ❤️ for developers who value privacy**

[![SimpleDevTools](https://simpledevtools.tech/logo.png)](https://simpledevtools.tech)

</div>
