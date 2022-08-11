const sizes = {
  phone: '37.5em',
  tabPort: '56.25em',
  tabLand: '75em',
  smallDesktop: '90em',
};

const devices = {
  phone: `(max-width: ${sizes.phone})`,
  tabPort: `(max-width: ${sizes.tabPort})`,
  tabLand: `(max-width: ${sizes.tabLand})`,
  smallDesktop: `(max-width: ${sizes.smallDesktop})`,
};

const breakpoint = { sizes, devices };
export default breakpoint;
