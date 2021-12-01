export class BaseComponent {
        state: Record<string, unknown>;
        props: Props<number>;
        context: Record<string, unknown>;
        constructor<Type>(props?: Props<Type>, context?: Record<string, unknown>);
        /**
       * Updates a subset of the state in the class but does not trigger an update in the dom
       * @param {object} newState this subset that you want to update
       * @param {?Function} callBack this callback function that is called after state updates
       */
        changeState(newState: Record<string, unknown>, callBack?: CallableFunction | null): void;
}


export class Component extends BaseComponent {
        key: number;
        readonly type: 'IS_X_COMPONENT';
        pearlId: symbol;
        currentTree: OrbitonElement;
        static isClassComponent: boolean;
        constructor<Type>(props: Props<Type>, context?: Record<string, unknown>);
        getPearlId(): symbol;
        onMount(): void;
        WillMount(): void;
        /**
        * Updates a subset of the state in the class triggering an update in the dom
        * @param {any} newState this subset that you want to update
        * @param {?Function} callback this callback function that is called after state updates
        *
        * */
        updateState(newState: Record<string, unknown>, callback?: CallableFunction | null): void;
        makeChild(): OrbitonElement;
        render(): OrbitonElement;
}
export type OrbitonConfig =  {
  extendEvents?: HTMLElementEventMap,
  ref?: symbol,
  isComponentRoot?: boolean,
  componentHosted?: Array<Component>
  compomentRootId?: symbol | null | string | number
}

export type Attributes = {

}

export interface OrbitCallBack extends CallableFunction {
  (this: this, newState: Record<string, unknown>) : unknown
}

export type OrbitonElement = {
  tag: keyof HTMLElementTagNameMap,
  attributes: Record<string, string | Record<string, string | number>>,
  events?: HTMLElementEventMap,
  children?: Array<string|OrbitonElement|Component>,
  ref?: symbol,
  type: 'element' | 'IS_X_COMPONENT'
}



export interface OrbitonDOMElement extends HTMLElement {
  _orbiton$config: OrbitonConfig
}

export type Tree = OrbitonElement | Component

export type Props<KeyType> = {
  key?: KeyType,
  children?: Array<OrbitonElement>
}

/**
        * A Javascript library for building Browser User Interfaces
        * @author Beigana Jim Junior <jimjunior854@outlook.com>
        * @copyright Beigana Jim Junior © 2021
        * @license MIT
        *
        * Learn more at the official Documentation: {@link https://orbiton.js.org}
        */
const Orbiton: {
        render: (xElement: any) => any;
        createElement: typeof createElement;
        append: typeof append;
        Component: typeof Component;
        createComponent: (Component: any, props?: Record<string, unknown>, context?: Record<string, unknown>) => any;
        version: string;
    };
export default Orbiton;
