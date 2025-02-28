const fs = require("fs");
const nativeJSON = require("./data/native.json");
const utils = require('./utils.js');


(async function() {
  // console.log(cliJSON);

  nativeJSON.map(writePage);
}());

function writePage(page) {
  const data = [
    renderFrontmatter(page),
    renderImports(page),
    renderIntro(page),
    renderSalesCTA(page),
    renderInstallation(page),
    renderSupportedPlatforms(page),
    renderCapIncompat(page),
    renderUsage(page),
  ].join("");
  
  const path = `docs/native/plugins/${page.packageName.replace('@ionic-native/','')}.md`;
  fs.writeFileSync(path, data);
}

function renderFrontmatter({ displayName }) {
  const frontmatter = {
    title: displayName
  };

  return `---
${Object.entries(frontmatter)
  .map(([key, value]) => `${key}: ${value}`)
  .join("\n")}
---

`;
}

function renderImports({}) {
  return `
import DocsCard from '@site/src/components/DocsCard';
import DocsButton from '@site/src/components/DocsButton';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
`;
}

function renderIntro({ description, displayName, repo }) {
  return `
# ${displayName}

${description}

<p><a href="${repo}" target="_blank" rel="noopener" className="git-link">
  ${utils.gitBranchSVG()} ${repo}
</a></p>
`;
}

function renderSalesCTA({}) {
  return `
<h2>Stuck on a Cordova issue?</h2>
<DocsCard className="cordova-ee-card" header="Don't waste precious time on plugin issues." href="https://ionicframework.com/sales?product_of_interest=Ionic%20Native">
  <div>
    <img src="/docs/icons/native-cordova-bot.png" class="cordova-ee-img" />
    <p>If you're building a serious project, you can't afford to spend hours troubleshooting. Ionic’s experts offer premium advisory services for both community plugins and premier plugins.</p>
    <DocsButton className="native-ee-detail">Contact Us Today!</DocsButton>
  </div>
</DocsCard>

`;
}

function renderInstallation({cordovaPlugin, packageName}) {
  return `
<h2 id="installation">
  <a href="#installation">Installation</a>
</h2>
<Tabs defaultValue="Capacitor" values={[
  {value: 'Capacitor', label: 'Capacitor'},
  {value: 'Cordova', label: 'Cordova'},
  {value: 'Enterprise', label: 'Enterprise'},
]}>
  <TabItem value="Capacitor">
    <CodeBlock className="language-shell">
      $ npm install ${cordovaPlugin.name} {"\\n"}
      $ npm install ${packageName} {"\\n"}
      $ ionic cap sync
    </CodeBlock>
  </TabItem>
  <TabItem value="Cordova">
    <CodeBlock className="language-shell">
      $ ionic cordova plugin add ${cordovaPlugin.name} {"\\n"}
      $ npm install ${packageName} {"\\n"}
    </CodeBlock>
  </TabItem>
  <TabItem value="Enterprise">
    <blockquote>Ionic Enterprise comes with fully supported and maintained plugins from the Ionic Team. &nbsp;
      <a class="btn" href="https://ionic.io/docs/premier-plugins">Learn More</a> or if you're interested in an enterprise version of this plugin <a class="btn" href="https://ionicframework.com/sales?product_of_interest=Ionic%20Enterprise%20Engine">Contact Us</a></blockquote>
  </TabItem>
</Tabs>
`
}

function renderSupportedPlatforms({platforms}) {
  return `
## Supported Platforms
  
${platforms.map(platform => `- ${platform}`).join('\n')}
`;
}

function renderCapIncompat({capacitorIncompatible}) {
  if (!capacitorIncompatible) {
    return null;
  }

  return `
## Capacitor
  
Not Compatible
`;
}

function renderUsage({usage}) {
  if (!usage) {
    return null;
  }

  return `
## Usage

### React

[Learn more about using Ionic Native components in React](/docs/native/community#react)
  

### Angular

${usage.replace(/</g,'&lt;')}
`;
}
