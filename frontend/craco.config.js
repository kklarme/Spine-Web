module.exports = {
  style: {
    postcss: {
      loaderOptions: (options) => {
        options.postcssOptions.plugins.unshift('tailwindcss/nesting');
        return options;
      },
    },
  },
};
