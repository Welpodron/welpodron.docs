//TODO: Мб добавить поддержку объектов?
const walk = (arg: any): string => {
  if (!arg) {
    return '';
  }

  if (typeof arg === 'string') {
    //! Убран trim входящих классов
    return arg;
  }

  //TODO: В целом массивы не особо часто используются, мб стоит убрать?
  if (Array.isArray(arg)) {
    return arg.reduce((acc, curr) => {
      return (acc ? acc + (curr ? ' ' : '') : '') + (curr ? walk(curr) : '');
    }, '');
  }

  return '';
};

//! Убрана проверка на уникальность и trim входящих классов, в пользу более быстрой работы
export const classnamify = (...classNames: any): string | undefined => {
  const finalClassName = classNames.reduce((acc: string, curr: any) => {
    return (acc ? acc + (curr ? ' ' : '') : '') + (curr ? walk(curr) : '');
  }, '');

  return finalClassName.length ? finalClassName : undefined;
};
