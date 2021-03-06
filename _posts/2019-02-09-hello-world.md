---
layout: post
title:  "Hello World!"
subtitle: "My first blog post on this site. I go over how I made my website and what I learnt along the way."
---

I've finally shipped! After about a month of what seems like going backwards and forwards I've made my first post on my brand new website. I’m going to try and do at least one post a month, and I plan to keep them relatively short. I can’t promise they won’t end up longer though if I really get into it!

## Jekyll and GitHub Pages

So you want to know how I made this site right? Well initially I was thinking of using what I know from work - C# <a href="https://dotnet.microsoft.com/apps/aspnet/mvc" class="blue-link">ASP.NET MVC</a>. But I figured it would be better if I learnt something new and all that server side setup and maintenance seemed like a pain. After a recommendation from a friend I found that GitHub offers **free hosting** for websites running <a class="blue-link" href="https://pages.github.com/">GitHub Pages</a>. This seemed perfect for what I needed and no server side hassle! From GitHub Pages I was directed to <a href="https://jekyllrb.com/" class="blue-link">Jekyll</a>. Jekyll is an amazing open source blogging tool, which among other things has inbuilt support for <a href="https://daringfireball.net/projects/markdown/" class="blue-link">Markdown</a> making writing blog posts a breeze[^1].

Here's an example of the JavaScript markdown which uses <a href="https://pypi.org/project/Pygments/" class="blue-link">Pygments</a>:
```javascript
(function() {
    console.log("Hello World! 😊");
})();
```

Jekyll also has a great HTML templating through use of <a href="https://jekyllrb.com/docs/includes/" class="blue-link">includes</a> and <a href="https://jekyllrb.com/docs/step-by-step/04-layouts/" class="blue-link">layouts</a> which help keep your project well structured.

## Sass and Gulp
At work we predominantly use CSS libraries like <a href="https://getbootstrap.com/" class="blue-link">Bootstrap</a>, but one thing I decided fairly early on was that I was going to develop all the CSS myself to improve my front-end skills. After a bit of online research I decided I was going to use the <a href="https://sass-lang.com/" class="blue-link">Sass</a> CSS templating language. Here's the Sass for those crazy blue links:
```css
$color--skyblue: #00c1c1;
$color--white: #fff;

%transition-duration {
    transition-duration: 0.5s;
}

.blue-link, %blue-link {
    color: $color--skyblue;
    text-decoration: none;
    background-image: linear-gradient(
        to top,
        $color--skyblue,
        $color--skyblue 50%,
        transparent 50%,
        transparent);
    background-position: 0% 0%;
    background-size: 100% 200%;
    @extend %transition-duration;

    &:hover{
        color: $color--white;
        background-position: 0 100%;
    }
}
```
Sass makes your CSS code simpler with things like variables `$color--skyblue`, placeholder selectors `%transition-duration` and parent selectors `&:hover`. Essentially Sass means you don't have to repeat yourself so often!

While investigating Sass I was directed to <a href="https://gulpjs.com/" class="blue-link">Gulp</a> a DevOps build tool. Gulp essentially allows you to automate command line tools for things like:

- Compiling Sass files to CSS when they change.
- Minifying JavaScript and CSS files.
- Running a Jekyll build when a markdown file is updated.
- Reloading your browser once a build is complete.

This makes development a lot easier and faster. Here's an example of a gulp command that compiles a Sass file and minifies the outputed CSS:
```javascript
/**
 * Compile .scss files.
 */
gulp.task("sass", function () {
    return gulp.src("_scss/main.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(cssnano())
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest("assets/css/"));
});
```

## Photos
<figure class="half-width-left"><img style="width:100%;" src="/assets/images/photos/Sunset.jpg" /></figure>
<p class="half-width-right">
One thing I thought I'd share on this blog is some <a href="/Photos" class="blue-link">photos</a> I've taken on my travels. In the future I'd like to develop that area into a gallery of some kind. The photos have been compressed using 
<a href="https://squoosh.app/" class="blue-link">Squoosh</a> making them take up less space and load quickly (hopefully).
</p>

## Conclusion

In fact creating this website was a lot easier than I imagined thanks to all the great freely available open source tools on the web. Now that I started writing about some of these tools I realised most of them probably need an entire post to be explained with any detail. So I might be doing some "idiots guide to..." posts in the near future. Anyhow hope you enjoyed my first post and are looking forward to the next instalment. 😏

[^1]: That's the plan anyway!