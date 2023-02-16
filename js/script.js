const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
}

'use strict';
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  // console.log(event);
  // console.log('clickedElement (with plus): ' + clickedElement);

  /* [DONE] remove class 'active' from all article links  */
  
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  // console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleAttribute = clickedElement.getAttribute('href');
  // console.log(articleAttribute);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleAttribute);
  // console.log(targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list.authors';

function generateTitleLinks (customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  // console.log('Title list: ', titleList);
         
  
    titleList.innerHTML = '';
  

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){

    /* get the article id */
        
    const articleId = article.getAttribute('id');
    // console.log(articleId);

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    // console.log('Title: ',articleTitle);

    /* create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    // console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  // console.log(links);

           
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
    
generateTitleLinks();

const optArticleTagsSelector = '.post-tags .list';

function calculateTagsParams(tags){
  
  const params = {
    max : 0,
    min : 999999
  }

  for(let tag in tags){

    if (tags[tag]>params.max){
    params.max = tags[tag]
    }

    if(tags[tag] < params.min) {
      params.min = tags[tag];
    }
    // console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params ;
}
calculateTagsParams();

function calculateTagClass(count,params){
  // console.log(count, params);

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return classNumber;
}



function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  

  /* find all articles */
      
  const articles = document.querySelectorAll(optArticleSelector);
      
  /* START LOOP: for every article: */
      
  for(let article of articles) {
      
    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);
      
    /* make html variable with empty string */
    let html = '';
      
    /* get tags from data-tags attribute */
      
    const articleTags = article.getAttribute('data-tags');
    // console.log(articleTags);
          
    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    // console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      // console.log(tag);
      /* generate HTML of the link */

      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.articleTag(linkHTMLData);
      // const linkHTML = '<li><a href="#tag-'+ tag +'"><span>'+ tag +'</span></a></li>';
      // console.log(linkHTML);
      
      /* add generated code to html variable */
      html = html + linkHTML;
          
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      }else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */

  const tagLinkHTML = '<li><a class="'+ optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag+ '">' + tag + '</a> ('+ allTags[tag]+ ')</li>';
  // console.log('tagLinkHTML:', tagLinkHTML);

  allTagsData.tags.push({
    tag: tag,
    count: allTags[tag],
    className: calculateTagClass(allTags[tag], tagsParams)
  });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);

}
generateTags();


function tagClickHandler(event){
  console.log('xxx');
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('[href^="#tag-"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active');
    // console.log('Active: ', clickedElement);
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
      
function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('.list.list-horizontal a, .list.tags a');
  /* START LOOP: for each link */
  for (const link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
      
addClickListenersToTags();

function generateAuthors(){

   /* [NEW] create a new variable allAuthors with an empty object */ 

   let allAuthors = []; 


  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */

  for (let article of articles){

    /* find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    // console.log (authorWrapper); 

    /* get authors from data-author attribute */
    const Authors = article.getAttribute('data-author');
    // console.log(Authors);

    /* generate HTML of the link */
    const linkHTMLData = {id: Authors, title: Authors};
    const linkAuthor = templates.articleAuthor(linkHTMLData);
    // const linkAuthor = '<p class="post-author"><a href="#author-' + Authors + '"><span>by ' + Authors + '</span></a></p>';
     
     
     /* insert HTML of all the links into the authors wrapper */
     authorWrapper.innerHTML = linkAuthor;
    

    /* [NEW] check if this link is NOT already in allAuthors */
    if(allAuthors.indexOf(linkAuthor) == -1){
      /* [NEW] add generated code to allAuthors array */
      allAuthors.push(linkAuthor);
    }
    /* [NEW] find list of Authors in right column */
    const authorsList = document.querySelector(optAuthorsListSelector);

    /* [NEW] add html from allTags to tagList */
    authorsList.innerHTML = allAuthors.join(' ');

    /* END LOOP: for every article: */
  }
  /* [DONE] generate HTML of the link */
    
        

}
generateAuthors();   

      
function authorClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  // console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tagAuthor" and extract tag from the "href" constant */
  const tagAuthor = href.replace('#author-', '');

  /* find all tagAuthor links with class active */
  const activeAuthors = document.querySelectorAll('a .active[href^="#author-"]');
  // console.log(activeAuthors);
        
  /* START LOOP: for each active tagAuthor link */
  for (let activeAuthor of activeAuthors){

    /* remove class active */
    activeAuthor.classList.remove('active');

    /* END LOOP: for each active tagAuthor link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('[href^="#author-"]');
  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks){
    /* add class active */
    authorLink.classList.add('active');
    // console.log('Active: ', clickedElement);
    /* END LOOP: for each found tagauthor link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tagAuthor + '"]');
}
      
function addClickListenersToAuthors(){
  /* find all links to tagAuthors */
  const links = document.querySelectorAll('[href^="#author-"]');
  /* START LOOP: for each link */
  for (const link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}
      
addClickListenersToAuthors();
