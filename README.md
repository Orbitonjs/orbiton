# <div align="center"> <img src="branding/logo.png" style="align-items:center;" ></div>
##### <div align="center"> [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Npm package total downloads](https://badgen.net/npm/dt/orbiton)](https://npmjs.com/package/orbiton) </div>
A Javascript library for building Browser User Interfaces.
Orbiton JS is a component base javascript rendering library for creating User Interfaces in the browser. 
Orbiton was originally developed by [Beingana Jim Junior](https://twitter.com/_jimjunior_) as a rendering engine for his small library for creating video elements. He later decided to separate it from the main package and in order to make it reusable in other projects. That is how it came about.

## Why use Orbiton

Most developers ask themselves why use a new young library like Orbiton.
- __Light Weight__: One of the greatest advantage of Orbiton is that its lightweight compared to other libraries like React. Orbiton is just 6kb - 10kb compared to other libraries that are around 100kb+. This assures you that your app has fast page loads since most of the chunk is from just your own code.
- __Close To Dom__: This is another advantage of Orbiton. Being close to the Dom means that the library will not have to carry out many functions in order to update the Dom making the app feel fast for the user.
- __Reactive__: The library is reactive making you create modern web apps that provide a native feel to the user. This makes it even better for creating Progressive web apps.
- __Modern__: Orbiton JS is among the youngest libraries and so it utilizes modern JavaScript removing legacy code from your apps. Most modern browsers like chrome recommend this.


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


## Usage
Using Orbiton is easy. All you have to do is import Orbiton and use JSX to create your app. Visit the Orbiton JS [documentation here](https://orbitonjs.github.io) to Learn how to build Apps in Orbiton JS.

```jsx
const Button = <button onClick={() => { alert('Clicked') } } >Click me</button>

Orbiton.append(Button, document.getElementById('root'))
```

Here are some important links that you might find usefull if you are gettig started with Orbiton JS.
- [Getting Started with Orbiton JS]()
- [Installing Orbiton]()
- [Writing you first Orbiton App]()
- [JSX in Orbiton]()


## Contributing

Anybody willing to contribute to the development of this library can help by contibuting to the repository on [Github](https://github.com/orbitonjs/orbiton).

Some Important links for Contributors.
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [License](./LICENSE)
- [Security](SECURITY.md)

---

## License

MIT License
