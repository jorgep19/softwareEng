package com.example.app;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.ActionBar;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.os.Build;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Temperature extends ActionBarActivity {

    public final static String TEMP_SENSOR_NAME = "temperature";
    public final static String TOKEN_MESSAGE = "theToken";
    public final static String TEMP_URL = "http://198.46.148.121/api/customer/get/data";
    public String TOKEN = "Try again.";
    public Map<String, String> parsedData = new HashMap<String, String>(4);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_data1);
/*
        // used for testing. delete before final
        TextView test = (TextView) findViewById(R.id.test);
        test.setText(TOKEN);
*/

      doGetTemperature();
    }
    //save refreshing to get data for later
    public void doGetTemperature(){
        //new GetTemperature().execute();





        String TAG = "Temperature";
        String URL = "http://homesense.herokuapp.com/api/login";
        String result = "";
        // JSONObject jo = new JSONObject();
        String temp2 = "";
        String temp3 = "";


        // jo.put("email", userName);
        // jo.put("password", passWord);

        InputStream inputStream = null;


        HttpResponse response = null;
        try {
            // 1. create HttpClient
            HttpClient httpclient = new DefaultHttpClient();
            HttpGet request = new HttpGet();
            // 2. make POST request to the given URL
            request.setURI(new URI("http://homesense.herokuapp.com/api/get/temperature/data/1"));
            response = httpclient.execute(request);




            // 9. receive response as inputStream
            inputStream = response.getEntity().getContent();



            // 10. convert inputstream to string

            if(inputStream != null){
                //result = EntityUtils.toString(entity);
                result = convertInputStreamToString(inputStream);
                JSONObject result2 = new JSONObject(result);
                JSONArray result3 = new JSONArray();
                result3 = result2.getJSONArray("data");
                JSONObject temp = new JSONObject();

                double num = 0.00;
                double low = 999.00;
                double high = -999.00;
                double numTemp = 0.00;
                double current = 0.00;

                for(int i=0;i<result3.length();i++){
                    temp = result3.getJSONObject(i);
                    temp2 = temp.getString("sdatavalue");
                    num += Double.parseDouble(temp2);
                    numTemp = Double.parseDouble(temp2);

                    if(numTemp>high){
                       high = numTemp;
                   }

                    if(numTemp<low){
                        low = numTemp;


                   }
                current = numTemp;

                }
                double average = num/result3.length();



                TextView avg = (TextView) this.findViewById(R.id.textMeanData);
                avg.setText(String.valueOf(average));

                TextView l = (TextView) this.findViewById(R.id.textLowData);
                l.setText(String.valueOf(low));

                TextView h = (TextView) this.findViewById(R.id.textHighData);
                h.setText(String.valueOf(high));

                TextView c = (TextView) this.findViewById(R.id.butCurData);
                c.setText(String.valueOf(current));





            }
            else
                result = "true";

        } catch (Exception e) {
            //result = "0";


            Log.d("InputStream", e.getLocalizedMessage());


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

