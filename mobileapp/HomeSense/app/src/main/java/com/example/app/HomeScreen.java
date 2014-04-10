package com.example.app;

import android.annotation.SuppressLint;
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
import android.widget.TextView;

public class HomeScreen extends ActionBarActivity {

    public final static String TOKEN_MESSAGE = "theToken";
    public String TOKEN = "Try again.";

    @SuppressLint("NewApi")

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_screen);

        Intent intent = getIntent();
        TOKEN = intent.getStringExtra(MainActivity.TOKEN_MESSAGE);

        // used for testing. delete before final
        TextView test = (TextView) findViewById(R.id.test);
        test.setText(TOKEN);
    }

    public void doTemp(View view) {
        Intent intent = new Intent(this, Data1.class);
        intent.putExtra(TOKEN_MESSAGE, TOKEN);
        startActivity(intent);
    }

    public void doMotion(View view) {
        Intent intent = new Intent(this, Data2.class);
        intent.putExtra(TOKEN_MESSAGE, TOKEN);
        startActivity(intent);
    }



}


