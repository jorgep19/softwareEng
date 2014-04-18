package com.example.app;

import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.ActionBar;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.os.Build;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.ActionBar;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.os.Build;
import android.widget.EditText;
import android.widget.Toast;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Serializable;
import java.lang.reflect.Array;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.BasicHttpEntity;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;

public class PiScreen extends ActionBarActivity {

    String temp2 = "";
    String temp3 = "";
    String temp5 = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pi_screen);

        getPis();
    }




    public void getPis(){

    InputStream inputStream = null;
    String URL = "http://homesense.herokuapp.com/api/customer/get/summary/data";
    String result = "";

        try {
            // 1. create HttpClient
            HttpClient httpclient = new DefaultHttpClient();

            // 2. make POST request to the given URL
            HttpPost httpPost = new HttpPost(URL);

            String json = "";

            // 3. build jsonObject
            JSONObject jsonObject = new JSONObject();
            jsonObject.accumulate("userId", MainActivity.userId);


            // 4. convert JSONObject to JSON to String
            json = jsonObject.toString();


            // ** Alternative way to convert Person object to JSON string usin Jackson Lib
            // ObjectMapper mapper = new ObjectMapper();
            // json = mapper.writeValueAsString(person);

            // 5. set json to StringEntity
            StringEntity se = new StringEntity(json);

            // 6. set httpPost Entity
            httpPost.setEntity(se);

            // 7. Set some headers to inform server about the type of the content
            httpPost.setHeader("Accept", "application/json");
            httpPost.setHeader("Content-type", "application/json");


            // 8. Execute POST request to the given URL
            HttpResponse httpResponse = httpclient.execute(httpPost);

            // 9. receive response as inputStream
            inputStream = httpResponse.getEntity().getContent();

            // HttpEntity entity = httpResponse.getEntity();

            //String jsonString = EntityUtils.toString(entity);

            // 10. convert inputstream to string

            if(inputStream != null){
                //result = EntityUtils.toString(entity);
                result = convertInputStreamToString(inputStream);

                JSONObject result2 = new JSONObject(result);
                JSONArray result3 = new JSONArray();
                result3 = result2.getJSONArray("data");
                JSONArray result4 = new JSONArray();
               // result4 = result3.getJSONArray(1);

                //JSONObject result2 = new JSONObject(result);
                //result = result2.getString("hasErrors");
                //userId = result2.getString("userId");
               JSONObject temp = new JSONObject();


                temp = result3.getJSONObject(0);

                JSONArray result6 = new JSONArray();
                result6 = temp.getJSONArray("sensorsReadings");

                JSONObject temp7 = new JSONObject();
                temp7 = result6.getJSONObject(0);
                String temp8 = temp7.getString("type");  //SENSOR TYPE


                String temp9 = temp7.getString("id"); //SENSOR ID

               temp2 = temp.getString("sensorsReadings");
                temp3 = temp.getString("desc"); //PI NAME

                //JSONObject temp4 = new JSONObject(temp2);
               // temp5 = temp4.getString("id");

                Toast.makeText(getApplicationContext(), temp9 + " " + temp8, Toast.LENGTH_LONG).show();
            }
            else
                result = "0";




        } catch (Exception e) {



            Log.d("InputStream", e.getLocalizedMessage());


        }




		/*
		 *  From here on do whatever you want with your JSONObject, e.g.
		 *  1) Get the value for a key: jsonObjRecv.get("key");
		 *  2) Get a nested JSONObject: jsonObjRecv.getJSONObject("key")
		 *  3) Get a nested JSONArray: jsonObjRecv.getJSONArray("key")
		 */







    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.pi_screen, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    /**
     * A placeholder fragment containing a simple view.
     */
    public static class PlaceholderFragment extends Fragment {

        public PlaceholderFragment() {
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_pi_screen, container, false);
            return rootView;
        }
    }

    private static String convertInputStreamToString(InputStream inputStream) throws IOException {
        BufferedReader bufferedReader = new BufferedReader( new InputStreamReader(inputStream));
        String line = "";
        String result = "";
        while((line = bufferedReader.readLine()) != null)
            result += line;

        inputStream.close();
        return result;

    }




}
