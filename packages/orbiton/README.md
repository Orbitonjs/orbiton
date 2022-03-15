<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">

<h1><div align="center"> <img src="https://raw.githubusercontent.com/Orbitonjs/orbiton/main/branding/banner.svg" style="align-items:center;" ></div></h1>

##### <div align="center"> [![License: MIT](https://flat.badgen.net/npm/license/orbiton)](https://opensource.org/licenses/MIT) [![Npm package total downloads](https://flat.badgen.net/npm/dt/orbiton)](https://npmjs.com/package/orbiton) [![version](https://flat.badgen.net/npm/v/orbiton)](https://npmjs.com/package/orbiton) [![Sponsor On Patreon](https://flat.badgen.net/badge/icon/patreon?icon=patreon&label&color=orange)](https://www.patreon.com/jimjunior) [![](https://flat.badgen.net/badge/icon/github?icon=github&label&color=black)](https://github.com/Orbitonjs/orbiton) </div>

A Javascript library for building Browser User Interfaces.
Orbiton JS is a component based Javascript rendering Engine for creating User Interfaces in the browser.

## Why use <span style="text-decoration: underline; text-decoration-color: aqua;color: #005fff;">Orbiton</span>

Make your choice to use Orbiton based off facts.

- __Light Weight__: One of the greatest advantage of Orbiton is that its lightweight. Orbiton is just 3.5kb min+gzip, This assures you that your app has fast page loads since most of the chunk is from just your own code.
- __Close To Dom__: This is another advantage of Orbiton. Being close to the DOM means that the library will not have to carry out many functions in order to update the Dom making the app feel fast for the user.
- __Reactive__: The library is reactive making you create modern web apps that provide a native feel to the user. This makes it even better for creating Progressive web apps.
- __Rust Renderer__: Orbiton JS has a new experimantal Rust Render that compiles to wasm. Rust is known for its perfomance hence makin Orbiton Applications run at maximun performance.

## Installation

Installing Orbiton is Quite simple. You can use Orbiton to build full Single page Application or just small parts of your website.

### Using CDN

You can add Orbiton to your website using an Javascript CDN you prefer

```html
<script crossorigin src="https://unpkg.com/orbiton@latest/umd/orbiton.production.js"></script>
```

### Using Node JS

If you are using [Node](https://nodejs.org) to build a your web app run this in the command line

```bash
# yarn
yarn add orbiton

# npm
npm install orbiton
```

### Deno

Orbiton also supports development in [deno](https://deno.land).

```js

import Orbiton from "https://cdn.jsdeliver.net/npm/orbiton/esm/orbitonjs.development.js"
```

## Usage

Using Orbiton is easy. All you have to do is import Orbiton and use JSX to create your app. Visit the Orbiton JS [documentation here](https://orbiton.js.org) to Learn how to build Apps in Orbiton JS.

```jsx
import Orbiton from 'orbiton'
const App = (
  <div>
    <h1>Hello World</h1>
  <div>
)

Orbiton.append(App, document.getElementById('root'))
```

Here are some important links that you might find usefull if you are gettig started with Orbiton JS.

- [Quick Start guide](https://orbiton.js.org/docs/getting-started/quick-start)
- [Installing Orbiton](https://orbiton.js.org/docs/getting-started/installation)
- [JSX in Orbiton](https://orbiton.js.org/docs/how-to-guides/jsx-in-orbiton)

## Contributing

Anybody willing to contribute to the development of this library can help by contibuting to the repository on [Github](https://github.com/orbitonjs/orbiton).

Some Important links for Contributors.

- [Code of Conduct](https://github.com/orbitonjs/orbiton/blob/main/CODE_OF_CONDUCT.md)
- [License](https://github.com/orbitonjs/orbiton/blob/main/LICENSE)
- [Security](https://github.com/orbitonjs/orbiton/blob/main/SECURITY.md)

---

## License

MIT License
