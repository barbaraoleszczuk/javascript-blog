'use strict';
const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    console.log(event);
    console.log('clickedElement (with plus): ' + clickedElement);

    /* [DONE] remove class 'active' from all article links  */
  
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }

    /* [IN PROGRESS] add class 'active' to the clicked link */

     clickedElement.classList.add('active');
     console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }

     /* get 'href' attribute from the clicked link */

    const articleAttribute = clickedElement.getAttribute('href');
    console.log(articleAttribute);

     /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleAttribute);
    console.log(targetArticle);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
  }

    const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
  

    function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */
         const titleList = document.querySelector(optTitleListSelector);
         console.log('Title list: ', titleList);
         
         function clearTitleLinks(){
          titleList.innerHTML = '';
        }
        clearTitleLinks()

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

        let html = '';

      for(let article of articles){
        article.addEventListener('click', generateTitleLinks);
        console.log(article)

     /* get the article id */
        
     const articleId = article.getAttribute('id');
     console.log(articleId)

     /* find the title element */

     const articleTitle = article.querySelector(optTitleSelector).innerHTML;

     /* get the title from the title element */

     console.log('Title: ',articleTitle);

      /* create HTML of the link */

      const linkHTML = '<li><a href="#'+ articleId +'"><span>'+ articleTitle +'</span></a></li>';
      console.log(linkHTML);

      /* insert link into titleList */
      html = html + linkHTML;
      }

      titleList.innerHTML = html;

      const links = document.querySelectorAll('.titles a');
      console.log(links);

           
      for(let link of links){
        link.addEventListener('click', titleClickHandler);
         }
    }
    
       generateTitleLinks();

       const optArticleTagsSelector = '.post-tags .list';
       
       
       function generateTags(){

      
        /* find all articles */
      
        const articles = document.querySelectorAll(optArticleSelector);
      
        /* START LOOP: for every article: */
      
        for(let article of articles) {
      
          /* find tags wrapper */
          const wrapper = article.querySelector(optArticleTagsSelector);
      
          /* make html variable with empty string */
          let html = ''
      
          /* get tags from data-tags attribute */
      
          const articleTags = article.getAttribute('data-tags');
          console.log(articleTags);
          
          /* split tags into array */

          const articleTagsArray = articleTags.split(' ');
          console.log(articleTagsArray);
          /* START LOOP: for each tag */
          for(let tag of articleTagsArray){
            console.log(tag);
            /* generate HTML of the link */

            const linkHTML = '<li><a href="#tag-'+ tag +'"><span>'+ tag +'</span></a></li>';
            console.log(linkHTML);
      
            /* add generated code to html variable */
            html = html + linkHTML;
          
          /* END LOOP: for each tag */
          }
          /* insert HTML of all the links into the tags wrapper */
          wrapper.innerHTML = html;
        /* END LOOP: for every article: */
      }
    }
    
      generateTags();


      function tagClickHandler(event){
        /* prevent default action for this event */
        event.preventDefault();
        /* make new constant named "clickedElement" and give it the value of "this" */
      const clickedElement = this;
        /* make a new constant "href" and read the attribute "href" of the clicked element */
      const href = clickedElement.getAttribute('href');
        /* make a new constant "tag" and extract tag from the "href" constant */
      const tag = href.replace('#tag-', '');
        /* find all tag links with class active */
        const activeTags = document.querySelectorAll('a.active[href^="#tag-"]')
        /* START LOOP: for each active tag link */
      for (let activeTag of activeTags){
          /* remove class active */
          activeTag.classList.remove('active');
        /* END LOOP: for each active tag link */
      }
        /* find all tag links with "href" attribute equal to the "href" constant */
      const tagLinks = document.querySelectorAll('[href^="#tag-"]');
        /* START LOOP: for each found tag link */
      for (tagLink of tagLinks){
          /* add class active */
          tagLink.classList.add('active');
          console.log('Active: ', clickedElement);
        /* END LOOP: for each found tag link */
      }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
      }
      
      function addClickListenersToTags(){
        /* find all links to tags */
      
        /* START LOOP: for each link */
      
          /* add tagClickHandler as event listener for that link */
      
        /* END LOOP: for each link */
      }
      
      addClickListenersToTags();