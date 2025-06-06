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