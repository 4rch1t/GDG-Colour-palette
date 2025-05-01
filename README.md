# Color Palette Generator

A modern, flat UI React application that allows users to select 3 base colors and generate a 5-color palette, inspired by coolors.co.

![Color Palette Generator](https://via.placeholder.com/800x400?text=Color+Palette+Generator)

## Features

- Select 3 base colors using a color picker or by entering hex values
- Generate random colors with a single click
- Create a 5-color palette based on your selections
- Display colors in a full-screen, coolors.co-style layout
- Regenerate palette with different variations
- Copy color codes to clipboard with a single click
- Responsive design that works on desktop and mobile devices
- Modern, flat UI design with smooth transitions

## How It Works

The application has two main modes:
1. **Selection Mode**: Choose your 3 base colors
2. **Palette Mode**: View the generated 5-color palette in a full-screen layout

The palette generation includes:
- Your base colors
- Complementary colors (opposite on the color wheel)
- Analogous colors (adjacent on the color wheel)
- All displayed in an immersive, full-screen layout

The regenerate feature creates alternative palettes using:
- Lighter and darker variations of your base colors
- Different complementary color combinations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/color-palette-generator.git
cd color-palette-generator
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

1. Select your base colors using the color pickers or by entering hex values
2. The palette will automatically update as you change colors
3. Add or remove base colors using the buttons provided (up to 5 colors)
4. Click on any color swatch to copy its hex code to your clipboard
5. Use the generated palette in your design projects

## Building for Production

To create a production build:

```
npm run build
```

This will create an optimized build in the `build` folder that you can deploy to any static hosting service.

## Technologies Used

- React
- CSS3
- HTML5

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by various color theory principles
- Built with React for a smooth, interactive user experience
