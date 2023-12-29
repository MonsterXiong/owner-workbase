const components = {}
const componentsContext = require.context('../baseComponents', true, /\.vue$/)
componentsContext.keys().forEach(key => {
  const componentName = key.split('/')[2].replace('.vue', '');
  const component = componentsContext(key);
  const compName = `Base${component.default?.name || componentName}`
  components[compName] = component.default;
});

export default components

