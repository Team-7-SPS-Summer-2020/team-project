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
import com.google.gson.Gson;





/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  @Override

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    	
		String location = getParameter(request,"location",""); //get query parameter

		response.setContentType("text/html;"); // can be made into JSON but for not text works for troubleshooting
        
        //Helps us troubleshoot whether or not we actually recieved anything from client
        if(location.length() == 0)
             response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
             
		response.getWriter().println("location: " + location);
  }

	private String getParameter(HttpServletRequest request, String name, String defaultValue){

		String val = request.getParameter(name);

		return val == null ? defaultValue : val;

	}

}

