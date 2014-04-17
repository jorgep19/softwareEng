package com.example.app;

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

public class MainActivity extends ActionBarActivity {

    public final static String LOGIN_URL = "homesense.herokuapp.com/api/login";
    public final static String TOKEN_MESSAGE = "theToken";

    String userName, passWord;
    EditText username, password;
    String userId;


    public String TOKEN = "fuck";
    //public List<Map<String, String>> TOKEN = null;
    public String email = null;
    public String pw = null;

    //for testing
    private HashMap<String, String> newSensor(String key, String name){
        HashMap<String,String> sensor = new HashMap<String, String>();
        sensor.put(key, name);

        return sensor;
    }



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        username = (EditText)findViewById(R.id.username);
        password = (EditText)findViewById(R.id.password);
    }

    private static String convertInputStreamToString(InputStream inputStream) throws IOException{
        BufferedReader bufferedReader = new BufferedReader( new InputStreamReader(inputStream));
        String line = "";
        String result = "";
        while((line = bufferedReader.readLine()) != null)
            result += line;

        inputStream.close();
        return result;

    }

    /*Called for login attempt*//*
    public void loginMessage(View view){
        Intent intent = new Intent(this, HomeScreen.class);
        EditText eTEmail = (EditText) findViewById(R.id.editTextEmail);
        EditText eTPW = (EditText) findViewById(R.id.editTextPassword);
        String messageEmail = eTEmail.getText().toString();
        String messagePW = eTPW.getText().toString();
        Bundle bundleLogin = new Bundle();
        bundleLogin.putString("email",messageEmail);
        bundleLogin.putString("pw", messagePW);
        startActivity(intent);
    }*/

    public void lostPWMessage(View view){
        Intent intent = new Intent(this, PWRec.class);
        startActivity(intent);
    }

    public void doLogin(View view) {

        userName = username.getText().toString();
        passWord = password.getText().toString();



        //Toast.makeText(this, "doLogin called",
          //      Toast.LENGTH_SHORT).show();



        String result = "";

        String TAG = "MainActivity";
        String URL = "http://homesense.herokuapp.com/api/login";

        // JSONObject jo = new JSONObject();


        // jo.put("email", userName);
        // jo.put("password", passWord);

        InputStream inputStream = null;



        try {
            // 1. create HttpClient
            HttpClient httpclient = new DefaultHttpClient();

            // 2. make POST request to the given URL
            HttpPost httpPost = new HttpPost(URL);

            String json = "";

            // 3. build jsonObject
            JSONObject jsonObject = new JSONObject();
            jsonObject.accumulate("email", userName);
            jsonObject.accumulate("password", passWord);

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
                result = result2.getString("hasErrors");
                userId = result2.getString("userId");
            }
            else
                result = "true";

        } catch (Exception e) {
            //result = "0";


            Log.d("InputStream", e.getLocalizedMessage());


        }

        if(result == "true"){
            Toast.makeText(getApplicationContext(), "Incorrect E-mail/Password", Toast.LENGTH_LONG).show();
        }
        else if(result =="false"){

            Toast.makeText(getApplicationContext(), "Login Successful!" , Toast.LENGTH_LONG).show();
            Intent intent = new Intent(this, HomeScreen.class);
            intent.putExtra(TOKEN_MESSAGE, TOKEN);
            startActivity(intent);

        }
		/*
		 *  From here on do whatever you want with your JSONObject, e.g.
		 *  1) Get the value for a key: jsonObjRecv.get("key");
		 *  2) Get a nested JSONObject: jsonObjRecv.getJSONObject("key")
		 *  3) Get a nested JSONArray: jsonObjRecv.getJSONArray("key")
		 */

    };
}



        //check Internet connection.




