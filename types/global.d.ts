// Type definitions for JSX
interface JSX {
  // This will allow any JSX element
  [elemName: string]: any;
}

// Type definitions for React
interface ReactElement {
  type: any;
  props: any;
  key: any;
}

declare const React: {
  createElement: any;
  useState: any;
  useEffect: any;
  useRef: any;
  useCallback: any;
  useMemo: any;
  useContext: any;
  useReducer: any;
  useLayoutEffect: any;
  useImperativeHandle: any;
  useDebugValue: any;
  useDeferredValue: any;
  useTransition: any;
  useId: any;
  Component: any;
  PureComponent: any;
  memo: any;
  forwardRef: any;
  lazy: any;
  Suspense: any;
  Fragment: any;
};

// Declare React namespace and types
declare namespace React {
  type ReactNode = any;
  type ComponentType<P = {}> = any;
  type FC<P = {}> = FunctionComponent<P>;
  
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): any;
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
  }

  interface HTMLAttributes<T> extends DOMAttributes<T> {
    // Basic HTML attributes
    className?: string;
    style?: any;
    id?: string;
    // Add more HTML attributes as needed
  }

  interface SVGProps<T> extends HTMLAttributes<T> {
    // Basic SVG attributes
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    // Add more SVG attributes as needed
  }

  interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }

  interface SyntheticEvent<T = Element, E = Event> {
    currentTarget: EventTarget & T;
    target: EventTarget;
    // Add more event properties as needed
  }

  interface CSSProperties {
    [key: string]: string | number | undefined;
  }

  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  type Key = string | number;
  type JSXElementConstructor<P> = (props: P) => ReactElement | null;
}

// Extended Window interface for any global browser APIs
interface Window {
  // Add any global browser API extensions here if needed
}

// Basic DOM types
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module 'react' {
  export = React;
  export as namespace React;
}

declare module 'react/jsx-runtime' {
  export * from 'react/jsx-runtime';
}

// Type definitions for Framer Motion
declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: any;
  export const useAnimation: any;
  export const useInView: any;
  export const useAnimationControls: any;
  export const useReducedMotion: any;
  export const useScroll: any;
  export const useTransform: any;
  export const useSpring: any;
  export const useMotionValue: any;
  export const useMotionValueEvent: any;
  export const useCycle: any;
  export const motionValue: any;
  export const MotionConfig: any;
  export const MotionConfigContext: any;
  export const MotionContext: any;
  export const PresenceContext: any;
  export const LayoutGroup: any;
  export const LayoutGroupContext: any;
  export const AnimateSharedLayout: any;
  export const AnimatePresence: any;
  export const AnimatePresenceProps: any;
  export const motionComponent: any;
  export const isValidMotionProp: any;
}