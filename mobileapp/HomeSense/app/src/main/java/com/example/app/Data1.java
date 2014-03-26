package com.example.app;

import android.content.Intent;
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
import android.widget.Button;
import android.widget.TextView;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Data1 extends ActionBarActivity {

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

        new GetTemperature().execute();
    }
//save refreshing to get data for later
    public void doGetTemperature(){
        //new GetTemperature().execute();
        TextView test = (TextView) findViewById(R.id.test);
        test.setText("button works!");
    }

    private class GetTemperature extends AsyncTask <Void, Void, Void> {
        @Override
        protected Void doInBackground(Void... arg0 ){

            // DON'T ACUTUALLY KNOW WHAT I NEED TO POST TO THE API. PROBABLY NEED TO CHANGE THIS LATER
            List<NameValuePair> userInfo = new ArrayList<NameValuePair>(2);
            userInfo.add(new BasicNameValuePair(TOKEN_MESSAGE, TOKEN));
            userInfo.add(new BasicNameValuePair("sensor", TEMP_SENSOR_NAME));

            ServiceHandler sh = new ServiceHandler();

            String jsonToken = sh.makeServiceCall(TEMP_URL, sh.POST, userInfo );

            //Once schema for response to data query is available, parse JSON to get data

            parsedData.put("currentTemp", "18");
            parsedData.put("lowTemp", "0");
            parsedData.put("meanTemp", "12");
            parsedData.put("highTemp", "35");

            return null;
        }

        @Override
        protected void onPostExecute(Void result){
            super.onPostExecute(result);

            changeNumbers(
                    parsedData.get("currentTemp"),
                    parsedData.get("lowTemp"),
                    parsedData.get("meanTemp"),
                    parsedData.get("highTemp"));

        }
    }

    public void changeNumbers(String currentTemp, String lowTemp, String meanTemp, String highTemp){
        Button cur = (Button) findViewById(R.id.butCurData);
        TextView low = (TextView) findViewById(R.id.textLowData);
        TextView mean = (TextView) findViewById(R.id.textMeanData);
        TextView high = (TextView) findViewById(R.id.textHighData);

        cur.setText(currentTemp);
        low.setText(lowTemp);
        mean.setText(meanTemp);
        high.setText(highTemp);
    }

}
