# <div align="center"> <img src="https://raw.githubusercontent.com/Orbitonjs/orbiton/main/branding/orx.svg" style="align-items:center;" ></div>
##### <div align="center"> [![Npm package total downloads](https://flat.badgen.net/npm/license/orbiton)](https://npmjs.com/package/orbiton) [![Npm package total downloads](https://flat.badgen.net/npm/dt/orbiton)](https://npmjs.com/package/orbiton) </div>
A Javascript library for building Browser User Interfaces.
Orbiton JS is a component base javascript rendering library for creating User Interfaces in the browser. 
Orbiton was originally developed by [Beingana Jim Junior](https://twitter.com/jimjuniorb) as a rendering engine for his small library for creating video elements. He later decided to separate it from the main package and in order to make it reusable in other projects. That is how it came about.

## Why use Orbiton

Most developers ask themselves why use a new young library like Orbiton.
- __Light Weight__: One of the greatest advantage of Orbiton is that its lightweight. This assures you that your app has fast page loads since most of the chunk is from just your own code.
- __Close To Dom__: This is another advantage of Orbiton. Being close to the Dom means that the library will not have to carry out many functions in order to update the Dom making the app feel fast for the user.
- __Fast__: Orbiton JS was written with speed in mind. This users have a great user experience while using your application.
- __Modern__: Orbiton JS is among the youngest libraries and so it utilizes modern JavaScript removing legacy code from your apps. Most modern browsers like chrome recommend this.

## Installation

Installing Orbiton is Quite simple. You can use Orbiton to build full Application or just small parts of your website.

### Using CDN
Orbiton JS prefers usage of [jsDeliver](https://jsdeliver.com) as the default CDN for adding Orbiton to your website since its faster. In case you want to quickly, get started in your browser. Add a script tag with the following links.
```html
<!-- If you are in development mode -->
<script src="https://cdn.jsdeliver.net/npm/orbiton/umd/orbitonjs.development.js" crossorigin></script>
<!-- For production use the optimized and minified version  -->
<script src="https://cdn.jsdeliver.net/npm/orbiton/umd/orbitonjs.production.min.js" crossorigin></script>
```
### Using Node JS

If you are using [Node](https://nodejs.org) to build a your web app run this in the command line

```bash
# yarn
yarn add orbiton

# npm
npm install orbiton
```
If you want a quick start guide you can visit the official [Quick Start Guide](https://orbiton.js.org/docs/getting-started/quick-start).

### In Deno
Orbiton also supports development in [deno](https://deno.land).

```js

import Orbiton from "https://cdn.jsdeliver.net/npm/orbiton/esm/orbitonjs.development.js"
import Orbiton from "https://cdn.jsdeliver.net/npm/orbiton/esm/orbitonjs.development.js"
```


## Usage
Using Orbiton is easy. All you have to do is import Orbiton and use JSX to create your app. Visit the Orbiton JS [documentation here](https://orbiton.js.org) to Learn how to build Apps in Orbiton JS.

```jsx
const Button = <button onClick={() => { alert('Clicked') } } >Click me</button>

Orbiton.append(Button, document.getElementById('root'))
```

Here are some important links that you might find usefull if you are gettig started with Orbiton JS.
- [Getting Started with Orbiton JS](https://orbiton.js.org/docs/getting-started/quick-start)
- [Installing Orbiton](https://orbiton.js.org/docs/getting-started/installation)
- [JSX in Orbiton](https://orbiton.js.org/docs/how-to-guides/jsx-in-orbiton)

<a href="https://www.patreon.com/bePatron?u=63611941" data-patreon-widget-type="become-patron-button">Become a Patron!</a><script async src="https://c6.patreon.com/becomePatronButton.bundle.js"></script>

## Contributing

Anybody willing to contribute to the development of this library can help by contibuting to the repository on [Github](https://github.com/orbitonjs/orbiton).

Some Important links for Contributors.
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [License](./LICENSE)
- [Security](./SECURITY.md)

---

## License

MIT License
