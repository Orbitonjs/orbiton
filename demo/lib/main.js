(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Orbiton = factory());
}(this, (function () { 'use strict';

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */
  /**
  * Creates a new Element
  */

  function createElement(tag, options) {
    const {
      attributes = {},
      events = {},
      children = []
    } = options;
    return {
      tag,
      attributes,
      events,
      children,
      type: 'element'
    };
  }

  const withComponent = (tag, component, options) => {
    const {
      attributes = {},
      events = {},
      children = [],
      props = {}
    } = options;
    return {
      tag,
      attributes,
      events,
      children,
      type: 'element',
      attachedComponent: createComponent(component, props),
      props: props
    };
  };

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */
  /**
  * Creates a new Component
  */

  const createComponent = (Component, props = {}, context = {}) => {
    if (typeof Component === "function") {
      if (Component.isClassComponent) {
        const c = new Component(props, context);
        return c;
      }

      if (Component.isFragment) {
        const c = new Component(props.children);
        return c;
      } // Returns if the component was a Fuctional Component


      return Component(props);
    }

    if (typeof Component === 'string') {
      const opts = props;
      return createElement(Component, opts);
    } // If the component was a Variable
    // This stops the error encountered when initalising Mdx


    return Component;
  };

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */
  function createId(name, key = null) {
    if (key === null || key === undefined) {
      key = Math.floor(Math.random() * 100000000);
      return Symbol(`${name}_random_generated_key_${key}`);
    }

    return Symbol(`${name}_provided_key_${key}`);
  }

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */
  class Fragment {
    static isFragment = true;

    constructor(children) {
      const key = Math.floor(Math.random() * 100000000);
      this.FragmentID = createId(`Fragment_Type`, `by_fragment_${key}`);
      this.children = children;
      this.type = "Fragment";
    }

  }

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  /* eslint-disable @typescript-eslint/no-unused-vars */

  /**
   * Trigers the `Mounted` lifecycle method of any component within the node
   */
  function triggerMountedLifeCycle(node) {
    if ("_orbiton$config" in node) {
      if (node._orbiton$config.isComponentRoot || node._orbiton$config.componentHosted.length !== 0) {
        node._orbiton$config.componentHosted.forEach((comp, ind) => {
          if (comp.type === "Component") {
            comp.Mounted();
          }
        });
      }
    }

    node.childNodes.forEach((child, i) => {
      triggerMountedLifeCycle(child);
    });
  }

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

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

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */

  /* eslint-disable @typescript-eslint/no-explicit-any */

  /**
  * Appends events to a node that is passed in
  * @param {OrbitonDOMElement|OrbitonSVGElement} node - The node to append the events
  * @param {Record<string, VoidFunction>} events - an object containing the key as the event and the value as the function
  */
  function appendEvents(node, events) {
    //console.log(events)
    node._orbiton$config.extendEvents = events;

    for (const [k, v] of Object.entries(events)) {
      node.addEventListener(k, v);
    }
  }

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  function renderElement(element, ns = "http://www.w3.org/1999/xhtml", isComponentRoot = false, componentId = null, comp = null) {
    let node;
    let childns;

    if (element.tag === 'svg') {
      node = document.createElementNS("http://www.w3.org/2000/svg", "svg"); // Set the namespace to "http://www.w3.org/2000/svg"
      // since the child elements like path should also
      // have the same namespace

      childns = "http://www.w3.org/2000/svg";
    } else {
      node = document.createElementNS(ns, element.tag);
      childns = "http://www.w3.org/1999/xhtml";
    }

    node._orbiton$config = {};
    node._orbiton$config.componentHosted = [];

    if (isComponentRoot) {
      node._orbiton$config.isComponentRoot = true;
      node._orbiton$config.compomentRootId = componentId;

      node._orbiton$config.componentHosted.push(comp);
    }

    if (element.attachedComponent) {
      node._orbiton$config.componentHosted.push(element.attachedComponent);
    }

    evaluateAttributes(node, element.attributes);
    appendEvents(node, element.events);

    if (element.children) {
      for (const child of element.children) {
        // eslint-disable-next-line no-use-before-define
        if (typeof child === 'string') {
          const Textnode = document.createTextNode(child);
          appendChild(node, Textnode);
        } else {
          // This is usually possible when one maps through an array forexample:
          //     render() {
          //         return  <div>
          //                    {this.state.array.map(...)}
          //                 </div>
          //         }
          if (Array.isArray(child)) {
            for (const elm of child) {
              const element = render(elm, childns);
              appendChild(node, element);
            }
          } else {
            const element = render(child, childns);

            if (element !== null && element !== undefined) {
              appendChild(node, element);
            }
          }
        }
      }
    }

    return node;
  }

  const render = (o_element, ns = "http://www.w3.org/1999/xhtml") => {
    //console.log(o_element)
    if (typeof o_element === 'string' || typeof o_element === "boolean" || typeof o_element === "number") {
      return document.createTextNode(`${o_element}`);
    }

    if (o_element.type === 'element') {
      return renderElement(o_element, ns);
    }

    if (o_element.type === 'Component') {
      const el = o_element.makeChild();

      if (returnsNothing(el)) {
        return null;
      } // when the first element is a component


      if (el.tag === undefined) {
        return render(el);
      } // Call the will mount lifecyle method
      // Note: this method is depriciated since it was unstable


      o_element.WillMount();
      return renderElement(el, ns, true, o_element.getPearlId(), o_element);
    }

    if (o_element.type === "Fragment") {
      return renderFragment(o_element);
    }
  }; // eslint-disable-next-line @typescript-eslint/no-explicit-any

  function returnsNothing(component) {
    if (component === null || component === undefined) {
      return true;
    }

    return false;
  }

  function renderFragment(fragment) {
    const childNodes = [];

    for (const child of fragment.children) {
      if (typeof child !== "string") {
        if (child.type === "Fragment") {
          throw new Error("A Fragment cannot be a direct child to another Fragment. Consider changing your source code.");
        }
      }

      const DOMChild = render(child);
      DOMChild._orbiton$config.renderedByFrag = true;
      DOMChild._orbiton$config.HostFragID = fragment.FragmentID;
      childNodes.push(DOMChild);
    }

    return childNodes;
  }

  function appendChild(node, child) {
    if (Array.isArray(child)) {
      for (const childEl of child) {
        node.appendChild(childEl);
      }
    } else {
      node.appendChild(child);
    }
  }

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */
  /**
  * The first time an element is rendered
  */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

  function initialRender(root, tree) {
    const replacedElement = render(tree);
    root.appendChild(replacedElement);
    triggerMountedLifeCycle(root);
  }

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  /**
  * appends a Tree to the DOM
  */
  function append(Tree, root, callback) {
    try {
      initialRender(root, Tree);

      if (callback) {
        callback();
      }

      return true;
    } catch (error) {
      return {
        result: false,
        error
      };
    }
  }

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  /**
  * Base component
  */
  class BaseComponent {
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

  const FRAGMENT_TYPE = "Fragment";
  const COMPONENT_TYPE = "Component";
  const ELEMENT_TYPE = "element";

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */
  function compareState(oldComponent, newComponent) {
    const finalComponent = newComponent;
    finalComponent.state = oldComponent.state;
    return finalComponent;
  }
  function PatchTrees(currentTree, newTree) {
    // Diffing Instances
    // - Element and Element
    // - Component and Element
    // - Component and Component
    // - Fragment and Component
    // - Fragment and Element
    // - Fragment and Fragment
    // - attached Components
    if (currentTree.type === ELEMENT_TYPE && newTree.type === ELEMENT_TYPE) {
      return CompareAndPatchElement(currentTree, newTree);
    } else if (currentTree.type === COMPONENT_TYPE && newTree.type === ELEMENT_TYPE) {
      return newTree;
    } else if (currentTree.type === ELEMENT_TYPE && newTree.type === COMPONENT_TYPE) {
      return newTree;
    } else if (currentTree.type === COMPONENT_TYPE && newTree.type === COMPONENT_TYPE) {
      return compareState(currentTree, newTree);
    } else {
      return newTree;
    }
  }
  function PatchChildrenTrees(currentTree, newTree) {
    // Diffing Instances
    // - Element and Element
    // - Component and Element
    // - Component and Component
    // - Fragment and Component
    // - Fragment and Element
    // - Fragment and Fragment
    // - attached Components
    if (typeof currentTree === "string" || typeof newTree === "string") {
      return newTree;
    } else if (currentTree.type === ELEMENT_TYPE && newTree.type === ELEMENT_TYPE) {
      return CompareAndPatchElement(currentTree, newTree);
    } else if (currentTree.type === COMPONENT_TYPE && newTree.type === ELEMENT_TYPE) {
      return newTree;
    } else if (currentTree.type === ELEMENT_TYPE && newTree.type === COMPONENT_TYPE) {
      return newTree;
    } else if (currentTree.type === COMPONENT_TYPE && newTree.type === COMPONENT_TYPE) {
      return compareState(currentTree, newTree);
    } else {
      return newTree;
    }
  }

  function CompareAndPatchElement(oldElement, newElement) {
    const resultElement = newElement;

    if (oldElement.attachedComponent !== newElement.attachedComponent) {
      return newElement;
    }

    if (oldElement.tag !== newElement.tag) {
      return newElement;
    }

    resultElement.children = CompareAndPatchChildren(oldElement.children, newElement.children);
    return resultElement;
  }

  function CompareAndPatchChildren(oldChildren, newChildren) {
    const children = [];
    oldChildren.forEach((oldChild, i) => {
      const newChild = newChildren[i];
      children.push(PatchChildrenTrees(oldChild, newChild));
    });

    for (const additionalChild of newChildren.slice(oldChildren.length)) {
      children.push(additionalChild);
    }

    return children;
  }

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */
  function ingeninateChildren(OldChildren, NewChildren, parentNode) {
    const childNodes = parentNode.childNodes;
    let index = 0;

    for (let i = 0; i < OldChildren.length; i++) {
      const oldChild = OldChildren[i];
      const NewChild = NewChildren[i];

      if (Array.isArray(oldChild) || Array.isArray(NewChild)) {
        if (Array.isArray(NewChild)) {
          if (Array.isArray(oldChild)) {
            // if both the new child and the old child are Arrays
            // we loop through the old child and get the index of each element and its corresponding element if the neww child
            // we also get the DOM child at that index then diff them
            oldChild.forEach((item, ind) => {
              const nodechild = childNodes[index];
              const newItem = NewChild[ind]; //diffAndPatch(item, newItem, nodechild)

              CheckChildrenAndDiff(item, newItem, parentNode, nodechild);
              index++;
            });
            const additionalChidren = []; // if the new child has additional children longer than  the old child then have to append them to the dom too.

            for (const additionalChild of NewChild.slice(oldChild.length)) {
              const DomChild = render(additionalChild);
              additionalChidren.push(DomChild);
            }

            const nextIndex = index;
            let nextNode = childNodes[nextIndex];

            if (nextNode !== undefined) {
              for (const iterator of additionalChidren) {
                parentNode.insertBefore(iterator, nextNode);
                index++;
                nextNode = childNodes[nextIndex];
              }

              triggerMountedLifeCycle(parentNode);
            } else {
              parentNode.append(...additionalChidren);
              triggerMountedLifeCycle(parentNode);
            }
          } else {
            const nodechild = childNodes[index];
            const nodeArr = [];
            NewChild.forEach((item, ind) => {
              nodeArr.push(render(item));

              if (ind !== 0) {
                index++;
              }
            });
            nodechild.replaceWith(...nodeArr);
            triggerMountedLifeCycle(nodechild);
          }
        }
      } else {
        const nodechild = childNodes[index];
        CheckChildrenAndDiff(oldChild, NewChild, parentNode, nodechild);
        index++;
      }
    }
  }

  function CheckChildrenAndDiff(oldChild, NewChild, parentNode, nodechild) {
    if (typeof oldChild !== "string") {
      if (oldChild.type === "Fragment") {
        diffAndPatch(oldChild, NewChild, parentNode);
      } else {
        diffAndPatch(oldChild, NewChild, nodechild);
      }
    } else {
      diffAndPatch(oldChild, NewChild, nodechild);
    }
  }

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */
  function diffAndPatch(oldTree, newTree, node$) {
    const {
      node
    } = replacingNode(node$); // Diffing Instances
    // - Element and Element
    // - Component and Element
    // - Component and Component
    // - Fragment and Component
    // - Fragment and Element
    // - Fragment and Fragment
    // - attached Components

    if (newTree === undefined) {
      node.remove();
      return node;
    }

    if (typeof oldTree === "string" || typeof newTree === "string") {
      // incase one of the trees is a string
      // we check if the nodeValue od the DOM node is equal to the newTree
      // if its not equal then we replace it with the new string
      // If they are equal we just return the same node
      if (node.nodeValue !== newTree) {
        const newNode = render(newTree);
        node.replaceWith(newNode); // triggerMountedLifeCycle(newNode)

        return newNode;
      } else {
        return node;
      }
    } else if (oldTree.type !== newTree.type) {
      // If the types are not the same we should just render a new Dom Tree.
      const newNode = render(newTree);
      node.replaceWith(newNode);
      triggerMountedLifeCycle(newNode);
      return newNode;
    } else if (oldTree.type === ELEMENT_TYPE && newTree.type === ELEMENT_TYPE) {
      return diffAndPatchElement(oldTree, newTree, node);
    } else if (oldTree.type === COMPONENT_TYPE && newTree.type === COMPONENT_TYPE) {
      return DiffAndPatchComponent(oldTree, newTree, node);
    } else if (oldTree.type === FRAGMENT_TYPE && newTree.type === FRAGMENT_TYPE) {
      ingeninateChildren(oldTree.children, newTree.children, node);
      return node;
    }
  }

  function replacingNode(node) {
    if (Array.isArray(node)) {
      return {
        isFragmentParent: true,
        node: node[0].parentNode
      };
    }

    return {
      isFragmentParent: false,
      node
    };
  }

  function diffAndPatchElement(oldTree, newTree, node) {
    //console.log(oldTree)
    //console.log(newTree)
    //console.log(node)
    // If the tags of the trees are different then the whole tree is replaced
    if (oldTree.tag !== newTree.tag) {
      const newNode = render(newTree);
      node.replaceWith(newNode);
      triggerMountedLifeCycle(newNode);
      return newNode;
    }

    PatchElementAttributes(oldTree.attributes, newTree.attributes, node);
    ingeninateChildren(oldTree.children, newTree.children, node);
    return node;
  }
  function DiffAndPatchComponent(oldComp, newComp, node$) {
    const {
      node
    } = replacingNode(node$);

    if (oldComp.pearlId !== newComp.pearlId) {
      const newNode = render(newComp);
      node.replaceWith(newNode);
      triggerMountedLifeCycle(newNode);
      return newNode;
    } else {
      diffAndPatch(oldComp.makeChild(), newComp.makeChild(), node);
    }
  }
  function PatchElementAttributes(OldAttr, NewAttrs, node) {
    // Note: We first append all the new attributes
    // so that we can latter just remove the attributes that dont exits in the new attrs
    for (const [attr, value] of Object.entries(NewAttrs)) {
      // In this for loop we add atrributes and
      // also eveluate style objects and classnames.
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
    } // We loop through the old attributes
    // if one of the old attributes is not in the neww attributes,
    // we ten remove it from the node


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

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */
  function ComponentRoot(id) {
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
  function updateUITree(currentTree, workingProgressTree, ComponentRoot) {
    const newTree = PatchTrees(currentTree, workingProgressTree);
    const patch = diffAndPatch(currentTree, newTree, ComponentRoot);
    ComponentRoot = patch;
    return newTree;
  }

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  class Component extends BaseComponent {
    static isClassComponent = true;

    constructor(props = {}, context = {}) {
      super(props, context);

      if (props !== {}) {
        this.key = props ? props.key ? props.key : null : null;
      }

      this.type = 'Component';
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
      const root = ComponentRoot(this.getPearlId());
      this.changeState(newState, callback);
      this.currentTree = updateUITree(this.currentTree, this.render(), root);
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

  /**
   * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */
  const version = '1.0.0';
  /**
  * A Javascript library for building Browser User Interfaces
  * @author Beigana Jim Junior <jimjunior854@outlook.com>
  * @copyright Beigana Jim Junior © 2021 - present
  * @license MIT
  *
  * Learn more at the official Documentation: {@link https://orbiton.js.org}
  */

  const Orbiton = {
    withComponent,
    render,
    createElement,
    append,
    Component,
    createComponent,
    Fragment,
    version
  };

  return Orbiton;

})));
