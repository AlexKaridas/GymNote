module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            "@": "./src",
          },
        },
      ],
    ],
  };
};
// "./<custom directory>/**/*.{js,jsx,ts,tsx}",
// "react-native-reanimated/plugin",
//content: ["./app/**/*.{js,jsx,ts,tsx}"],
//plugins: ["nativewind/babel"],
