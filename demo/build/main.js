(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Orbiton = factory());
}(this, (function () { 'use strict';

  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */

  /* eslint-disable @typescript-eslint/no-explicit-any */

  /**
  * Creates a new Component
  */
  const createComponent = (Component, props = {}, context = {}) => {
    if (typeof Component === "function") {
      if (Component.isClassComponent) {
        const c = new Component(props, context);
        return c;
      }

      return Component(props);
    }

    return Component;
  };

  /**
  * Creates a new Element
  */
  function createElement(tag, options) {
    const {
      attributes,
      events,
      children
    } = options;
    return {
      tag,
      attributes,
      events,
      children,
      type: 'element'
    };
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */

  /**
   * Trigers the `Mounted` lifecycle method of any component within the node
   * @param node
   */
  function trigerMountedLifeCycle(node) {
    if ("_orbiton$config" in node) {
      if (node._orbiton$config.isComponentRoot) {
        node._orbiton$config.componentHosted.forEach((comp, ind) => {
          if (comp.type === "IS_X_COMPONENT") {
            comp.Mounted();
          }
        });
      }
    }

    node.childNodes.forEach((child, i) => {
      trigerMountedLifeCycle(child);
    });
  }

  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const hasUpperCaseRegex = /[A-Z]/;

  function splitProperty(property, index, append) {
    const firstSection = property.slice(0, index);
    let secondSection = property.slice(index);
    secondSection = secondSection.toLowerCase();
    return `${firstSection}${append}${secondSection}`;
  }
  /**
  * @param {string} property -
  */


  function getPropety(property) {
    let validProperty = property;
    const upperCaseLetters = validProperty.match(hasUpperCaseRegex) || [];

    if (upperCaseLetters.length) {
      for (let i = 0; i < upperCaseLetters.length; i++) {
        const element = upperCaseLetters[i];

        if (property.indexOf(element) !== 0) {
          validProperty = splitProperty(validProperty, property.indexOf(element), '-');
        }
      }
    }

    return validProperty;
  }
  /**
  * Appends attributes to a node
  * @param {HTMLElement} node - Node to append attributes to
  * @param {object} attributes - attributes
  */

  function evaluateAttributes(node, attributes = {}) {
    for (const [property, value] of Object.entries(attributes)) {
      if (property === "style") {
        node.setAttribute(property, evaluateStyleTag(value));
      } else if (property.toLowerCase() === "classname") {
        node.setAttribute("class", value);
      } else {
        node.setAttribute(getPropety(property), value);
      }
    }

    return node;
  }
  /**
  * @param {string} property -
  * @param {number} index -
  * @param {string} append -
  * @return {string} .
  */

  function splitCSSProperty(property, index, append) {
    const firstSection = property.slice(0, index);
    let secondSection = property.slice(index);
    secondSection = secondSection.toLowerCase();
    return `${firstSection}${append}${secondSection}`;
  }

  function getValidCSSFromObject(o) {
    let style = '';

    if (Array.isArray(o)) {
      throw new Error("Style prop only accepts as string os an object arrays ar not accepted");
    }

    for (const [property, value] of Object.entries(o)) {
      const UpperCaseLetters = property.match(hasUpperCaseRegex);

      if (UpperCaseLetters !== null) {
        if (UpperCaseLetters.length === 1) {
          /** @typedef string */
          const beginningOfSecondWord = UpperCaseLetters[0];
          const position = property.indexOf(beginningOfSecondWord); // split the word to add a dash `-` sign between them

          const CSSProperty = splitCSSProperty(property, position, '-');
          style = `${style}${CSSProperty}: ${value};`;
        }
      } else {
        style = `${style}${property}: ${value};`;
      }
    }

    return style;
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types


  function evaluateStyleTag(tag) {
    if (typeof tag === "object") {
      return getValidCSSFromObject(tag);
    }

    return tag;
  }

  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */

  /* eslint-disable @typescript-eslint/no-explicit-any */

  /**
  * Appends events to a node that is passed in
  * @param {Node} node - The node to append the events
  * @param {object} events - an object containing the key as the event and the value as the function
  */
  function appendEvents(node, events) {
    node._orbiton$config.extendEvents = events;

    for (const [k, v] of Object.entries(events)) {
      node.addEventListener(k, v);
    }
  }
  /**
   * The `_pearl$config` attributes on the node are used to identify HTML Elements that are created by pearl js
  */

  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */

  function renderElement(element, isComponentRoot = false, componentId = null, comp = null) {
    const node = document.createElement(element.tag);
    node._orbiton$config = {};

    if (isComponentRoot) {
      node._orbiton$config.isComponentRoot = true;
      node._orbiton$config.compomentRootId = componentId;
      node._orbiton$config.componentHosted = [comp];
    }

    evaluateAttributes(node, element.attributes);
    appendEvents(node, element.events);

    if (element.children) {
      for (const child of element.children) {
        // eslint-disable-next-line no-use-before-define
        if (typeof child === 'string') {
          const Textnode = document.createTextNode(child);
          node.appendChild(Textnode);
        } else {
          if (Array.isArray(child)) {
            for (const elm of child) {
              const element = render(elm);
              node.appendChild(element);
            }
          } else {
            const element = render(child);

            if (element !== null && element !== undefined) {
              node.appendChild(element);
            }
          }
        }
      }
    }

    return node;
  }

  const render = xElement => {
    if (typeof xElement === 'string' || typeof xElement === "boolean" || typeof xElement === "number") {
      return document.createTextNode(`${xElement}`);
    }

    if (xElement.type === 'element') {
      return renderElement(xElement);
    }

    if (xElement.type === 'IS_X_COMPONENT') {
      const $el = xElement.makeChild();

      if (returnsNothing($el)) {
        return null;
      } // when the first element is a component


      if ($el.tag === undefined) {
        return render($el);
      }

      xElement.WillMount();
      return renderElement($el, true, xElement.getPearlId(), xElement);
    }
  }; // eslint-disable-next-line @typescript-eslint/no-explicit-any

  function returnsNothing(component) {
    if (component === null || component === undefined) {
      return true;
    }

    return false;
  }

  /* eslint-disable no-unused-vars */
  /**
  * The first time an element is rendered
  */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

  function initialRender(root, tree) {
    const replacedElement = render(tree);
    root.appendChild(replacedElement);
    trigerMountedLifeCycle(root);
  }

  /**
  * appends a Tree to the DOM
  */

  function append(Tree, root, callback) {
    initialRender(root, Tree);

    if (callback) {
      callback();
    }
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */

  /* eslint-disable @typescript-eslint/ban-types */

  /**
  * Base Pearl component
  */
  class Component$1 {
    constructor(props = {}, context = {}) {
      this.state = {};
      this.props = props;
      this.context = context;
    }
    /**
    * Updates a subset of the state in the class
    * @param {object} newState this subset that you want to update
    * @param {?Function} callBack this callback function that is called after state updates
    */


    changeState(newState, callBack = null) {
      if (newState.constructor.name !== 'Object') {
        throw Error('updateState(...) method takes in an object');
      }

      const values = Object.getOwnPropertyNames(newState);
      const stateValues = Object.getOwnPropertyNames(this.state);

      for (const value of values) {
        if (stateValues.includes(value)) {
          this.state[value] = newState[value];
        } else {
          throw Error('The value `' + value + '` is not in the state object');
        }
      }

      if (callBack !== null) {
        callBack.call(this, newState);
      }
    }

  }

  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */

  function compareState(oldComponent, newComponent) {
    const finalComponent = newComponent;
    finalComponent.state = oldComponent.state;
    return finalComponent;
  }
  function EvaluateChildren(oldChildren, newChildren) {
    const children = [];
    const elementType = 'element';
    const componentType = 'IS_X_COMPONENT';
    oldChildren.forEach((oldChild, i) => {
      const newChild = newChildren[i];

      if (oldChild.type === newChild.type) {
        if (oldChild.type === elementType && newChild.type === elementType) {
          children.push(newChild);
        } else if (oldChild.type === componentType && newChild.type === componentType) {
          children.push(compareState(oldChild, newChild));
        } else if (typeof newChild === "string") {
          children.push(newChild);
        }
      }
    });

    for (const additionalChild of newChildren.slice(oldChildren.length)) {
      children.push(additionalChild);
    }

    return children;
  } // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

  function compareTree(oldDomTree, newDomTree) {
    const result = newDomTree;

    if (newDomTree === undefined) {
      return;
    }

    if (typeof oldDomTree === 'string' || typeof newDomTree === 'string') {
      if (oldDomTree !== newDomTree) {
        return newDomTree;
      } else {
        return newDomTree;
      }
    }

    if (oldDomTree.tag !== newDomTree.tag) {
      // we assume that they are totally different and
      // will not attempt to find the differences.
      return newDomTree;
    }

    const newChildren = EvaluateChildren(oldDomTree.children, newDomTree.children);
    result.children = newChildren;
    return result;
  }

  /**
  * Returns an `HTMLElement` represented by a given `ref`
  */
  function createId(name, key = null) {
    if (key === null || key === undefined) {
      key = Math.floor(Math.random() * 100000);
    }

    return Symbol(`${name}_${key}`);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  function diffAndPatch(oldTree, newTree, node) {
    if (newTree === undefined) {
      node.remove();
      return node;
    }

    if (typeof oldTree === "string" || typeof newTree === "string") {
      if (node.nodeValue !== newTree) {
        const newNode = render(newTree);
        node.replaceWith(newNode);
        trigerMountedLifeCycle(newNode);
        return newNode;
      } else {
        return node;
      }
    }

    if (oldTree.tag !== newTree.tag) {
      const newNode = render(newTree);
      node.replaceWith(newNode);
      trigerMountedLifeCycle(newNode);
      return node;
    }

    DiffAttr(oldTree.attributes, newTree.attributes, node);
    DiffChildren(oldTree.children, newTree.children, node);
    return node;
  }
  function DiffAttr(OldAttr, NewAttrs, node) {
    for (const [attr, value] of Object.entries(NewAttrs)) {
      if (attr === "style") {
        if (OldAttr[attr] !== value) {
          node.setAttribute(attr, evaluateStyleTag(value));
        }
      } else if (attr.toLowerCase() === "classname") {
        if (OldAttr[attr] !== value) {
          node.setAttribute("class", value);
        }
      } else {
        if (OldAttr[attr] !== value) {
          node.setAttribute(getPropety(attr), value);
        }
      }
    }

    for (const k in OldAttr) {
      if (!(k in NewAttrs)) {
        if (k.toLowerCase() === "className") {
          node.removeAttribute('class');
        } else {
          node.removeAttribute(getPropety(k));
        }
      }
    }
  }
  function DiffChildren(OldChildren, NewChildren, node) {
    const nodes = node.childNodes;
    let index = 0;
    OldChildren.forEach((child, i) => {
      const newVChild = NewChildren[i];

      if (Array.isArray(newVChild) || Array.isArray(child)) {
        if (Array.isArray(newVChild)) {
          if (Array.isArray(child)) {
            child.forEach((item, ind) => {
              const nodechild = nodes[index];
              const newItem = newVChild[ind];
              checkChildrenAndDiff(item, newItem, nodechild);
              index++;
            });
            const additionalChidren = [];

            for (const additionalChild of newVChild.slice(child.length)) {
              const DomChild = render(additionalChild);
              additionalChidren.push(DomChild);
            }

            const nextIndex = index;
            let nextNode = nodes[nextIndex];

            if (nextNode !== undefined) {
              for (const iterator of additionalChidren) {
                node.insertBefore(iterator, nextNode);
                index++;
                nextNode = nodes[nextIndex];
              }

              trigerMountedLifeCycle(node);
            } else {
              node.append(...additionalChidren);
              trigerMountedLifeCycle(node);
            }
          } else {
            const nodechild = nodes[index];
            const nodeArr = [];
            newVChild.forEach((item, ind) => {
              nodeArr.push(render(item));

              if (ind !== 0) {
                index++;
              }
            });
            nodechild.replaceWith(...nodeArr);
            trigerMountedLifeCycle(nodechild);
          }
        }
      } else {
        const nodechild = nodes[index];
        checkChildrenAndDiff(child, newVChild, nodechild);
        index++;
      }
    });
  }

  function checkChildrenAndDiff(child, newVChild, nodeChild) {
    if (newVChild !== undefined && child !== undefined) {
      const [oldChild, newChild] = CheckType(child, newVChild);
      diffAndPatch(oldChild, newChild, nodeChild);
    } else {
      if (newVChild !== undefined) {
        const [, newChild] = CheckType(" ", newVChild);
        diffAndPatch(child, newChild, nodeChild);
      } else {
        const [oldChild] = CheckType(child, "");
        diffAndPatch(oldChild, newVChild, nodeChild);
      }
    }
  }

  function CheckType(old, newC) {
    const elementType = 'element';
    const componentType = 'IS_X_COMPONENT';
    let oldChild;
    let newChild;

    if (old.type === elementType) {
      oldChild = old;
    }

    if (old.type === componentType) {
      oldChild = old.makeChild();
    }

    if (newC.type === elementType) {
      newChild = newC;
    }

    if (newC.type === componentType) {
      newChild = newC.makeChild();
    }

    if (typeof old === 'string') {
      oldChild = old;
    }

    if (typeof newC === 'string') {
      newChild = newC;
    }

    return [oldChild, newChild];
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  function getComponentRoot(id) {
    let nodes = null;
    const allNodes = document.querySelectorAll('*');
    allNodes.forEach(e => {
      if (e._orbiton$config) {
        if (e._orbiton$config.compomentRootId === id) {
          nodes = e;
        }
      }
    });
    return nodes;
  }

  class Component extends Component$1 {
    static isClassComponent = true;

    constructor(props, context = {}) {
      super(props, context);
      this.type = 'IS_X_COMPONENT';
      this.key = props.key || null;
      this.pearlId = createId(this.constructor.name, this.key);
      this.makeChild = this.makeChild.bind(this);
      this.Mounted = this.Mounted.bind(this);
      this.WillMount = this.WillMount.bind(this);
      this.getPearlId = this.getPearlId.bind(this);
      this.updateState = this.updateState.bind(this);
      this.changeState = this.changeState.bind(this);
    }

    getPearlId() {
      return this.pearlId;
    }

    Mounted() {}

    WillMount() {}
    /**
    * Updates a subset of the state in the class
    * @param {any} newState this subset that you want to update
    * @param {?Function} callback this callback function that is called after state updates
    *
    * */


    updateState(newState, callback = null) {
      const currentTree = this.currentTree;
      let root = getComponentRoot(this.getPearlId());

      if (root === undefined) {
        root = getComponentRoot(this.currentTree.pearlId);
      }

      this.changeState(newState, callback);
      const newItem = this.render();
      const newTree = compareTree(currentTree, newItem);
      const patch = diffAndPatch(this.currentTree, newTree, root);
      root = patch;
      this.currentTree = newTree;
    }

    makeChild() {
      this.currentTree = this.render();
      return this.currentTree;
    }

    render() {
      return {
        tag: 'div'
      };
    }

  }

  const version = '1.0.0';
  /**
      * A Javascript library for building Browser User Interfaces
      * @author Beigana Jim Junior <jimjunior854@outlook.com>
      * @copyright Beigana Jim Junior © 2021
      * @license MIT
      *
      * Learn more at the official Documentation: {@link https://orbiton.js.org}
      */

  const Orbiton = {
    render,
    createElement,
    append,
    Component,
    createComponent,
    version
  };

  return Orbiton;

})));
