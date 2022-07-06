# webpack 5 and tailwindcss setup

## Development / Steps
### 1. Run ```npm init``` in the cmd.
- package.json will be created
### 2. Install webpack
Run ```npm install webpack webpack-cli```
- create webpack.config.js file
### 3. Install dependencies
Run ```npm i --save-dev css-loader autoprefixer html-loader html-webpack-plugin postcss postcss-loader style-loader tailwindcss webpack-dev-server```
- Now you can check the installed dependencies at package.json
### 4. Modify scripts
- Go to package.json and search for scripts
You probably have something like: 
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },  
```
. Delete this and change it for:
```json
"scripts": {
    "dev": "webpack serve --mode=development",
    "build": "webpack --mode=production"
  },
```
- Now run ```npm run``` and you will see the two options ```dev``` and ```build```
### 5. webpack.config.js
- This is probably the most difficult part, if you don't know webpack I recommend you to check the documentation at https://webpack.js.org/concepts/

Start writing:
```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Plugin
const path = require('path');
``` 
In the top of your file, don't forget to delete the comments.

#### 5.1 Loaders
- Create two variables
```js
const ruleForStyles = {
  test: /\.css$/,
  use: ["style-loader", "css-loader", "postcss-loader"]
}

const ruleForHtml = {
  test: /\.html$/i,
  loader: "html-loader"
}
```

##### 5.2
Then, let's create the module.exports, the output point, the modules, plugins, and devServer.
```js
module.exports = (env, argv) => {
  const { mode } = argv
  const isProduction = mode === 'production'
  return {
    // entry: './src/index.js',
    output: {
      filename: isProduction ? '[name].[contenthash].js' : 'main.js', // Change the filename
      path: path.resolve(__dirname, "build") // Change the folder name
    },
    module: {
      rules: [
        ruleForStyles,
        ruleForHtml,
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'src/index.html' }) // Modify template if necessary
    ],
    devServer: {
      open: true,
      port: 3000
    },
  }
}
```

### 6. tailwind.config.js
- Create `tailwind.config.js` file
Write:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 7. postcss.config.js
- Create `postcss.config.js` file and paste
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

### 8. Create `src` folder
Inside the src folder add:
- index.html // template
- styles.css
Paste
``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- index.js
In the index.js import `index.html` and `styles.css`
```js
import './styles.css'
import './index.html'
```
### 9. Optional .gitignore
Create ```.gitignore``` and write `node_modules`

### Now you are ready to go!
Run `npm run dev`import
