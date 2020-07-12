// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 To fetch & parse news articles from the NewsAPI
 */

async function fetchNews() {
    await fetch("/fetchNews")
        .then(response => response.json())
        .then(articles => {
            const newsContainer = document.getElementById('news-container');
            
            if(articles.status !== 'ok'){
                newsContainer.innerText = "We were unable to find anything on this";
            }else{   
                console.log(articles.articles);
                newsContainer.innerText = articles.articles[0].title;
            }
        })
    
}

