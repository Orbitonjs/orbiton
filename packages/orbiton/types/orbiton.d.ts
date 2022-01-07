declare module "core/Selectors" {
    import { OrbitonDOMElement } from "types/OrbitonTypes";
    type Ref = symbol;
    /**
    * Returns an `HTMLElement` represented by a given `ref`
    */
    export function getRef(ref: Ref): OrbitonDOMElement | null;
    export function createId(name: string, key?: null | unknown): symbol;
    /**
    * Creates a reference `Symbol`. This can be used to identify an element in the DOM
    * @param {string} ref - A reference string.
    * @returns {Ref}
    */
    export function createRef(ref?: string | null): Ref;
}
declare module "core/component" {
    import { Props } from "types/OrbitonTypes";
    /**
    * Base component
    */
    export class BaseComponent {
        state: any;
        props: Props;
        context: Record<string, unknown>;
        constructor(props?: Props, context?: Record<string, unknown>);
        /**
       * Updates a subset of the state in the class
       * @param {object} newState this subset that you want to update
       * @param {?Function} callBack this callback function that is called after state updates
       */
        changeState(newState: Record<string, unknown>, callBack?: VoidFunction | null): void;
    }
    export class LogicalComponent extends BaseComponent {
        key: unknown;
        readonly type: 'IS_X_COMPONENT';
        pearlId: symbol;
        static isClassComponent: boolean;
        constructor(props?: Props, context?: {});
        getPearlId(): symbol;
        Mounted(): void;
        WillMount(): void;
        /**
        * Updates a subset of the state in the class
        * @param {any} newState this subset that you want to update
        * @param {?Function} callback this callback function that is called after state updates
        *
        * */
        updateState(newState: Record<string, unknown>, callback?: VoidFunction | null): void;
    }
}
declare module "core/UpdateTree" {
    import { OrbitonElement } from "types/OrbitonTypes";
    export function compareState(oldComponent: {
        type?: string;
        state?: any;
    }, newComponent: any): any;
    export function EvaluateChildren(oldChildren: any[], newChildren: string | any[]): any[];
    export function compareTree(oldDomTree: OrbitonElement, newDomTree: OrbitonElement): any;
}
declare module "renderer/ElementAttributes" {
    /**
    * @param {string} property -
    */
    export function getPropety(property: string): string;
    /**
    * Appends attributes to a node
    * @param {HTMLElement} node - Node to append attributes to
    * @param {object} attributes - attributes
    */
    export function evaluateAttributes(node: {
        setAttribute: (arg0: string, arg1: unknown) => void;
        classList: {
            add: (arg0: unknown) => void;
        };
    }, attributes?: {}): {
        setAttribute: (arg0: string, arg1: unknown) => void;
        classList: {
            add: (arg0: unknown) => void;
        };
    };
    export function evaluateStyleTag(tag: any): string;
}
declare module "renderer/lifeCycles" {
    import type { OrbitonDOMElement } from "types/OrbitonTypes";
    /**
     * Trigers the `Mounted` lifecycle method of any component within the node
     */
    export function trigerMountedLifeCycle(node: OrbitonDOMElement | HTMLElement | ChildNode): void;
}
declare module "renderer/Events" {
    import { OrbitonDOMElement, OrbitonSVGElement } from "types/OrbitonTypes";
    /**
    * Appends events to a node that is passed in
    * @param {Node} node - The node to append the events
    * @param {object} events - an object containing the key as the event and the value as the function
    */
    export function appendEvents(node: OrbitonDOMElement | OrbitonSVGElement, events: Record<string, VoidFunction>): void;
    export function compareEventListeners(oldEvents: any, newEvents: Record<string, VoidFunction>): (node: OrbitonDOMElement) => OrbitonDOMElement;
    export function removeFromeNode(node: OrbitonDOMElement): void;
}
declare module "renderer/render" {
    import { OrbitonDOMElement } from "types/OrbitonTypes";
    export const render: (xElement: any) => any | OrbitonDOMElement;
}
declare module "diffing/BuildTree" {
    import { OrbitonDOMElement, OrbitonElement } from "types/OrbitonTypes";
    export function diffAndPatch(oldTree: OrbitonElement | any, newTree: OrbitonElement | any, node: OrbitonDOMElement): OrbitonDOMElement;
    export function DiffAttr(OldAttr: Record<string, unknown>, NewAttrs: {
        [s: string]: string;
    } | ArrayLike<string>, node: OrbitonDOMElement): void;
    export function DiffChildren(OldChildren: any[], NewChildren: {
        [x: string]: any;
    }, node: OrbitonDOMElement): void;
}
declare module "renderer/createComponent" {
    import { BaseComponent } from "core/component";
    import { OrbitonDOMElement, OrbitonElement, Props } from "types/OrbitonTypes";
    export function getComponentRoot(id: symbol): OrbitonDOMElement | null;
    class Component extends BaseComponent {
        key: any;
        readonly type: 'IS_X_COMPONENT';
        pearlId: symbol;
        currentTree: any;
        static isClassComponent: boolean;
        constructor(props?: Props, context?: {});
        getPearlId(): symbol;
        Mounted(): void;
        WillMount(): void;
        /**
        * Updates a subset of the state in the class
        * @param {any} newState this subset that you want to update
        * @param {?Function} callback this callback function that is called after state updates
        *
        * */
        updateState(newState: Record<string, unknown>, callback?: VoidFunction | null): void;
        makeChild(): any;
        render(): OrbitonElement;
    }
    export default Component;
}
declare module "types/OrbitonTypes" {
    import { LogicalComponent } from "core/component";
    import Component from "renderer/createComponent";
    export type OrbitonConfig = {
        extendEvents?: Record<string, VoidFunction>;
        ref?: symbol;
        isComponentRoot?: boolean;
        componentHosted?: Array<Component | LogicalComponent>;
        compomentRootId?: symbol | null | string | number;
    };
    export type Attributes = {};
    export type Options = {
        attributes?: Record<string, string | Record<string, string | number>>;
        events?: Record<string, VoidFunction>;
        children?: [];
        props?: Props;
    };
    export interface OrbitCallBack extends CallableFunction {
        (this: this, newState: Record<string, unknown>): unknown;
    }
    export type OrbitonElement = {
        tag: string;
        attributes: Record<string, string | Record<string, string | number>>;
        events?: Record<string, VoidFunction>;
        children?: Array<string | OrbitonElement | Component>;
        ref?: symbol;
        type: 'element' | 'IS_X_COMPONENT' | 'Fragment';
        attachedComponent?: LogicalComponent;
        props?: Props;
    };
    export interface OrbitonDOMElement extends HTMLElement {
        _orbiton$config: OrbitonConfig;
    }
    export interface OrbitonSVGElement extends SVGSVGElement {
        _orbiton$config: OrbitonConfig;
    }
    export type Tree = OrbitonElement | Component;
    export type Props = {
        key?: unknown;
        children?: Array<OrbitonElement>;
    };
}
declare module "core/createElement" {
    import { LogicalComponent } from "core/component";
    import type { OrbitonElement, Options } from "types/OrbitonTypes";
    /**
    * Creates a new Element
    */
    function createElement(tag: string, options?: Options): OrbitonElement;
    export const withComponent: (tag: string, component: LogicalComponent, options?: Options) => OrbitonElement;
    export default createElement;
}
declare module "core/createComponent" {
    import { Props, Tree } from "types/OrbitonTypes";
    /**
    * Creates a new Component
    */
    const createComponent: (Component: any, props?: Props, context?: Props) => Tree;
    export default createComponent;
}
declare module "core/createJSXElement" {
    import { OrbitonElement } from "types/OrbitonTypes";
    export default function createJSXElement(tag: any, props: any, key?: string, __source?: string, __self?: string): OrbitonElement;
}
declare module "renderer/initialRender" {
    import { OrbitonElement } from "types/OrbitonTypes";
    /**
    * The first time an element is rendered
    */
    export function initialRender(root: HTMLElement, tree: OrbitonElement): void;
}
declare module "renderer/append" {
    import { OrbitonElement } from "types/OrbitonTypes";
    /**
    * appends a Tree to the DOM
    */
    function append(Tree: OrbitonElement, root: HTMLElement, callback?: CallableFunction): void;
    export default append;
}
declare module "index" {
    import createElement from "core/createElement";
    import createJSXElement from "core/createJSXElement";
    import append from "renderer/append";
    import Component from "renderer/createComponent";
    /**
    * A Javascript library for building Browser User Interfaces
    * @author Beigana Jim Junior <jimjunior854@outlook.com>
    * @copyright Beigana Jim Junior © 2021
    * @license MIT
    *
    * Learn more at the official Documentation: {@link https://orbiton.js.org}
    */
    const Orbiton: {
        withComponent: (tag: string, component: import("core/component").LogicalComponent, options?: import("types/OrbitonTypes").Options) => import("types/OrbitonTypes").OrbitonElement;
        render: (xElement: any) => any;
        createElement: typeof createElement;
        append: typeof append;
        Component: typeof Component;
        createComponent: (Component: any, props?: import("types/OrbitonTypes").Props, context?: import("types/OrbitonTypes").Props) => import("types/OrbitonTypes").Tree;
        createJSXElement: typeof createJSXElement;
        version: string;
    };
    export default Orbiton;
}
declare class Fragment {
    constructor();
}
