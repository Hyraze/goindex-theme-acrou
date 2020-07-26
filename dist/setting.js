var authConfig = {
  version: "1.1.1",
  roots: [
    {
      id: "",
      name: "TeamDrive",
      pass: "",
    },
    {
      id: "root",
      name: "PriveDrive",
      pass: "",
    },
    {
      id: "",
      name: "folder1",
      pass: "",
    },
  ],
};
var themeOptions = {
  // en/hn/id/zh-chs/zh-cht
  languages: "en",
  render: {
    head_md: true,
    readme_md: true,
    // Whether to display file/folder description (not displayed by default)
    // Show file/folder description or not (not shown by default)
    desc: true,
  },
  video: {
    api: "",
    autoplay: true,
  },
  audio: {
    autoplay: false,
  },
};
window.gdconfig = JSON.parse(
  JSON.stringify({ version: authConfig.version, themeOptions: themeOptions })
);
window.themeOptions = themeOptions;
window.gds = JSON.parse(JSON.stringify(authConfig.roots.map((it) => it.name)));
window.current_drive_order = 0;
