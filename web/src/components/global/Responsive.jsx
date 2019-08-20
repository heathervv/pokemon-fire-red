const breakpoints = {
  small: 425,
  medium: 769,
  large: 1025
}

const responsive = (screen) => (
  `@media (min-width: ${breakpoints[screen]}px)`
)

export { responsive }
