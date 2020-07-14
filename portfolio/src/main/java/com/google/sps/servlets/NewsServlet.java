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

package com.google.sps.servlets;

import java.io.IOException;
import java.net.*;
import java.io.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.lang.String;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import com.google.gson.Gson;
import java.util.List;


/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/fetchNews")
public class NewsServlet extends HttpServlet {
    OkHttpClient client = new OkHttpClient();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String location = getParameter(request, "location", "");
    String apiUrl = "https://newsapi.org/v2/everything?apiKey=96317a20b027446da228dce495ce6af7";
    String apiUrlrequest = apiUrl + "&q=" + location;

    Request okRequest = new Request.Builder()
    .url(apiUrlrequest)
    .build();

    try (Response okResponse = client.newCall(okRequest).execute()) {
      if (!okResponse.isSuccessful()) {
          throw new IOException("Unexpected code " + okResponse);
      }
        
        Gson gson = new Gson();
        NewsApiResponse newsApiResponse = gson.fromJson(okResponse.body().string(), NewsApiResponse.class);
        response.setContentType("application/json;");
        response.getWriter().println(gson.toJson(newsApiResponse));
    }
  }
	
private String getParameter(HttpServletRequest request, String name, String defaultValue){
        String val = request.getParameter(name);
        return val == null ? defaultValue : val;
    }

static class Article {
      String title;
      String description;
      String url;
      String image;
  }
	
 static class NewsApiResponse {
      String status;
      int totalResults;
      List<Article> articles;

  }
}
