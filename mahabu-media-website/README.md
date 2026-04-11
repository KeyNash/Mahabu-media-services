git add# Mahabu Media Services Website

A professional, responsive website for Mahabu Media Services built with HTML, CSS, and JavaScript.

## Color Scheme

The website uses the brand colors from your logo:
- **Primary Blue**: #0047AB (deep blue from logo)
- **Gold**: #D4AF37 (gold accents from logo)
- **Supporting colors**: Various grays and whites for clean design

## Folder Structure

```
mahabu-media-website/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles (responsive, animations)
├── js/
│   └── main.js         # Interactive functionality
├── images/             # Placeholder for your images
└── README.md           # This file
```

## Features

### Sections Included
1. **Navigation** - Fixed navbar with smooth scroll, mobile responsive
2. **Hero** - Eye-catching banner with call-to-action buttons
3. **Services** - 6 service cards (Video, Photo, Live Stream, Film, Audio, Design)
4. **About** - Company story with experience badge
5. **Stats** - Animated counter (Projects, Clients, Awards, Team)
6. **Portfolio** - Filterable gallery with categories
7. **Testimonials** - Client reviews slider
8. **Contact** - Contact form + info + social links
9. **Footer** - Links, newsletter signup, legal

### Interactive Features
- Smooth scrolling navigation
- Mobile hamburger menu
- Animated statistics counter
- Portfolio filtering (All/Video/Photo/Live Stream)
- Testimonials auto-slider with manual controls
- Form validation with notifications
- Back-to-top button
- Scroll animations (fade-in effects)
- Sticky navigation on scroll

## How to Customize

### 1. Update Content
Open `index.html` and edit the text content in each section. Look for:
- Hero title, subtitle, tagline
- Service descriptions
- About text
- Contact information (phone, email, address)
- Footer links

### 2. Replace Images
Add your images to the `images/` folder and update the `src` attributes:

**Required Images:**
- `about-image.jpg` - About section team/company photo
- `portfolio-1.jpg` through `portfolio-6.jpg` - Portfolio items
- `client-1.jpg`, `client-2.jpg`, `client-3.jpg` - Testimonial avatars

**Image Sizes (recommended):**
- About image: 600x500px
- Portfolio images: 400x280px
- Client avatars: 100x100px (will be cropped to circle)

### 3. Update Logo Path
The logo is currently referenced from the upload folder:
```html
<img src="../upload/Mahabu Media Services logo - No background.png" alt="Mahabu Media Services">
```

You can copy your logo to the `images/` folder and update the path to:
```html
<img src="images/your-logo.png" alt="Mahabu Media Services">
```

### 4. Update Colors (Optional)
If you want to adjust colors, edit `css/style.css` and modify the CSS variables at the top:
```css
:root {
    --primary-blue: #0047AB;    /* Change this */
    --gold: #D4AF37;            /* Change this */
    ...
}
```

### 5. Update Contact Info
In `index.html`, find the contact section and update:
- Phone number
- Email address
- Physical address
- Social media links (Facebook, Twitter, Instagram, YouTube, LinkedIn)

### 6. Form Handling
The contact form currently shows a success notification. To make it functional:

**Option A: Use Formspree (Free)**
1. Sign up at https://formspree.io
2. Replace the form tag with:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option B: Use Netlify Forms**
Add `netlify` attribute to the form:
```html
<form name="contact" netlify>
```

**Option C: Custom Backend**
Connect to your own server/PHP script by changing the form action.

## Responsive Breakpoints

The website is fully responsive with these breakpoints:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Performance Notes

- Uses Google Fonts (Poppins)
- Font Awesome icons (CDN)
- Minimal JavaScript for fast loading
- CSS animations use GPU acceleration
- Images should be optimized (WebP recommended)

## License

This website template is created for Mahabu Media Services.

## Support

For any questions or customization help, feel free to reach out!
