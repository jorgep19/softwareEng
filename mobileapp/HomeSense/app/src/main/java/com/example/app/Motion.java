package com.example.app;

import android.app.Activity;
import android.content.Intent;
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
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.TextView;
import android.widget.Toast;

import org.apache.http.message.BasicNameValuePair;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Motion extends Activity {

    String jsonString;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Intent intent = getIntent();
        jsonString = intent.getStringExtra(HomeScreen.TOKEN_MESSAGE);

        ListView lv = (ListView) findViewById(R.id.listview);

        final ArrayList<BasicNameValuePair> parsedJson = parseJson(jsonString);

        ArrayAdapter adapter = new ArrayAdapter(this, android.R.layout.simple_list_item_2,
                android.R.id.text1, parsedJson){
            @Override
            public View getView(int position, View convertView, ViewGroup parent){
                View view = super.getView(position, convertView, parent);
                TextView text1 = (TextView) view.findViewById(android.R.id.text1);
                TextView text2 = (TextView) view.findViewById(android.R.id.text2);

                BasicNameValuePair data = parsedJson.get(position);

                text1.setText(data.getName());
                text2.setText(data.getValue());
                return view;
            }
        };


        lv.setAdapter(adapter);
    }


    protected  ArrayList<BasicNameValuePair> parseJson(String js){
        JSONObject jsonAll;
        JSONArray points;
        ArrayList<BasicNameValuePair> daList = new ArrayList<BasicNameValuePair>();

        try{
            jsonAll = new JSONObject(js);
            points = jsonAll.getJSONArray("data");
            for (int i = 0; i <10 || i<points.length(); i++){
                JSONObject point = points.getJSONObject(i);
                String val = point.getString("sdatavalue");
                String dt = readableDateTime(point.getString("sdatarecordeddate"));
                daList.add(new BasicNameValuePair(dt, "Motion Detected"));

            }
        } catch (JSONException e){
            e.printStackTrace();
        }
        return daList;
    }

    protected String readableDateTime (String dt){
        String readable =
                dt.substring(5,7) +
                        "/" +
                        dt.substring(8,10) +
                        "/" +
                        dt.substring(0,4) +
                        " " +
                        dt.substring(11,23);
        return readable;
    }

    /*String jsonString = "{\"hasErrors\": false,\"messages\": [],\"data\": " +
            "[{\"sdatavalue\": \"10\",\"sdatarecordeddate\": \"2014-04-13T12:08:34.000Z\"}," +
            "{\"sdatavalue\": \"15\",\"sdatarecordeddate\": \"2014-04-13T12:08:34.000Z\"}," +
            "{\"sdatavalue\": \"20\",\"sdatarecordeddate\": \"2014-04-13T11:44:06.000Z\"},]}";*/
}
