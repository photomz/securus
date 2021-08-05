import React, {
  MutableRefObject,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction, bindActionCreators } from 'redux';
import { nanoid } from 'nanoid';

import { AppDispatch } from '../store';

/**
 * Informs if a click outside the selected ref is done.
 * @param {array} refArray - Array of components refs to avoid
 * @param {boolean} override - Override
 * @param {func} callback - A callback function to run if user clicked outside the array of
 *  components
 */
export const useOutsideClick = (
  refArray: MutableRefObject<HTMLElement | undefined>[],
  override: boolean,
  callback: (e: Event) => void
): void => {
  const handleOutsideClick = (event: Event): void => {
    let outsideClick = false;

    if (!(Array.isArray(refArray) && refArray.length > 0)) {
      // eslint-disable-next-line no-console
      throw new Error('Please pass in an array of refs.');
    }

    refArray.forEach((ref) => {
      if (ref && ref.current && !ref?.current?.contains(event.target as Node)) {
        if (refArray.length > 1) {
          refArray
            .filter((refPrime) => ref !== refPrime)
            .forEach((refPrime) => {
              if (
                refPrime
                && refPrime.current
                && !refPrime?.current?.contains(event.target as Node)
              ) {
                outsideClick = true;
              }
            });
        } else {
          outsideClick = true;
        }
      }
    });

    if (outsideClick) {
      callback(event);
    }
  };

  useEffect(() => {
    if (override) return () => {};
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousedown', handleOutsideClick);
      }
    };
  }, [override]);
};

export const useDelayUnmount = (
  isMounted: boolean,
  delayTime: number
): boolean => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isMounted && !shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(true), delayTime);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
};

/**
 * Binds an array of actions or 1 action, and dispatches it using useDispatch.
 * @param {[Function]|Function} actions - Array or 1 action.
 * @param {[Function]} deps - Dependencies for useMemo. useMemo will only
 * recompute if one of the dependencies are updated.
 * @returns {[Function]|Function} Array of dispatches or 1 dispatch
 */
export const useActions = (
  actions: AnyAction[],
  deps: React.DependencyList = []
): AnyAction[] => {
  const dispatch = useDispatch<AppDispatch>();

  return useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map((action) => bindActionCreators(action, dispatch));
    }
    return bindActionCreators(actions, dispatch);
  }, [dispatch, ...deps]);
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const useConstant = <T extends object>(fn: () => T): T => {
  const ref = useRef<{ v: T }>();

  if (!ref.current) {
    ref.current = { v: fn() };
  }

  return ref.current.v;
};

export const useKeys = (n: number): string[] =>
  useConstant(() => Array.from({ length: n }).map(() => nanoid()));

// eslint-disable-next-line @typescript-eslint/ban-types
export const useBeforeClose = (callback: Function) => {
  useEffect(() => {
    document.addEventListener('beforeunload', (e) => {
      callback();
      e.returnValue = false;
      return null;
    });
    (async () => {
      // wait for meet to relay call ended message
      while (document.querySelector("[data-call-ended='true']") == null) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 200));
      }
      callback();
    })();
  }, []);
};
