declare module 'macy' {
  export type Margin = { x: number; y: number } | number;
  export interface Breakpoints {
    [key: number]: { margin?: Margin; columns?: number } | number;
  }
  export interface MacyOptions {
    container?: HTMLElement | null;
    trueOrder?: boolean;
    waitForImages?: boolean;
    useOwnImageLoader?: boolean;
    debug?: boolean;
    mobileFirst?: boolean;
    columns?: number;
    margin?: Margin;
    breakAt?: Breakpoints;
    cancelLegacy?: boolean;
    useContainerForBreakpoints?: boolean;
  }

  export type MacyEventHandler = (event: MacyEvent) => void;
  export interface MacyEvent {
    type: string;
    target: HTMLElement;
    data?: any;
  }

  export default class Macy {
    constructor(opts?: Omit<MacyOptions, Optional>);
    static init(options: MacyOptions): Macy;
    recalculateOnImageLoad(waitUntilFinish?: boolean): Promise<void>;
    runOnImageLoad(func: MacyEventHandler, everyLoad?: boolean): Promise<void>;
    recalculate(refresh?: boolean, loaded?: boolean): Promise<void>;
    remove(): void;
    reInit(): void;
    on(key: string, func: MacyEventHandler): void;
    emit(key: string, data?: any): void;
    options: MacyOptions;
    constants: {
      EVENT_INITIALIZED: string;
      EVENT_RECALCULATED: string;
      EVENT_IMAGE_LOAD: string;
      EVENT_IMAGE_ERROR: string;
      EVENT_IMAGE_COMPLETE: string;
      EVENT_RESIZE: string;
    };
  }
}
