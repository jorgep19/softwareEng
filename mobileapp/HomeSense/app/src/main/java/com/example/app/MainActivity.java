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
import android.widget.EditText;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends ActionBarActivity {

    public final static String LOGIN_URL = "http://198.46.148.121/api/customer/login/";
    public final static String TOKEN_MESSAGE = "theToken";
    public String TOKEN = null;
    public String email = null;
    public String pw = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
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
        email = ((EditText) findViewById(R.id.editTextEmail))
                .getText().toString();
        pw = ((EditText) findViewById(R.id.editTextPassword))
                .getText().toString();
        new  Login().execute();

        if (TOKEN != null) {
            Intent intent = new Intent(this, HomeScreen.class);
            intent.putExtra(TOKEN_MESSAGE, TOKEN);
            startActivity(intent);
        }
    }

    private class Login extends AsyncTask<Void, Void, Void> {

        @Override
        protected Void doInBackground(Void... arg0 ){

            List<NameValuePair> userInfo = new ArrayList<NameValuePair>(2);
            userInfo.add(new BasicNameValuePair("cusEmail", email));
            userInfo.add(new BasicNameValuePair("cusPass", pw));

            ServiceHandler sh = new ServiceHandler();

            String jsonToken = sh.makeServiceCall(LOGIN_URL, sh.POST, userInfo );

            //Once schema for response to login is available, parse JSON to get token
            TOKEN = "theFuckingToken"; //set value for token

            return null;
        }
    }

}
