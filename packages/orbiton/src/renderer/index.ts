import append from "./append";
import { config } from "./config";
import { appendChild } from "./DomOperations";
import { render } from "./render_new";
const version = "__PACKAGE_VERSION__"
const OrbitonDom = {
  render,
  config,
  append,
  appendChild,
  version
}

export default OrbitonDom
