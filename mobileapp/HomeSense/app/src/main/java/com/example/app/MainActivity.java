package com.example.app;

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
import android.widget.EditText;

public class MainActivity extends ActionBarActivity {

    public final static String MESSAGE_LOGIN = "login";

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

    /*Called for login attempt*/
    public void loginMessage(View view){
        Intent intent = new Intent(this, HomeScreen.class);
        EditText eTEmail = (EditText) findViewById(R.id.editTextEmail);
        EditText eTPW = (EditText) findViewById(R.id.editTextPassword);
        String messageEmail = eTEmail.getText().toString();
        String messagePW = eTPW.getText().toString();
        Bundle bundleLogin = new Bundle();
        bundleLogin.putString("email",messageEmail);
        bundleLogin.putString("pw", messagePW);
        intent.putExtra(MESSAGE_LOGIN, bundleLogin);
        startActivity(intent);
    }

    public void lostPWMessage(View view){
        Intent intent = new Intent(this, PWRec.class);
        startActivity(intent);
    }

}
