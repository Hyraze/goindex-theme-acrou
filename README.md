

# GoIndex-theme-acrou (Localization Repo/Dev)
This is the localization & dev fork of [goindex-theme-acrou](https://github.com/Aicirou/goindex-theme-acrou) with the support of I18n (multi-language) including English, Hindi, Kannada, Indonesian, Chinese & more to be updated..

Combining the power of [Cloudflare Workers](https://workers.cloudflare.com/) and [Google Drive](https://www.google.com/drive/) will allow you to index you files on the browser on Cloudflare Workers.    

[goindex/index.js](https://github.com/Hyraze/goindex-theme-acrou/go2index) is the content of the Workers script.  

This theme's goindex is currently based on [yanzai/goindex](https://github.com/yanzai/goindex/)


## Demo  

Freemium: [https://demo.freemium.workers.dev/](https://oss.freemium.workers.dev/) 

## Features

- [x] 👑 Page-level caching,browser forward and backward without reloading (MAC users have a better experience with the trackpad)
- [x] 🗂 Multi drive switching
- [x] 🔐 Http Basic Auth
- [x] 🎨 Grid view mode(File Preview)
- [x] 🎯 Paging load
- [x] 🌐 I18n(multi-language)
- [x] 🛠 Markdown/Html render (Maybe it can be your blog)
- [x] 🖥 Video Online(mp4,mkv,webm,flv,m3u8,mov,m4v)
- [x] 🕹 Support for custom video player (API)
- [x] 🎧 Audio Online
- [x] 🚀 Faster speed

## TODO

- [ ] More file format preview
- [ ] Let goindex be more than just a directory index

## Quick Deployment

1. Open https://indexgoacrou.glitch.me  
2. Auth and get the code  
3. Deploy the code to [Cloudflare Workers](https://www.cloudflare.com/)

## Deployment  

1. Open [Google Drive API](https://console.developers.google.com/apis/api/drive.googleapis.com/overview)
2. Create a [OAuth client ID](https://console.developers.google.com/apis/credentials/oauthclient)
3. Install [rclone](https://rclone.org/downloads/) software locally
4. Get `refresh_token ` with `rclone`
5. Download `index.js` in https://github.com/Hyraze/goindex-theme-acrou/tree/master/go2index and replace `client_id`,`client_secret`,`refresh_token` for what you just got.
6. Deploy the code to [Cloudflare Workers](https://www.cloudflare.com/)





##Support

support the author [Aicirou](https://github.com/Aicirou/) by donating him via https://oss.achirou.workers.dev

## Change log


### v2.0.5

- Add clean file cache
- Support for custom video player (API)
- Beautify: the grid mode file shows icon when no preview is shown
- Beautify: Adjust the HEAD.md render position
- Solve the problem that files that can't be previewed can't be downloaded directly by clicking [#30](https://github.com/Aicirou/goindex-theme-acrou/issues/30)
- Solve the problem that the file name cannot be opened [#20](https://github.com/Aicirou/goindex-theme-acrou/issues/20)
- Solve the problem that switching pages will fall back in the current page loading [#37](https://github.com/Aicirou/goindex-theme-acrou/issues/37) (Thanks [@PedroZhang](https://github.com/PedroZhang) Help to find out the cause of the problem)

### v2.0.0

- Program changed to SPA(single page application)
- Add page level cache(Browser forward and backward do not refresh seconds to load, and Mac users have a better experience of using touch pad)
- Add http basic auth(Each drive letter can be configured with a user name and password separately, which can protect all sub files and sub folders under the drive)
- Add  grid view mode(File preview)
- Add paging load
- Add  i18n
- Add html render 
- Add render folder/file description
- Add optional configuration
- Support quick deployment
- Support PDF Online preview
- Replace text editor
- Solve the problem of URL encoding [#20](https://github.com/Aicirou/goindex-theme-acrou/issues/20) [#23](https://github.com/Aicirou/goindex-theme-acrou/issues/23) [#25](https://github.com/Aicirou/goindex-theme-acrou/issues/25)
- Solve other known problems

### v1.x

- Support multi disk switching
- Add version detection
- Optimize search results
- Optimize page display

## About

At the beginning of this project, it was just to satisfy my personal perception and experience development. When this project reaped the first start, the first fork and the first issues, and then everyone began to make suggestions, I had the power to update. Thank you very much for your support. Now we have version 2.0.

## Lisense

[MIT](LICENSE)

