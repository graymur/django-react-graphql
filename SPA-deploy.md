### How to deploy and build new SPA on heroku staging

Temporary build system is included to every webapp's branch with number 18 and larger.

The only additional step that has to be done to deploy Webapp staging with SPA is adding a buildpack in Heroku's settings:

1. Open https://dashboard.heroku.com/apps/an-webapp-stg/settings
2. Scroll to "Buildpacks" section and click "Add buildpack": http://dl4.joxi.net/drive/2018/08/01/0004/2795/285419/19/97ba8c5fbe.jpg
3. In the popup that will open select "Nodejs" and then click "Save changes": http://dl4.joxi.net/drive/2018/08/01/0004/2795/285419/19/38556576bc.jpg
4. Deploy a branch like always
5. After you're finished with testing, return to Settings page and remove "Nodejs" buildpack: http://dl4.joxi.net/drive/2018/08/01/0004/2795/285419/19/421797fa23.jpg