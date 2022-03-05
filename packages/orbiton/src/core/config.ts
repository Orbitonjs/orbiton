import { config } from "../renderer/config";


export const Config = {
  renderer: config,
  set registerRender(renderer: any) {
    if (("updateUI" in renderer) === false) {
      throw new Error("Provided Renderer lacks `updateUI` function");
    } else {
      this.renderer = renderer
    }
  }
}
