export const getQueryParam = (
  paramName: string,
): null | string => {
  return new URLSearchParams(location.search).get(paramName)
}

export const getQueryParamInteger = (
  paramName: string,
): null | number => {
  const value = getQueryParam(paramName)

  return value ? parseInt(value, 10) : null
}
