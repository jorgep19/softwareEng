/*package com.example.app;

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
import android.widget.ListView;
import android.widget.SimpleAdapter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HomeScreenLV extends ActionBarActivity {



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_screen_lv);

        Intent intent = getIntent();
        List<Map<String, String>> sensorsList = intent.getStringExtra(MainActivity.TOKEN_MESSAGE);

        ListView lv = (ListView) findViewById(R.id.listView);

        SimpleAdapter simp= new SimpleAdapter(this, sensorsList, android.R.layout.simple_list_item_1,
                new String[] {"sensor"}, new int[] {android.R.id.text1});

    }



}
*/