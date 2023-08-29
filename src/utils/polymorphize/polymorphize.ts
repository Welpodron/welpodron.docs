import React from "react";

//! Внимание! В данном контексте все type воспринимаются как некоторая функция дла создания новых типов

//? Под основным элементом компонента подразумевается элемент, который будет использоваться по умолчанию, если пользователь не передаст свой элемент
//? Например: если основным элементом компонента является 'div', то пользователь может передать свой элемент, например, 'span', но если пользователь не передаст свой элемент, то будет использоваться 'div'

/**
 * Функция типа JoinTypesWithPriority формально работает по такому же принципу как:
 *
 * let lowPriorityObj = {a: 1, b: 2};
 * let highPriorityObj = {b: 3, c: 4};
 * let newObj = {...lowPriorityObj, ...highPriorityObj};
 * console.log(newObj); // {a: 1, b: 3, c: 4}
 *
 * @param LowPriorityType - тип с низким приоритетом
 * @param HighPriorityType - тип с высоким приоритетом
 * @returns суммарный список типов LowPriorityType + HighPriorityType с приоритетом типов HighPriorityType над типами LowPriorityType
 */
type JoinTypesWithPriority<
  LowPriorityType = {},
  HighPriorityType = {}
> = HighPriorityType & Omit<LowPriorityType, keyof HighPriorityType>;

/**
 * Функция типа GetComponentPropsTypesWithoutRefType возвращает набор типов свойств, которые принимает компонент по умолчанию БЕЗ ref
 * @param ElementType - какого типа основной элемент компонента, например, 'div', 'span', 'Collapse' и т.д.
 * @returns объект (тип объекта) внутри которого типы свойств, которые принимает компонент по умолчанию БЕЗ ref
 */
type GetComponentPropsTypesWithoutRefType<
  ElementType extends React.ElementType
> = React.ComponentPropsWithoutRef<ElementType>;

/**
 * Функция типа GetComponentRefType возвращает тип свойства ref, в зависимости от переданного типа компонента
 * @param ElementType - какого типа основной элемент компонента, например, 'div', 'span', 'Collapse' и т.д.
 * @returns объект (тип объекта) внутри которого тип ref, который принимает компонент, если он был вообще передан(по сути нужно для forwardRef)
 */
type GetComponentRefType<ElementType extends React.ElementType> = {
  // Вытаскиваем из всего списка React.ComponentPropsWithRef только тип refa
  ref?: React.ComponentPropsWithRef<ElementType>["ref"];
};

/**
 * Функция типа GetNewComponentPropsTypes возвращает НОВЫЙ набор типов свойств компонента в зависимости от желаемого типа элемента компонента
 * as - какой тип элемента мы хотим передать в компонент, например 'div', 'span', 'Collapse' и т.д.
 * @param NewComponentElementType - какого типа будет новый элемент компонента, например, 'div', 'span', 'Collapse' и т.д.
 * @param AdditionalPropsToAdd - какие свойства мы хотим добавить дополнительно к компоненту
 * @returns объект (тип объекта) внутри которого типы свойств, которые принимает НОВЫЙ компонент, включая ref и as (если они был переданы)
 */
type GetNewComponentPropsTypes<
  NewComponentElementType,
  AdditionalPropsToAdd = {}
> = NewComponentElementType extends React.ElementType
  ? JoinTypesWithPriority<
      GetComponentPropsTypesWithoutRefType<NewComponentElementType>,
      AdditionalPropsToAdd & { as?: NewComponentElementType }
    > &
      GetComponentRefType<NewComponentElementType>
  : never;

export const polymorphize = <
  NewComponentElementType extends React.ElementType,
  AdditionalPropsToAdd = {}
>(
  component: any
) => {
  // Получаем новые типы свойств в зависимости  от нового желаемого типа элемента компонента
  type NewComponentPropsTypes<_NewComponentElementType> =
    GetNewComponentPropsTypes<_NewComponentElementType, AdditionalPropsToAdd>;

  // Получаем новый тип компонента
  type NewComponentType = <_NewComponentElementType = NewComponentElementType>(
    props: NewComponentPropsTypes<_NewComponentElementType>
  ) => React.ReactElement;

  // Возвращаем новый компонент
  return component as NewComponentType;
};
