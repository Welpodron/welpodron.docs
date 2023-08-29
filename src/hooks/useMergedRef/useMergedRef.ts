import { useCallback } from "react";

/**
 * Функция для объединения нескольких рефов в один
 * HTMLNodeElementType - тип HTML-элемента, к которому привязан реф
 * @param {React.ForwardedRef<HTMLNodeElementType>[]} refs - массив рефов
 * @returns {(HTMLNode: HTMLNodeElementType) => void} функция для объединения рефов,
 * которую можно передать в качестве рефа в компонент
 * (в качестве аргумента функции `node` передается текущий HTML-элемент, к которому привязан реф)
 */
export const useMergedRef = <HTMLNodeElementType>(
  ...refs: React.ForwardedRef<HTMLNodeElementType>[]
): ((HTMLNode: HTMLNodeElementType) => void) => {
  // `useCallback` используется для того, чтобы функция была создана только один раз
  return useCallback(
    (HTMLNode: HTMLNodeElementType) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          // В случае если реф является функцией, то вызываем ее с переданным аргументом
          ref(HTMLNode);
        } else if (ref) {
          // В случае если реф является объектом, то присваиваем ему свойство `current`
          (ref as React.MutableRefObject<HTMLNodeElementType>).current =
            HTMLNode;
        }
      });
    },
    [refs]
  );
};
