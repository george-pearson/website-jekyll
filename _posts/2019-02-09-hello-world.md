---
layout: post
title:  "Hello World!"
subtitle: "My first blog post on this site. I go over how I made my website and what I learnt along the way."
date:   2019-02-09 11:00:00 +0000
---

I've finally shipped! After about a month of what seems like going backwards and forwards I've made my first post on my brand new website. I’m going to try and do at least one post a month, and I plan to keep them relatively short, as my own tolerance for articles and blog posts is only a few paragraphs. Can’t promise they won’t end up longer though if I really get into it!

## Jekyll and Github Pages

So you want to know how I made this site right? Well initally I was thinking of using what I know from work classic C# [ASP.NET MVC](https://dotnet.microsoft.com/apps/aspnet/mvc). But I figured it would be better if I learnt something new and all that server side setup and maintenance seemed like a pain. After a recomendation from a friend I found that Github offers **free hosting** for websites running [Github Pages](https://pages.github.com/). This seemed perfect for what I needed and no server side hassel! From Github Pages I was directed to [Jekyll](https://jekyllrb.com/). Jekyll is an amazing open source blogging tool, which among other things has inbuilt support for [Markdown](https://daringfireball.net/projects/markdown/) making writing blog post as breeze[^1].

Here's an example of the code markdown which uses [Pygments](http://pygments.org/):
```javascript
(function() {
    console.log("Hello World! 😊");
})();
```

So what did I learn?

[^1]: That's the plan anyway!