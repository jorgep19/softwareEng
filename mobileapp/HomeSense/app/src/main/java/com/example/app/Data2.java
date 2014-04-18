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
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class Data2 extends ActionBarActivity {

    ArrayList<String> sensorValue;
    ArrayList<String> dateTime;
    JSONObject jsonAll = null;
    JSONArray points = null;

    TextView textSensorName;
    TextView value1;
    TextView value2;
    TextView value3 ;
    TextView value4 ;
    TextView value5 ;
    TextView value6;
    TextView value7 ;
    TextView value8 ;
    TextView value9 ;
    TextView value10 ;
    TextView datetime1;
    TextView datetime2;
    TextView datetime3;
    TextView datetime4;
    TextView datetime5 ;
    TextView datetime6 ;
    TextView datetime7 ;
    TextView datetime8;
    TextView datetime9;
    TextView datetime10;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_data2);

        sensorValue = new ArrayList<String>(10);
        dateTime = new ArrayList<String>(10);

        textSensorName = (TextView) findViewById(R.id.textSensorName);
        value1 = (TextView) findViewById(R.id.value1);
        value2 = (TextView) findViewById(R.id.value2);
        value3 = (TextView) findViewById(R.id.value3);
         value4 = (TextView) findViewById(R.id.value4);
         value5 = (TextView) findViewById(R.id.value5);
        value6 = (TextView) findViewById(R.id.value6);
        value7 = (TextView) findViewById(R.id.value7);
         value8 = (TextView) findViewById(R.id.value8);
        value9 = (TextView) findViewById(R.id.value9);
         value10 = (TextView) findViewById(R.id.value10);
        datetime1 = (TextView) findViewById(R.id.datetime1);
        datetime2 = (TextView) findViewById(R.id.datetime2);
      datetime3 = (TextView) findViewById(R.id.datetime3);
        datetime4 = (TextView) findViewById(R.id.datetime4);
         datetime5 = (TextView) findViewById(R.id.datetime5);
         datetime6 = (TextView) findViewById(R.id.datetime6);
        datetime7 = (TextView) findViewById(R.id.datetime7);
         datetime8 = (TextView) findViewById(R.id.datetime8);
         datetime9 = (TextView) findViewById(R.id.datetime9);
         datetime10 = (TextView) findViewById(R.id.datetime10);

        textSensorName.setText("Light");
        getData("Light",1);
        displayData();
    }

    public void getData(String sensorType, int sensorID){
        /*gets sensor data for a particular sensor
        * current data is made up*/

        String jsonString = testingJsonString;

        try{
            jsonAll = new JSONObject(jsonString);
            points = jsonAll.getJSONArray("data");
            for (int i = 0; i <10 || i<points.length(); i++){
                JSONObject point = points.getJSONObject(i);
                String val = point.getString("sdatavalue");
                String dt = point.getString("sdatarecordeddate");
                //dt = dateTimeFormat(dt);
                sensorValue.add(val);
                dateTime.add(dt);
                if (val != null){
                Toast.makeText(this, val, Toast.LENGTH_SHORT).show();}
            }
        } catch (JSONException e){
            e.printStackTrace();
        }
    }

    public void displayData(){
        value1.setText(sensorValue.get(0));
        value2.setText(sensorValue.get(1));
        value3.setText(sensorValue.get(2));
        /*value4.setText(sensorValue.get(3));
        value5.setText(sensorValue.get(4));
        value6.setText(sensorValue.get(5));
        value7.setText(sensorValue.get(6));
        value8.setText(sensorValue.get(7));
        value9.setText(sensorValue.get(8));
        value10.setText(sensorValue.get(9));*/
        datetime1.setText(dateTime.get(0));
        datetime2.setText(dateTime.get(1));
        datetime3.setText(dateTime.get(2));/*
        datetime4.setText(dateTime.get(3));
        datetime5.setText(dateTime.get(4));
        datetime6.setText(dateTime.get(5));
        datetime7.setText(dateTime.get(6));
        datetime8.setText(dateTime.get(7));
        datetime9.setText(dateTime.get(8));
        datetime10.setText(dateTime.get(9));*/

    }


/*not working. have to work on it later
    public String dateTimeFormat(String dt){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        SimpleDateFormat output = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date d = null;
        try {
            d = sdf.parse(dt);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        String formattedTime = output.format(d);
        return formattedTime;
    }
*/
    String testingJsonString = "{\"hasErrors\": false,\"messages\": [],\"data\": " +
            "[{\"sdatavalue\": \"10\",\"sdatarecordeddate\": \"2014-04-13T12:08:34.000Z\"}," +
            "{\"sdatavalue\": \"15\",\"sdatarecordeddate\": \"2014-04-13T12:08:34.000Z\"}," +
            "{\"sdatavalue\": \"20\",\"sdatarecordeddate\": \"2014-04-13T11:44:06.000Z\"},]}";

}
