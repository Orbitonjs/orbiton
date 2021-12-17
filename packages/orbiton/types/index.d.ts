
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
        updateState(newState: Record<string, unknown>, callback?: CallableFunction | null): void;
        makeChild(): any;
        render(): OrbitonElement;
}

export type OrbitonConfig = {
        extendEvents?: Record<string, VoidFunction>;
        ref?: symbol;
        isComponentRoot?: boolean;
        componentHosted?: Array<Component>;
        compomentRootId?: symbol | null | string | number;
    };
export type Attributes = {};
export type Options = {
        attributes?: Record<string, string | Record<string, string | number>>;
        events?: Record<string, VoidFunction>;
        children?: [];
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

export class BaseComponent {
        state: any;
        props: Props;
        context: Record<string, unknown>;
        constructor(props?: Props, context?: {});
        /**
       * Updates a subset of the state in the class
       * @param {object} newState this subset that you want to update
       * @param {?Function} callBack this callback function that is called after state updates
       */
        changeState(newState: Record<string, unknown>, callBack?: VoidFunction | null): void;
}
export class LogicalComponent extends BaseComponent {
        key: any;
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
        updateState(newState: Record<string, unknown>, callback?: CallableFunction | null): void;
}

    /**
    * Creates a new Element
    */
    function createElement(tag: string, options?: Options): OrbitonElement;
export const withComponent: (tag: string, component: LogicalComponent, options?: Options, props?: Props) => OrbitonElement;

/**
    * Creates a new Component
    */
const createComponent: (Component: any, props?: {}, context?: {}) => any;


    /**
    * appends a Tree to the DOM
    */
    function append(Tree: OrbitonElement, root: HTMLElement, callback?: CallableFunction): void;

/**
    * A Javascript library for building Browser User Interfaces
    * @author Beigana Jim Junior <jimjunior854@outlook.com>
    * @copyright Beigana Jim Junior © 2021
    * @license MIT
    *
    * Learn more at the official Documentation: {@link https://orbiton.js.org}
    */
const Orbiton: {
        withComponent: (tag: string, component: import("core/component").LogicalComponent, options?: import("types/OrbitonTypes").Options, props?: import("types/OrbitonTypes").Props) => import("types/OrbitonTypes").OrbitonElement;
        render: (xElement: any) => any;
        createElement: typeof createElement;
        append: typeof append;
        Component: typeof Component;
        createComponent: (Component: any, props?: {}, context?: {}) => any;
        createJSXElement: typeof createJSXElement;
        version: string;
    };
export default Orbiton;
