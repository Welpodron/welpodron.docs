export const classnamify = (...classNames: any) => {
  let _classNames = classNames
    .flat(Infinity)
    .filter(Boolean)
    .filter((className: any) => typeof className === 'string');

  _classNames = _classNames.map((className: any) =>
    className.trim().split(' ').filter(Boolean)
  );

  _classNames = _classNames.flat(Infinity);

  _classNames = new Set(_classNames);

  const finalClassName = [..._classNames].join(' ').trim();

  return finalClassName.length ? finalClassName : undefined;
};
