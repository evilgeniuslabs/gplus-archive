const fs = require('fs');
const path = require('path');

let posts = [];

fs.readdir(__dirname, function (err, filenames) {
  for (let i = 0; i < filenames.length; i++) {
    let filename = filenames[i];

    if (filename === 'index.json' || path.extname(filename) !== '.json')
      continue;

    // console.log(filename);

    let date = filename.substring(0, 8);
    // console.log(date);

    let title = filename.substring(11, filename.length - 5);
    // console.log(title);

    let text = fs.readFileSync(filename);
    let post = JSON.parse(text);
    let { creationTime, content, media, album, link, author, postAcl = {}, poll } = post;
    let { communityAcl, visibleToStandardAcl } = postAcl || {};
    let { community } = communityAcl || {};
    let { circles = [] } = visibleToStandardAcl || {};

    if (!community && !circles.some((circle) => {
      return circle && circle.type === 'CIRCLE_TYPE_PUBLIC';
    })) {
      console.log(filename);
      // console.log("skipping non public or community post.");
      continue;
    }

    if(community)
      communityAcl = { community: community };

    postAcl = {
      communityAcl: communityAcl,
      visibleToStandardAcl: visibleToStandardAcl,
    };


    if (media) {
      media = {
        url: media.url,
        contentType: media.contentType,
      }
    }

    if (album) {
      album.media = album.media.map((media => {
        return {
          url: media.url,
          contentType: media.contentType,
        };
      }))
    }

    if(poll) {
      poll = {};
    }

    posts.push({
      date: date,
      title: title,
      creationTime: creationTime,
      author: author,
      content: content,
      media: media,
      album: album,
      link: link,
      postAcl: postAcl,
      poll: poll,
    });
  }

  let index = {
    posts: posts,
  };

  fs.writeFile('index.json', JSON.stringify(index, null, 2), (error) => {
    if (error) {
      console.log(error);
    }
  });
});
