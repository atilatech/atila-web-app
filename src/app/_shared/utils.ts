

export function prettifyKeys(rawKey: string) {

  return rawKey.slice(0, 1).toUpperCase() +
          rawKey.replace(/_/g, ' ' ).slice(1);

}


export function toTitleCase(str) {
  var i, j, lowers, uppers;
  str = str.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless
  // they are the first or last words in the string
  lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
    'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
  for (i = 0, j = lowers.length; i < j; i++) {
    str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
      function(txt) {
        return txt.toLowerCase();
      });
  }


  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ['Id', 'Tv'];
  for (i = 0, j = uppers.length; i < j; i++) {
    str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
      uppers[i].toUpperCase());
  }

  return str;
}

export function genericItemTransform (item) {

    if (item.hasOwnProperty('deadline')) {
      item.type = 'scholarship'
    }
    else if (item.hasOwnProperty('starting_comment')){
      item.type = 'forum'
    }
    else if (item.hasOwnProperty('header_image_url')) {
      item.type = 'blog'
    }

    switch(item.type) {
      case 'scholarship':
        item = {
          title: item.name,
          description: item.description,
          id: item.id,
          slug: `/scholarship/${item.slug}/`,
          image: item.img_url,
          type: item.type,
        };
        break;
      case 'blog':
        item = {
          title: item.title,
          description: item.description,
          image: item.header_image_url,
          id: item.id,
          slug: `/blog/${item.user.username}/${item.slug}/`,
          type: item.type,
        };
        break;
      case 'forum':
        item = {
          title: item.starting_comment ? item.starting_comment.title || item.title : item.title,
          description: item.starting_comment ?  item.starting_comment.text || item.text: item.text,
          id: item.id,
          slug: `/forum/${item.slug}/`,
          type: item.type,
        };
        break;
      default:
        // code block
    }

    return item;

}

export function cleanHtml(rawHtml: string) {

  // https://stackoverflow.com/questions/19356398/remove-style-attribute-on-style-tag#19564598
  console.log('rawHtml',rawHtml);
  rawHtml = rawHtml.replace(/(<[^>]+) style=".*?"/gi, '$1');

  rawHtml = rawHtml.replace(/(<[^>]+) class=".*?"/gi, '$1');
  rawHtml = rawHtml.replace(/<iframe.+?<\/iframe>/gi, '');

  return rawHtml
}

export const IPDATA_KEY ='335beb2ad17cc12676f2792328a5a770c47b89d6768daf9ec2c4d86'
