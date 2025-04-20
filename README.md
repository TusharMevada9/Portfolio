# Tushar Portfolio

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all devices
- Clean and modern UI with smooth animations
- Interactive sections showcasing skills and projects
- Contact form with validation
- Smooth scrolling navigation
- Skills bars with animation
- Project cards with hover effects

## File Structure

- `index.html` - The main HTML file containing the structure of the portfolio
- `styles.css` - CSS styles for the portfolio
- `script.js` - JavaScript functionality for the portfolio

## How to Use

1. Clone or download this repository
2. Open the `index.html` file in your browser
3. Customize the content to make it your own:
   - Replace placeholder images with your own
   - Update text content and information
   - Modify colors and styling as needed
   - Add your own projects to the projects section

## Customization

### Changing Colors

The color scheme can be easily modified by changing the CSS variables in the `:root` selector in the `styles.css` file:

```css
:root {
    --primary-color: #4a00e0;
    --secondary-color: #8e2de2;
    --text-color: #333;
    --light-text: #777;
    --white: #fff;
    --light-bg: #f9f9f9;
    --dark-bg: #1a1a1a;
    --border-color: #ddd;
    --transition: all 0.3s ease;
}
```

### Adding Projects

To add a new project to the portfolio, copy and paste the project card template in the `index.html` file and update the content:

```html
<div class="project-card">
    <div class="project-image">
        <img src="path-to-your-image.jpg" alt="Project Name">
    </div>
    <div class="project-info">
        <h3>Project Name</h3>
        <p>Project description goes here.</p>
        <div class="project-tags">
            <span>Tag1</span>
            <span>Tag2</span>
            <span>Tag3</span>
        </div>
        <div class="project-links">
            <a href="#" class="btn">View Live</a>
            <a href="#" class="btn btn-secondary">Source Code</a>
        </div>
    </div>
</div>
```

## License

Feel free to use this portfolio template for your personal use.

## Credits

Built by Tushar 