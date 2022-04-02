import { useEffect, useRef } from 'react';

const useClickAway = (handler, target) => {

  // 使用 useRef 可以确保 handler 中的变量为最新值
  let onClickAwayRef = useRef(handler);
  onClickAwayRef.current = handler;

  useEffect(() => {

    function handleClick(e) {
      const targets = Array.isArray(target) ? target : [target];
      if (targets.some((targetItem) => {
        let targetElement = getTargetElement(targetItem);
        return !targetElement || targetElement.contains(e.target);
      })) {
        return;
      }
      onClickAwayRef.current(e)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [target])
}

const getTargetElement = (target) => {
  if ('current' in target) {
    return target.current
  }
  return target
}

export default useClickAway;