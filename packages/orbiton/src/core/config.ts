
export class Config {
  static renderer = null
  static registerRender(renderer: any) {
    if (renderer !== null) {
      throw new Error("The renderer instance can only be initiated Once in an Enviromemt");
    }
    if (("updateUI" in renderer) === false) {
      throw new Error("Provided Renderer lacks `updateUI` function");
    } else {
      this.renderer = renderer
    }
  }
}



export class _ConfigClass {
  renderer = null
  registerRender(renderer: any) {
    if (renderer !== null) {
      throw new Error("The renderer instance can only be initiated Once in an Enviromemt");
    }
    if (("updateUI" in renderer) === false) {
      throw new Error("Provided Renderer lacks `updateUI` function");
    } else {
      this.renderer = renderer
    }
  }
}




