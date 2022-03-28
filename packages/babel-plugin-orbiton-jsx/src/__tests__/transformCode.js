/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable no-undef */
import TransformSyntax from "../index";

const babel = require('@babel/core');
const code = `
function App(props) {
  return (
    <>
      <div:Head className="orbiton-root" props={{
        title: "Home"
      }}>
        <Route path="/button">
          <button
            onClick={(e) => {
              console.log("Clicked")
            }}
            onKeyUpCapture={activatePlayer}
          >
            Click Me
          </button>
        </Route>
        <Route>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
          </svg>
          <Icons.MdSearch />
        </Route>
      </div:Head>
    </>
  )
}


`

it('Compiles JSX right', () => {
  const output = babel.transformSync(code, {
    filename: '.',
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: 'current'
          }
        }
      ],
      "@babel/preset-typescript"
    ],
    plugins: [
      "@babel/plugin-syntax-jsx",
      TransformSyntax
    ],
  })
  expect(output.code).toMatchSnapshot()
});

