export const breakpoint = 600
export const secondaryColor = '#ff8d07'

export const onDesktop = (style: string) => `
  @media screen and (min-width: ${breakpoint}px) {
    ${style}
  }
`

export const onMobile = (style: string) => `
  @media screen and (max-width: ${breakpoint - 1}px) {
    ${style}
  }
`
